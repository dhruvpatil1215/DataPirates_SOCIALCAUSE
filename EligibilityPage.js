import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import EligibilityForm from './components/EligibilityForm';
import Footer from './components/Footer';
import SchemeCard from './components/SchemeCard';
import { MOCK_SCHEMES } from './data/schemesList';
import './SchemesPage.css'; // Reuse grid styles

function EligibilityPage({ onViewDetails }) {
    const { t } = useLanguage();
    const [isScanning, setIsScanning] = useState(false);
    const [recommendedSchemes, setRecommendedSchemes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const handleEligibilityCheck = (userInput) => {
        setIsScanning(true);
        setCurrentPage(1); // Reset to first page on new check

        setTimeout(() => {
            const userOccupation = userInput.occupation.toLowerCase();
            const userState = userInput.state.toLowerCase();
            const userAge = parseInt(userInput.age);
            const userIncome = parseInt(userInput.income.replace(/,/g, ''));

            // 1. Broaden keywords for better recall
            const keywordMap = {
                student: ["student", "scholarship", "education", "college", "school", "university", "academic", "hostel", "book", "technical", "degree", "diploma"],
                farmer: ["farmer", "agriculture", "agriculture", "crop", "paddy", "soil", "tractor", "irrigation", "horticulture", "seed", "fertilizer", "murrah", "cow"],
                worker: ["worker", "labor", "labour", "shramik", "construction", "unorganized", "wage", "industrial", "employee"],
                fisherman: ["fisherman", "fisheries", "marine", "boat", "fish", "pond", "sea", "lean season"],
                business: ["entrepreneur", "msme", "business", "loan", "startup", "incentive", "industry", "capital", "subsidy", "export", "marketing"],
                unemployed: ["unemployed", "jobless", "skill", "training", "vocational", "placement", "youth", "vulnerable"]
            };

            const userKeywords = keywordMap[userOccupation] || [];

            const matches = MOCK_SCHEMES.map(scheme => {
                let score = 0;
                const title = scheme.title.toLowerCase();
                const desc = scheme.description.toLowerCase();
                const category = scheme.category.toLowerCase();
                const fullText = `${title} ${desc} ${category}`;

                // --- STATE FILTERING (CRITICAL) ---
                const isCentral = fullText.includes("government of india") || fullText.includes("central") || fullText.includes("ministry of") || fullText.includes("aicte") || fullText.includes("national");
                const mentionsUserState = fullText.includes(userState);

                // If it's a specific state scheme and not the user's state, penalize heavily
                const states = ["andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "goa", "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka", "kerala", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana", "tripura", "uttar pradesh", "uttarakhand", "west bengal", "delhi", "puducherry", "jammu", "kashmir", "ladakh"];

                const mentionedStates = states.filter(s => fullText.includes(s));
                const isOtherState = mentionedStates.length > 0 && !mentionsUserState;

                if (mentionsUserState) score += 60;
                else if (isCentral && mentionedStates.length === 0) score += 40; // All-India schemes
                else if (isOtherState) score -= 100; // Likely not for them

                // --- OCCUPATION FILTERING ---
                let keywordMatchCount = 0;
                userKeywords.forEach(kw => {
                    if (fullText.includes(kw)) keywordMatchCount++;
                });
                score += Math.min(keywordMatchCount * 8, 40);

                // --- AGE FILTERING (INFERENCE) ---
                // Look for "age", "years", "upto", "between" followed/preceded by numbers
                // Simple regex check: "upto 35", "18-40", etc.
                const ageMatch = desc.match(/(\d+)\s*-\s*(\d+)\s*years|upto\s*(\d+)|(\d+)\s*to\s*(\d+)/i);
                if (ageMatch) {
                    const min = parseInt(ageMatch[1] || ageMatch[4] || 0);
                    const max = parseInt(ageMatch[2] || ageMatch[3] || ageMatch[5] || 999);
                    if (userAge >= min && userAge <= max) score += 20;
                    else if (userAge > max) score -= 50; // Over-age
                } else {
                    score += 10; // Neutral if no age mentioned
                }

                // --- INCOME FILTERING (INFERENCE) ---
                if (fullText.includes("bpl") || fullText.includes("poor") || fullText.includes("economically")) {
                    if (userIncome < 300000) score += 15;
                    else score -= 10;
                }

                return { ...scheme, score: Math.max(0, Math.min(score, 100)) };
            })
                .filter(s => s.score > 50) // Higher bar for "proper" matches
                .sort((a, b) => b.score - a.score);

            setRecommendedSchemes(matches);
            setIsScanning(false);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }, 1500);
    };

    const totalPages = Math.ceil(recommendedSchemes.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedSchemes = recommendedSchemes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main className="main-content">
            <div className="section-header">
                <h2>{t('eligibility')}</h2>
                <p>Enter your details and let our AI match you with the best government benefits.</p>
            </div>

            <EligibilityForm onCheck={handleEligibilityCheck} />

            {recommendedSchemes.length > 0 && (
                <div style={{ marginTop: '5rem' }}>
                    <div className="section-header">
                        <h2>Your Matches</h2>
                        <p>Based on your profile, we've identified {recommendedSchemes.length} top matching schemes.</p>
                    </div>
                    <div className="schemes-grid">
                        {paginatedSchemes.map(scheme => (
                            <SchemeCard
                                key={scheme.id}
                                {...scheme}
                                onClick={() => onViewDetails(scheme)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button
                                className="page-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                                Previous
                            </button>

                            <div className="page-info">
                                Page <span className="current-page">{currentPage}</span> of {totalPages}
                            </div>

                            <button
                                className="page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            >
                                Next
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {isScanning && (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <h2 className="scanning-text">Analyzing Citizen Profile...</h2>
                </div>
            )}
            <Footer />
        </main>
    );
}

export default EligibilityPage;
