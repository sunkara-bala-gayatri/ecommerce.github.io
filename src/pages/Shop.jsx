import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, SlidersHorizontal, Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Shop = () => {
  const { products: allProducts, categories, isDataLoading } = useShop();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState(1000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    let result = [...allProducts];

    // Filter by Search
    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Sort function
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));

    setFilteredProducts(result);
  }, [allProducts, selectedCategory, sortBy, priceRange, searchQuery]);

  if (isDataLoading) return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-accent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="container py-12">
      <div className="mb-10">
        <div className="text-[12px] text-text-muted mb-2 font-medium tracking-wide">
          Home / Shop {selectedCategory !== 'all' && `/ ${selectedCategory}`}
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">
              {searchQuery ? `Search results for "${searchQuery}"` : selectedCategory === 'all' ? 'All Collections' : selectedCategory}
            </h1>
            <p className="text-sm text-text-muted">{filteredProducts.length} items found</p>
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded text-sm font-bold uppercase"
          >
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block sticky top-24 self-start space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-5">Categories</h3>
            <div className="relative group/cat">
              <div className="px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-between text-sm cursor-pointer hover:border-accent transition-all bg-gray-50/50">
                <span className="font-medium capitalize">{selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${selectedCategory !== 'all' ? 'text-accent' : 'text-gray-400'}`} />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-3 text-[10px] font-bold text-accent uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                <X size={10} /> Clear Filter
              </button>
            )}
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-5 flex justify-between">
              Price Range <span className="text-accent">${priceRange}</span>
            </h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        </aside>

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-[70] p-6 lg:hidden shadow-2xl overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold uppercase">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}><X size={24} /></button>
                </div>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-sm font-bold uppercase mb-4">Categories</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input type="radio" checked={selectedCategory === 'all'} onChange={() => { setSelectedCategory('all'); setShowMobileFilters(false); }} className="accent-accent w-4 h-4" />
                        <span className="text-sm">All Categories</span>
                      </label>
                      {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-3 capitalize">
                          <input type="radio" checked={selectedCategory === cat} onChange={() => { setSelectedCategory(cat); setShowMobileFilters(false); }} className="accent-accent w-4 h-4" />
                          <span className="text-sm">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase mb-4 flex justify-between">Price Up To <span>${priceRange}</span></h3>
                    <input type="range" min="0" max="1000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-accent" />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Listing */}
        <main>
          <div className="flex justify-end mb-8">
            <div className="relative group/sort min-w-[180px]">
              <div className="px-4 py-2 border border-gray-200 rounded flex items-center justify-between text-sm cursor-pointer group-hover/sort:border-accent group-hover/sort:border-2 transition-all">
                <span>Sort by: <span className="font-bold capitalize">{sortBy}</span></span>
                <ChevronDown size={14} />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" layout>
            <AnimatePresence>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="flex justify-center mb-6">
                <SearchIcon size={64} className="text-gray-200" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-text-muted max-w-sm mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setPriceRange(1000); }}
                className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded uppercase text-sm hover:bg-accent transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
