import React from 'react';
import './VideoBg.css'; // Optional: styles in separate file
import beeVideo from "../assets/bee.mp4";


const VideoBg = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src={beeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <h1>Welcome to Our Site</h1>
        <p>Find the best college for you</p>
      </div>
      </div>
  );
};

export default VideoBg;