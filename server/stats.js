import fs, { stat } from "fs";
import path from "path";
import crypto from "crypto";
import geoip from "geoip-lite";


const logFile = path.join(process.cwd(), "stats.json");


function loadStats() {
  if (!fs.existsSync(logFile)) {
    return { hashedIps: [], perDay: {}, perCity: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(logFile, "utf8"));
  } catch {
    return { hashedIps: [], perDay: {}, perCity: {} };
  }
}

function saveStats(stats) {
  fs.writeFileSync(logFile, JSON.stringify(stats, null, 2));
}

function hashIp(ip) {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export function logVisitor(ip) {
  const stats = loadStats();
  const hashed = hashIp(ip);

  if (stats.hashedIps.includes(hashed)) {
    return;
  }

  stats.hashedIps.push(hashed);
  stats.total = (stats.total || 0) + 1;

  const day = new Date().toISOString().slice(0, 10);
  stats.perDay[day] = (stats.perDay[day] || 0) + 1;

  const geo = geoip.lookup(ip);
  const city = geo?.city || geo?.region || geo?.country || "Unknown";
  stats.perCity[city] = (stats.perCity[city] || 0) + 1;

  saveStats(stats);
}

export function getStats() {
  const stats = loadStats()

  return {total: stats.total, perDay: stats.perDay, perCity: stats.perCity};
}