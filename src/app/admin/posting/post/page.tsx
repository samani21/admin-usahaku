"use client"
import React, { useState } from 'react';
import {
    Search,
    Store,
    MoreHorizontal,
    ShoppingBag,
    Plus,
    Calendar,
    Eye,
    ThumbsUp,
    MessageSquare,
    Share2,
    Zap,
    Filter,
    FileText
} from 'lucide-react';
import MainLayout from '@/Components/Layout/MainLayout';

// --- Mock Data Produk (Sama seperti database Anda) ---
const AVAILABLE_PRODUCTS = [
    {
        id: 1,
        name: 'Paket Nongkrong (2 Kopi + Roti)',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=300',
        originalPrice: 65000,
        currentPrice: 45000,
        isPromo: true
    },
    {
        id: 2,
        name: 'Croissant Isi 6 Spesial',
        image: 'https://images.unsplash.com/photo-1549903072-7e6e0d234247?auto=format&fit=crop&q=80&w=300',
        originalPrice: 100000,
        currentPrice: 75000,
        isPromo: true
    },
    {
        id: 3,
        name: 'Kopi Susu Gula Aren (1 Liter)',
        image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?auto=format&fit=crop&q=80&w=300',
        originalPrice: 85000,
        currentPrice: 85000,
        isPromo: false
    }
];

// --- Mock Data Postingan (Dari Database) ---
const INITIAL_POSTS = [
    {
        id: 1,
        storeName: 'Kedai Kopi Cabang Gerilya',
        avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150',
        timestamp: '10 menit yang lalu',
        caption: '🎉 PROMO AKHIR PEKAN! 🎉\n\nNikmati diskon spesial untuk paket nongkrong bareng teman. Cuma berlaku hari ini sampai besok ya!\nLangsung klaim promonya di bawah ini 👇',
        mainImage: 'https://images.unsplash.com/photo-1495474472201-4efa70295eb1?auto=format&fit=crop&q=80&w=1000',
        isPromo: true,
        productIds: [1, 2],
        stats: { views: 245, likes: 48, comments: 12 }
    },
    {
        id: 2,
        storeName: 'Kedai Kopi Cabang Gerilya',
        avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150',
        timestamp: '2 jam yang lalu',
        caption: '⚡ FLASH SALE HARI INI! ⚡\n\nKopi Susu Gula Aren 1 Liter lagi ada penawaran spesial. Stok terbatas, yuk amankan sekarang sebelum kehabisan!',
        mainImage: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?auto=format&fit=crop&q=80&w=1000',
        isPromo: true,
        productIds: [3],
        stats: { views: 512, likes: 92, comments: 24 }
    },
    {
        id: 3,
        storeName: 'Kedai Kopi Cabang Gerilya',
        avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150',
        timestamp: 'Kemarin',
        caption: 'Selamat pagi penikmat kopi! Jangan lupa awali harimu dengan segelas semangat hitam manis tanpa ampas. Kami buka sampai jam 10 malam ya!',
        mainImage: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1000',
        isPromo: false,
        productIds: [],
        stats: { views: 189, likes: 30, comments: 5 }
    }
];

const PostListView = () => {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'semua' | 'promo' | 'informasi'>('semua');

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    // --- Logika Filter Postingan ---
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.caption.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeTab === 'promo') return matchesSearch && post.isPromo;
        if (activeTab === 'informasi') return matchesSearch && !post.isPromo;
        return matchesSearch;
    });

    return (
        <MainLayout>
            <div className="w-full animate-in fade-in duration-300 pb-12">

                {/* --- HEADER UTAMA & TOMBOL AKSI --- */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Postingan Anda</h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Kelola promosi, pengumuman, dan katalog produk yang tampil di aplikasi pelanggan.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/25 transition-all active:scale-95 hover:-translate-y-0.5 shrink-0">
                        <Plus size={16} strokeWidth={3} />
                        Buat Postingan Baru
                    </button>
                </div>

                {/* --- KARTU MINI STATISTIK (METRICS) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Total Konten</p>
                            <h3 className="text-xl font-black text-slate-800 mt-0.5">{posts.length} Post</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <Zap size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Promo Sedang Aktif</p>
                            <h3 className="text-xl font-black text-slate-800 mt-0.5">{posts.filter(p => p.isPromo).length} Konten</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Eye size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Total Jangkauan</p>
                            <h3 className="text-xl font-black text-slate-800 mt-0.5">946 Dilihat</h3>
                        </div>
                    </div>
                </div>

                {/* --- FILTER & SEARCH BAR BAR --- */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm mb-6">
                    {/* Tabs Kapsul */}
                    <div className="flex bg-slate-50 p-1.5 rounded-full w-full md:w-fit overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('semua')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'semua' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setActiveTab('promo')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'promo' ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <Zap size={12} /> Hanya Promo
                        </button>
                        <button
                            onClick={() => setActiveTab('informasi')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'informasi' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Bukan Promo
                        </button>
                    </div>

                    {/* Kolom Pencarian */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari kata kunci di caption..."
                            className="w-full text-xs font-bold text-slate-800 pl-11 pr-4 py-3 bg-slate-50 border border-transparent focus:border-slate-200 focus:bg-white rounded-full outline-none transition-all"
                        />
                    </div>
                </div>

                {/* --- FEED GRID / DAFTAR POSTINGAN --- */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-slate-200 hover:shadow-md transition-all duration-300">

                                {/* Bagian Atas: Info Toko & Menu Aksi */}
                                <div>
                                    <div className="flex items-center justify-between p-5">
                                        <div className="flex items-center gap-3">
                                            <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900 leading-none">{post.storeName}</h4>
                                                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 font-bold">
                                                    <Calendar size={12} />
                                                    <span>{post.timestamp}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>

                                    {/* Bagian Tengah: Caption Teks */}
                                    <div className="px-5 pb-3">
                                        <p className="text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                            {post.caption}
                                        </p>
                                    </div>

                                    {/* Gambar Konten Utama */}
                                    {post.mainImage && (
                                        <div className="px-3">
                                            <div className="w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden relative">
                                                <img src={post.mainImage} alt="Post content" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />

                                                {post.isPromo && (
                                                    <div className="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                        Active Promo
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Produk Terkait (Jika Ada) */}
                                    {post.productIds.length > 0 && (
                                        <div className="p-4 mt-2">
                                            <div className="flex items-center gap-1.5 mb-2.5 px-1">
                                                <ShoppingBag size={12} className="text-emerald-500" />
                                                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">Tautan Produk ({post.productIds.length})</span>
                                            </div>
                                            <div className="flex gap-2.5 overflow-x-auto custom-scrollbar pb-1 px-1">
                                                {post.productIds.map(id => {
                                                    const prod = AVAILABLE_PRODUCTS.find(p => p.id === id);
                                                    if (!prod) return null;
                                                    return (
                                                        <div key={prod.id} className="min-w-[150px] max-w-[150px] bg-slate-50/70 rounded-xl p-2 border border-slate-100 flex items-center gap-2">
                                                            <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover bg-white shrink-0" />
                                                            <div className="overflow-hidden">
                                                                <h5 className="text-[11px] font-bold text-slate-800 truncate leading-tight">{prod.name}</h5>
                                                                <p className="text-[10px] font-black text-emerald-600 mt-0.5">{formatRupiah(prod.currentPrice)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Bagian Bawah: Statistik Ringkas & Tombol Kelola */}
                                <div className="border-t border-slate-50 p-4 bg-slate-50/30 flex items-center justify-between rounded-b-[2rem]">
                                    {/* Angka Interaksi */}
                                    <div className="flex items-center gap-3 text-slate-400 font-bold text-xs">
                                        <span className="flex items-center gap-1"><Eye size={14} /> {post.stats.views}</span>
                                        <span className="flex items-center gap-1"><ThumbsUp size={13} /> {post.stats.likes}</span>
                                    </div>

                                    {/* Tombol Aksi Cepat */}
                                    <div className="flex items-center gap-2">
                                        <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-xs rounded-full transition-all active:scale-95">
                                            Edit
                                        </button>
                                        <button className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-full transition-all flex items-center gap-1 hover:bg-slate-50 active:scale-95">
                                            <Share2 size={12} /> Bagikan
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    // Tampilan Jika Kosong
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText size={28} />
                        </div>
                        <h4 className="text-sm font-black text-slate-700">Postingan Tidak Ditemukan</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto font-medium">Coba ubah kata kunci pencarian Anda atau ganti kategori filter yang Anda gunakan.</p>
                    </div>
                )}

            </div>
        </MainLayout>
    );
};

export default PostListView;