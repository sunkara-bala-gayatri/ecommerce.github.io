import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, CreditCard, RefreshCcw, Info } from 'lucide-react';

const Terms = () => {
    const sections = [
        {
            icon: <Shield size={24} />,
            title: "1. Acceptance of Terms",
            content: "By accessing and using Fashion Hall, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
        },
        {
            icon: <FileText size={24} />,
            title: "2. Privacy Policy",
            content: "Registration data and certain other information about you is subject to our Privacy Policy. For more information, please review our full privacy policy at fashionhall.com/privacy."
        },
        {
            icon: <CreditCard size={24} />,
            title: "3. Payment & Billing",
            content: "We accept various forms of payment, including credit cards and Cash on Delivery. All transactions are processed securely. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store."
        },
        {
            icon: <RefreshCcw size={24} />,
            title: "4. Returns & Refunds",
            content: "Items can be returned within 30 days of purchase in their original condition. Refunds will be processed to the original payment method within 7-10 business days after we receive the returned item."
        },
        {
            icon: <Lock size={24} />,
            title: "5. Account Security",
            content: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password."
        }
    ];

    return (
        <div className="container py-16 max-w-4xl">
            <motion.div
                className="text-center mb-16 px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 uppercase tracking-tight">Terms & <span className="text-accent">Conditions</span></h1>
                <div className="flex items-center justify-center gap-2 text-text-muted text-xs font-bold uppercase tracking-widest">
                    <span className="w-12 h-[1px] bg-gray-200"></span>
                    Last Updated: February 2026
                    <span className="w-12 h-[1px] bg-gray-200"></span>
                </div>
            </motion.div>

            <div className="space-y-12">
                <div className="bg-gray-50 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-gray-200 opacity-20 transition-opacity group-hover:opacity-40">
                        <Info size={120} strokeWidth={1} />
                    </div>
                    <p className="text-primary/80 leading-relaxed relative z-10 italic">Welcome to Fashion Hall. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Fashion Hall's website if you do not accept all of the terms and conditions stated on this page.</p>
                </div>

                <div className="space-y-10">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-accent shadow-sm group-hover:shadow-md group-hover:border-accent/20 transition-all flex-shrink-0">
                                    {section.icon}
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold uppercase tracking-wide text-primary group-hover:text-accent transition-colors">{section.title}</h2>
                                    <p className="text-text-muted leading-relaxed text-[15px]">{section.content}</p>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <div className="pt-12 border-t border-gray-100 text-center text-[11px] text-text-muted uppercase tracking-[3px]">
                    © 2026 Fashion Hall. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default Terms;
