import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SchemeCard from './components/SchemeCard';
import './SchemesPage.css';
import { MOCK_SCHEMES } from './data/schemesList';


const CATEGORIES = ["All", "Agriculture", "Business", "Education", "Social welfare", "Health", "Skills", "Banking", "Women and Child", "Science", "Housing", "Sports", "Travel", "Transport", "Public Safety", "Utility"];




function SchemesPage({ searchTerm, onViewDetails }) {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setCurrentPage(1); // Reset to first page on category change
    };

    const filteredSchemes = MOCK_SCHEMES.filter(scheme => {
        const matchesCategory = activeCategory === "All" || scheme.category === activeCategory;
        const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredSchemes.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedSchemes = filteredSchemes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main className="main-content">
            <div className="section-header">
                <h2 id="schemes">{t('explore')}</h2>
                <p>Discover benefits tailored to your citizen profile</p>
            </div>

            <div className="category-filters">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
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

            {filteredSchemes.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </div>
                    <h3>No schemes fit this profile</h3>
                    <p>Try adjusting your filters or expanding your search criteria.</p>
                </div>
            )}
            <Footer />
        </main>
    );
}

export default SchemesPage;
