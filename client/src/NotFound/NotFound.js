import React from 'react'
import {Link} from "react-router-dom"

import "./NotFound.css"
import Logo from '../Logo';
import SeoIndex from '../SEO/SeoIndex';


const NotFound = () => {
    return ( 
        <>
            <SeoIndex title={"Seite nicht gefunden - Gudrun Hackl-Stoll"} description={"Seite nicht gefunden - Gudrun Hackl-Stoll - Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn"}/>
         
            <section className='not-found'>
                <h1 className='gruene-font'>Hoppla, Seite nicht gefunden.</h1>
                <Link to={"/"}><span>←</span> Startseite</Link>
                <Logo/>
            </section> 
        </>
    );
}
 
export default NotFound;