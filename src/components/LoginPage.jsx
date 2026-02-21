import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/sahara-logo.png';
import { auth, googleProvider } from '../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ── Email / Password Auth ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!fullName) return setError('Full name is required.');
      if (password !== confirmPassword) return setError('Passwords do not match.');
      if (password.length < 6) return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      if (isSignUp) {
        // Handle Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });
        console.log('Account created:', userCredential.user);
      } else {
        // Handle Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in:', userCredential.user);
      }
      // TODO: redirect to dashboard
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Try again later.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered.');
          break;
        case 'auth/weak-password':
          setError('Password must be at least 6 characters.');
          break;
        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Google sign-in ──
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in:', result.user);
      // TODO: redirect to dashboard
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-container theme-rebrand">
      {/* ── Left Hero Panel ── */}
      <div className="login-hero">
        <div className="hero-background-pattern"></div>
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="hero-logo-wrapper">
            <div className="logo-box">
              <img src={logo} alt="Sahara Logo" />
            </div>
          </div>

          <h1 className="hero-title">
            Sahara <span className="accent">AI</span>
          </h1>

          <p className="hero-description">
            AI-powered Government Scheme & Welfare Access Platform.
            Discover benefits you deserve with intelligent matching.
          </p>

          <div className="hero-feature-cards">
            <div className="feature-card">
              <div className="card-status status-green"></div>
              <div className="card-icon">🛡️</div>
              <span className="card-label">25+ Schemes</span>
            </div>
            <div className="feature-card">
              <div className="card-status status-purple"></div>
              <div className="card-icon">✨</div>
              <span className="card-label">AI Powered</span>
            </div>
            <div className="feature-card">
              <div className="card-status status-orange"></div>
              <div className="card-icon">⚡</div>
              <span className="card-label">Free Access</span>
            </div>
          </div>

          <div className="hero-trust">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="trust-icon">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Trusted by 10,000+ citizens across India</span>
          </div>
        </div>
      </div>

      {/* ── Right Login Panel ── */}
      <div className="login-form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
            <p>{isSignUp ? 'Join Sahara AI to access your benefits' : 'Sign in to your personalized dashboard'}</p>
          </div>

          {/* Google Sign-in Moved to Top */}
          <div className="social-top">
            <button
              className="social-btn google-modern"
              aria-label="Sign in with Google"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="divider-modern">
            <span>OR</span>
          </div>

          {/* Error banner */}
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-modern">
            {isSignUp && (
              <div className="input-field">
                <label>Full Name</label>
                <div className="input-input">
                  <svg className="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-field">
              <label>Email Address</label>
              <div className="input-input">
                <svg className="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-input">
                <svg className="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="input-field">
                <label>Confirm Password</label>
                <div className="input-input">
                  <svg className="f-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="form-utils">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="link-teal">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn-sign-in" disabled={loading}>
              {loading ? <span className="spinner"></span> : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="bottom-prompt">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="link-teal bold"
            >
              {isSignUp ? 'Sign in' : 'Create one'}
            </button>
          </p>

          {!isSignUp && (
            <div className="skip-action">
              <button className="skip-link">
                Skip → Browse schemes without an account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
