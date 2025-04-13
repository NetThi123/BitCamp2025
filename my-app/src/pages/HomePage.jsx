import React from 'react';
import VideoBg from "../components/VideoBg";
import { Link } from "react-router-dom";
import picture from '../assets/Composition8.jpg'; // adjust path as needed
import '../styles/HomePage.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function HomePage() {

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false,
          mirror: true,
          offset: 120,
          easing: 'ease-in-out',
        });
      
        const target = document.querySelector('.scroll-lock-section');
        const content = document.querySelector('.info4-content');
        let locked = false;
      
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !locked) {
              locked = true;
      
              // Lock scroll
              document.body.classList.add('scroll-locked');
      
              // Trigger animation
              content.classList.add('animate-in');
      
              // Unlock scroll after animation completes
              setTimeout(() => {
                document.body.classList.remove('scroll-locked');
              }, 1600); // Adjust based on transition duration
            }
          },
          { threshold: 0.9 }
        );
      
        if (target) {
          observer.observe(target);
        }
      
        // Clean up on unmount
        return () => observer.disconnect();
      }, []);
      

    return (

        <div>
            
            <VideoBg />

           <div id="next-section" className="next-section" data-aos="fade-up">
                <h1>From Award Letters to More Aid</h1>
                    <p>Here's where your main content goes.</p>
            </div>

            <div className="info1" data-aos="fade-down">
                <h2>Upload your financial aid offers</h2>
                <p>Details about this section...</p>
                </div>

                <div className="info2" data-aos="zoom-in-up">
                <h2>Unpack the financespeak by talking with Aiden</h2>
                </div>

                <div className="info3" data-aos="fade-down">
                <h2>Negotiate for more...</h2>
                </div>

                <div className="info4 scroll-lock-section" data-aos="fade-up">
                    <div className="info4-content">
                        <h2>And ask the what-ifs that keep you up at night</h2>
                        <p>We’ll help you break them down with data that matters.</p>
                    </div>
                </div>

            {/*<header>
                <div className="intro-text">
                    <div id="side-text">
                        <h1>Hello! I'm Netra Thiru</h1>
                        <p>A computer science student from Fremont, CA currently studying at the University of Maryland</p>
                    </div>
                </div>
            </header> */}
           <main>
                <div id="about" data-aos="fade-down">
                    <h2>&nbsp; &nbsp;</h2>
                    <Link to="/login">
                    <button className="SignUp">
                        Sign Up Here
                    </button>
                    </Link>
                    <p>&emsp;&emsp;Hello! I’m a computer science  College Park. I’m on track to graduate in May 2027 and am working toward adding minors in math and philosophy to complement my degree.</p>
                </div>
            </main> 
            <footer>
                
            </footer>
        </div>
    );
}

export default HomePage;