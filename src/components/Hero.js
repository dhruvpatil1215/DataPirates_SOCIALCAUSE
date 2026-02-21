import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-ai-badge">
                    Powered by Artificial Intelligence
                </div>
                <h1 className="hero-title">
                    The Smartest Way to Find <br />
                    <span className="accent-text">Government Schemes</span>
                </h1>
                <p className="hero-subtitle">
                    Sahara AI uses advanced algorithms to match you with the perfect
                    government initiatives based on your unique profile.
                </p>
                <div className="hero-actions">
                    <a href="#eligibility" className="btn btn-primary">Check Eligibility</a>
                    <button className="btn btn-outline">
                        How it works
                    </button>
                </div>
            </div>
            <div className="hero-glow"></div>
        </section>
    );
}

export default Hero;
