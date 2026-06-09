"use client"
import Home from '@/app/page';
import { Bell, Compass, Map, Search, ShoppingBag, User, Video } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    PRIMARY_COLOR: string;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    activeNav: string;
    setActiveNav: Dispatch<SetStateAction<string>>;
    setActiveCategory: Dispatch<SetStateAction<string>>;
    setIsCartOpen: Dispatch<SetStateAction<boolean>>;
    getCartCount: number
}

const Header = ({ PRIMARY_COLOR, searchTerm, setSearchTerm, activeNav, setActiveNav, setActiveCategory, setIsCartOpen, getCartCount,
}: Props) => {
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Diskon 15% dari Kopi Senja tinggal hari ini!', time: '10 menit yang lalu', unread: true },
        { id: 2, text: 'Batik Kencana membalas chat Anda: "Siap kak, ukuran L..."', time: '1 jam yang lalu', unread: true },
        { id: 3, text: 'Pesanan Nastar Keju Anda telah selesai dikemas', time: '4 jam yang lalu', unread: false }
    ]);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const [savedItems, setSavedItems] = useState({ 101: false, 102: false });
    return (
        <header className="fixed top-0 inset-x-0 h-16 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 z-45 shadow-xs transition-all">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

                {/* Brand Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-lg">
                        U
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-extrabold italic leading-none tracking-tight" style={{ color: PRIMARY_COLOR }}>
                            UsahaKu.
                        </h1>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                            Social Commerce Lokal
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-xs md:max-w-md">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari gerai, kopi, baju batik, salad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-zinc-200 bg-zinc-50/50 rounded-2xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800"
                    />
                </div>

                {/* DESKTOP NAVIGATION ITEMS */}
                <nav className="hidden lg:flex items-center gap-1">
                    {[
                        { id: 'Beranda', label: 'Beranda', icon: Home },
                        { id: 'Postingan', label: 'Postingan', icon: Compass },
                        { id: 'Maps', label: 'Peta UMKM', icon: Map, badge: 'Baru' },
                        { id: 'Reels', label: 'Reels', icon: Video, badge: 'LIVE' },
                        { id: 'Profile', label: 'Profil Saya', icon: User }
                    ].map(item => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveNav(item.id);
                                    setActiveCategory('Semua');
                                }}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${isActive
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/15'
                                    : 'text-zinc-600 hover:bg-emerald-50/70 hover:text-emerald-600'
                                    }`}
                            >
                                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{item.label}</span>
                                {item.badge && !isActive && (
                                    <span className="absolute -top-1 right-1 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* USER ACTIONS */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="p-2.5 rounded-xl border border-zinc-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition relative text-zinc-600 hover:text-emerald-600"
                    >
                        <ShoppingBag size={18} />
                        {getCartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-bounce">
                                {getCartCount}
                            </span>
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                            className="p-2.5 rounded-xl border border-zinc-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition text-zinc-600 hover:text-emerald-600"
                        >
                            <Bell size={18} />
                            {notifications.some(n => n.unread) && (
                                <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                            )}
                        </button>

                        {showNotificationMenu && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200/80 rounded-2xl shadow-xl z-50 p-4 animate-slideUp">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-xs font-black text-zinc-800">Notifikasi</h4>
                                    <button
                                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                                        className="text-[10px] font-bold text-emerald-600 hover:underline"
                                    >
                                        Tandai dibaca
                                    </button>
                                </div>
                                <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar">
                                    {notifications.map(n => (
                                        <div key={n.id} className={`p-2.5 rounded-xl text-xs flex flex-col gap-1 ${n.unread ? 'bg-emerald-50/40 border-l-2 border-emerald-500' : 'bg-zinc-50'}`}>
                                            <p className="text-zinc-700 font-medium leading-relaxed">{n.text}</p>
                                            <span className="text-[9px] text-zinc-400 font-semibold">{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-2 pl-2 border-l border-zinc-200">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                            alt="Profile User"
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/10"
                        />
                        <div className="text-left">
                            <h5 className="text-[11px] font-extrabold text-zinc-800">Ayu Sukma</h5>
                            <span className="text-[9px] font-semibold text-zinc-400">Mitra Gold</span>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header