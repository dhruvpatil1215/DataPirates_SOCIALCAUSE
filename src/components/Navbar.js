import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import './Navbar.css';

function Navbar({ onSearch, onNavigate, activeView, onLogout, user }) {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) onSearch(value);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
                    <div className="brand-logo">
                        <img src="/emblem.png" alt="Sahara Logo" style={{ width: '30px', height: 'auto' }} />
                    </div>
                    <div className="brand-divider"></div>
                    <div className="brand-text">
                        <span className="brand-main">Sahara AI</span>
                        <span className="brand-sub">SMART SCHEME FINDER</span>
                    </div>
                </div>

                <div className="nav-menu">
                    <button className={`nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>{t('home')}</button>
                    <button className={`nav-link ${activeView === 'schemes' ? 'active' : ''}`} onClick={() => onNavigate('schemes')}>{t('explore')}</button>
                    <button className={`nav-link ${activeView === 'eligibility' ? 'active' : ''}`} onClick={() => onNavigate('eligibility')}>{t('eligibility')}</button>
                    <button className={`nav-link ${activeView === 'about' ? 'active' : ''}`} onClick={() => onNavigate('about')}>{t('about')}</button>
                    <button className={`nav-link ${activeView === 'support' ? 'active' : ''}`} onClick={() => onNavigate('support')}>{t('support')}</button>
                </div>

                <div className="navbar-actions">
                    <LanguageSelector mode="dropdown" />

                    {activeView === 'schemes' && (
                        <div className="navbar-search">
                            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder={t('search_placeholder')}
                                value={searchTerm}
                                onChange={handleSearch}
                                id="search-input"
                            />
                        </div>
                    )}
                    <button className="profile-btn" title={user?.displayName || "Profile"}>
                        <div className="avatar">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : (
                                user?.displayName?.split(' ').map(n => n[0]).join('') || 'JS'
                            )}
                        </div>
                    </button>
                    <button className="logout-btn" onClick={() => onLogout()} title="Logout">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
