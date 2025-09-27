import React from 'react'
import {Link} from "react-router-dom"

import "./NotFound.css"
import Logo from '../Logo';

const NotFound = () => {
    return ( 
        <section className='not-found'>
            <h1 className='gruene-font'>Hoppla, Seite nicht gefunden.</h1>
            <Link to={"/"}><span>←</span> Startseite</Link>
            <Logo/>
        </section> 
    );
}
 
export default NotFound;