import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Create.css";
import Editor from "../Editor/Editor";

export default function Edit() {
  const { id } = useParams();
  const editorRef = useRef(null);

  const [termin, setTermin] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  async function loadTermine() {
    try {
      const res = await fetch("/api/termine/"+id, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTermin(data);
      } else {
        setError("Fehler beim Laden");
      }
    } catch {
      setError("Server nicht erreichbar");
    }
  }

  useEffect(() => {
    loadTermine();
  }, []);

  function handleChange(e) {
    setTermin({ ...termin, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let htmlContent = "";

    if (editorRef.current) {
      htmlContent = editorRef.current.getContent();
    }

    const newTermin = { ...termin, text: htmlContent };

    try {

      const res = await fetch("/api/termine/"+id, {
        method: "PUT",
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

  if(termin){
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
                            value={termin.title}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="datetime-local"
                            name="startDate"
                            value={termin.startDate}
                            onChange={handleChange}
                        />

                        <input
                            type="datetime-local"
                            name="endDate"
                            value={termin.endDate}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Ort"
                            value={termin.location}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Adresse"
                            value={termin.address}
                            onChange={handleChange}
                        />

                        <input
                            type="url"
                            name="link"
                            placeholder="Link"
                            value={termin.link}
                            onChange={handleChange}
                        />

                      <button className="submit" type="submit">Speichern</button>

                  </form>

                  <Editor ref={editorRef} page={termin.text}/>
                </div>
        </div>
    );
  }else{
    return(
        <h1>{error && <p>{error}</p>}</h1>
    )
  }

}
