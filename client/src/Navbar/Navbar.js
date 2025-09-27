import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css";
import Logo from '../Logo';

import { ReactComponent as Menu } from "../assets/icons/menu.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const toggle = () => {
        setOpen(!open);
    };

    // Schließen, wenn außerhalb geklickt wird
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    // Menü schließen beim Klick auf einen Link
    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <>
            <nav className='desktop'>
                <div className='wrapper'>
                    <div className='nav-section logo'>
                        <Logo/>
                        <p>B90 / DIE GRÜNEN</p>
                    </div>

                    <div className='nav-section links'>
                        <Link to="/">Über Mich</Link>
                        <Link to="/termine">Termine</Link>
                        <Link to="/aktuelles">Aktuelles</Link>
                        <Link target='_blank' to="https://gruene-hksbr.de/">Grüne Höhenkirchen-Siegertsbrunn</Link>
                    </div>
                </div>

                <div className='wrapper'>
                    <Link to="/kontakt" className='nav-section contact'>Kontakt</Link>
                </div>
            </nav> 

            <nav className='mobile'>
                <div className='wrapper'>
                    <div className='nav-section logo'>
                        <Logo/>
                        <p>B90 / DIE GRÜNEN</p>
                    </div>
                </div>

                <div ref={menuRef} className={`menu ${open && "open"}`}>
                        <div className='hamburger' onClick={toggle}>
                            {!open && <Menu/>}
                            {open && <Close/>}
                        </div>

                    <div className='options'>
                        <Link to="/" onClick={handleLinkClick}>Über Mich</Link>
                        <Link to="/termine" onClick={handleLinkClick}>Termine</Link>
                        <Link to="/aktuelles" onClick={handleLinkClick}>Aktuelles</Link>
                        <Link target='_blank' to="https://gruene-hksbr.de/" onClick={handleLinkClick}>Grüne Höhenkirchen-Siegertsbrunn</Link>
                        <Link to="/kontakt" onClick={handleLinkClick}>Kontakt</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
