import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Star, MessageCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [showReviews, setShowReviews] = useState(false);
  const isWishlisted = wishlist.find((item) => item.id === product.id);

  return (
    <motion.div
      className="bg-white rounded-md overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-80 bg-[#fdfdfd] flex items-center justify-center p-5 overflow-hidden">
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
        </Link>

        <button
          className={`absolute top-4 right-4 w-9 h-9 border-none bg-white rounded-full flex items-center justify-center shadow-md transition-colors ${isWishlisted ? 'text-accent' : 'text-text-muted hover:text-accent'}`}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <div className="absolute -bottom-12 group-hover:bottom-0 left-0 w-full p-2.5 bg-white/90 transition-all duration-300 flex justify-center">
          <button
            className="w-full bg-primary text-white py-2.5 font-bold text-[12px] flex items-center justify-center gap-2 rounded hover:bg-accent transition-colors"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag size={18} /> ADD TO BAG
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[12px] font-bold">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating?.rate}</span>
            <span className="text-text-muted font-normal ml-0.5">({product.rating?.count})</span>
          </div>
          <button
            onClick={() => setShowReviews(true)}
            className="text-text-muted hover:text-accent flex items-center gap-1 text-[11px] font-bold"
          >
            <MessageCircle size={14} /> REVIEWS
          </button>
        </div>

        <h3 className="text-sm font-semibold text-text-main truncate mb-1">{product.title}</h3>
        <p className="text-[12px] text-text-muted mb-2.5 capitalize">{product.category}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-sm text-text-main">${product.price}</span>
          <span className="text-text-muted line-through text-[12px]">${(product.price * 1.5).toFixed(2)}</span>
          <span className="text-orange-500 text-[12px] font-bold">(50% OFF)</span>
        </div>
      </div>

      {/* Simple Reviews Modal/Overlay */}
      <AnimatePresence>
        {showReviews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-20 flex flex-col p-4"
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
              <h4 className="text-sm font-bold uppercase tracking-wider">Customer Reviews</h4>
              <button onClick={() => setShowReviews(false)} className="text-text-muted hover:text-accent">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div key={idx} className="border-b border-gray-50 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase">{rev.reviewerName}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={8} className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[12px] text-text-muted italic">"{rev.comment}"</p>
                    <span className="text-[9px] text-gray-400">{new Date(rev.date).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-[12px] text-text-muted text-center py-10 italic">No reviews yet for this product.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;
