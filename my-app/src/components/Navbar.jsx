import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav>
                <div className="topnav">
                    <Link to="/homepage">Home</Link>
                    <Link to="/login">Log In/Sign Up</Link>
                    <Link to="/collegefinder">My College</Link>
                </div>
            </nav>
        </div>

    )
}

export default Navbar;