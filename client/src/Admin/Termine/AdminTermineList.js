import React, { useState, useEffect } from 'react'

import "../../Termine/TermineList.css"
import AdminTerminPreview from './AdminTerminPreview';

const AdminTermineList = ({max = -1}) => {

    const [termine, setTermine] = useState(null)

    async function loadTermine() {
        try {
        const res = await fetch("/api/termine", {
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            if(max > 0){
                setTermine(data.splice(0, 3))
            }else{
                setTermine(data);
            }
        }
        } catch {
            
        }
    }

    useEffect(() => {
        loadTermine();
    });

    return ( 
        <div className='termine-list'>
            {termine ? 
                termine.map(termin => (
                    <AdminTerminPreview termin={termin} key={termin.id}/>
                ))
            :
                <p className='none'>Keine Veranstaltungen geplant</p>
            }
        </div> 
    );
}
 
export default AdminTermineList;