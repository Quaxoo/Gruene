import React from 'react'
import { Link } from 'react-router-dom';

import {ReactComponent as Mail} from "../assets/icons/mail.svg"

import "./Footer.css"

const Footer = () => {
    return ( 
        <footer>
            <div className='links'>
                <div className='social'>
                    <a className='icon' href='https://www.instagram.com/gudrun.hackl.stoll.gruene/' target='_blank'>
                        <svg viewBox="-3.2 -3.2 38.40 38.40" xmlns="http://www.w3.org/2000/svg" stroke="inherit" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" stroke="#CCCCCC"></g><g id="SVGRepo_iconCarrier"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"></path><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"></path></g></svg>
                    </a>
                    <div className='mail'>
                        <Mail/>
                        <Link to={"mailto:gudrun.hackl-stoll@gmx.de"}>gudrun.hackl-stoll@gmx.de</Link>
                    </div>
                </div>

                <div className='legal'>
                    <Link to={"/impressum"}>Impressum</Link>
                    <Link to={"/datenschutz"}>Datenschutzerklärung</Link>
                </div>
            </div>

            <span/>

            <div className='credit'>
                <p>Webseite erstellt von <a href='mailto:max@van-kemena.de'>Max van Kemenade</a></p>
                <img src='./images/logo-diegruenen.webp' alt='Logo Bündnis 90 / die Grünen'/>
            </div>
        </footer>
    );
}
 
export default Footer;