import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./CreateBeitrag.css";
import Editor from "../Editor/Editor";

export default function EditBeitrag() {
  const editorRef = useRef(null);
  const { id } = useParams();

  const [beitrag, setBeitrag] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loadBeitrag() {
    try {
      const res = await fetch("/api/beitraege/"+id, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBeitrag(data);
      } else {
        setError("Fehler beim Laden");
      }
    } catch {
      setError("Server nicht erreichbar");
    }
  }

  useEffect(() => {
    loadBeitrag();
  });

  function handleChange(e) {
    setBeitrag({ ...beitrag, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let htmlContent = "";

    if (editorRef.current) {
      htmlContent = editorRef.current.getContent();
    }

    const newBeitrag = { ...beitrag, content: htmlContent };

    try {

      const res = await fetch("/api/beitraege/"+id, {
        method: "PUT",
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

  if(beitrag){
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
                value={beitrag.title}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="date"
                id="date"
                value={beitrag.date}
                onChange={handleChange}
              />


            <button className="submit" type="submit">Speichern</button>

          </form>

          <Editor ref={editorRef}/>

        </div>

      </div>
    );
  }else{
    return(
        <h1>{error && <p>{error}</p>}</h1>
    )
  }
}
