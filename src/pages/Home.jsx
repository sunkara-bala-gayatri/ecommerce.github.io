import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Home = () => {
  const { categories, isDataLoading } = useShop();

  // For the home page, we'll keep the curated categories with images as fallbacks or primary links,
  // but ensure we're syncing with the context categories if we want to expand.
  const homeCategories = [
    { title: "WOMEN'S BAGS", img: "https://plus.unsplash.com/premium_photo-1673758910970-b773f66ab7b6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/shop?category=womens-bags" },
    { title: "SMARTPHONES", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop", path: "/shop?category=smartphones" },
    { title: "ACCESSORIES", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop", path: "/shop?category=womens-jewellery" },
    { title: "MEN'S WEAR", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop", path: "/shop?category=mens-shirts" },
    { title: "BEAUTY", img: "https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/shop?category=beauty" },
    { title: "SUNGLASSES", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/shop?category=sunglasses" },
  ];

  return (
    <div className="home-page overflow-x-hidden">
      <Hero />

      <section className="container py-20 px-4 md:px-0">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent font-bold uppercase tracking-[3px] text-xs mb-2 block">Collections</span>
            <h2 className="text-4xl font-serif font-bold tracking-tight">EXPLORE CATEGORIES</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 font-bold text-accent hover:underline group">
            View All <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeCategories.map((cat, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-[450px] overflow-hidden">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end items-center text-center">
                <h3 className="text-xl mb-4 font-serif font-bold text-white tracking-wide">{cat.title}</h3>
                <Link to={cat.path} className="px-6 py-2.5 bg-white text-primary text-xs font-bold rounded-full hover:bg-accent hover:text-white transition-all transform hover:scale-105 uppercase tracking-widest shadow-xl">
                  SHOP NOW
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-40 text-center text-white bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="container promo-content relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-accent font-bold uppercase tracking-[5px] text-sm mb-6 block">Limited Time Offer</span>
            <h2 className="text-6xl md:text-8xl mb-8 font-serif font-bold tracking-tight">FLAT 50% OFF</h2>
            <p className="text-xl mb-12 opacity-80 leading-relaxed font-light">Experience the finest fabric and craftsmanship. Our end-of-season sale is officially live. Don't miss out on premium luxury.</p>
            <Link to="/shop" className="inline-block px-12 py-5 bg-accent text-white font-bold rounded-full shadow-[0_10px_30px_rgba(255,63,108,0.4)] hover:bg-white hover:text-accent transition-all duration-300 transform hover:scale-110 uppercase tracking-widest text-sm">
              CLAIM DISCOUNT NOW
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
