import React from 'react'

import "./legal.css"

const Impressum = () => {
    return (  
        <div className='impressum'>
            <h1 className='gruene-font'>Impressum</h1>
            <p>Bündnis 90/Die Grünen Kreisverband München-Land</p>
            <p>c/o Gudrun Hackl-Stoll, Ortsverband Höhenkirchen-Siegertsbrunn</p>
            <p>Franziskanerstraße 14</p>
            <p>81669 München</p>
            <p>E-Mail: <a href='mailto:gudrun.hackl-stoll@gmx.de'>gudrun.hackl-stoll@gmx.de</a></p>
            <p>Tel.: <a href='tel:081028019990'>08102 8019990</a></p>
        </div>
    );
}
 
export default Impressum;