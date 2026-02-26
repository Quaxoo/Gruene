import React from 'react'
import { Link } from 'react-router-dom';

import "./TerminPreview.css"

const TerminPreview = ({termin, ...props}) => {

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

    return ( 
        <Link className='termin-preview' to={"/termin/" + termin.id} {...props}>

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

        </Link> 
    );
}
 
export default TerminPreview;