import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist, user, logout } = useShop();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="container flex items-center justify-between gap-5">
        <Link to="/" className="font-serif text-2xl font-bold text-primary tracking-[2px] whitespace-nowrap">
          FASHION <span className="text-accent">HALL</span>
        </Link>

        <form className="hidden sm:flex flex-1 bg-bg-light rounded px-4 py-1.5 max-w-[500px] items-center" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full bg-transparent border-none text-sm outline-none py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-text-muted hover:text-accent transition-colors">
            <Search size={20} />
          </button>
        </form>

        <div className="flex items-center gap-7">
          <Link to="/shop" className="hidden lg:block font-semibold uppercase text-sm text-text-main hover:text-accent transition-colors">Shop</Link>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center gap-1 text-text-main hover:text-accent transition-colors">
                {user ? (
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User size={24} />
                )}
                <span className="hidden lg:block text-[11px] font-bold uppercase">{user ? 'Account' : 'Login'}</span>
              </Link>
              {user && (
                <button onClick={logout} className="hidden lg:block text-text-muted hover:text-accent transition-colors">
                  <LogOut size={18} />
                </button>
              )}
            </div>

            <Link to="/track-orders" className="flex flex-col items-center gap-1 text-text-main hover:text-accent transition-colors">
              <div className="relative">
                <Package size={24} />
              </div>
              <span className="hidden lg:block text-[11px] font-bold uppercase">Track Order</span>
            </Link>

            <Link to="/wishlist" className="flex flex-col items-center gap-1 text-text-main hover:text-accent transition-colors">
              <div className="relative">
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-[11px] font-bold uppercase">Wishlist</span>
            </Link>

            <Link to="/cart" className="flex flex-col items-center gap-1 text-text-main hover:text-accent transition-colors">
              <div className="relative">
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-[11px] font-bold uppercase">Bag</span>
            </Link>

            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col p-5 gap-4">
              <Link to="/" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/shop" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>Shop</Link>
              <Link to="/cart" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>Cart ({cart.length})</Link>
              <Link to="/wishlist" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>Wishlist ({wishlist.length})</Link>
              {!user ? (
                <Link to="/login" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>Login / Signup</Link>
              ) : (
                <>
                  <Link to="/profile" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>My Profile</Link>
                  <Link to="/track-orders" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>Track Orders</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-lg font-semibold text-left text-accent">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
