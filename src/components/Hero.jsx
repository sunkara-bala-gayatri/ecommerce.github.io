import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const backgrounds = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full relative flex items-center overflow-hidden -mt-20 md:-mt-[76px]">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentBg}
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgrounds[currentBg]})` }}
        />
      </AnimatePresence>

      <div className="container text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl"
        >
          <span className="font-bold tracking-[3px] md:tracking-[4px] mb-4 md:mb-5 block text-xs md:text-sm uppercase">New Arrivals 2026</span>
          <h1 className="text-4xl md:text-8xl leading-[1.1] mb-6 md:mb-8 font-serif uppercase">
            Define Your <br /> <span className="text-accent italic">Signature Style</span>
          </h1>
          <p className="text-base md:text-xl max-w-lg mb-8 md:mb-10 opacity-90 leading-relaxed font-medium">
            Explore our curated collections of premium fashion.
            From minimalist essentials to statement pieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-accent text-white font-bold uppercase text-sm rounded shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1">
              Shop Now <ChevronRight size={20} />
            </Link>
            <Link to="/shop?category=women's%20clothing" className="inline-flex items-center justify-center gap-2.5 px-9 py-4 border-2 border-white text-white font-bold uppercase text-sm rounded hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
              Explore Collections
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-4 md:right-10 flex gap-4">
        {backgrounds.map((_, index) => (
          <div
            key={index}
            className={`h-1 cursor-pointer transition-all duration-300 ${index === currentBg ? 'bg-accent w-12 md:w-15' : 'bg-white/30 w-8 md:w-10'}`}
            onClick={() => setCurrentBg(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
