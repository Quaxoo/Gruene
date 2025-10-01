import express from "express";
import session from "express-session";
import crypto from "crypto";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { logVisitor, getStats } from "./stats.js";
import https from "https"

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,      // schützt vor XSS
      secure: false,       // true, wenn HTTPS
      maxAge: 1000 * 60*30 // 30 Minuten
    }
  })
);


function hashPassword(password) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads")

const TERMINE_FILE = path.join(__dirname, "termine.json");
const BEITRAEGE_FILE = path.join(__dirname, "beitraege.json");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: {
    fieldSize: 50 * 1024 * 1024,
  } 
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS_HASH = hashPassword(process.env.ADMIN_PASSWORD);


function loadTermine() {
  if (!fs.existsSync(TERMINE_FILE)) {
    fs.writeFileSync(TERMINE_FILE, "[]");
  }
  return JSON.parse(fs.readFileSync(TERMINE_FILE, "utf-8"));
}
function saveTermine(termine) {
  fs.writeFileSync(TERMINE_FILE, JSON.stringify(termine, null, 2));
}


function loadBeitraege() {
  if (!fs.existsSync(BEITRAEGE_FILE)) {
    fs.writeFileSync(BEITRAEGE_FILE, "[]");
  }
  return JSON.parse(fs.readFileSync(BEITRAEGE_FILE, "utf-8"));
}
function saveBeitraege(beitraege) {
  fs.writeFileSync(BEITRAEGE_FILE, JSON.stringify(beitraege, null, 2));
}


const AUTHENTICATED = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  }
  return res.status(403).json({ message: "Nicht eingeloggt" });
}

function asyncHandler(fn) {
  return function(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function safeHandler(fn) {
  return function(req, res, next) {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

app.use((req, res, next) => {
  if (req.path.startsWith("/admin")) return next();

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  const cleanIp = ip;

  logVisitor(cleanIp);
  next();
});


app.post("/api/login", safeHandler((req, res) => {
  const { username, password } = req.body;
  if (
    username === ADMIN_USER &&
    hashPassword(password) === ADMIN_PASS_HASH
  ) {
    req.session.authenticated = true;
    res.json({ message: "Login erfolgreich" });
  } else {
    res.status(401).json({ message: "Ungültige Zugangsdaten" });
  }
}));

app.post("/api/logout", safeHandler((req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout erfolgreich" });
  });
}));

app.get("/api/authenticated", safeHandler((req, res) => {
  if (!req.session.authenticated) {
    return res.status(200).json({ authenticated: false });
  }else{
    return res.status(200).json({ authenticated: true });
  }
}))




app.get("/api/termine", safeHandler((req, res) => {
  const termine = loadTermine();
  res.json(termine);
}));

app.post("/api/termine", AUTHENTICATED, safeHandler((req, res) => {
  const {title, startDate, endDate, text, location, address, link } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Titel ist Pflichtfeld" });
  }

  const termine = loadTermine();

  const newTermin = {
    id: Date.now(),
    title,
    startDate: startDate || null,
    endDate: endDate || null,
    text: text || "",
    location: location || "",
    address: address || "",
    link: link || "",
  };

  termine.push(newTermin);
  saveTermine(termine);

  res.status(201).json(newTermin);
}));


app.get("/api/termine/:id", safeHandler((req, res) => {
  const { id } = req.params;
  let termine = loadTermine();
  termine = termine.find(a => String(a.id) === String(id));

  if (termine === null) {
    return res.status(404).json({ message: "Termin nicht gefunden" });
  }

  res.json(termine);
}));

app.put("/api/termine/:id", AUTHENTICATED, safeHandler((req, res) => {
  const { id } = req.params;
  const termine = loadTermine();
  const idx = termine.findIndex(a => String(a.id) === String(id));

  if (idx === -1) {
    return res.status(404).json({ message: "Termin nicht gefunden" });
  }

  // vorhandenen Termin aktualisieren (nur übergebene Felder überschreiben)
  termine[idx] = {
    ...termine[idx],
    ...req.body,
    id: termine[idx].id, // ID bleibt unverändert
  };

  saveTermine(termine);
  res.json(termine[idx]);
}));

app.delete("/api/termine/:id", AUTHENTICATED, safeHandler((req, res) => {
  const { id } = req.params;
  let termine = loadTermine();
  const before = termine.length;

  termine = termine.filter(a => String(a.id) !== String(id));

  if (termine.length === before) {
    return res.status(404).json({ message: "Termin nicht gefunden" });
  }

  saveTermine(termine);
  res.json({ message: "Termin gelöscht", id });
}));




app.get("/api/beitraege", safeHandler((req, res) => {
  const beitraege = loadBeitraege();
  res.json(beitraege);
}));

app.post("/api/beitraege", AUTHENTICATED, safeHandler((req, res) => {
  const {title, date, content} = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Beitrag unvollständig" });
  }

  const beitraege = loadBeitraege();

  const newBeitrag = {
    id: Date.now(),
    title,
    date,
    content: content || ""
  };

  beitraege.push(newBeitrag);
  saveBeitraege(beitraege);

  res.status(201).json(newBeitrag);
}));


app.get("/api/beitraege/:id", safeHandler((req, res) => {
  const { id } = req.params;
  let beitraege = loadBeitraege();
  beitraege = beitraege.find(a => String(a.id) === String(id));

  if (beitraege === null) {
    return res.status(404).json({ message: "Beitrag nicht gefunden" });
  }

  res.json(beitraege);
}));

app.put("/api/beitraege/:id", AUTHENTICATED, safeHandler((req, res) => {
  const { id } = req.params;
  const beitraege = loadBeitraege();
  const idx = beitraege.findIndex(a => String(a.id) === String(id));

  if (idx === -1) {
    return res.status(404).json({ message: "Beitrag nicht gefunden" });
  }

  beitraege[idx] = {
    ...beitraege[idx],
    ...req.body,
    id: beitraege[idx].id, 
  };

  saveBeitraege(beitraege);
  res.json(beitraege[idx]);
}));

app.delete("/api/beitraege/:id", AUTHENTICATED, safeHandler((req, res) => {
  const { id } = req.params;
  let beitraege = loadBeitraege();
  const before = beitraege.length;

  beitraege = beitraege.filter(a => String(a.id) !== String(id));

  if (beitraege.length === before) {
    return res.status(404).json({ message: "Beitrag nicht gefunden" });
  }

  saveBeitraege(beitraege);
  res.json({ message: "Beitrag gelöscht", id });
}));




app.get("/uploads", asyncHandler((req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Lesen der Dateien" });
  }
}));

app.post("/uploads", AUTHENTICATED, upload.single("file"), safeHandler((req, res) => {

  if (!req.file) return res.status(400).json({ error: "Keine Datei hochgeladen" });

  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });

}));

app.delete("/uploads/:filename", AUTHENTICATED, asyncHandler((req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);

  try {
    fs.rmSync(filePath);
    res.json({ message: "Datei gelöscht" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Fehler beim Löschen der Datei" });
  }

}));




app.get("/api/stats", AUTHENTICATED, safeHandler((req, res) => {
  res.json(getStats());
}));


app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", safeHandler((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
}));


const options = {
  key: fs.readFileSync("./certificates/key.pem"),        // privater Schlüssel
  cert: fs.readFileSync("./certificates/cert.pem"),      // Zertifikat
};

https.createServer(options, app).listen(443, "0.0.0.0", () => {
  console.log("HTTPS-Server läuft auf https://localhost:443");
});
