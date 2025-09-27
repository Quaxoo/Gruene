import React from 'react'

import "./Termine.css"
import TermineList from './TermineList';

const Termine = () => {
    return ( 
        <div className='termine-overview'>
            <h1 className='gruene-font'>Nächste Termine</h1>
            <TermineList/>
        </div>    
    );
}
 
export default Termine;