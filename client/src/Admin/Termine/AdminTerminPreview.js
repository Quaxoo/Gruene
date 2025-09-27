import React from 'react'
import { useNavigate } from "react-router-dom";

import "./AdminTerminPreview.css"

const AdminTerminPreview = ({termin, ...props}) => {
    const navigate = useNavigate();

    function truncateText(text, maxLength = 210) {
        if (text.length <= maxLength) return text;

        // Alles bis zum Limit nehmen
        let shortened = text.slice(0, maxLength);

        // Letzten "sinnvollen" Trenner suchen (Leerzeichen oder Satzzeichen)
        const lastIndex = shortened.search(/[\s,.!?;:]+(?=[^,\s.!?;:]*$)/);

        if (lastIndex !== -1) {
            shortened = shortened.slice(0, lastIndex).trim();
        }

        return shortened.concat(" [...]");
    }

    function createPreview(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        doc.querySelectorAll("img").forEach(img => img.remove());

        let text = doc.body.textContent || "";

        return truncateText(text);
    }

    async function handleDelete(id) {
        if (!window.confirm("Diesen Termin wirklich löschen?")) return;
        try {
        const res = await fetch(`/api/termine/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.ok) {
            // setAppointments(appointments.filter(a => a.id !== id));
        } else {
            // setError("Löschen fehlgeschlagen");
        }
        } catch {
            // setError("Server nicht erreichbar");
        }
    }

    return ( 
        <div className='admin-termin-preview' to={"/termin/" + termin.id} {...props}>

            <p className='weekday'>
                {termin.startDate &&
                    new Date(termin.startDate).toLocaleString("de-DE", {
                                weekday: "long"
                    })
                }   
            </p>

            {termin.startDate && 

                <time dateTime={termin.startDate}>

                    {termin.startDate &&
                        new Date(termin.startDate).toLocaleString("de-DE", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })
                    }   

                    <span className='time'>

                        {termin.startDate &&
                            new Date(termin.startDate).toLocaleString("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                        }
                                   
                        {termin.endDate &&
                            <>
                                {" - "}
                                {new Date(termin.endDate).toLocaleString("de-DE", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </>
                        }

                        {" Uhr"}
                    </span>

                </time>
            }  

            <hr/>

            {termin.title && <h2>{termin.title}</h2>}
            {termin.text && <p className='content'>{createPreview(termin.text)}</p>}

            <div className='action-buttons'>
                <button onClick={() => navigate(`/admin/termine/bearbeiten/${termin.id}`)}> Bearbeiten </button>
                <button onClick={() => handleDelete(termin.id)}> Löschen </button>
            </div>
        </div>
    );
}
 
export default AdminTerminPreview;