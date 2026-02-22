import React from 'react';
import { useLanguage } from './context/LanguageContext';
import Footer from './components/Footer';

function SupportPage() {
    const { t } = useLanguage();
    const faqs = [
        {
            q: "How does Sahara AI track schemes?",
            a: "We integrate directly with public government data portals and use AI to keep our database of 3400+ schemes updated daily."
        },
        {
            q: "Is my data secure?",
            a: "Sahara AI does not store your Aadhaar or Voter ID permanently. We use it only for verification and matching purposes during your active session."
        },
        {
            q: "Can I apply for schemes here?",
            a: "Currently, we provide eligibility checks and official links. We are working on direct application integration for major central schemes."
        }
    ];

    return (
        <main className="main-content">
            <div className="mission-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="section-label">{t('support')}</div>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', marginBottom: '4rem' }}>
                    {t('how_can_we_help')}
                </h1>

                <div style={{ marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>{faq.q}</h4>
                                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ padding: '4rem', background: '#00d285', borderRadius: '24px', color: '#ffffff', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Still have questions?</h2>
                    <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Our support team is available to help you navigate scheme complexities.</p>
                    <button className="btn-secondary" style={{ border: 'none' }}>Contact Support</button>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default SupportPage;
