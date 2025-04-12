import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav>
                <div className="topnav">
                    <a className="active" href="#">Home</a>
                    <Link to="/login">Log In/Sign Up</Link>
                    <Link to="/collegefinder">My College</Link>
                </div>
            </nav>
        </div>

    )
}

export default Navbar;