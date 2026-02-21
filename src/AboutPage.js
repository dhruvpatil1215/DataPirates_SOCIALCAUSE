import React from 'react';
import Footer from './components/Footer';
import './HomePage.css'; // Reuse mission styles

function AboutPage() {
    return (
        <main className="main-content">
            <div className="mission-container">
                <div className="section-label">About Sahara AI</div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem' }}>
                    Empowering 1.4 Billion <br />Citizens with <span style={{ color: '#00d285' }}>Information.</span>
                </h1>

                <div style={{ display: 'grid', gap: '4rem', maxWidth: '800px', margin: '0 auto' }}>
                    <section>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0f172a' }}>Our Vision</h3>
                        <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.1rem' }}>
                            Sahara AI was born from the need to bridge the gap between government policy and public awareness.
                            With thousands of schemes spread across central and state departments, many citizens miss out on
                            critical benefits simply because they don't know they exist.
                        </p>
                    </section>

                    <section>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0f172a' }}>AI-Driven Discovery</h3>
                        <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.1rem' }}>
                            We leverage advanced natural language processing to categorize, simplify, and match over
                            3,400 schemes to individual citizen profiles. Our mission is to ensure that no eligible
                            Indian is left behind.
                        </p>
                    </section>

                    <div className="features-grid">
                        <div className="feature-card" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#00d285', marginBottom: '0.5rem' }}>3400+</h2>
                            <p>Schemes Indexed</p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#00d285', marginBottom: '0.5rem' }}>28+</h2>
                            <p>States Covered</p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#00d285', marginBottom: '0.5rem' }}>100%</h2>
                            <p>Free for Citizens</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default AboutPage;
