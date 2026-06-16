"use client"

import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    CheckCircle2,
    Zap,
    ShieldCheck,
    TrendingUp,
    ArrowRight,
    Facebook,
    Twitter,
    Instagram,
    Rocket,
    Sparkles,
    BarChart3,
    Layers
} from 'lucide-react';

export default function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Menambahkan efek shadow pada header ketika di-scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const primaryColor = "#10B981";

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 selection:bg-[#10B981]/30 selection:text-slate-900 overflow-x-hidden">

            {/* 1. HEADER SECTION - Premium Glassmorphism Floating Pill */}
            <header className={`fixed w-full z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8 ${scrolled ? 'top-4' : 'top-0'
                }`}>
                <div className={`max-w-7xl mx-auto transition-all duration-500 relative ${scrolled
                    ? 'bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl shadow-slate-200/20 rounded-full py-3 px-6 lg:px-8'
                    : 'bg-transparent border-transparent py-6 px-0'
                    }`}>
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5 cursor-pointer group">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#10B981] to-emerald-600 text-white shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
                                <Rocket size={24} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Usaha<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-emerald-500">Ku</span>
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-10">
                            <a href="#beranda" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Beranda</a>
                            <a href="#fitur" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Fitur</a>
                            <a href="#harga" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Harga</a>
                            <a
                                href="#harga"
                                className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                            >
                                Coba Gratis
                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-slate-900 p-2 focus:outline-none bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl overflow-hidden z-50">
                            <div className="px-6 py-8 space-y-4">
                                <a href="#beranda" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-800 hover:text-[#10B981] transition-colors">Beranda</a>
                                <a href="#fitur" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-800 hover:text-[#10B981] transition-colors">Fitur</a>
                                <a href="#harga" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-800 hover:text-[#10B981] transition-colors">Harga</a>
                                <div className="pt-6 mt-6 border-t border-slate-100">
                                    <a
                                        href="#harga"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center w-full px-6 py-4 text-base font-bold text-white transition-all bg-gradient-to-r from-[#10B981] to-emerald-600 rounded-xl shadow-lg"
                                    >
                                        Mulai Uji Coba Gratis
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            { }
            {/* 2. HERO SECTION */}
            <section id="beranda" className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
                {/* Premium Background Blurs */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
                    <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#10B981]/20 to-emerald-200/20 rounded-full blur-[100px] opacity-70 mix-blend-multiply"></div>
                </div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
                    <div className="w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 to-[#10B981]/10 rounded-full blur-[80px] opacity-70 mix-blend-multiply"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                        {/* Hero Text */}
                        <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
                                <Sparkles size={16} className="text-[#10B981]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Era Baru Manajemen Bisnis</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                                Skalakan Bisnis <br className="hidden md:block" />
                                Secara <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-emerald-400">Elegan.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                                Lupakan kerumitan operasional. Kami merancang ekosistem digital premium untuk mempercepat pertumbuhan dan profitabilitas usaha Anda.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href="#harga"
                                    className="px-8 py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-[#10B981] to-emerald-600 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-1"
                                >
                                    Mulai Akses Premium
                                    <ArrowRight size={20} />
                                </a>
                                <a
                                    href="#fitur"
                                    className="px-8 py-4 rounded-xl text-slate-700 bg-white border border-slate-200 shadow-sm font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center"
                                >
                                    Jelajahi Fitur
                                </a>
                            </div>
                        </div>

                        {/* Hero Image/Illustration - Premium Dashboard Mockup */}
                        <div className="relative w-full mx-auto max-w-lg lg:max-w-none perspective-1000">
                            <div className="relative transform lg:rotate-y-[-10deg] lg:rotate-x-[5deg] transition-transform duration-700 hover:rotate-0">
                                {/* Main Dashboard Card */}
                                <div className="relative z-20 w-full rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl p-6 ring-1 ring-slate-900/5">
                                    {/* Mockup Header */}
                                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                        </div>
                                        <div className="h-6 w-32 bg-slate-100 rounded-md"></div>
                                    </div>

                                    {/* Mockup Content */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-emerald-50 border border-emerald-100/50">
                                            <div className="w-8 h-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center mb-3">
                                                <TrendingUp size={16} />
                                            </div>
                                            <div className="h-4 w-16 bg-emerald-200 rounded mb-2"></div>
                                            <div className="h-6 w-24 bg-[#10B981]/80 rounded"></div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center mb-3">
                                                <BarChart3 size={16} />
                                            </div>
                                            <div className="h-4 w-16 bg-slate-100 rounded mb-2"></div>
                                            <div className="h-6 w-24 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>

                                    {/* Mockup Chart Area */}
                                    <div className="h-32 w-full rounded-xl bg-slate-50 border border-slate-100 relative overflow-hidden flex items-end px-4 gap-2 pt-8">
                                        {[40, 70, 45, 90, 60, 100, 80].map((height, i) => (
                                            <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#10B981] to-emerald-300 opacity-80" style={{ height: `${height}%` }}></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Elements (Glassmorphism) */}
                                <div className="absolute -right-8 top-12 z-30 w-48 p-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 animate-bounce" style={{ animationDuration: '4s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#10B981]">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">Target Tercapai</div>
                                            <div className="text-xs text-slate-500">+24% minggu ini</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. FEATURE SECTION - Premium Cards */}
            <section id="fitur" className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-[#10B981] font-bold tracking-widest uppercase text-xs mb-4">Inovasi Teknologi</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Kekuatan di Balik Usaha Anda</h3>
                        <p className="text-xl text-slate-500 leading-relaxed">Dirancang dengan presisi untuk memberikan performa, keamanan, dan kejelasan data tingkat enterprise.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#10B981]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <Zap size={32} className="text-[#10B981]" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4">Akses Super Cepat</h4>
                                <p className="text-slate-500 leading-relaxed text-lg">Infrastruktur cloud berkinerja tinggi memastikan data bisnis Anda dapat diakses dalam hitungan milidetik.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#10B981]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <ShieldCheck size={32} className="text-[#10B981]" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4">Aman & Terenkripsi</h4>
                                <p className="text-slate-500 leading-relaxed text-lg">Protokol keamanan berlapis dan enkripsi end-to-end melindungi setiap byte informasi bisnis Anda secara absolut.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#10B981]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <Layers size={32} className="text-[#10B981]" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4">Otomatisasi Cerdas</h4>
                                <p className="text-slate-500 leading-relaxed text-lg">Hilangkan tugas repetitif. Sistem pintar kami menyederhanakan alur kerja agar Anda fokus pada ekspansi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRICE SECTION - High-end Cards */}
            <section id="harga" className="py-32 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-[#10B981] font-bold tracking-widest uppercase text-xs mb-4">Investasi Terjangkau</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Pilih Tingkat Akses Anda</h3>
                        <p className="text-xl text-slate-500">Struktur harga transparan tanpa biaya tersembunyi. Mulai gratis, tingkatkan daya gedor bisnis Anda kapan saja.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">

                        {/* Free Trial Plan */}
                        <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:shadow-xl transition-all">
                            <div className="mb-8">
                                <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-slate-700 text-sm font-bold mb-4">Pemula</div>
                                <h4 className="text-3xl font-bold text-slate-900 mb-2">Gratis Trial</h4>
                                <p className="text-slate-500">Akses dasar untuk eksplorasi sistem</p>
                            </div>
                            <div className="mb-10 flex items-baseline gap-2">
                                <span className="text-6xl font-extrabold text-slate-900">Rp 0</span>
                                <span className="text-lg font-medium text-slate-500">/ 3 Hari</span>
                            </div>
                            <ul className="space-y-5 mb-10">
                                {['Akses fitur dasar dashboard', 'Manajemen data simpel', 'Dukungan forum komunitas', 'Batalkan kapan saja tanpa syarat'].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <CheckCircle2 size={24} className="text-[#10B981] flex-shrink-0" />
                                        <span className="text-slate-600 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 rounded-xl font-bold text-slate-700 bg-slate-50 border-2 border-slate-200 hover:bg-slate-100 transition-colors">
                                Mulai Gratis 3 Hari
                            </button>
                        </div>

                        {/* Premium Plan - Glowing Border Effect */}
                        <div className="relative p-[2px] rounded-[2rem] bg-gradient-to-b from-[#10B981] via-emerald-600 to-slate-800 shadow-2xl shadow-emerald-900/20 transform md:-translate-y-4">
                            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-[#10B981] to-emerald-400 text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-lg">
                                PALING DIMINATI
                            </div>

                            <div className="bg-slate-950 rounded-[calc(2rem-2px)] p-10 h-full relative overflow-hidden">
                                {/* Subtle Inner Glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl"></div>

                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold mb-4">
                                            <Sparkles size={14} /> Profesional
                                        </div>
                                        <h4 className="text-3xl font-bold text-white mb-2">Paket Pro</h4>
                                        <p className="text-slate-400">Skalabilitas penuh tanpa batas</p>
                                    </div>

                                    <div className="mb-10">
                                        <div className="text-slate-500 line-through text-xl font-medium mb-1 decoration-red-500/70 decoration-2">Rp 50.000</div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">Rp 45k</span>
                                            <span className="text-lg font-medium text-slate-400">/ bln</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-5 mb-10">
                                        {['Semua fitur pada Gratis Trial', 'Analitik bisnis real-time lengkap', 'Bebas iklan selamanya', 'Prioritas dukungan teknis 24/7', 'Kapasitas penyimpanan tidak terbatas'].map((feature, index) => (
                                            <li key={index} className="flex items-start gap-4">
                                                <CheckCircle2 size={24} className="text-emerald-400 flex-shrink-0" />
                                                <span className="text-slate-300 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="w-full py-4 rounded-xl font-bold text-slate-900 bg-gradient-to-r from-[#10B981] to-emerald-400 hover:from-emerald-400 hover:to-[#10B981] shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]">
                                        Berlangganan Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. CTA SECTION - Modern Minimalist gradient */}
            <section className="py-24 relative overflow-hidden border-t border-slate-200">
                <div className="absolute inset-0 bg-slate-900"></div>
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#10B981]/40 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                        Saatnya Membawa Bisnis Anda ke Level Berikutnya.
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Bergabunglah dengan pengusaha visioner lainnya. Eksekusi lebih cepat, raih profit lebih besar dengan UsahaKu.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <button className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-50 shadow-xl transition-all hover:scale-105">
                            Daftar Sekarang — Gratis
                        </button>
                        <button className="px-8 py-4 rounded-xl bg-slate-800/50 backdrop-blur-md border border-slate-700 text-white font-bold text-lg hover:bg-slate-800 transition-colors">
                            Hubungi Tim Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* 6. FOOTER SECTION - Clean & Sleek */}
            <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

                        {/* Brand Info */}
                        <div className="md:col-span-5 lg:col-span-4">
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="p-2 rounded-lg bg-[#10B981]/20 text-[#10B981]">
                                    <Rocket size={24} />
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">Usaha<span className="text-[#10B981]">Ku</span></span>
                            </div>
                            <p className="text-slate-400 mb-8 leading-relaxed text-lg pe-8">
                                Merancang ulang cara Anda berbisnis. Infrastruktur digital cerdas untuk pengusaha modern.
                            </p>
                            <div className="flex space-x-5">
                                <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-[#10B981] hover:text-white transition-all"><Facebook size={18} /></a>
                                <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-[#10B981] hover:text-white transition-all"><Twitter size={18} /></a>
                                <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-[#10B981] hover:text-white transition-all"><Instagram size={18} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="md:col-span-3 lg:col-span-2 lg:col-start-6">
                            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Produk</h4>
                            <ul className="space-y-4 font-medium">
                                <li><a href="#fitur" className="hover:text-[#10B981] transition-colors">Fitur Unggulan</a></li>
                                <li><a href="#harga" className="hover:text-[#10B981] transition-colors">Harga & Paket</a></li>
                                <li><a href="#" className="hover:text-[#10B981] transition-colors">Kisah Sukses</a></li>
                                <li><a href="#" className="hover:text-[#10B981] transition-colors">Pembaruan Sistem</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="md:col-span-4 lg:col-span-2">
                            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Perusahaan</h4>
                            <ul className="space-y-4 font-medium">
                                <li><a href="#" className="hover:text-[#10B981] transition-colors">Pusat Bantuan</a></li>
                                <li><a href="#" className="hover:text-[#10B981] transition-colors">Syarat Layanan</a></li>
                                <li><a href="#" className="hover:text-[#10B981] transition-colors">Kebijakan Privasi</a></li>
                                <li><a href="#" className="hover:text-[#10B981] transition-colors">Hubungi Kami</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="md:col-span-12 lg:col-span-3">
                            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Akses Eksklusif</h4>
                            <p className="text-slate-400 mb-6 font-medium">Dapatkan insight bisnis premium langsung di kotak masuk Anda.</p>
                            <form className="relative" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Alamat email Anda"
                                    className="w-full bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 px-4 rounded-lg font-bold text-slate-900 bg-[#10B981] hover:bg-emerald-400 transition-colors"
                                >
                                    Kirim
                                </button>
                            </form>
                        </div>

                    </div>

                    <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 font-medium">
                            &copy; {new Date().getFullYear()} UsahaKu Inc. Hak Cipta Dilindungi.
                        </p>
                        <div className="flex items-center gap-2 font-medium text-slate-500">
                            Didesain dengan <span className="text-[#10B981]">presisi</span> untuk Anda.
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}