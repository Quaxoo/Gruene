import React from 'react'
import { useNavigate } from "react-router-dom";

import "./AdminBeitragPreview.css"

const AdminBeitragPreview = ({beitrag, ...props}) => {
    const navigate = useNavigate();

    function truncateText(text, maxLength = 250) {
        if (text.length <= maxLength) return text;

        let shortened = text.slice(0, maxLength);

        const lastIndex = shortened.search(/[\s,.!?;:]+(?=[^,\s.!?;:]*$)/);

        if (lastIndex !== -1) {
            shortened = shortened.slice(0, lastIndex).trim();
        }

        return shortened.concat(" [...]");
    }

    function createPreview(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        const firstImg = doc.querySelector("img");
        let imgSrc = null;
        if (firstImg) {
            imgSrc = firstImg.getAttribute("src");
            firstImg.remove();
        }

        let text = doc.body.textContent || "";
        text = truncateText(text);

        return { imgSrc, text };
    }

    async function handleDelete(id) {
        if (!window.confirm("Diesen Beitrag wirklich löschen?")) return;
        try {
        const res = await fetch(`/api/beitraege/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.ok) {

        } else {

        }
        } catch {

        }
    }

    return ( 
        <div className='admin-beitrag-preview' to={"/beitrag/" + beitrag.id} {...props}>

            {beitrag.content && (() => {
                const { imgSrc} = createPreview(beitrag.content);
                return (
                     <>
                        {imgSrc && <img src={imgSrc} alt="Preview" className="preview-image" />}
                    </>
                );
            })()}

            <div className='text'>
                {beitrag.title && <h2>{beitrag.title}</h2>}

                <p className='date'>
                    {beitrag.date &&
                        new Date(beitrag.date).toLocaleString("de-DE", {
                            day: "2-digit", 
                            month: "long", 
                            year: "numeric"
                        })
                    }   
                </p>

                {beitrag.content && (() => {
                    const { text } = createPreview(beitrag.content);
                    return (
                        <>
                            <p className="content">{text}</p>
                        </>
                    );
                })()}
            </div>

            <div className='action-buttons'>
                <button onClick={() => navigate(`/admin/beitraege/bearbeiten/${beitrag.id}`)}> Bearbeiten </button>
                <button onClick={() => handleDelete(beitrag.id)}> Löschen </button>
            </div>
        </div>
    );
}
 
export default AdminBeitragPreview;