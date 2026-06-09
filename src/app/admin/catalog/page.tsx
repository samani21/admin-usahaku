"use client"
import React, { useState, useEffect } from 'react';
import {
    Image,
    Grid,
    Package,
    CreditCard,
    Eye,
    Sun,
    Moon,
    ChevronLeft,
    Settings,
    Bell,
    Dock,
    Store,
    ArrowRightToLine
} from 'lucide-react';
import HeaderPage from './header/page';
import { Get } from '@/utils/Get';
import { Catalog } from '@/types/Admin/Catalog/Catalog';
import Loading from '@/Components/Component/Loading';
import Link from 'next/link';
import HeroPage from './hero/page';
import CategoriesPage from './categorie/page';
import ProductPage from './product/page';
import SummaryPage from './summary/page';
import PreviewPage from './preview/page';


export default function CatalogPage() {
    const [activeMenu, setActiveMenu] = useState<string>("Header");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [error, setError] = useState<boolean>(false);
    // Menangani efek scroll untuk navbar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        getCalog()
    }, [])
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const menuItems = [
        { id: 'Header', label: 'Header', icon: Dock },
        { id: 'Hero/Banner', label: 'Hero/Banner', icon: Image },
        { id: 'Kategori', label: 'Kategori', icon: Grid },
        { id: 'Produk dan Modal', label: 'Produk dan Modal', icon: Package },
        { id: 'Ringkasan Pembayaran', label: 'Ringkasan Pembayaran', icon: CreditCard },
        { id: 'Preview', label: 'Preview', icon: Eye },
    ];


    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {
                setCatalog(res?.data)
            }
        } catch (e: any) {
            setError(true)
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const renderPage = () => {
        if (error) {
            return (
                <div className={`mt-10 p-8 rounded-3xl border-2 border-dashed flex flex-col items-center text-center transition-all ${isDarkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white shadow-sm'
                    }`}>
                    <div className={`mb-6 p-4 rounded-full ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
                        <Store size={48} className="text-amber-500" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Profil Bisnis Belum Siap
                    </h2>
                    <p className={`max-w-md mb-8 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Sepertinya Anda belum melengkapi informasi toko. Silakan lengkapi profil bisnis Anda terlebih dahulu untuk mulai mengatur katalog.
                    </p>
                    <Link href={'/admin/manage/store'}
                        className="group flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
                    >
                        Lengkapi Profil Bisnis
                        <ArrowRightToLine size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            );
        }
        switch (activeMenu) {
            case "Header":
                return <HeaderPage themeDark={isDarkMode} setThemeDark={setIsDarkMode} headerData={catalog?.header ?? null} getCalog={getCalog} />
            case "Hero/Banner":
                return <HeroPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} heroData={catalog?.hero ?? null} getCalog={getCalog} />
            case "Kategori":
                return <CategoriesPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} categoriesData={catalog?.category ?? null} categories={catalog?.categories ?? []} getCalog={getCalog} />
            case "Produk dan Modal":
                return <ProductPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} productData={catalog?.product ?? null} productsData={catalog?.products ?? []} getCalog={getCalog} />
            case "Ringkasan Pembayaran":
                return <SummaryPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} summaryData={catalog?.summary ?? null} getCalog={getCalog} />
            default:
                return null
        }

    }

    useEffect(() => {
        const primary = isDarkMode ? '#020617' : '#f8fafc';   // slate-950 / slate-50
        const secondary = isDarkMode ? '#f8fafc' : '#020617'; // kebalikannya

        const root = document.documentElement;
        root.style.setProperty('--mode-primary', primary);
        root.style.setProperty('--mode-secondary', secondary);
    }, [isDarkMode]);

    return (
        <div className={`min-h-[120vh] transition-colors duration-500 ${isDarkMode ? 'bg-[#020617]' : 'bg-[#f8fafc]'} font-sans`}>

            {/* Header / Top Bar */}
            <header className={`fixed top-0 w-full z-10 transition-all duration-300 ${scrolled
                ? `py-3 ${isDarkMode ? 'bg-[#020617]/80 border-b border-slate-800' : 'bg-white/80'} backdrop-blur-md shadow-sm`
                : 'py-6 bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className={`p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-100'
                            }`}>
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Katalog
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className={`p-2 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                            <Bell size={20} />
                        </button>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2.5 rounded-xl transition-all shadow-inner ${isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-900 text-white'
                                }`}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto sm:px-6 pt-20 pb-20">

                {/* Floating Navigation Card */}
                <div className={` rounded-2xl border transition-all duration-300 ${isDarkMode
                    ? 'bg-slate-900/50 border-slate-800 backdrop-blur-xl'
                    : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                    }`}>
                    <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar p-3">
                        {menuItems.map((item) => {
                            const isActive = activeMenu === item.id;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveMenu(item.id)}
                                    className={`
                    relative flex items-center gap-2.5 px-6 py-3 text-sm transition-all duration-300 rounded-xl whitespace-nowrap
                    ${isActive
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 font-semibold scale-105'
                                            : isDarkMode
                                                ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                                >
                                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className={`relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 ${isDarkMode ? 'border-slate-900' : 'border-white'}`}></span>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                {renderPage()}
            </main>
            {loading && <Loading title='Sedang Proses' />}
            {/* Style kustom untuk menyembunyikan scrollbar */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}