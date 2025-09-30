import React, { useState, useEffect } from 'react'

import "../../Beitraege/BeitraegeList.css"
import AdminBeitragPreview from './AdminBeitragPreview';

const AdminBeitraegeList = ({max = -1}) => {

    const [beitraege, setBeitraege] = useState(null)

    async function loadBeitraege() {
        try {
        const res = await fetch("/api/beitraege", {
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            if(max > 0){
                setBeitraege(data.splice(0, 3))
            }else{
                setBeitraege(data);
            }
        }
        } catch {
            
        }
    }

    useEffect(() => {
        loadBeitraege();
    });

    return ( 
        <div className='beitraege-list'>
            {beitraege ? 
                beitraege.map(beitrag => (
                    <AdminBeitragPreview beitrag={beitrag} key={beitrag.id}/>
                ))
            :
                <p className='none'>Keine Beiträge vorhanden</p>
            }
        </div> 
    );
}
 
export default AdminBeitraegeList;