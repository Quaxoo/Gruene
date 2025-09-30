import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import "./TerminPage.css"

import SeoIndex from '../SEO/SeoIndex';


const Termin = () => {
    const { id } = useParams();
    const [termin, setTermin] = useState(null);

    async function loadTermin() {
        try {
        const res = await fetch("/api/termine/"+id, {
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            setTermin(data);
        } else {
        }
        } catch {
        }
    }

    useEffect(() => {
        loadTermin();
    });

    const SEO = () => {

        function extractSEO(htmlString) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, "text/html");

            let description = doc.body.textContent || "Neuen Termin von Gudrun Hackl-Stoll jetzt ansehen! - Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn";

            description = description.trim();

            if (description.length > 150) {
                let cutIndex = description.lastIndexOf(" ", 150);
                if (cutIndex === -1) cutIndex = 150;
                description = description.slice(0, cutIndex) + "…";
            }

            const firstImg = doc.querySelector("img")?.getAttribute("src") || "/logo512.png";

            return {
                description,
                image: firstImg,
            };
        }

        const content = extractSEO(termin.text)


        return (
            <SeoIndex title={termin.title} description={content.description} previewImage={content.image}/>
        )
    }

    if(termin){
        return ( 
            <>
                <SEO/>
                <div className='termin-page'>
                    <h1>{termin.title}</h1>

                    <div className='wrapper'>
                        <div className='termin-content' dangerouslySetInnerHTML={{ __html: termin.text }}></div>    

                        <div className='termin-info'>

                        <p className='weekday'>
                                {termin.startDate &&
                                new Date(termin.startDate).toLocaleString("de-DE", {
                                    weekday: "long"
                                })}   
                        </p>

                        <p className='date'>
                            {termin.startDate &&
                                    new Date(termin.startDate).toLocaleString("de-DE", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                            })}  
                        </p>

                        <p className='time'>
                            {termin.startDate &&
                                        new Date(termin.startDate).toLocaleString("de-DE", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                    }
                            {" - "}
                            {termin.endDate &&
                                        new Date(termin.endDate).toLocaleString("de-DE", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                            }
                            {" Uhr"}
                        </p>

                        <p className='data'>
                            {termin.location && <>{termin.location} <br/></>}
                            {termin.address && <>{termin.address} <br/></>}
                            {termin.link && <>{termin.link} <br/></>}
                        </p>
                    
                        </div>
                    </div>  

                </div>
            </>
        );
    }else{
        return(
            <div className='termin-page-placeholder'>
                <div className='termin-content-placeholder'>
                    <span className='heading placeholder'/>

                    <div className='termin-info-placeholder mobile-ti'></div>

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

                <div className='termin-info-placeholder desktop-ti'>

                </div>
            </div>
        )
    }
}
 
export default Termin;