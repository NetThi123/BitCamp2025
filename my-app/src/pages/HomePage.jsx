import React from 'react';

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
                        <li><a href="#">Log In/ Sign Up</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default HomePage;