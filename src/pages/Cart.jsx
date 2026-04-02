import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, Heart, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, toggleWishlist, wishlist } = useShop();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    const isInWishlist = (id) => wishlist.some(item => item.id === id);

    if (cart.length === 0) {
        return (
            <div className="container py-32 flex flex-col items-center text-center gap-6">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                    <ShoppingBag size={64} strokeWidth={1} />
                </div>
                <h2 className="text-3xl font-bold font-serif">Your Bag is Empty</h2>
                <p className="text-text-muted max-w-sm">Looks like you haven't added anything to your bag yet. Explore our latest collections!</p>
                <Link to="/shop" className="px-10 py-3 bg-accent text-white font-bold rounded shadow-md hover:bg-red-600 transition-all uppercase text-sm mt-4">SHOP NOW</Link>
            </div>
        );
    }

    return (
        <div className="container py-12 px-4 md:px-0">
            <div className="mb-10 pb-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold tracking-tight uppercase">My Shopping Bag ({cart.length} ITEMS)</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                <div className="space-y-6">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <div className="w-full sm:w-32 h-48 sm:h-40 bg-bg-light p-4 rounded-xl flex-shrink-0 flex items-center justify-center">
                                    <img src={item.image} alt={item.title} loading="lazy" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">{item.title}</h3>
                                            <span className="text-lg font-bold ml-4">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-[12px] text-text-muted capitalize mb-4">{item.category}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                                <button
                                                    disabled={item.quantity <= 1}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-all active:scale-90 disabled:opacity-30"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-bold text-base min-w-[20px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-all active:scale-90"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleWishlist(item)}
                                                    className={`p-3 rounded-full hover:bg-red-50 transition-all active:scale-90 ${isInWishlist(item.id) ? 'text-accent' : 'text-gray-300'}`}
                                                >
                                                    <Heart size={22} fill={isInWishlist(item.id) ? "currentColor" : "none"} />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
                                                >
                                                    <Trash2 size={22} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-text-muted">
                                        <span>Unit Price: ${item.price} each</span>
                                        <span className="text-green-600 font-bold uppercase tracking-wider">In Stock</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <Link to="/shop" className="inline-flex items-center gap-2 font-bold text-sm hover:text-accent transition-colors group px-2">
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> Continue Shopping
                    </Link>
                </div>

                <aside className="self-start lg:sticky lg:top-28 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Order Summary</h3>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-muted">Bag Total</span>
                            <span className="font-bold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-muted">Shipping Fee</span>
                            <span className={shipping === 0 ? 'text-green-600 font-bold' : 'font-bold'}>
                                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                            </span>
                        </div>
                        {shipping > 0 && (
                            <p className="text-[11px] text-orange-500 italic font-medium">Add ${(500 - subtotal).toFixed(2)} more for FREE shipping!</p>
                        )}
                        <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                            <span className="text-base font-bold">Total Amount</span>
                            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-accent text-white py-5 font-bold rounded-xl shadow-lg hover:bg-red-600 shadow-accent/20 transition-all transform active:translate-y-0.5 hover:-translate-y-1 uppercase tracking-wider mb-6"
                    >
                        PROCEED TO CHECKOUT
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted border-t border-gray-50 pt-6">
                        <ShieldCheck size={16} className="text-green-500" />
                        <span>Secure SSL Encryption & 30-Day Returns</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
