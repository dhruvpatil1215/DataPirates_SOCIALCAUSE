import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="brand-logo">Sahara AI</div>
                    <p>Making government schemes accessible to every citizen since 2024.</p>
                </div>
                <div className="footer-links">
                    <div className="link-group">
                        <h4>Schemes</h4>
                        <a href="#schemes">All Schemes</a>
                        <a href="#eligibility">Eligibility Check</a>
                        <a href="#">Latest Updates</a>
                    </div>
                    <div className="link-group">
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">User Guide</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Sahara AI. All rights reserved.</p>
                <div className="social-links">
                    {/* Icons could go here */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
