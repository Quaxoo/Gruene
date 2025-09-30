import React, { useState, useEffect } from 'react'
import TerminPreview from './TerminPreview';

import "./TermineList.css"

const TermineList = ({max = -1}) => {

    const [termine, setTermine] = useState("loading")

    async function loadTermine() {
        try {
        const res = await fetch("/api/termine", {
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            if(max > 0){
                setTermine(data.splice(0, max))
            }else{
                setTermine(data);
            }
        }else{
            setTermine([])
        }
        } catch {
            setTermine([])
        }
    }

    const TerminPlaceholder = () => {
        return(
            <div className='termin-placeholder'>
                <span className='weekday placeholder'/>

                <div>
                    <span className='date placeholder'/>
                    <span className='time placeholder'/>
                </div>
                
                <hr/>

                <span className='title-1 placeholder'/>
                <span className='title-2 placeholder'/>

                <span className='paragraph placeholder'/>
                <span className='paragraph placeholder'/>
                <span className='paragraph placeholder'/>
                <span className='paragraph placeholder'/>
                <span className='paragraph placeholder'/>
                <span className='paragraph placeholder'/>
                <span className='paragraph placeholder'/>
            </div>
        );
    }

    useEffect(() => {
        loadTermine();
    });

    return ( 
        <div className='termine-list'>
            {termine === "loading" ? 
                <div className='termine-list'>
                    <TerminPlaceholder/>
                    <TerminPlaceholder/>
                    <TerminPlaceholder/>
                </div>
            : termine.length > 0 ?
                termine.map(termin => (
                    <TerminPreview termin={termin} key={termin.id}/>
                ))

            :
                <p className='none'>Keine Veranstaltungen geplant</p>
            }
        </div> 
    );
}
 
export default TermineList;