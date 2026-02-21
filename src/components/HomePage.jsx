import React from 'react';
import './HomePage.css';
import logo from '../assets/sahara-logo.png';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function HomePage({ user }) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const displayName = user.displayName || user.email.split('@')[0];

    return (
        <div className="home-container premium-landing">
            {/* ── Modern Navigation ── */}
            <nav className="landing-nav">
                <div className="nav-wrapper">
                    <div className="nav-left">
                        <div className="branding">
                            <img src={logo} alt="Sahara Logo" className="branding-logo" />
                            <div className="branding-text">
                                <span className="brand-name">Sahara AI</span>
                                <span className="brand-tag">Smart Scheme Finder</span>
                            </div>
                        </div>
                    </div>

                    <div className="nav-center">
                        <ul className="nav-menu">
                            <li className="nav-item active">Home</li>
                            <li className="nav-item">Schemes</li>
                            <li className="nav-item">Eligibility</li>
                            <li className="nav-item">Dashboard</li>
                            <li className="nav-item">About</li>
                        </ul>
                    </div>

                    <div className="nav-right">
                        <button onClick={handleLogout} className="btn-auth-teal">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Centered Hero Experience ── */}
            <main className="hero-section-centered">
                <div className="hero-inner">
                    <div className="hero-logo-container">
                        <div className="logo-card-home">
                            <img src={logo} alt="Sahara AI" />
                        </div>
                    </div>

                    <div className="ai-badge">
                        <span className="sparkle">✨</span>
                        <span>Powered by Artificial Intelligence</span>
                    </div>

                    <h1 className="hero-title-main">
                        Sahara <span className="accent">AI</span>
                    </h1>

                    <h2 className="hero-subtitle-main">
                        AI-powered Government Scheme & Welfare Access Platform
                    </h2>

                    <p className="hero-description-main">
                        Discover, verify eligibility, and access government benefits — all in one place.
                        Empowering every citizen with the information they deserve.
                    </p>

                    <div className="hero-action-btns">
                        <button className="btn-primary-white">
                            Explore Schemes
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <button className="btn-secondary-glass">
                            Check Eligibility
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </main>

            {/* ── Floating Action Buttons (FABs) ── */}
            <div className="fab-container left">
                <button className="fab-btn voice-btn" aria-label="Voice Search">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                </button>
            </div>

            <div className="fab-container right">
                <button className="fab-btn chat-btn" aria-label="Live Support">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default HomePage;
