import React, { useState } from 'react';
import { INDIAN_STATES } from '../data/constants';
import './EligibilityForm.css';

function EligibilityForm({ onCheck }) {
    const [formData, setFormData] = useState({
        age: '',
        occupation: '',
        income: '',
        state: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onCheck) onCheck(formData);
    };

    return (
        <section className="eligibility-system" id="eligibility">
            <div className="eligibility-container">
                <div className="eligibility-header">
                    <span className="badge">AI Engine</span>
                    <h2>Check Your <span className="accent-text">Eligibility</span></h2>
                    <p>Provide your details to find schemes you qualify for instantly.</p>
                </div>

                <form onSubmit={handleSubmit} className="eligibility-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>What is your age?</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="e.g. 25"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Occupation</label>
                            <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                                <option value="">Select Occupation</option>
                                <option value="student">Student</option>
                                <option value="farmer">Farmer</option>
                                <option value="worker">Worker</option>
                                <option value="fisherman">Fisherman</option>
                                <option value="business">Entrepreneur</option>
                                <option value="unemployed">Unemployed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Annual Family Income</label>
                            <input
                                type="text"
                                name="income"
                                placeholder="e.g. 3,00,000"
                                value={formData.income}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Residential State</label>
                            <select name="state" value={formData.state} onChange={handleChange} required>
                                <option value="">Select State</option>
                                {INDIAN_STATES.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="btn-eligibility">
                            Scan for Schemes
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EligibilityForm;
