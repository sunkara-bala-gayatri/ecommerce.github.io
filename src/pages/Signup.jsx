import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { register } from '../services/auth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await register({ name, email, password });
      if (data.status === 'success') {
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-16 px-4">
      <motion.div
        className="bg-white w-full max-w-[480px] p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 font-serif uppercase tracking-tight">Create Account</h1>
          <p className="text-text-muted text-sm">Join Fashion Hall to curate your collection.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 font-bold rounded-xl shadow-lg hover:bg-accent transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-widest text-sm disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'} <ArrowRight size={18} />
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
          Already have an account? <Link to="/login" className="text-accent font-bold hover:underline ml-1">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
