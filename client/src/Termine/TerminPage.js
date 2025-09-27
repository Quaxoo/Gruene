import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import "./TerminPage.css"

import Logo from "../Logo"

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
    }, []);

    if(termin){
        return ( 
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