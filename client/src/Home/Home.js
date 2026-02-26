import React from 'react'
import {Link} from "react-router-dom"

import Logo from '../Logo';
import InstagramEmbed from './InstagramEmbed';

import {ReactComponent as Klima} from "../assets/icons/klima.svg"
import {ReactComponent as Finanzen} from "../assets/icons/finanzen.svg"
import {ReactComponent as Transparenz} from "../assets/icons/transparenz.svg"
import {ReactComponent as Verkehr} from "../assets/icons/verkehr.svg"
import {ReactComponent as Generationen} from "../assets/icons/generationen.svg"


import "./Home.css"
import TermineList from '../Termine/TermineList';
import SeoIndex from '../SEO/SeoIndex';

const Home = () => {
    return ( 
        <>
            <SeoIndex title={"Gudrun Hackl-Stoll"} description={"Hier fürs wir! Gudrun Hackl-Stoll ist Grüne Bürgermeisterkandidatin 2026 in Höhenkirchen-Siegertsbrunn"}/>

            <section className='home'>
                
                <div className='image-container'>
                    <Logo/>
                    <img src="./images/gudrun-hackl-stoll.webp" alt='Bild von Gudrun Hackl-Stoll'></img>
                </div>

                <div className='wrapper'>

                    <div className='text'>

                        <div>
                            <h1 className='gruene-font'>Gudrun Hackl-Stoll</h1>
                            <h2 className='gruene-font'>Bündnis 90/ die Grünen</h2> 
                            <h3>Bürgermeisterkandidatin 2026</h3> 
                            <h4>Höhenkirchen-Siegertsbrunn</h4>
                        </div>

                        <div className='test'>

                            <div>
                                <p>Ergotherapeutin</p>
                                <p>Lehrkraft</p>
                                <p>Mama</p>  
                            </div>

                            <span/>

                            <div>
                                <p>Gemeinderätin</p>
                                <p>3. Bürgermeisterin</p>
                                <p>Co-Fraktionsvorsitzende</p>
                                <p>Kreisrätin</p>
                            </div>
                        </div>

                        <div className='txt'>
                            <h4 className='gruene-font'>Über Mich</h4>
                            <p>Ich lebe schon immer in der Gemeinde Höhenkirchen-Siegertsbrunn, ich bin hier geboren, aufgewachsen und fest verwurzelt. Engagement auf vielen Ebenen zieht sich durch mein gesamtes Leben. Sei es als Schulsprecherin, im Berufsverband, der Gewerkschaft, in der Zwergerlstube oder im Elternbeirat und seit 2002 bei den Grünen.</p>
                            <p>Hier im Ortsverband habe ich schon verschiedenste Funktionen innegehabt: Schriftführerin, Kassiererin und viele Jahre als Sprecherin des Ortsverbandes. Seit 2014 bin ich Gemeinderätin und Kreisrätin des Landkreises München. Zudem bin ich hier im Ort Seniorenbeauftragte und seit Mai 2025 3.Bürgermeisterin.</p>
                            <p>Ich möchte unsere Gemeinde auf ein solides finanzielles Fundament stellen, als Klimaschutzgemeinde weiterentwickeln und den Ort lebendiger gestalten. Bewährtes soll beibehalten, Neues etabliert werden. Verlässlichkeit, Zuhören und Anpacken gehören zu meinen Stärken.</p>
                            <p>Höhenkirchen-Siegertsbrunn ist eine Gemeinde mit hoher Lebensqualität, umgeben von Feldern und Wald, nahe an München. Aber wir können in vielen Bereichen noch besser werden: Daran will ich ab 2026 als Ihre Bürgermeisterin arbeiten!</p>
                            <img src='./images/signature.png'></img>
                        </div>
                        
                    </div>

                    <div className='slogan'>
                        <p className='gruene-font'>Von hier für hier</p>
                    </div>

                </div>

                
                <div className='promise gruene-font'>

                    <h4>Meine Ziele</h4>

                    <div className='wrapper'>
                        <div>
                            <Klima/>
                            <p>die Weiterentwicklung der <br/> Klimaschutzgemeinde</p>
                        </div>
                        <div>
                            <Finanzen/>
                            <p>nachhaltige <br/> Finanzen</p>
                        </div>
                        <div>
                            <Generationen/>
                            <p>eine lebenswerte Gemeinde <br/> für alle Generationen</p>
                        </div>
                        <div>
                            <Transparenz/>
                            <p>Transparenz und <br/> Bürgerbeteiligung</p>
                        </div>
                        <div>
                            <Verkehr/>
                            <p>sichere Nutzung des <br/> Straßenraums</p>
                        </div>
                    </div>
                    
                    <span className='shape1'/>
                    <span className='shape2'/>
                </div>
                
                <div className='termine'>
                    <h4 className='gruene-font'>Nächste Termine</h4>
                    <TermineList max={3}/>
                    <Link className='all' to="/termine">Alle Termine</Link>
                </div>


                <div className='instagram'>

                    <div className='container'>
                        <svg viewBox="-3.2 -3.2 38.40 38.40" xmlns="http://www.w3.org/2000/svg" stroke="inherit" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" stroke="#CCCCCC"></g><g id="SVGRepo_iconCarrier"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"></path><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"></path></g></svg>
                        <h4 className='gruene-font'>Bleibe auf dem Laufenden</h4>

                        <div className='profile'>
                            <Link to={'https://www.instagram.com/gudrun.hackl.stoll.gruene/'} target='_blank' rel="noreferrer" className='img-link'><img src='./images/profile-picture-instagram.webp' alt='Profilbild Gudrun Hackl-Stoll'></img> </Link>
                            <span/>

                            <Link to={'https://www.instagram.com/gudrun.hackl.stoll.gruene/'} rel="noreferrer" target='_blank' className='name'>
                                <p className='real'>Gudrun Hackl-Stoll</p>
                                <p className='user'>gudrun.hackl.stoll.gruene</p>  
                            </Link>

                            <a className='follow' href='https://www.instagram.com/gudrun.hackl.stoll.gruene/' rel="noreferrer" target='_blank'>Folgen</a>
                        </div>

                    </div>

                    <InstagramEmbed/>
                    <Logo/>
                </div>
                
            </section>
        </>
     );
}
 
export default Home;