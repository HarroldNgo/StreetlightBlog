import { Link, useLocation } from "react-router-dom"
import "../css/header.css"
import { useEffect, useState } from "react"
import Modal from "./PopUp"
import { DarkModeToggle } from './DarkModeToggle'
import { useDarkMode } from "../useHooks/useDarkMode";

export default function Header() {
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const { isDark } = useDarkMode();

    return (
        <div className="header">
            <div className="socials">
                <a href="https://www.instagram.com/streetlightblog/" target="_blank" rel="noopener noreferrer"><img src='/assets/insta.png' style={isDark ? { filter: 'invert(100%)' } : { filter: 'none' }} alt="instagram" /></a>
            </div>
            <div className="title">
                <div className="darkmode-wrapper">
                    <DarkModeToggle />
                </div>
                <div className="bars-wrapper">
                    <Link><img src="/assets/fontbarc.webp" style={isDark ? { filter: 'invert(100%)' } : { filter: 'none' }} alt="nav-bars" className="bars" onClick={() => setOpenModal(true)} /></Link>
                </div>
                <Link to="/"><img className="titlelogo" src={isDark ? "/assets/mobile-titledarkmode.webp" : "/assets/mobile-titlelightmode.webp"} alt="titlelogo" /></Link>
                <Link to="/"><h1 className="titletext">TREETLIGHT</h1></Link>

            </div>
            <Modal DarkMode={isDark} open={openModal} onClose={() => setOpenModal(false)} />
            <div className="nav">
                {location.pathname === '/' ?
                    <div className="latest-wrap">
                        <p className="latest">FEATURED</p>
                    </div> : <div className="latest-wrap" style={{ opacity: 0 }}>
                        <p className="latest">FEATURED</p>
                    </div>
                }
                <ul>
                    <li><Link className={"nav-option " + (isDark ? "darkhov" : "")} to="/">HOME</Link></li>
                    <li className="cats"><Link className={"nav-option " + (isDark ? "darkhov" : "")} to="/categories">CATEGORIES</Link></li>
                    <li><a className={"nav-option " + (isDark ? "darkhov" : "")} href="/portfolio">PORTFOLIO</a></li>
                    <li><Link className={"nav-option " + (isDark ? "darkhov" : "")} to="/about">ABOUT</Link></li>
                </ul>
            </div>
        </div>
    )
}
