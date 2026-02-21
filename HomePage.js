import React from 'react';
import { useLanguage } from './context/LanguageContext';
import Footer from './components/Footer';
import './HomePage.css';

function HomePage({ onLaunch }) {
    const { t } = useLanguage();
    return (
        <div className="home-page">

            <header className="home-hero">
                <div className="hero-badge">Digital India Initiative</div>
                <h1>{t('empowering')} <span style={{ color: '#00d285' }}>{t('intelligent_gov')}</span></h1>
                <p>
                    Sahara AI simplifies the discovery of over 3,400+ Central and State government schemes.
                    Using advanced AI matching, we connect you to the benefits you deserve.
                </p>
                <div className="hero-actions">
                    <button className="btn-primary" onClick={onLaunch}>{t('launch_finder')}</button>
                    <button className="btn-secondary">{t('watch_overview')}</button>
                </div>
            </header>

            <section className="mission-section">
                <div className="mission-container">
                    <div className="section-label">{t('mission_label')}</div>
                    <h2>{t('mission_text')}</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                            </div>
                            <h3>AI Search</h3>
                            <p>Instantly search across a massive database of 3400+ schemes with human-like understanding.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3>Instant Eligibility</h3>
                            <p>Personalized matching engine that identifies schemes tailored to your unique profile.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <h3>Verified Data</h3>
                            <p>Direct integration with certified government records ensures accurate and up-to-date information.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default HomePage;
