// Regular imports
import React from "react";
// Image imports
import Github from "./img/github_logo.svg";
import Instagram from "./img/instagram_logo.svg";
import LinkedIn from "./img/linkedin_logo.svg";
import Twitter from "./img/twitter_logo.svg";
import YouTube from "./img/youtube_logo.svg";
// CSS imports
import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="social-links" aria-label="Social Links">
                <h3 className="list-heading">Social Links</h3>
                <ul className="social-link-list" role="list">
                    <li className="twitter">
                        <a href="https://www.twitter.com/AdamGaffney96" target="_blank" rel="noreferrer"><img src={Instagram} alt="Twitter" className="twitter-img" aria-label="Adam's Twitter (Opens In New Tab)"/></a>
                    </li>
                    <li className="instagram">
                        <a href="https://www.instagram.com/gaffers1996/" target="_blank" rel="noreferrer"><img src={LinkedIn} alt="Instagram" className="instagram-img" aria-label="Adam's Instagram (Opens In New Tab)"/></a>
                    </li>
                    <li className="youtube">
                        <a href="https://www.youtube.com/channel/UCDAt359qpRgchTVXMuOY5rg" target="_blank" rel="noreferrer"><img src={Twitter} alt="Youtube" className="youtube-img" aria-label="Adam's YouTube (Opens In New Tab)"/></a>
                    </li>
                    <li className="linkedin">
                        <a href="https://uk.linkedin.com/in/adam-gaffney-b3b8a191" target="_blank" rel="noreferrer"><img src={YouTube} alt="LinkedIn" className="linkedin-img" aria-label="Adam's LinkedIn (Opens In New Tab)"/></a>
                    </li>
                    <li className="github">
                        <a href="https://github.com/AdamGaffney96" target="_blank" rel="noreferrer"><img src={Github} alt="Github" className="github-img" aria-label="Adam's Github (Opens In New Tab)"/></a>
                    </li>
                </ul>
            </div>
            <div className="other-links" aria-label="Secondary">
                <div className="link-container">
                    <h3 className="list-heading">Information</h3>
                    <ul className="other-link-list" role="list">
                        <li className="about">
                            <a href="#" target="_blank" rel="noreferrer">About Me</a>
                        </li>
                        <li className="contact">
                            <a href="#" target="_blank" rel="noreferrer">Contact Me</a>
                        </li>
                        <li className="faq">
                            <a href="#" target="_blank" rel="noreferrer">FAQ's</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p><span style={{paddingRight: "0.25rem"}} className="copyright-symbol">&copy;</span>Adam Gaffney, 2022-2022</p>
            </div>
        </footer>
    )
}