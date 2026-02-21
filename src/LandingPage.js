import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import './LandingPage.css';

function LandingPage({ onGoogleLogin, onEmailLogin, onEmailRegister, isProcessing }) {
    const { t } = useLanguage();
    const [step, setStep] = useState('animation'); // 'animation' or 'auth'
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep('auth');
        }, 3000); // Animation duration
        return () => clearTimeout(timer);
    }, []);

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        if (authMode === 'login') {
            onEmailLogin(email, password);
        } else {
            onEmailRegister(email, password, fullName);
        }
    };

    return (
        <div className="landing-container">
            <div className={`emblem-section ${step === 'auth' ? 'fade-out' : ''}`}>
                <img
                    src="/emblem.png"
                    alt="State Emblem of India"
                    className="emblem-img"
                />
                <h1 className="landing-title">Sahara AI</h1>
            </div>

            <div className={`auth-section ${step === 'auth' ? 'fade-in' : ''}`}>
                <div className="auth-header">
                    <h2>{t('welcome')}</h2>
                    <p>{t('tagline')}</p>
                </div>

                <div className="landing-language-step">
                    <p className="step-label">Choose your language / अपनी भाषा चुनें</p>
                    <LanguageSelector mode="tile" />
                </div>

                <div className="auth-tabs">
                    <button
                        className={`tab-btn ${authMode === 'login' ? 'active' : ''}`}
                        onClick={() => setAuthMode('login')}
                        disabled={isProcessing}
                    >
                        {t('login')}
                    </button>
                    <button
                        className={`tab-btn ${authMode === 'register' ? 'active' : ''}`}
                        onClick={() => setAuthMode('register')}
                        disabled={isProcessing}
                    >
                        {t('register')}
                    </button>
                </div>

                <form onSubmit={handleAuthSubmit}>
                    {authMode === 'register' && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your name"
                                required
                                disabled={isProcessing}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>{t('email_label') || 'Email Address'}</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder={t('email_placeholder') || 'Enter your email'}
                            required
                            disabled={isProcessing}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('password_label')}</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                            disabled={isProcessing}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-submit" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : (authMode === 'login' ? t('sign_in') : t('create_account'))}
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="google-auth-btn" onClick={onGoogleLogin} disabled={isProcessing}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        <span>{isProcessing ? 'Connecting...' : 'Continue with Google'}</span>
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {t('secure_access')} <strong>Sahara AI</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
