import React from 'react'

import "./Kontakt.css"

import {ReactComponent as Mail} from "../assets/icons/mail.svg"
import {ReactComponent as Phone} from "../assets/icons/phone.svg"

import SeoIndex from '../SEO/SeoIndex'

const Kontakt = () => {
    return ( 
        <>
            <SeoIndex title={"Kontakt - Gudrun Hackl-Stoll"} description={"Tritt in Kontakt mit Gudrun Hackl-Stoll - Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn"}/>
            
            <section className='kontakt'>
                <div className='wrapper'>
                <h1 className='gruene-font'>Kontakt</h1>
                <p className='q'>Hast Du Fragen, Ideen oder möchtest einfach mit mir ins Gespräch kommen? <br/> Ich freue mich sehr, von Dir zu hören!</p>

                <p className='c'>
                    <Mail/>
                    <a href='mailto:gudrun.hackl-stoll@gmx.de'>gudrun.hackl-stoll@gmx.de</a>
                    <br/>
                </p>

                <p className='c'>
                    <Phone/>
                    <a href='tel:081028019990'>08102 8019990</a>
                </p>

                <p className='a'>Gemeinsam können wir unsere Gemeinde gestalten - ich bin gespannt auf Deine Nachricht!</p>
                </div>
            </section>
        </>
    );
}
 
export default Kontakt;