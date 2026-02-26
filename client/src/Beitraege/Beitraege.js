import React from 'react'
import BeitraegeList from './BeitraegeList';

import "./Beitraege.css"

import SeoIndex from '../SEO/SeoIndex';

const Beitraege = () => {
    return ( 
        <>
            <SeoIndex title={"Aktuelles - Gudrun Hackl-Stoll"} description={"Alle aktuellen Infos und Beiträge zu Gudrun Hackl-Stoll - Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn"}/>

            <div className='beitraege-overview'>
                <h1 className='gruene-font'>Aktuelles</h1>
                <BeitraegeList/>
            </div> 
        </>   
    );
}
 
export default Beitraege;