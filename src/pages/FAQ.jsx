import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I track my order?",
            answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package on our carrier's website."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most items. The products must be in their original condition with tags attached. Please visit our Returns page for more details."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Currently, we only ship within India. We are working on expanding our services to other countries soon!"
        },
        {
            question: "How can I change or cancel my order?",
            answer: "Orders can be changed or cancelled within 2 hours of placement. Please contact our support team immediately at fashion@gmail.com."
        },
        {
            question: "Are my payment details secure?",
            answer: "Yes, we use industry-standard encryption to protect your payment information. We do not store your full card details on our servers."
        },
        {
            question: "What should I do if my item arrives damaged?",
            answer: "We're sorry! Please take photos of the damaged item and contact us within 48 hours of delivery. We will arrange a replacement or refund."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container py-16 max-w-4xl">
            <div className="text-center mb-16">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
                    <HelpCircle size={32} />
                </div>
                <h1 className="text-4xl font-bold font-serif mb-4 uppercase tracking-tight">Frequently Asked Questions</h1>
                <p className="text-text-muted text-lg">Find answers to common questions about shopping at Fashion Hall.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        className={`bg-white border rounded-2xl transition-all duration-300 ${activeIndex === index ? 'border-accent shadow-lg shadow-accent/5' : 'border-gray-100 hover:border-gray-200'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <button
                            className="w-full px-8 py-6 flex justify-between items-center text-left group"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className={`font-bold transition-colors ${activeIndex === index ? 'text-accent' : 'text-primary group-hover:text-accent'}`}>{faq.question}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-accent text-white rotate-0' : 'bg-gray-50 text-gray-400 rotate-90'}`}>
                                {activeIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-8 pb-8 text-text-muted leading-relaxed text-sm">
                                        <p>{faq.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 bg-gray-50 rounded-3xl p-10 text-center border border-gray-100">
                <h3 className="text-xl font-bold mb-3 uppercase font-serif">Still have questions?</h3>
                <p className="text-text-muted mb-8 max-w-md mx-auto">Can't find the answer you're looking for? Please chat with our friendly team.</p>
                <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-accent transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 uppercase tracking-widest text-xs"
                >
                    Contact Support <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default FAQ;
