import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
];

function LanguageSelector({ mode = 'dropdown' }) {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeLang = languages.find(l => l.code === language) || languages[0];

    if (mode === 'tile') {
        return (
            <div className="language-tiles">
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        className={`lang-tile ${language === lang.code ? 'active' : ''}`}
                        onClick={() => setLanguage(lang.code)}
                    >
                        <span className="lang-native">{lang.native}</span>
                        <span className="lang-name">{lang.name}</span>
                        {language === lang.code && <div className="active-dot"></div>}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="language-dropdown-container" ref={dropdownRef}>
            <button
                className={`lang-dropdown-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="lang-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 01-18 0 9 9 0 0118 0z" />
                        <path d="M3.6 9h16.8M3.6 15h16.8" />
                        <path d="M12 3a13.5 13.5 0 000 18M12 3a13.5 13.5 0 010 18" />
                    </svg>
                </div>
                <span className="active-lang-name">{activeLang.name}</span>
                <svg className="chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="lang-dropdown-menu">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`lang-option ${language === lang.code ? 'active' : ''}`}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsOpen(false);
                            }}
                        >
                            <span className="opt-native">{lang.native}</span>
                            <span className="opt-name">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;
