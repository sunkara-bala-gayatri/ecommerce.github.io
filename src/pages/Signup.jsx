import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email });
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-16 px-4">
      <motion.div
        className="bg-white w-full max-w-[480px] p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 font-serif uppercase tracking-tight">Create Account</h1>
          <p className="text-text-muted text-sm">Join Fashion Hall for a personalized, premium experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-[1px] ml-1">Full Name</label>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-xl focus-within:bg-white focus-within:border-accent focus-within:ring-4 ring-accent/5 transition-all">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="bg-transparent border-none outline-none w-full text-sm font-medium"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-[1px] ml-1">Email Address</label>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-xl focus-within:bg-white focus-within:border-accent focus-within:ring-4 ring-accent/5 transition-all">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="you@email.com"
                className="bg-transparent border-none outline-none w-full text-sm font-medium"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-[1px] ml-1">Password</label>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-xl focus-within:bg-white focus-within:border-accent focus-within:ring-4 ring-accent/5 transition-all">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent border-none outline-none w-full text-sm font-medium"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <p className="text-[11px] text-text-muted leading-relaxed px-1">
            By signing up, you agree to our <a href="#" className="text-accent font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-accent font-bold hover:underline">Privacy Policy</a>.
          </p>

          <button type="submit" className="w-full bg-primary text-white py-4 font-bold rounded-xl shadow-lg hover:bg-accent transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
            SIGN UP <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-text-muted">
          Already have an account? <Link to="/login" className="text-accent font-bold hover:underline ml-1">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
