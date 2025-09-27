import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Create.css";
import Editor from "../Editor/Editor";

export default function Create() {
  const editorRef = useRef(null);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    title: "",
    text: "", 
    location: "",
    address: "",
    link: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function checkAuthenticated() {
    try {
      const res = await fetch("/api/authenticated", {
        credentials: "include",
      });

      if (res.status === 403) {
        navigate("/login");
      }
    } catch {
      setError("Server nicht erreichbar");
    }
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let htmlContent = "";

    if (editorRef.current) {
      htmlContent = editorRef.current.getContent();
    }

    const newTermin = { ...form, text: htmlContent };

    try {
      const res = await fetch("/api/termine", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTermin),
      });

      if (res.ok) {
        navigate("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Fehler beim Anlegen");
      }
    } catch (err) {
      setError("Server nicht erreichbar");
    }
  }

  return (
    <div className="create">

      <div className="head">
        <button onClick={() => navigate("/admin")}>←</button>
        <h2 className="gruene-font">Neuen Termin anlegen</h2>
        {error && <p>{error}</p>}
      </div>

      <div className="form">

        <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Titel*"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Ort"
              value={form.location}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={form.address}
              onChange={handleChange}
            />

            <input
              type="url"
              name="link"
              placeholder="Link"
              value={form.link}
              onChange={handleChange}
            />

          <button className="submit" type="submit">Speichern</button>

        </form>

        <Editor ref={editorRef}/>

      </div>

    </div>
  );
}
