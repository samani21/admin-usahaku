"use client"
import React, { useState, useRef } from 'react';
import {
    Image as ImageIcon,
    Store,
    MoreHorizontal,
    ShoppingBag,
    Plus,
    Trash2,
    Check,
    UploadCloud,
    Search,
    Zap // Icon baru untuk shortcut promo
} from 'lucide-react';
import MainLayout from '@/Components/Layout/MainLayout';

// --- Mock Data Produk (Dari Database) ---
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

// --- Mock Data Promo (Representasi Tabel Promo) ---
const AVAILABLE_PROMOS = [
    {
        id: 1,
        name: 'Promo Akhir Pekan',
        productIds: [1, 2], // Produk yang terhubung dengan promo ini
        defaultCaption: '🎉 PROMO AKHIR PEKAN! 🎉\n\nNikmati diskon spesial untuk paket nongkrong bareng teman. Cuma berlaku hari ini sampai besok ya!\nLangsung klaim promonya di bawah ini 👇'
    },
    {
        id: 2,
        name: 'Flash Sale Kopi 1L',
        productIds: [3], // Produk yang terhubung
        defaultCaption: '⚡ FLASH SALE HARI INI! ⚡\n\nKopi Susu Gula Aren 1 Liter lagi ada penawaran spesial. Stok terbatas, yuk amankan sekarang sebelum kehabisan!'
    }
];

const CreatePostView = () => {
    // --- State Form ---
    const [caption, setCaption] = useState('');
    const [mainImage, setMainImage] = useState<string | null>('https://images.unsplash.com/photo-1495474472201-4efa70295eb1?auto=format&fit=crop&q=80&w=1000');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [activePromoId, setActivePromoId] = useState<number | null>(null); // State untuk melacak promo aktif
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Handlers ---
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImage(URL.createObjectURL(file));
        }
    };

    const toggleProduct = (productId: number) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
        // Matikan active promo jika user merubah produk secara manual
        setActivePromoId(null);
    };

    // --- Handler Shortcut Promo ---
    const handleApplyPromo = (promo: typeof AVAILABLE_PROMOS[0]) => {
        if (activePromoId === promo.id) {
            // Batalkan pilihan jika diklik lagi
            setActivePromoId(null);
            setSelectedProducts([]);
            setCaption('');
        } else {
            // Terapkan Promo (Auto-select produk & isi caption)
            setActivePromoId(promo.id);
            setSelectedProducts(promo.productIds);
            setCaption(promo.defaultCaption);
        }
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    // --- Filter Produk ---
    const filteredProducts = AVAILABLE_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="w-full animate-in fade-in duration-300">
                <div className="mb-6">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Buat Postingan Baru</h2>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Buat pengumuman atau promo menarik untuk pelanggan Anda.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* --- BAGIAN KIRI: FORM EDITOR --- */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-6 h-fit">

                        {/* Upload Gambar Utama */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500 pl-2">Gambar Utama</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group"
                            >
                                {mainImage ? (
                                    <>
                                        <img src={mainImage} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                                            <span className="bg-white px-5 py-2.5 rounded-full text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xl active:scale-95 transition-transform"><UploadCloud size={16} className="text-emerald-500" /> Ganti Gambar</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-slate-400 flex flex-col items-center group-hover:text-emerald-500 transition-colors">
                                        <ImageIcon size={32} className="mb-2" />
                                        <span className="text-sm font-bold text-slate-600">Klik untuk upload gambar</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* Caption Textarea */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500 pl-2">Caption Postingan</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows={5}
                                placeholder="Tulis sesuatu tentang promo atau produk Anda..."
                                className="w-full bg-white border border-slate-200 text-sm font-bold text-slate-800 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none leading-relaxed"
                            />
                        </div>

                        {/* Pilihan Produk Terkait & Shortcut Promo */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500 pl-2">Tautkan Produk</label>
                            </div>

                            {/* --- SHORTCUT PROMO CAPSULE --- */}
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Zap size={14} className="text-amber-500" />
                                    <p className="text-[11px] font-bold">Shortcut Promo (Pilih Otomatis)</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_PROMOS.map((promo) => (
                                        <button
                                            key={promo.id}
                                            onClick={() => handleApplyPromo(promo)}
                                            className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 border ${activePromoId === promo.id ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/30' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'}`}
                                        >
                                            {promo.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* --- Kolom Pencarian Produk --- */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                    <Search size={16} />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Atau cari & pilih produk manual..."
                                    className="w-full text-xs font-bold text-slate-800 pl-11 pr-4 py-3.5 bg-white border border-slate-200 focus:border-emerald-500 rounded-full outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => {
                                        const isSelected = selectedProducts.includes(product.id);
                                        return (
                                            <div
                                                key={product.id}
                                                onClick={() => toggleProduct(product.id)}
                                                className={`group flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5'}`}
                                            >
                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 group-hover:border-emerald-400'}`}>
                                                    {isSelected && <Check size={14} strokeWidth={3} />}
                                                </div>
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{product.name}</h4>
                                                    <p className="text-[11px] text-slate-500 font-bold">{formatRupiah(product.currentPrice)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400">Produk tidak ditemukan.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="w-full py-4 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-lg shadow-emerald-500/25 transition-all active:scale-95 hover:-translate-y-1 hover:shadow-xl">
                            Terbitkan Postingan
                        </button>
                    </div>

                    {/* --- BAGIAN KANAN: LIVE PREVIEW --- */}
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 pl-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live Preview
                            </h3>
                        </div>

                        {/* Komponen Card Tampilan (Sesuai Gambar Referensi) */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden w-full max-w-lg mx-auto">

                            {/* Header Post */}
                            <div className="flex items-center justify-between p-5">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150"
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full object-cover border border-slate-100"
                                    />
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 leading-none">Kedai Kopi Cabang Gerilya</h3>
                                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 font-bold">
                                            <Store size={12} />
                                            <span>Baru saja</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Caption */}
                            {caption && (
                                <div className="px-5 pb-4">
                                    <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-medium">
                                        {caption}
                                    </p>
                                </div>
                            )}

                            {/* Main Image */}
                            {mainImage && (
                                <div className="w-full px-2">
                                    <img src={mainImage} alt="Post media" className="w-full max-h-[400px] object-cover rounded-3xl" />
                                </div>
                            )}

                            {/* Tautan Produk Terkait (Hanya muncul jika ada yang dipilih) */}
                            {selectedProducts.length > 0 && (
                                <div className="mt-4 p-4">
                                    <div className="flex items-center gap-2 mb-3 px-1">
                                        <ShoppingBag size={14} className="text-emerald-500" />
                                        <h4 className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">Produk Terkait</h4>
                                    </div>

                                    <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 px-1">
                                        {selectedProducts.map(id => {
                                            const product = AVAILABLE_PRODUCTS.find(p => p.id === id);
                                            if (!product) return null;
                                            return (
                                                <div key={product.id} className="min-w-[140px] max-w-[140px] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex-shrink-0 relative group">
                                                    {/* Promo Badge */}
                                                    {product.isPromo && (
                                                        <div className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                                                            Promo
                                                        </div>
                                                    )}

                                                    {/* Product Image Nested Radius */}
                                                    <div className="w-full p-1.5">
                                                        <div className="w-full aspect-[4/3] bg-slate-100 relative rounded-xl overflow-hidden">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="px-2.5 pb-3 pt-1">
                                                        <h5 className="text-[12px] font-black text-slate-800 line-clamp-2 leading-tight min-h-[34px]">
                                                            {product.name}
                                                        </h5>
                                                        <div className="mt-1.5">
                                                            {product.isPromo && (
                                                                <p className="text-[9px] font-bold text-slate-400 line-through decoration-rose-500/50 mb-0.5">
                                                                    {formatRupiah(product.originalPrice)}
                                                                </p>
                                                            )}
                                                            <p className="text-[13px] font-black text-emerald-600">
                                                                {formatRupiah(product.currentPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CreatePostView;