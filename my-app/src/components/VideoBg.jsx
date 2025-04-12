import React, { useState, useEffect, useRef } from 'react';
import "../styles/VideoBg.css"; 
import beeVideo from "../assets/bee.mp4";
import droneVid1 from "../assets/umich.mp4";
import droneVid2 from "../assets/moreDrone.mp4";

const VideoBg = () => {
  const playlist = [beeVideo, droneVid1, droneVid2]; // Your video files
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // State to control fade effect
  const videoRef = useRef(null);
  const previewDuration = 7000; // Time before switching videos (10 seconds)
  const fadeDuration = 7000; // Fade duration (5 seconds)

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch((err) => console.error('Autoplay failed:', err));
    }

    const timer = setTimeout(() => {
      setIsFading(true); // Start fade-out effect
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % playlist.length); // Change video
        setIsFading(false); // Reset fade effect
      }, 1000); // Duration of fade-out effect
    }, previewDuration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`bg-video ${isFading ? "fade-out" : "fade-in"}`} // Apply fade classes
      >
        <source src={playlist[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <h1>[Name] is your AI powered financial aid sideckick</h1>
        <h2>We are helping students with the <u>What If</u></h2>
        <p>Find the best college for you</p>
            <button
        onClick={() =>
        document.getElementById('next-section').scrollIntoView({ behavior: 'smooth' })
        }
        className="scroll-button"
    >
        ↓ Learn More
        </button>
      </div>
    </div>
  );
};

export default VideoBg;