import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        const videoSection = document.getElementById('video-section');
        if (videoSection) {
            const rect = videoSection.getBoundingClientRect();
            const isBelowVideo = rect.bottom <= 0; // Check if the user has scrolled past the video
            setIsVisible(!isBelowVideo); // Hide navbar if scrolled past
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`navbar-container ${isVisible ? 'show' : 'hide'}`}>
            <div className="logo">My Logo</div>
            <nav>
                <div className="topnav">
                    <Link to="/homepage">Home</Link>
                    <Link to="/collegefinder">My College</Link>
                    <Link to="/login" className="login-link">Log In/Sign Up</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;