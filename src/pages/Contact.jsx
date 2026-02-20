import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="contact-page container">
            <div className="contact-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Get in Touch
                </motion.h1>
                <p>We'd love to hear from you. Our team is always here to help.</p>
            </div>

            <div className="contact-grid">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="info-card">
                        <Mail className="icon" />
                        <h3>Email Us</h3>
                        <p>fashion@gmail.com</p>
                        <span>Customer Support</span>
                    </div>
                    <div className="info-card">
                        <Phone className="icon" />
                        <h3>Call Us</h3>
                        <p>+91 9876543210</p>
                        <span>Mon-Fri · 9am-6pm</span>
                    </div>
                    <div className="info-card">
                        <MapPin className="icon" />
                        <h3>Visit Us</h3>
                        <p>Vijayawada, 520010</p>
                        <span>Corporate Office</span>
                    </div>
                </motion.div>

                <motion.div
                    className="contact-form-container"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {isSubmitted ? (
                        <div className="success-message">
                            <Send size={48} />
                            <h2>Message Sent!</h2>
                            <p>We'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="Tell us more about your inquiry..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                SEND MESSAGE <Send size={18} />
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>

            <style jsx="true">{`
                .contact-page {
                    padding-top: 60px;
                    padding-bottom: 80px;
                }
                .contact-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .contact-header h1 {
                    font-size: 42px;
                    margin-bottom: 15px;
                    color: var(--primary);
                    font-family: var(--font-serif);
                }
                .contact-header p {
                    color: var(--text-muted);
                    font-size: 18px;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 60px;
                }
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .info-card {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    border: 1px solid #eee;
                    transition: var(--transition);
                }
                .info-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                .info-card .icon {
                    color: var(--accent);
                    margin-bottom: 15px;
                    width: 30px;
                    height: 30px;
                }
                .info-card h3 {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .info-card p {
                    font-weight: 700;
                    margin-bottom: 5px;
                }
                .info-card span {
                    font-size: 13px;
                    color: var(--text-muted);
                }
                .contact-form-container {
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    box-shadow: 0 15px 50px rgba(0,0,0,0.05);
                    border: 1px solid #eee;
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .input-group label {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--primary);
                }
                .input-group input, .input-group textarea {
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    outline: none;
                    transition: var(--transition);
                    font-size: 14px;
                }
                .input-group input:focus, .input-group textarea:focus {
                    border-color: var(--accent);
                    background: #fff8f9;
                }
                .submit-btn {
                    background: var(--primary);
                    color: white;
                    padding: 18px;
                    border-radius: 8px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 10px;
                    transition: var(--transition);
                }
                .submit-btn:hover {
                    background: var(--accent);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(255, 63, 108, 0.2);
                }
                .success-message {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 40px;
                    color: #03a685;
                }
                .success-message h2 { margin: 20px 0 10px; color: var(--primary); }
                .success-message p { color: var(--text-muted); }

                @media (max-width: 968px) {
                    .contact-grid { grid-template-columns: 1fr; }
                    .contact-header h1 { font-size: 32px; }
                }
            `}</style>
        </div>
    );
};

export default Contact;
