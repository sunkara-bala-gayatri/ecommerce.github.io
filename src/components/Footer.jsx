import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Github, ChevronRight, X, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { categories, products } = useShop();
  const [activeCategory, setActiveCategory] = useState(null);

  const footerLinks = [
    { name: 'Men', slug: 'mens-shirts' },
    { name: 'Women', slug: 'womens-dresses' },
    { name: 'Accessories', slug: 'womens-jewellery' },
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'Beauty', slug: 'beauty' },
  ];

  const getCategoryProducts = (slug) => {
    return products.filter(p => p.category === slug).slice(0, 4);
  };

  return (
    <footer className="bg-[#fdfdfd] border-t border-gray-100 pt-20 pb-8 mt-24 relative">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-16">
        <div className="footer-section">
          <h3 className="font-serif text-2xl font-bold text-primary tracking-[2px] mb-6">
            FASHION <span className="text-accent">HALL</span>
          </h3>
          <p className="text-text-muted leading-relaxed mb-6 text-sm max-w-[300px]">
            Experience the future of fashion. Curated collections,
            premium quality, and sustainable choices.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Github size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="uppercase text-sm font-bold tracking-wider text-primary mb-6">Online Shopping</h4>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => setActiveCategory(activeCategory === link.slug ? null : link.slug)}
                  className={`text-sm transition-all flex items-center gap-2 ${activeCategory === link.slug ? 'text-accent font-bold pl-2' : 'text-text-muted hover:text-accent hover:pl-1'}`}
                >
                  {link.name}
                  <ChevronRight size={14} className={`transition-transform ${activeCategory === link.slug ? 'rotate-90' : ''}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-sm font-bold tracking-wider text-primary mb-6">Customer Policies</h4>
          <ul className="space-y-3">
            <li><Link to="/contact" className="text-text-muted text-sm hover:text-accent hover:pl-1 transition-all">Contact Us</Link></li>
            <li><Link to="/faq" className="text-text-muted text-sm hover:text-accent hover:pl-1 transition-all">FAQ</Link></li>
            <li><Link to="/terms" className="text-text-muted text-sm hover:text-accent hover:pl-1 transition-all">T&C</Link></li>
            <li><Link to="/track-orders" className="text-text-muted text-sm hover:text-accent hover:pl-1 transition-all">Track Orders</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-sm font-bold tracking-wider text-primary mb-6">Keep In Touch</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-text-muted text-sm">
              <Mail size={18} />
              <span>fashion@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted text-sm">
              <Phone size={18} />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-start gap-3 text-text-muted text-sm">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <span>vijayawada, 520010</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Category Dropdown/Modal */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full left-0 w-full bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-gray-100 z-50 py-12"
          >
            <div className="container relative">
              <button
                onClick={() => setActiveCategory(null)}
                className="absolute top-0 right-0 p-2 text-text-muted hover:text-accent transition-colors"
                aria-label="Close Preview"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary capitalize flex items-center gap-3">
                    {activeCategory.replace('-', ' ')} Preview
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-widest font-sans">New</span>
                  </h3>
                  <p className="text-text-muted text-sm mt-1">Explore our latest arrivals in this category</p>
                </div>
                <Link
                  to={`/shop?category=${activeCategory}`}
                  onClick={() => setActiveCategory(null)}
                  className="px-8 py-3 bg-primary text-white text-xs font-bold rounded-full hover:bg-accent transition-all uppercase tracking-widest shadow-lg shadow-primary/10"
                >
                  View All Products
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {getCategoryProducts(activeCategory).map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/product/${product.id}`} onClick={() => setActiveCategory(null)}>
                      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center p-6 border border-gray-100 group-hover:border-accent/20 transition-colors">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors" />
                      </div>
                      <h4 className="text-sm font-bold truncate group-hover:text-accent transition-colors">{product.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-primary">${product.price}</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-text-muted">
                          <Star size={10} className="fill-yellow-400 text-yellow-400" />
                          {product.rating?.rate}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-gray-100 pt-8 text-center text-text-muted text-[13px]">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Fashion Hall. All rights reserved. Made with ❤️ by Gayatri.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
