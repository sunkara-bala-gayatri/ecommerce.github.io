import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, CheckCircle, ArrowLeft, ChevronRight, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, user, clearCart, addOrder } = useShop();
    const [isOrdered, setIsOrdered] = useState(false);
    const [addressQuery, setAddressQuery] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        address: '',
        city: '',
        zip: ''
    });
    const navigate = useNavigate();

    const MOCK_ADDRESSES = [
        { address: '123 Fifth Avenue, New York, NY', city: 'New York', zip: '10003' },
        { address: '456 Fashion Blvd, Los Angeles, CA', city: 'Los Angeles', zip: '90001' },
        { address: '789 Designer Row, London, UK', city: 'London', zip: 'WC2N 5DU' },
        { address: '321 Style Street, Paris, France', city: 'Paris', zip: '75008' },
        { address: '555 Vogue Lane, Milan, Italy', city: 'Milan', zip: '20121' },
    ];

    const handleAddressChange = (e) => {
        const query = e.target.value;
        setFormData({ ...formData, address: query });
        if (query.length > 2) {
            const filtered = MOCK_ADDRESSES.filter(addr =>
                addr.address.toLowerCase().includes(query.toLowerCase())
            );
            setAddressSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectAddress = (addr) => {
        setFormData({
            ...formData,
            address: addr.address,
            city: addr.city,
            zip: addr.zip
        });
        setShowSuggestions(false);
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderId = `FH-2024-${Math.floor(1000 + Math.random() * 9000)}`;
        const orderDate = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const newOrder = {
            id: orderId,
            date: orderDate,
            total: total,
            items: cart.length,
            status: 'processing',
            timeline: [
                { status: 'Order Placed', date: `${orderDate}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, completed: true },
                { status: 'Processing', date: 'Pending', completed: false },
                { status: 'Shipped', date: 'Pending', completed: false },
                { status: 'Out for Delivery', date: 'Pending', completed: false },
                { status: 'Delivered', date: 'Pending', completed: false }
            ]
        };

        addOrder(newOrder);
        clearCart();
        setIsOrdered(true);
    };

    if (isOrdered) {
        return (
            <div className="container py-32 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 max-w-xl w-full flex flex-col items-center gap-6"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                        <CheckCircle size={64} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-bold font-serif uppercase tracking-tight">Order Placed Successfully!</h1>
                    <p className="text-text-muted leading-relaxed">Thank you for shopping with Fashion Hall. Your order <span className="text-primary font-bold">#FH{Math.floor(Math.random() * 100000)}</span> is being processed and will be delivered within 3-5 business days.</p>
                    <Link to="/" className="w-full bg-primary text-white py-4 font-bold rounded-xl shadow-lg hover:bg-accent transition-all transform hover:-translate-y-1 uppercase tracking-widest text-sm mt-4">
                        CONTINUE SHOPPING
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container py-32 text-center">
                <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
                <Link to="/shop" className="text-accent font-bold hover:underline">Go to Shop</Link>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <div className="mb-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
                <Link to="/cart" className="hover:text-accent transition-colors">Bag</Link>
                <ChevronRight size={14} />
                <span className="text-primary">Checkout</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                <form className="space-y-8" onSubmit={handlePlaceOrder}>
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                            <Truck size={20} className="text-accent" /> Shipping Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">First Name</label>
                                <input type="text" placeholder="Jane" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">Last Name</label>
                                <input type="text" placeholder="Doe" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">Email Address</label>
                                <input type="email" placeholder="jane@example.com" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <div className="md:col-span-2 space-y-2 relative">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">Shipping Address</label>
                                <input 
                                    type="text" 
                                    placeholder="123 Fashion St, Avenue 01" 
                                    className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" 
                                    required 
                                    value={formData.address}
                                    onChange={handleAddressChange}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                />
                                {showSuggestions && addressSuggestions.length > 0 && (
                                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 overflow-hidden">
                                        {addressSuggestions.map((addr, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => handleSelectAddress(addr)}
                                                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                            >
                                                {addr.address}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">City</label>
                                <input type="text" placeholder="New York" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">Postal Code</label>
                                <input type="text" placeholder="10001" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" required value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                            <CreditCard size={20} className="text-accent" /> Payment Method
                        </h3>
                        <div className="space-y-4 mb-8">
                            <label className="flex items-center justify-between p-5 border-2 border-accent bg-red-50/30 rounded-2xl cursor-pointer hover:border-accent transition-all group">
                                <div className="flex items-center gap-4">
                                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-accent" />
                                    <span className="font-bold text-sm uppercase tracking-wider">Credit / Debit Card</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-80" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MC" className="h-6 opacity-80" />
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-accent transition-all group">
                                <div className="flex items-center gap-4">
                                    <input type="radio" name="payment" className="w-5 h-5 accent-accent" />
                                    <span className="font-bold text-sm uppercase tracking-wider">Cash on Delivery (COD)</span>
                                </div>
                            </label>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-text-muted uppercase ml-1">Card Number</label>
                                <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-text-muted uppercase ml-1">Expiry Date</label>
                                    <input type="text" placeholder="MM / YY" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-text-muted uppercase ml-1">CVV</label>
                                    <input type="password" placeholder="•••" className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl focus:bg-white focus:border-accent outline-none transition-all text-sm font-medium" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white py-5 font-bold rounded-2xl shadow-xl hover:bg-accent transition-all transform hover:-translate-y-1 uppercase tracking-[3px] text-sm flex items-center justify-center gap-3">
                        PLACE ORDER <CheckCircle size={20} />
                    </button>

                    <p className="text-center text-[11px] text-text-muted uppercase tracking-widest flex items-center justify-center gap-2">
                        <Lock size={12} className="text-green-500" /> Secure encrypted checkout
                    </p>
                </form>

                <aside className="self-start sticky top-28 space-y-8">
                    <div className="bg-primary text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4 relative z-10">Order Summary</h3>
                        <div className="space-y-4 mb-8 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="w-14 h-16 bg-white/10 p-2 rounded-lg flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain filter brightness-110" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold truncate">{item.title}</p>
                                        <p className="text-[10px] text-white/60">Qty: {item.quantity} × ${item.price}</p>
                                    </div>
                                    <span className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                            <div className="flex justify-between text-xs text-white/70">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-white/70">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between items-end pt-4 mt-2">
                                <span className="text-sm font-bold uppercase tracking-wider">Total Amount</span>
                                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center gap-3 text-xs font-bold text-text-muted uppercase tracking-wider">
                        <ShieldCheck size={20} className="text-green-500" /> 30-Day Money Back Guarantee
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
