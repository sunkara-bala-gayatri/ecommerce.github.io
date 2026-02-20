import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login
    login({ name: 'Gayatri User', email });
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-16 px-4">
      <motion.div
        className="bg-white w-full max-w-[480px] p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 font-serif uppercase tracking-tight">Welcome Back</h1>
          <p className="text-text-muted text-sm">Sign in to access your curated collections and orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-accent focus:ring-accent accent-accent" />
              <span className="text-xs text-text-muted group-hover:text-primary transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-xs text-accent font-bold hover:underline">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-primary text-white py-4 font-bold rounded-xl shadow-lg hover:bg-accent transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
            LOGIN <ArrowRight size={18} />
          </button>
        </form>

        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase tracking-[2px]"><span className="bg-white px-4 text-gray-400 font-bold">OR</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors font-bold text-sm">
            <Chrome size={18} /> Google
          </button>
          <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors font-bold text-sm">
            <Github size={18} /> Github
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-text-muted">
          New to Fashion Hall? <Link to="/signup" className="text-accent font-bold hover:underline ml-1">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
