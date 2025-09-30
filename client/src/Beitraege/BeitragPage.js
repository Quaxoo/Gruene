import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import "./BeitragPage.css"
import SeoIndex from '../SEO/SeoIndex';


const Beitrag = () => {
    const { id } = useParams();
    const [beitrag, setBeitrag] = useState(null);

    async function loadBeitrag() {
        try {
        const res = await fetch("/api/beitraege/"+id, {
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            setBeitrag(data);
        } else {
        }
        } catch {
        }
    }

    useEffect(() => {
        loadBeitrag();
    });

    const SEO = () => {

        function extractSEO(htmlString) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, "text/html");

            // --- Textinhalt nach der Überschrift finden ---
            let description = doc.body.textContent || "Neuen Beitrag von Gudrun Hackl-Stoll jetzt ansehen! - Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn";

            description = description.trim();

            // --- Kürzen auf max. 150 Zeichen, aber ohne Wort in der Mitte abzuschneiden ---
            if (description.length > 150) {
                let cutIndex = description.lastIndexOf(" ", 150);
                if (cutIndex === -1) cutIndex = 150;
                description = description.slice(0, cutIndex) + "…";
            }

            // --- Erstes Bild finden ---
            const firstImg = doc.querySelector("img")?.getAttribute("src") || "/logo512.png";

            return {
                description,
                image: firstImg,
            };
        }

        const content = extractSEO(beitrag.content)

        return (
            <SeoIndex title={beitrag.title} description={content.description} previewImage={content.image}/>
        )
    }

    if(beitrag){
        return ( 
            <>
                <SEO/>
                <div className='beitrag-page'>
                    <h1>{beitrag.title}</h1>

                    {beitrag.date && <p className='date'>
                            {new Date(beitrag.date).toLocaleString("de-DE", {
                                day: "2-digit", 
                                month: "long", 
                                year: "numeric"
                            })}
                    </p>} 

                    <div className='beitrag-content' dangerouslySetInnerHTML={{ __html: beitrag.content }}></div>    

                </div>
            </>
        );
    }else{
        return(
            <div className='beitrag-page-placeholder'>
                <div className='beitrag-content-placeholder'>
                    <span className='heading placeholder'/>
                    <span className='date placeholder'/>

                    <span className='paragraph placeholder'/>
                    <span className='paragraph placeholder'/>
                    <span className='paragraph placeholder'/>
                    <span className='paragraph placeholder'/>

                    <span className='gap'/>

                    <span className='paragraph placeholder'/>
                    <span className='paragraph placeholder'/>
                    <span className='paragraph placeholder'/>

                    <span className='gap'/>

                    <span className='paragraph placeholder'/>

                    <span className='gap'/>

                    <span className='paragraph placeholder'/>
                    <span className='paragraph placeholder'/>
                </div>
            </div>
        )
    }
}
 
export default Beitrag;