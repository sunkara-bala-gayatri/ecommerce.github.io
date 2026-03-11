import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

export const MOCK_ORDERS = [
    {
        id: 'ORD-2024-9012',
        date: 'March 8, 2024',
        total: 245.00,
        items: 3,
        status: 'delivered',
        timeline: [
            { status: 'Order Placed', date: 'Mar 8, 10:30 AM', completed: true },
            { status: 'Processing', date: 'Mar 8, 02:15 PM', completed: true },
            { status: 'Shipped', date: 'Mar 9, 09:00 AM', completed: true },
            { status: 'Out for Delivery', date: 'Mar 10, 08:30 AM', completed: true },
            { status: 'Delivered', date: 'Mar 10, 02:45 PM', completed: true }
        ]
    },
    {
        id: 'ORD-2024-9088',
        date: 'March 14, 2024',
        total: 89.99,
        items: 1,
        status: 'in-transit',
        timeline: [
            { status: 'Order Placed', date: 'Mar 14, 11:20 AM', completed: true },
            { status: 'Processing', date: 'Mar 14, 04:00 PM', completed: true },
            { status: 'Shipped', date: 'Mar 15, 10:00 AM', completed: true },
            { status: 'Out for Delivery', date: 'Pending', completed: false },
            { status: 'Delivered', date: 'Pending', completed: false }
        ]
    }
];

const TrackOrders = () => {
    const [searchId, setSearchId] = useState('');
    const [activeOrder, setActiveOrder] = useState(MOCK_ORDERS[1]);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        const found = MOCK_ORDERS.find(o => o.id.toLowerCase() === searchId.toLowerCase());
        if (found) {
            setActiveOrder(found);
            setError('');
        } else {
            setActiveOrder(null);
            setError(`No order found with ID: ${searchId}`);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered': return <CheckCircle2 className="text-green-500" size={24} />;
            case 'in-transit': return <Truck className="text-accent" size={24} />;
            default: return <Clock className="text-orange-500" size={24} />;
        }
    };

    return (
        <div className="bg-gray-50/50 min-h-screen py-16">
            <div className="container max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase tracking-tight">Track Your Order</h1>
                    <p className="text-text-muted">Enter your order ID below to see the current shipping status.</p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-10"
                >
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="e.g. ORD-2024-9088"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-accent focus:ring-4 ring-accent/5 outline-none transition-all font-medium"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all text-sm flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1"
                        >
                            <Search size={18} /> Track
                        </button>
                    </form>
                </motion.div>

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex items-center gap-3 justify-center text-sm font-medium"
                    >
                        <AlertCircle size={20} /> {error}
                    </motion.div>
                )}

                {/* Order Details */}
                {activeOrder && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
                            <div>
                                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Order ID</p>
                                <h2 className="text-xl font-bold">{activeOrder.id}</h2>
                            </div>
                            <div className="flex flex-col md:items-end">
                                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Order Date</p>
                                <p className="font-medium text-sm">{activeOrder.date}</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="p-6 md:p-10">
                            <div className="flex items-center gap-3 mb-8">
                                {getStatusIcon(activeOrder.status)}
                                <h3 className="text-lg font-bold capitalize">
                                    {activeOrder.status === 'in-transit' ? 'In Transit' : activeOrder.status}
                                </h3>
                            </div>

                            <div className="relative pl-6 md:pl-8 space-y-8">
                                {/* Vertical Line */}
                                <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                {activeOrder.timeline.map((step, index) => (
                                    <div key={index} className="relative flex items-start gap-4 md:gap-6">
                                        {/* Circle Node */}
                                        <div className={`absolute -left-[30px] md:-left-[39px] w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white
                      ${step.completed ? 'border-accent' : 'border-gray-200'}
                    `}>
                                            {step.completed && <div className="w-2 h-2 rounded-full bg-accent"></div>}
                                        </div>

                                        <div className="flex-1 -mt-1.5">
                                            <p className={`font-bold ${step.completed ? 'text-text-main' : 'text-gray-400'}`}>
                                                {step.status}
                                            </p>
                                            <p className="text-xs text-text-muted mt-1">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center text-sm font-bold">
                            <p className="text-text-muted">{activeOrder.items} Item{activeOrder.items > 1 ? 's' : ''}</p>
                            <p>Total: ${activeOrder.total.toFixed(2)}</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TrackOrders;
