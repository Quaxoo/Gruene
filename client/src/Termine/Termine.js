import React from 'react'

import "./Termine.css"
import TermineList from './TermineList';

import SeoIndex from '../SEO/SeoIndex';

const Termine = () => {
    return ( 
        <>
            <SeoIndex title={"Termine - Gudrun Hackl-Stoll"} description={"Alle Termine von Gudrun Hackl-Stoll - Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn"}/>

            <div className='termine-overview'>
                <h1 className='gruene-font'>Nächste Termine</h1>
                <TermineList/>
            </div>
        </>    
    );
}
 
export default Termine;