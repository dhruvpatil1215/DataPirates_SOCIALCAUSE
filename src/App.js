import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import SchemesPage from './SchemesPage';
import EligibilityPage from './EligibilityPage';
import SchemeDetailsPage from './SchemeDetailsPage';
import AboutPage from './AboutPage';
import SupportPage from './SupportPage';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';
import { auth, signInWithPopup, googleProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [view, setView] = useState(() => {
    return localStorage.getItem('sahara_current_view') || 'landing';
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(() => {
    const saved = localStorage.getItem('sahara_selected_scheme');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthProcessing, setIsAuthProcessing] = useState(false);
  const viewRef = useRef(view);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      const currentView = viewRef.current;

      // Only auto-redirect to home if we are specifically on the landing page
      // and a Firebase user is detected.
      if (currentUser && currentView === 'landing') {
        setView('home');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('sahara_current_view', view);
  }, [view]);

  useEffect(() => {
    if (selectedScheme) {
      localStorage.setItem('sahara_selected_scheme', JSON.stringify(selectedScheme));
    } else {
      localStorage.removeItem('sahara_selected_scheme');
    }
  }, [selectedScheme]);

  const handleNavigate = (newView) => {
    setView(newView);
    setSearchTerm(''); // Reset search when navigating
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setView('scheme-details');
  };

  const handleGoogleLogin = async () => {
    if (isAuthProcessing) return;
    setIsAuthProcessing(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Firebase internal error fix: ensure processing is reset on failure
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        console.log("User closed the popup.");
      } else if (error.code === 'auth/api-key-not-valid') {
        alert("Firebase API Key is invalid. Please check your project settings.");
      }
    } finally {
      setIsAuthProcessing(false);
    }
  };

  const handleEmailLogin = async (email, password) => {
    if (isAuthProcessing) return;
    setIsAuthProcessing(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email:", error);
      alert(error.message);
    } finally {
      setIsAuthProcessing(false);
    }
  };

  const handleEmailRegister = async (email, password, name) => {
    if (isAuthProcessing) return;
    setIsAuthProcessing(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's display name immediately
      if (name) {
        const { updateProfile } = await import('firebase/auth');
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert(error.message);
    } finally {
      setIsAuthProcessing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('sahara_current_view');
      localStorage.removeItem('sahara_selected_scheme');
      setView('landing');
      setUser(null);
      setSelectedScheme(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="App">
      {view !== 'landing' && view !== 'scheme-details' && (
        <Navbar
          activeView={view}
          onNavigate={handleNavigate}
          onSearch={setSearchTerm}
          onLogout={handleLogout}
          user={user}
        />
      )}

      {view === 'landing' && (
        <LandingPage
          onGoogleLogin={handleGoogleLogin}
          onEmailLogin={handleEmailLogin}
          onEmailRegister={handleEmailRegister}
          isProcessing={isAuthProcessing}
        />
      )}
      {view === 'home' && (
        <HomePage onLaunch={() => setView('schemes')} />
      )}
      {view === 'schemes' && (
        <SchemesPage
          searchTerm={searchTerm}
          onViewDetails={handleViewDetails}
        />
      )}
      {view === 'eligibility' && (
        <EligibilityPage
          onViewDetails={handleViewDetails}
        />
      )}
      {view === 'scheme-details' && (
        <SchemeDetailsPage
          scheme={selectedScheme}
          onBack={() => setView('schemes')}
        />
      )}
      {view === 'about' && (
        <AboutPage />
      )}
      {view === 'support' && (
        <SupportPage />
      )}
      <Chatbot onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

