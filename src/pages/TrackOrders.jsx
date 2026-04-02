import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, 
    Search, 
    Clock, 
    CheckCircle2, 
    Truck, 
    AlertCircle, 
    ShoppingBag, 
    ChevronRight, 
    ChevronDown, 
    Store, 
    UserIcon, 
    MapPin,
    ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const TrackOrders = () => {
    const { orders } = useShop();
    const [activeTab, setActiveTab] = useState('ongoing'); // ongoing | history
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Derived category logic:
    // Ongoing: status is processing, in-transit, or pending
    // History: status is delivered or cancelled
    useEffect(() => {
        const filtered = orders.filter(order => {
            const isOngoing = ['processing', 'in-transit', 'pending', 'awaiting-rider'].includes(order.status?.toLowerCase());
            const matchesTab = activeTab === 'ongoing' ? isOngoing : !isOngoing;
            const matchesSearch = order.id.toLowerCase().includes(searchId.toLowerCase());
            return matchesTab && matchesSearch;
        });
        setFilteredOrders(filtered);
    }, [orders, activeTab, searchId]);

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': 
                return { icon: <CheckCircle2 size={18} />, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered', sub: 'Completed' };
            case 'in-transit': 
                return { icon: <Truck size={18} />, color: 'text-accent', bg: 'bg-red-50/50', label: 'Current Order', sub: 'In Transit' };
            case 'awaiting-rider':
                return { icon: <UserIcon size={18} />, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Awaiting Rider', sub: 'Driver dispatching' };
            case 'processing':
                return { icon: <Clock size={18} />, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Current Order', sub: 'Processing' };
            default:
                return { icon: <Package size={18} />, color: 'text-gray-500', bg: 'bg-gray-50', label: 'Order Placed', sub: 'Confirmed' };
        }
    };

    const OrderCard = ({ order }) => {
        const config = getStatusConfig(order.status);
        const isExpanded = expandedOrder === order.id;

        return (
            <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow mb-4"
            >
                <div 
                    className="p-5 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className={`w-12 h-12 rounded-full ${config.bg} ${config.color} flex items-center justify-center flex-shrink-0`}>
                            {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <Store size={14} className="text-text-muted" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Fashion Hall Main</span>
                                <span className="text-[11px] font-bold text-primary">• Order #{order.id.split('-').pop()}</span>
                            </div>
                            <h3 className="text-sm font-bold text-text-main truncate">
                                {order.items || 1} pieces • ${order.total?.toFixed(2)}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto md:flex-col md:items-end gap-2">
                        <div className="flex flex-col md:items-end">
                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">
                                {order.status === 'delivered' ? 'Completed on' : 'Due by'}
                            </span>
                            <span className="text-xs font-bold whitespace-nowrap">
                                {order.date} | 12:55 am {/* Mock time as requested */}
                            </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full ${config.bg} ${config.color} text-[10px] font-bold uppercase`}>
                            {config.label}
                        </div>
                        <button className="md:hidden text-text-muted">
                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-50 bg-gray-50/30 overflow-hidden"
                        >
                            <div className="p-6 md:px-12 md:py-8">
                                <h4 className="text-xs font-bold uppercase tracking-[2px] text-text-muted mb-8 text-center md:text-left">Shipping Progress</h4>
                                <div className="relative pl-8 space-y-8 max-w-lg mx-auto md:mx-0">
                                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                                    {order.timeline.map((step, idx) => (
                                        <div key={idx} className="relative flex items-start gap-6">
                                            <div className={`absolute -left-[30px] w-4 h-4 rounded-full border-2 bg-white z-10 
                                                ${step.completed ? 'border-accent' : 'border-gray-200'}`}
                                            >
                                                {step.completed && <div className="absolute inset-1 rounded-full bg-accent animate-pulse"></div>}
                                            </div>
                                            <div className="flex-1 -mt-1">
                                                <p className={`text-sm font-bold ${step.completed ? 'text-primary' : 'text-gray-400'}`}>
                                                    {step.status}
                                                </p>
                                                <p className="text-[11px] text-text-muted mt-1">{step.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-center md:justify-start">
                                    <Link to={`/contact`} className="text-xs font-bold text-accent uppercase tracking-widest hover:underline flex items-center gap-2">
                                        Need Help? Contact Support <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div className="bg-[#fcfbfc] min-h-screen py-12 md:py-20">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center md:text-left mb-4 uppercase tracking-tighter">Your Orders</h1>
                    <p className="text-text-muted text-center md:text-left text-sm font-medium">Keep track of your latest curated fashion picks.</p>
                </div>

                {/* Tabs & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
                        {['ongoing', 'history'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
                                    ${activeTab === tab 
                                        ? 'bg-white text-primary shadow-sm' 
                                        : 'text-text-muted hover:text-primary'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-1 max-w-md">
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-accent outline-none text-sm transition-all focus:shadow-lg focus:shadow-accent/5 font-medium"
                        />
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-200 shadow-sm border border-gray-50 mb-6">
                                    <ShoppingBag size={32} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">No {activeTab} orders found</h3>
                                <p className="text-text-muted text-sm max-w-xs mx-auto mb-8">
                                    {searchId 
                                        ? `We couldn't find any order matching "${searchId}" in your ${activeTab} list.` 
                                        : `You don't have any ${activeTab} orders at the moment.`}
                                </p>
                                <Link to="/shop" className="bg-primary text-white px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[2px] shadow-lg hover:bg-accent transition-all transform hover:-translate-y-1">
                                    Explore Collections
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination (Visual Indicator) */}
                {filteredOrders.length > 5 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {[1, 2, 3].map(p => (
                            <button key={p} className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${p === 1 ? 'bg-primary text-white' : 'bg-white border border-gray-100 text-text-muted hover:border-accent'}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrders;
