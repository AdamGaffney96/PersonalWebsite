// Regular imports
import React from "react";
import {
    Link
} from "react-router-dom";
// Image imports
import Logo from "./img/Logo Transparent.png";
// CSS imports
import "./Nav.css";

export default function Nav() {
    return (
            <nav>
                <div className="main-logo">
                    <Link to="/"><img src={Logo} alt="Company Logo" className="logo-img" /></Link>
                </div>
                <ul className="nav-list" role="list" aria-label="Primary">
                        <li className="nav-item home-button"><Link to="/">Home</Link></li>
                        <li className="nav-item"><Link to="/Projects">Projects</Link></li>
                        <li className="nav-item"><Link to="/Chess">Chess</Link></li>
                        <li className="nav-item"><Link to="/Sudoku">Sudoku</Link></li>
                </ul>
                <div className="options-container">
                    <div className="light-dark-button">
                        <div className="light-dark-container">
                            <div className="light-dark-selector">
                                <svg fill="#f7f7f7" viewBox="0 0 20 20" className="light-dark-svg sun">
                                    <circle cx="10" cy="10" r="4"></circle>
                                    <rect width="2" height="4" x="9" y="1"></rect>
                                    <rect width="2" height="4" x="9" y="-5" transform="rotate(90)"></rect>
                                    <rect width="2" height="4" x="9" y="-19" transform="rotate(90)"></rect>
                                    <rect width="2" height="4" x="9" y="15"></rect>
                                    <rect width="2" height="4" x="13" y="-9" transform="rotate(45)"></rect>
                                    <rect width="2" height="4" x="-1" y="5" transform="rotate(-45)"></rect>
                                    <rect width="2" height="4" x="13" y="5" transform="rotate(45)"></rect>
                                    <rect width="2" height="4" x="-1" y="19" transform="rotate(-45)"></rect>
                                </svg>
                                <svg fill="#1d1e25" viewBox="0 0 20 20" className="light-dark-svg moon">
                                    <circle cx="10" cy="10" r="9"/>
                                    <circle cx="7" cy="10" r="7" fill="#f7f7f7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}