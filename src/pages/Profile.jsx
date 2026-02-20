import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, Mail, MapPin, Package, Heart, LogOut, Camera, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logout } = useShop();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) return null;

    const orders = [
        { id: '#ORD-7721', date: '2026-02-15', status: 'Delivered', total: '$129.99', items: 3 },
        { id: '#ORD-6612', date: '2026-01-20', status: 'Shipped', total: '$85.50', items: 1 },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container max-w-5xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-10 font-serif">MY PROFILE</h1>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                            <div className="relative mb-4 group">
                                <div className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center text-4xl font-bold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 hover:text-accent transition-colors opacity-0 group-hover:opacity-100">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-text-muted text-sm">{user.email}</p>

                            <button
                                onClick={logout}
                                className="mt-6 flex items-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition-colors w-full justify-center"
                            >
                                <LogOut size={18} /> LOGOUT
                            </button>
                        </div>

                        <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button className="w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 border-accent bg-accent/5 text-accent">
                                <User size={18} /> Account Overview
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 border-transparent hover:bg-gray-50 text-text-muted hover:text-primary transition-colors">
                                <Package size={18} /> Order History
                            </button>
                            <button className="w-full flex items-center gap-3 p-4 text-sm font-bold border-l-4 border-transparent hover:bg-gray-50 text-text-muted hover:text-primary transition-colors">
                                <Heart size={18} /> My Wishlist
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Account Details */}
                        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                                <h3 className="text-lg font-bold uppercase tracking-wider">Account Details</h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-accent flex items-center gap-1 text-sm font-bold hover:underline"
                                >
                                    <Edit2 size={16} /> {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                    <p className="text-sm font-semibold">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                    <p className="text-sm font-semibold">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                                    <p className="text-sm font-semibold">+91 9876543210</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Default Address</label>
                                    <p className="text-sm font-semibold flex items-center gap-1">
                                        <MapPin size={14} className="text-text-muted" /> Vijayawada, AP, India
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Recent Orders */}
                        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-8 pb-4 border-b border-gray-50">Recent Orders</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="text-gray-400 uppercase text-[10px] tracking-widest">
                                            <th className="pb-4 font-bold">Order ID</th>
                                            <th className="pb-4 font-bold">Date</th>
                                            <th className="pb-4 font-bold">Status</th>
                                            <th className="pb-4 font-bold">Total</th>
                                            <th className="pb-4 font-bold"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 font-bold">{order.id}</td>
                                                <td className="py-4 text-text-muted">{order.date}</td>
                                                <td className="py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 font-bold">{order.total}</td>
                                                <td className="py-4 text-right">
                                                    <button className="text-accent text-xs font-bold hover:underline">View Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
