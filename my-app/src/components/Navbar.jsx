import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    return (
        <div className= "navbar-container">
            <div className = "logo">
                    <a href="/" class="logo-link">Logo</a>
            </div>
            <nav>
                <div className="topnav">
                    <Link to="/homepage">Home</Link>
                    <Link to="/collegefinder">My College</Link>
                    <Link to="/login" classNmae="login-link">Log In/Sign Up</Link>
                </div>
            </nav>
        </div>

    )
}

export default Navbar;