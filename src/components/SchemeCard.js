import React from 'react';
import './SchemeCard.css';

function SchemeCard({ title, category, benefit, description, score, onClick }) {
    const handleAction = (e) => {
        e.stopPropagation();
        if (onClick) onClick({ title, category, benefit, description });
    };

    return (
        <div className="scheme-card" onClick={handleAction}>
            <div className="card-header">
                <span className="card-category">{category}</span>
                {score && (
                    <div className="matching-score">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {score}% Match
                    </div>
                )}
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <div className="card-footer">
                <div className="benefit-badge">
                    <span className="benefit-label">Benefit:</span>
                    <span className="benefit-value">{benefit}</span>
                </div>
                <button className="card-action" onClick={handleAction}>
                    View Details
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SchemeCard;
