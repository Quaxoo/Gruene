import React from 'react'
import BeitraegeList from './BeitraegeList';

import "./Beitraege.css"

const Beitraege = () => {
    return ( 
        <div className='beitraege-overview'>
            <h1 className='gruene-font'>Aktuelles</h1>
            <BeitraegeList/>
        </div>    
    );
}
 
export default Beitraege;