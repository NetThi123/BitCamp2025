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
            <Link to="/homepage" className="logo">My Logo</Link>
            <nav>
                <div className="topnav">

                    <Link to="/homepage">Home</Link>
                    <Link to="/colleges">My College</Link>
                    <Link to="/me">My Info</Link>
                    <Link to="/me">Me</Link>
                    <Link to="/talk">talk with aiden</Link>
                    <Link to="/login" className="login-link">Log In/Sign Up</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;