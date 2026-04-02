import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    }
  };

  const handleSuggestionClick = (type, value) => {
    if (type === 'product') {
      navigate(`/product/${value}`);
    } else if (type === 'category') {
      navigate(`/shop?category=${value}`);
    }
    setSearchQuery('');
    setShowSuggestions(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="container flex items-center justify-between gap-5">
        <Link to="/" className="font-serif text-2xl font-bold text-primary tracking-[2px] whitespace-nowrap">
          FASHION <span className="text-accent">HALL</span>
        </Link>

        <form className="hidden sm:flex flex-1 bg-bg-light rounded px-4 py-1.5 max-w-[500px] items-center relative search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full bg-transparent border-none text-sm outline-none py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
          />
          <button type="submit" className="text-text-muted hover:text-accent transition-colors">
            <Search size={20} />
          </button>

          {/* Premium Search Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] overflow-hidden z-20"
              >
                {/* Categories Section */}
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

                {/* Products Section */}
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

            {/* Profile Icon at the last */}
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