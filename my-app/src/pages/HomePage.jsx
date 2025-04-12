import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <nav>
                <div className="topnav">
                    <a className="active" href="#">Home</a>
                    <Link to="/Login.jsx">Log In/Sign Up</Link>
                </div>
            </nav>
            <header>
                <div className="intro-text">
                    <div id="side-text">
                        <h1>Hello! I'm Netra Thiru</h1>
                        <p>A computer science student from Fremont, CA currently studying at the University of Maryland</p>
                    </div>
                </div>
            </header>
            <main>
                <div id="about">
                    <h2>&nbsp; About Me &nbsp;</h2>
                    <hr style={{ width: "21%", textAlign: "center", borderWidth: "5px", color: "#8c5078" }} />
                    <p>&emsp;&emsp;Hello! I’m a computer science major from the Bay Area, currently studying at the University of Maryland, College Park. I’m on track to graduate in May 2027 and am working toward adding minors in math and philosophy to complement my degree.</p>
                    <p>&emsp;&emsp;My primary interest lies in the exciting field of Artificial Intelligence, and I have some foundational experience in machine learning. Recently, I’ve been diving deeper into full-stack web development to expand my skill set. My experience in frontend development includes building club websites, crafting my personal portfolio site, and contributing to a hackathon project. On the backend, I’ve honed my skills in Java and Python through academic projects and coursework.</p>
                    <p>&emsp;&emsp;I’m passionate about solving problems, learning new technologies, and exploring how AI and web development intersect to create innovative solutions.</p>
                </div>
            </main>
            <footer>
                <a href="http://www.linkedin.com/in/netra-thiru">
                    <img src="Logos & Icons/magentaLinkedIn.png" alt="LinkedIn Icon" />
                </a>
                <a href="https://github.com/NetThi123">
                    <img src="Logos & Icons/magentaGitHub.png" alt="GitHub Icon" />
                </a>
            </footer>
        </div>
    );
}

export default HomePage;