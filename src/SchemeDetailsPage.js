import React, { useState } from 'react';
import Footer from './components/Footer';
import './SchemeDetailsPage.css';

function SchemeDetailsPage({ scheme, onBack }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!scheme) return null;

    return (
        <main className="main-content" style={{ paddingTop: '2rem' }}>
            <div className="details-container">
                {/* Back Button */}
                <button className="back-btn" onClick={onBack}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Catalog
                </button>

                {/* Hero Section */}
                <div className="details-hero">
                    <div className="hero-content">
                        <div className="hero-badges">
                            <span className="badge-category">{scheme.category}</span>
                            <span className="badge-status">Active</span>
                        </div>
                        <h1>{scheme.title}</h1>
                        <p className="hero-subtitle hero-subtitle-truncated">{scheme.description}</p>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-icon">📅</div>
                            <div className="stat-info">
                                <label>Launch Date</label>
                                <span>01 Dec 2018</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <label>Max Benefit</label>
                                <span>{scheme.benefit}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">👥</div>
                            <div className="stat-info">
                                <label>Beneficiaries</label>
                                <span>11.8 Crore+</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">🕒</div>
                            <div className="stat-info">
                                <label>Processing Time</label>
                                <span>15-30 days</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="details-tabs">
                    {['overview', 'benefits', 'eligibility', 'documents', 'process'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="details-grid">
                    {/* Main Content Area */}
                    <div className="details-main">
                        <div className="content-card">
                            <div className="card-header">
                                <span className="icon">📄</span>
                                <h2>Scheme {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                            </div>

                            {activeTab === 'overview' && (
                                <div className="tab-content fade-in">
                                    <h3>About This Scheme</h3>
                                    <p className="description-text">{scheme.description}</p>

                                    <div className="objectives-grid">
                                        <div className="obj-column">
                                            <h4>Key Highlights</h4>
                                            <ul>
                                                <li>Official {scheme.category} Sector Support</li>
                                                <li>Streamlined Digital Application</li>
                                                <li>Direct Benefit Transfer (DBT)</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="government-certification">
                                        <div className="cert-content">
                                            <span className="cert-icon">🏅</span>
                                            <div>
                                                <h4>Official Recognition</h4>
                                                <p>This initiative is officially managed under the {scheme.category} guidelines for citizen welfare.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'benefits' && (
                                <div className="tab-content fade-in">
                                    <div className="benefit-showcase">
                                        <div className="benefit-main">
                                            <span className="benefit-icon">🎁</span>
                                            <div>
                                                <h3>Financial & Service Benefits</h3>
                                                <p className="benefit-text">{scheme.benefit}</p>
                                            </div>
                                        </div>
                                        <div className="benefit-tags">
                                            <span className="tag">Cash Assistance</span>
                                            <span className="tag">Support Services</span>
                                            <span className="tag">Government Shield</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'eligibility' && (
                                <div className="tab-content fade-in">
                                    <h3>Eligibility Criteria</h3>
                                    <p>To be eligible for this scheme, applicants must generally fulfill the following {scheme.category} sector requirements:</p>
                                    <ul className="eligibility-list">
                                        <li>Must be a citizen of India residing in the relevant state.</li>
                                        <li>Must satisfy the income and professional criteria for {scheme.category}.</li>
                                        <li>Valid ID proof and professional certification (if applicable) required.</li>
                                    </ul>
                                    <div className="eligibility-notice">
                                        <p><strong>Note:</strong> Detailed eligibility is verified during the application process based on current year guidelines.</p>
                                    </div>
                                </div>
                            )}

                            {(activeTab === 'documents' || activeTab === 'process') && (
                                <div className="tab-content fade-in">
                                    <div className="sync-status">
                                        <svg className="spinner" viewBox="0 0 50 50">
                                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                        </svg>
                                        <p>Fetching latest {activeTab} checklist from the portal...</p>
                                    </div>
                                    <p className="sync-note">We are currently synchronizing the latest procedural requirements to ensure you have the most up-to-date information.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <aside className="details-sidebar">
                        <div className="sidebar-card action-card">
                            <h3>Quick Actions</h3>
                            <button className="btn-primary-action">Start Application</button>
                            <button className="btn-secondary-action">Check Eligibility</button>
                            <button className="btn-secondary-action">Download Guide</button>
                            <button className="btn-secondary-action">Share Scheme</button>
                        </div>

                        <div className="sidebar-card contact-card">
                            <div className="card-icon">📞</div>
                            <div>
                                <h4>Need Help?</h4>
                                <p>Contact our support team</p>
                                <strong>Call: 155261</strong>
                            </div>
                        </div>

                        <div className="sidebar-card statistics-card">
                            <h3>Scheme Statistics</h3>
                            <div className="sidebar-stat">
                                <label>Total Beneficiaries</label>
                                <span>11.8 Crore+</span>
                            </div>
                            <div className="sidebar-stat">
                                <label>Amount Disbursed</label>
                                <span className="highlight">₹2.8 Lakh Crore+</span>
                            </div>
                            <div className="sidebar-stat">
                                <label>Success Rate</label>
                                <span>98.5%</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default SchemeDetailsPage;
