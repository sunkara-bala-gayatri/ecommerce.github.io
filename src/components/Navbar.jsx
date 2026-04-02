import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Package, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cart, wishlist, user, logout, products, categories } = useShop();
  const navigate = useNavigate();

  // Function to filter suggestions locally
  const updateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions({ products: [], categories: [] });
      setShowSuggestions(false);
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Filter categories
    const matchedCategories = categories
      .filter(cat => cat.toLowerCase().includes(lowerQuery))
      .slice(0, 3);

    // Filter products (by title, brand, or category)
    const matchedProducts = products
      .filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        (p.brand && p.brand.toLowerCase().includes(lowerQuery)) ||
        p.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5);

    setSuggestions({
      products: matchedProducts,
      categories: matchedCategories
    });
    setShowSuggestions(true);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateSuggestions(searchQuery);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Close suggestions on click-away
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setIsOpen(false);
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions({ products: [], categories: [] });
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (type, value) => {
    if (type === 'product') {
      navigate(`/product/${value}`);
    } else if (type === 'category') {
      navigate(`/shop?category=${value}`);
    }
    setSearchQuery('');
    setSuggestions({ products: [], categories: [] });
    setShowSuggestions(false);
    setIsOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      {/* Mobile Header (Top Search Bar + Menu) */}
      <div className="sm:hidden container py-2 flex items-center gap-3">
        <button 
          className="flex-1 bg-bg-light rounded-xl px-4 py-3 flex items-center gap-3 text-text-muted transition-all active:scale-95 touch-manipulation"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search size={18} />
          <span className="text-sm font-medium">Search products...</span>
        </button>
        <button 
          className="w-11 h-11 flex items-center justify-center bg-bg-light rounded-xl text-primary touch-manipulation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full-screen Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[60] p-4 flex flex-col sm:hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-bg-light rounded-2xl px-4 py-3 flex items-center gap-3 relative search-container">
                <Search size={22} className="text-gray-400" />
                <form className="flex-1" onSubmit={handleSearch}>
                  <input
                    autoFocus
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full bg-transparent border-none text-base outline-none py-1 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                {searchQuery && (
                  <button type="button" onClick={clearSearch} className="text-text-muted hover:text-accent p-1">
                    <X size={20} />
                  </button>
                )}
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-sm font-bold text-accent uppercase tracking-wider p-2"
              >
                Cancel
              </button>
            </div>

            {/* Mobile Suggestions Container */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence>
                {(suggestions.products.length > 0 || suggestions.categories.length > 0) ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {suggestions.categories.length > 0 && (
                      <div className="px-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => handleSuggestionClick('category', cat)}
                              className="px-4 py-2 bg-bg-light active:bg-accent active:text-white border border-gray-100 text-sm rounded-full transition-all capitalize"
                            >
                              {cat.replace('-', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {suggestions.products.length > 0 && (
                      <div className="px-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Suggested Products</h4>
                        <div className="space-y-4">
                          {suggestions.products.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleSuggestionClick('product', p.id)}
                              className="w-full flex items-center gap-4 text-left group"
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-bg-light border border-gray-100 flex-shrink-0 p-1">
                                <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-text-main truncate group-active:text-accent transition-colors">
                                  {p.title}
                                </p>
                                <p className="text-xs text-text-muted truncate">
                                  {p.brand || p.category}
                                </p>
                                <p className="text-sm font-bold text-accent mt-0.5">
                                  ${p.price}
                                </p>
                              </div>
                              <ChevronRight className="text-gray-300" size={18} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  searchQuery.length > 2 && (
                    <div className="text-center py-10">
                      <p className="text-text-muted text-sm italic">No results found for "{searchQuery}"</p>
                    </div>
                  )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header */}
      <div className="hidden sm:flex container items-center justify-between gap-5 py-4">
        <Link to="/" className="font-serif text-2xl font-bold text-primary tracking-[2px] whitespace-nowrap">
          FASHION <span className="text-accent">HALL</span>
        </Link>

        {/* Desktop Search Bar */}
        <form className="hidden sm:flex flex-1 bg-bg-light rounded px-4 py-1.5 max-w-[500px] items-center relative search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full bg-transparent border-none text-sm outline-none py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
          />
          <div className="flex items-center gap-2">
            {searchQuery && (
              <button type="button" onClick={clearSearch}>
                <X size={18} className="text-gray-400 hover:text-accent transition-colors" />
              </button>
            )}
            <button type="submit" className="text-text-muted hover:text-accent transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] overflow-hidden z-20"
              >
                {suggestions.categories.length > 0 && (
                  <div className="p-3 border-b border-gray-50">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 px-2">Related Categories</h4>
                    <div className="flex flex-wrap gap-2 px-2 pb-1">
                      {suggestions.categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleSuggestionClick('category', cat)}
                          className="px-3 py-1 bg-bg-light hover:bg-accent hover:text-white text-[11px] rounded-full transition-all duration-200 capitalize"
                        >
                          {cat.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {suggestions.products.length > 0 && (
                  <div className="py-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 px-5">Suggested Products</h4>
                    <ul>
                      {suggestions.products.map((p) => (
                        <li key={p.id}>
                          <button
                            onClick={() => handleSuggestionClick('product', p.id)}
                            className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-bg-light transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                              <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-text-main truncate group-hover:text-accent transition-colors">
                                {p.title}
                              </p>
                              {p.brand && (
                                <p className="text-[11px] text-text-muted truncate">
                                  {p.brand}
                                </p>
                              )}
                            </div>
                            <span className="text-sm font-bold text-accent">
                              ${p.price}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="p-3 bg-gray-50/50 border-t border-gray-100 text-center">
                  <button
                    onClick={handleSearch}
                    className="text-[11px] font-bold uppercase text-accent hover:underline"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="flex items-center gap-7">
          <Link to="/shop" className="hidden lg:block font-semibold uppercase text-sm text-text-main hover:text-accent transition-colors">Shop</Link>
          <div className="flex items-center gap-5">
            <Link to="/track-orders" className="flex flex-col items-center gap-1 text-text-main hover:text-accent transition-colors">
              <Package size={24} />
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
          </div>
        </div>
      </div>

      {/* Mobile Menu Side (Hamburger) overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col p-6 gap-5">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <Link to="/track-orders" className="flex flex-col items-center gap-2 p-4 bg-bg-light rounded-2xl hover:bg-accent/5 transition-colors" onClick={() => setIsOpen(false)}>
                  <Package className="text-accent" size={20} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-main">Track Order</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center gap-2 p-4 bg-bg-light rounded-2xl hover:bg-accent/5 transition-colors" onClick={() => setIsOpen(false)}>
                   <Heart className="text-red-500" size={20} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-main">Wishlist ({wishlist.length})</span>
                </Link>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-2">Navigation</h4>
                <div className="flex flex-col gap-1">
                  <Link to="/" className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-light transition-colors font-bold text-sm" onClick={() => setIsOpen(false)}>
                    Home <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                  <Link to="/shop" className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-light transition-colors font-bold text-sm" onClick={() => setIsOpen(false)}>
                    All Collections <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                  <Link to="/cart" className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-light transition-colors font-bold text-sm" onClick={() => setIsOpen(false)}>
                    Shopping Bag <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-full">{cart.length}</span>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 pb-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-2">Account</h4>
                {!user ? (
                  <Link to="/login" className="flex items-center justify-center p-3.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform" onClick={() => setIsOpen(false)}>
                    Login / Create Account
                  </Link>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link to="/profile" className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-light transition-colors font-bold text-sm" onClick={() => setIsOpen(false)}>
                      My Profile <ChevronRight size={16} className="text-gray-300" />
                    </Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors font-bold text-sm text-red-500">
                      Sign Out <LogOut size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;