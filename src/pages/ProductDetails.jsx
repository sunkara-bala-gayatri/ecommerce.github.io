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
        <div className="container py-12 px-4 md:px-0">
            <div className="mb-8">
                <Link to="/shop" className="text-text-muted hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors">
                    <ChevronLeft size={18} /> Back to Shop
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-sm flex items-center justify-center min-h-[500px]"
                >
                    <img src={product.image} alt={product.title} className="max-w-full max-h-[500px] object-contain mix-blend-multiply" />
                </motion.div>

                {/* Details Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="mb-6">
                        <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">{product.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-sm">{product.rating?.rate}</span>
                            </div>
                            <span className="text-text-muted text-sm border-l border-gray-200 pl-4">{product.rating?.count} verified reviews</span>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-primary">${product.price}</span>
                            <span className="text-xl text-text-muted line-through">${(product.price * 1.5).toFixed(2)}</span>
                            <span className="text-green-600 font-bold px-2 py-1 bg-green-50 rounded text-sm">Save 50%</span>
                        </div>

                        <p className="text-text-muted leading-relaxed mb-8 max-w-xl">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all transform hover:scale-[1.02] shadow-lg"
                            >
                                <ShoppingBag size={20} /> ADD TO CART
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`w-full sm:w-auto px-8 py-4 border-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isWishlisted ? 'border-accent text-accent' : 'border-gray-100 hover:border-accent text-text-main'}`}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                                <Truck size={20} className="text-accent" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                                <ShieldCheck size={20} className="text-accent" />
                                <span>Secure Checkout</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                                <RotateCcw size={20} className="text-accent" />
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="mt-20">
                <div className="flex gap-8 border-b border-gray-200 mb-10">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'description' ? 'text-accent' : 'text-text-muted'}`}
                    >
                        Description
                        {activeTab === 'description' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'reviews' ? 'text-accent' : 'text-text-muted'}`}
                    >
                        Reviews ({product.reviews?.length || 0})
                        {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />}
                    </button>
                </div>

                <div className="min-h-[200px]">
                    {activeTab === 'description' ? (
                        <div className="max-w-3xl">
                            <h3 className="text-xl font-bold mb-4">Product Overview</h3>
                            <p className="text-text-muted leading-relaxed mb-6">{product.description}</p>
                            <ul className="space-y-3 text-sm text-text-muted list-disc pl-5">
                                <li>Premium high-quality material</li>
                                <li>Ergonomic design for maximum comfort</li>
                                <li>Sustainably sourced and manufactured</li>
                                <li>Limited edition signature series</li>
                            </ul>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((rev, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-primary mb-1">{rev.reviewerName}</h4>
                                                <span className="text-xs text-text-muted">{new Date(rev.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-text-muted italic leading-relaxed">"{rev.comment}"</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                    <p className="text-text-muted">No reviews yet for this product. Be the first to share your thoughts!</p>
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
