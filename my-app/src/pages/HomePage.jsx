import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <header>
            <div className="container">
                <h1 className="logo">My Website</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Me</a></li>
                        <li><a href="#">My Colleges</a></li>
                        <li><Link to="/login">Log In/ Sign Up</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default HomePage;