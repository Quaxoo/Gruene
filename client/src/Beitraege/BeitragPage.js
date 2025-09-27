import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import "./BeitragPage.css"


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
    }, []);

    if(beitrag){
        return ( 
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