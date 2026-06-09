'use client'
import { Bell, Compass, Home, Map, Search, User, Video, Clock, X, LogOut, Settings, ShoppingBag, Menu } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Menus } from '../Menu';
import { getCustomerInfo } from '@/store/authStore';

type TopbarItemProps = {
    PRIMARY_COLOR: string;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    activeNav: string;
    setActiveNav: Dispatch<SetStateAction<string>>;
    setActiveCategory: Dispatch<SetStateAction<string>>;
};

export const TopbarItem = ({ PRIMARY_COLOR, searchTerm, setSearchTerm, activeNav, setActiveNav, setActiveCategory }: TopbarItemProps) => {
    // Simulasi State Login (Ubah ke false untuk melihat tampilan Belum Login)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Notifications simulation
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Diskon 15% dari Kopi Senja tinggal hari ini!', time: '10 menit yang lalu', unread: true },
        { id: 2, text: 'Batik Kencana membalas chat Anda: "Siap kak, ukuran L..."', time: '1 jam yang lalu', unread: true },
        { id: 3, text: 'Pesanan Nastar Keju Anda telah selesai dikemas', time: '4 jam yang lalu', unread: false }
    ]);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const [dataCustomer, setDataCustomer] = useState<any>(null);
    // Search History States
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [showHistoryPopup, setShowHistoryPopup] = useState(false);

    // Dropdown Profile Burger Menu State
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Refs untuk penanganan Click Outside
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const notificationMenuRef = useRef<HTMLDivElement>(null);

    // Ambil histori dari localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const savedHistory = localStorage.getItem('search_history');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
        const customer = getCustomerInfo();
        if (customer) {
            setDataCustomer(customer)
            setIsLoggedIn(true)
        } else {

        }
    }, []);


    // Menutup semua popup/dropdown jika pengguna mengklik di luar area komponen terkait
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
                setShowHistoryPopup(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
                setShowProfileMenu(false);
            }
            if (notificationMenuRef.current && !notificationMenuRef.current.contains(target)) {
                setShowNotificationMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fungsi untuk mengeksekusi pencarian & menyimpan ke histori
    const handleSearchSubmit = (keyword: string) => {
        const trimmedKeyword = keyword.trim();
        if (!trimmedKeyword) return;

        const updatedHistory = [
            trimmedKeyword,
            ...searchHistory.filter((item) => item !== trimmedKeyword)
        ].slice(0, 5);

        setSearchHistory(updatedHistory);
        localStorage.setItem('search_history', JSON.stringify(updatedHistory));
        setShowHistoryPopup(false);

        window.location.href = `/store?search=${encodeURIComponent(trimmedKeyword)}`;
    };

    const deleteHistoryItem = (e: React.MouseEvent, itemToDelete: string) => {
        e.stopPropagation();
        const updatedHistory = searchHistory.filter(item => item !== itemToDelete);
        setSearchHistory(updatedHistory);
        localStorage.setItem('search_history', JSON.stringify(updatedHistory));
    };

    const clearAllHistory = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSearchHistory([]);
        localStorage.removeItem('search_history');
    };

    return (
        <header className="fixed top-0 inset-x-0 h-16 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 z-45 shadow-xs transition-all">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

                {/* Brand Logo */}
                <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => window.location.href = '/store'}>
                    <img src={'/logo_usahaku.png'} className='w-10 h-10 bg-zinc-100 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-lg' alt="Logo Usahaku" />
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-extrabold italic leading-none tracking-tight" style={{ color: PRIMARY_COLOR }}>
                            UsahaKu.
                        </h1>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                            Social Commerce Lokal
                        </p>
                    </div>
                </div>

                {/* Search Bar dengan Popup Histori */}
                <div ref={searchContainerRef} className="relative flex-1 max-w-xs md:max-w-md">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari gerai, kopi, baju batik, salad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowHistoryPopup(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchSubmit(searchTerm);
                            }
                        }}
                        className="w-full pl-9 pr-4 py-2 border border-zinc-200 bg-zinc-50/50 rounded-2xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800"
                    />

                    {/* Popup Histori Pencarian */}
                    {showHistoryPopup && searchHistory.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-2xl shadow-xl z-50 p-3 animate-slideUp">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Pencarian Terakhir</span>
                                <button
                                    onClick={clearAllHistory}
                                    className="text-[10px] font-bold text-rose-500 hover:underline"
                                >
                                    Hapus Semua
                                </button>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                {searchHistory.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSearchTerm(item);
                                            handleSearchSubmit(item);
                                        }}
                                        className="flex items-center justify-between p-2 rounded-xl text-xs text-zinc-700 hover:bg-zinc-50 cursor-pointer transition-all group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Clock size={13} className="text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                        <button
                                            onClick={(e) => deleteHistoryItem(e, item)}
                                            className="text-zinc-400 hover:text-rose-500 p-1 rounded-md hover:bg-zinc-100 transition-all"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* DESKTOP NAVIGATION ITEMS */}
                <nav className="hidden lg:flex items-center gap-1">
                    {Menus.map(item => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => window.location.href = `/store/${item?.herf}`}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${isActive
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/15'
                                    : 'text-zinc-600 hover:bg-emerald-50/70 hover:text-emerald-600'
                                    }`}
                            >
                                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* USER ACTIONS */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                    {/* Notification Bell (Hanya tampil jika sudah login) */}
                    {isLoggedIn && (
                        <div className="relative" ref={notificationMenuRef}>
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
                    )}

                    {/* Kondisi User Profile Dropdown / Login Register Buttons */}
                    {isLoggedIn ? (
                        /* JIKA SUDAH LOGIN: Tampilkan Profil yang bisa di klik (Burger Menu Gaya Modern) */
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all text-left group"
                            >
                                <img
                                    src={dataCustomer?.avatar || "/avatar.jpeg"}
                                    alt="Profile User"
                                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/10 group-hover:ring-emerald-500/30 transition-all" />
                                <div className="hidden md:block text-left max-w-[100px]">
                                    <h5 className="text-[11px] font-extrabold text-zinc-800 truncate">{dataCustomer?.name}</h5>
                                </div>
                                <Menu size={14} className="text-zinc-400 group-hover:text-zinc-600 ml-1 hidden sm:block transition-colors" />
                            </button>

                            {/* Dropdown Burger Menu dari Profil */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-zinc-200 rounded-2xl shadow-xl z-50 p-2 animate-slideUp flex flex-col gap-0.5">
                                    <div className="px-3 py-2 border-b border-zinc-100 md:hidden mb-1">
                                        <h5 className="text-xs font-black text-zinc-800">{dataCustomer?.name}</h5>
                                    </div>

                                    <button
                                        onClick={() => window.location.href = '/store/customer/profile'}
                                        className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                                    >
                                        <User size={15} className="text-zinc-400" />
                                        <span>Profil Saya</span>
                                    </button>

                                    <button
                                        onClick={() => window.location.href = '/customer/orders'}
                                        className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                                    >
                                        <ShoppingBag size={15} className="text-zinc-400" />
                                        <span>Pesanan Saya</span>
                                    </button>

                                    <button
                                        onClick={() => window.location.href = '/customer/settings'}
                                        className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                                    >
                                        <Settings size={15} className="text-zinc-400" />
                                        <span>Pengaturan</span>
                                    </button>

                                    <hr className="border-zinc-100 my-1" />

                                    <button
                                        onClick={() => setIsLoggedIn(false)} // Gantilah dengan fungsi logout asli Anda
                                        className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all"
                                    >
                                        <LogOut size={15} />
                                        <span>Keluar</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* JIKA BELUM LOGIN: Tampilkan tombol Masuk & Daftar */
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => window.location.href = '/store/auth/login'}
                                className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-all"
                            >
                                Masuk
                            </button>
                            <button
                                onClick={() => window.location.href = '/store/auth/register'}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-500/15 transition-all"
                            >
                                Daftar
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};