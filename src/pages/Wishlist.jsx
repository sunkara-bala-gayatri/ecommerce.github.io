import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useShop();

    if (wishlist.length === 0) {
        return (
            <div className="container py-32 flex flex-col items-center text-center gap-6">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                    <Heart size={64} strokeWidth={1} />
                </div>
                <h2 className="text-3xl font-bold font-serif uppercase tracking-tight">Your Wishlist is Empty</h2>
                <p className="text-text-muted max-w-sm">Save items you love to your wishlist and they'll show up here. Start exploring our collections!</p>
                <Link to="/shop" className="px-10 py-3 bg-accent text-white font-bold rounded shadow-md hover:bg-red-600 transition-all uppercase text-sm mt-4">START SHOPPING</Link>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <div className="mb-10 pb-6 border-b border-gray-100 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight uppercase">My Wishlist ({wishlist.length} ITEMS)</h1>
                    <p className="text-sm text-text-muted">Items saved for later</p>
                </div>
                <Link to="/shop" className="text-accent text-sm font-bold border-b-2 border-accent hover:text-red-600 hover:border-red-600 transition-all">Shop More</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlist.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
