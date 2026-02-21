import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Sahara AI Assistant. How can I help you find government schemes today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulated AI Response
        setTimeout(() => {
            let botResponse = "I'm analyzing your query. You can explore over 3,400 schemes in our 'Explore Schemes' section.";
            if (inputValue.toLowerCase().includes('farmer') || inputValue.toLowerCase().includes('kisan')) {
                botResponse = "For farmers, I recommend checking out PM-KISAN, Krishi Sinchai Yojana, and Fasal Bima Yojana.";
            } else if (inputValue.toLowerCase().includes('scholarship') || inputValue.toLowerCase().includes('student')) {
                botResponse = "Students can benefit from Post-Matric Scholarships, PM-YASASVI, and various state-specific education grants.";
            }

            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        }, 1000);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'expanded' : ''}`}>
            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <div className="bot-info">
                        <div className="bot-avatar">🤖</div>
                        <div>
                            <h4>Sahara AI Assistant</h4>
                            <span className="status-indicator">Online</span>
                        </div>
                    </div>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input" onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Ask about schemes..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Floating Toggle Button */}
            <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                    </svg>
                )}
            </button>
        </div>
    );
}

export default Chatbot;
