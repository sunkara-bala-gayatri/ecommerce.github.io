import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Star, ChevronLeft, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlist } = useShop();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="h-[70vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-accent rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">Product not found</h2>
            <Link to="/shop" className="text-accent hover:underline flex items-center gap-2">
                <ChevronLeft size={18} /> Back to Shop
            </Link>
        </div>
    );

    const isWishlisted = wishlist.find(item => item.id === product.id);

    return (
        <div className="container py-8 md:py-12 px-4 md:px-0">
            <div className="mb-6 md:mb-8">
                <Link to="/shop" className="text-text-muted hover:text-accent flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors">
                    <ChevronLeft size={18} /> Back to Shop
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-sm flex items-center justify-center min-h-[400px] md:min-h-[500px]"
                >
                    <img src={product.image} alt={product.title} loading="lazy" className="max-w-full max-h-[400px] md:max-h-[500px] object-contain mix-blend-multiply" />
                </motion.div>

                {/* Details Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-2 md:px-0"
                >
                    <div className="mb-6">
                        <span className="text-accent font-bold uppercase tracking-[3px] text-[10px] md:text-xs mb-3 block">{product.category}</span>
                        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-4 leading-tight uppercase tracking-tight">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-xs">{product.rating?.rate}</span>
                            </div>
                            <span className="text-text-muted text-[11px] font-bold uppercase tracking-wider border-l border-gray-100 pl-4">{product.rating?.count} reviews</span>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-primary">${product.price}</span>
                            <span className="text-lg text-text-muted line-through opacity-50">${(product.price * 1.5).toFixed(2)}</span>
                            <span className="text-accent font-bold px-3 py-1 bg-accent/5 rounded-full text-[11px] uppercase tracking-widest border border-accent/10">50% OFF</span>
                        </div>

                        <p className="text-text-muted leading-relaxed mb-10 max-w-xl text-sm md:text-base font-medium">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary text-white py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all transform active:scale-95 shadow-xl uppercase tracking-widest text-xs"
                            >
                                <ShoppingBag size={20} /> ADD TO CART
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`w-full sm:w-auto px-10 py-4 border-2 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs uppercase tracking-widest ${isWishlisted ? 'border-accent text-accent bg-accent/5' : 'border-gray-100 hover:border-accent text-text-main'}`}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                <Truck size={20} className="text-accent" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                <ShieldCheck size={20} className="text-accent" />
                                <span>Secure SSL</span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                <RotateCcw size={20} className="text-accent" />
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="mt-20">
                <div className="flex gap-8 border-b border-gray-100 mb-10 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all relative flex-shrink-0 ${activeTab === 'description' ? 'text-accent' : 'text-text-muted'}`}
                    >
                        Description
                        {activeTab === 'description' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all relative flex-shrink-0 ${activeTab === 'reviews' ? 'text-accent' : 'text-text-muted'}`}
                    >
                        Reviews ({product.reviews?.length || 0})
                        {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
                    </button>
                </div>

                <div className="min-h-[200px]">
                    {activeTab === 'description' ? (
                        <div className="max-w-3xl px-2">
                            <h3 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-tight">Product Overview</h3>
                            <p className="text-text-muted leading-relaxed mb-6 text-sm">{product.description}</p>
                            <ul className="space-y-3 text-xs text-text-muted list-disc pl-5 font-medium">
                                <li>Premium high-quality material</li>
                                <li>Ergonomic design for maximum comfort</li>
                                <li>Sustainably sourced and manufactured</li>
                                <li>Limited edition signature series</li>
                            </ul>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-2">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((rev, idx) => (
                                    <div key={idx} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-50">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-primary mb-1 text-sm">{rev.reviewerName}</h4>
                                                <span className="text-[10px] text-text-muted uppercase tracking-wider">{new Date(rev.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs md:text-sm text-text-muted italic leading-relaxed">"{rev.comment}"</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                    <p className="text-text-muted text-sm font-medium">No reviews yet for this product.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
