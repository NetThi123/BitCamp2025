import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from './AuthContext';
import image0 from '../assets/image0.png'; // adjust path as needed

function Navbar({ loggedIn }) {
    const [isVisible, setIsVisible] = useState(true);
    const { isLoggedIn, do_logout } = useAuth();
    

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

    return loggedIn ? (
        <div className={`navbar-container ${isVisible ? 'show' : 'hide'}`}>
            <div className="icon">
                <img src={image0} alt="Aiden the Dinosaur" />
                <Link to="/homepage" className="logo">AIDEN.ai</Link>
            </div>
            <nav>
                <div className="topnav">

                    <Link to="/homepage">Home</Link>
                    <Link to="/me">My info</Link>
                    <Link to="/colleges">My Colleges</Link>
                    <Link to="/talk">talk with aiden</Link>
                    <Link to="/homepage" className="login-link" onClick={() => {do_logout(); console.log("logged out")}}>Log out</Link>

                </div>
            </nav>
        </div>
    ) : (<div className={`navbar-container ${isVisible ? 'show' : 'hide'}`}>
        <div className="icon">
                <img src={image0} alt="Aiden the Dinosaur" />
                <Link to="/homepage" className="logo">AIDEN.ai</Link>
            </div>
        <nav>
            <div className="topnav">

                <Link to="/homepage">Home</Link>

                <Link to="/login" className="login-link">Get started</Link>
            </div>
        </nav>
    </div>)
};


export default Navbar;