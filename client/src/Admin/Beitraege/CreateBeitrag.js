import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateBeitrag.css";
import Editor from "../Editor/Editor";

export default function CreateBeitrag() {
  const editorRef = useRef(null);

  const [form, setForm] = useState({
    date: "",
    title: "",
    content: "", 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let htmlContent = "";

    if (editorRef.current) {
      htmlContent = editorRef.current.getContent();
    }

    const newBeitrag = { ...form, content: htmlContent };

    try {
      const res = await fetch("/api/beitraege", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBeitrag),
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
    <div className="create-beitrag">

      <div className="head">
        <button onClick={() => navigate("/admin")}>←</button>
        <h2 className="gruene-font">Neuen Beitrag erstellen</h2>
        {error && <p>{error}</p>}
      </div>

      <div className="form">

        <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Titel*"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              id="date"
              value={form.date}
              onChange={handleChange}
            />


          <button name="submit" className="submit" type="submit">Speichern</button>

        </form>

        <Editor ref={editorRef}/>

      </div>

    </div>
  );
}
