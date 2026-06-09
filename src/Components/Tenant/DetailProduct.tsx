"use client"
import React, { useState, useEffect, useCallback } from 'react';
import {
    ArrowLeft,
    MapPin,
    ScanBarcode,
    Tag,
    Clock,
    AlertTriangle,
    Check,
    ShoppingBag,
    ChevronRight,
    Info,
    Calendar,
    AlertCircle,
    BellRing
} from 'lucide-react';
import { Get } from '@/utils/Get';
import { useParams } from 'next/navigation';
import ExpendDescription from './Components/ExpendDescription';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import VariantPicker from './Components/VariantPicker';
import QtySelector from './Components/QtySelector';
import { OutletsType } from '@/types/Admin/OutletType';
import { Post } from '@/utils/Post';


// ==========================================
// UTILITY FUNCTIONS & CONTRAST COLOR LOGIC
// ==========================================
const getContrastColor = (hex: string) => {
    if (!hex) return '#1e293b';
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
};

const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
    const [retryEffect, setRetreyEffect] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    // Menggunakan data mock dengan struktur persis seperti data database milikmu
    const [product, setProduct] = useState<ProductsType>();
    const [outlet, setOutlet] = useState<OutletsType>();

    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [isOpenScan, setIsOpenScan] = useState(false);
    const [isNotified, setIsNotified] = useState(false); // Untuk fitur "Ingatkan Saya" saat stok habis

    const updateCssVariables = useCallback((type: string, color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);

    useEffect(() => {
        fetDetailProduct()
    }, [])

    // Pantau jika stok varian berubah menjadi lebih kecil dari kuantitas terpilih
    useEffect(() => {
        const currentStock = selectedVariant ? selectedVariant.product_variant_stock : (product?.product_stock ?? 0);
        if ((currentStock ?? 0) < quantity && (currentStock ?? 0) > 0) {
            setQuantity((currentStock ?? 0));
        } else if (currentStock === 0) {
            setQuantity(1);
        }
    }, [selectedVariant, product]);
    const fetDetailProduct = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: any }>(`/customer/detail-product/${params?.token}`);
            if (res?.success && res.data) {
                setProduct(res?.data?.products)
                if (res?.data?.products?.variants && res?.data?.products.variants.length > 0) {
                    setSelectedVariant(res?.data?.products.variants[0]);
                }
                setOutlet(res?.data?.outlet)
                if (res.data?.product?.color) {
                    updateCssVariables('product', res.data?.product.color);
                } else {
                    updateCssVariables('product', '#10b981'); // Fallback emerald
                }
            }
        } catch (error) {
            // console.error("Failed to fetch catalog:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCart = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('product_id', String(product?.id));
            if (selectedVariant) {
                formData.append('variant_id', String(selectedVariant?.id));
            }
            formData.append('qty', String(quantity));
            const res = await Post<any, FormData>('/customer/add-cart', formData)
            if (res?.success) {
                setTimeout(() => {
                    const reducedQty = Number(quantity) || 1;

                    // Update state stok lokal agar reaktif langsung berubah setelah sukses belanja
                    setProduct((prev) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            product_stock: Math.max(0, (prev?.product_stock ?? 0) - reducedQty),
                            variants: prev.variants?.map((v) => {
                                if (v.id === selectedVariant?.id) {
                                    return {
                                        ...v,
                                        product_variant_stock: Math.max(0, (v.product_variant_stock ?? 0) - reducedQty)
                                    };
                                }
                                return v;
                            })
                        };
                    });

                    // Update varian terpilih agar mencerminkan stok terbaru
                    if (selectedVariant) {
                        setSelectedVariant(prev => prev ? {
                            ...prev,
                            product_variant_stock: Math.max(0, (prev.product_variant_stock ?? 0) - reducedQty)
                        } : null);
                    }

                    setToast(`✓ Berhasil ditambah ke keranjang (${quantity}x ${product?.name} ${selectedVariant ? `(${selectedVariant?.name})` : ''})`);
                    setLoading(false);

                    // Menghilangkan toast otomatis
                    setTimeout(() => setToast(null), 3000);
                }, 800);
            }
        } catch (e: any) {
            // console.error(e);
            setToast(e?.message);
        } finally {
            setLoading(false)
        }

    };

    const handleNotifyMe = () => {
        setIsNotified(true);
        setToast(`🔔 Kami akan memberi tahu Anda jika stok ${selectedVariant?.name || product?.name} di ${outlet?.name} telah tersedia kembali!`);
        setTimeout(() => setToast(null), 4000);
    };

    // Cek apakah stok varian terpilih / stok produk utama kosong
    const isOutOfStock = selectedVariant
        ? selectedVariant.product_variant_stock === 0
        : (product?.product_stock === 0);

    // Hitung persentase hemat diskon
    const originalPrice = selectedVariant ? selectedVariant.price : product?.price;
    const finalPrice = selectedVariant ? selectedVariant.final_price : product?.final_price;
    const hasDiscount = originalPrice && finalPrice && finalPrice < originalPrice;
    const savedAmount = (originalPrice ?? 0) - (finalPrice ?? 0);

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-24 text-slate-900 font-sans antialiased">

            {/* Dynamic Navigasi Bar */}
            <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3.5">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => window.location.href = `/${params?.tenant}/${params?.outlet}`}
                        className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-all border border-slate-100 active:scale-95 group"
                        aria-label="Kembali"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <span className="text-sm font-bold text-slate-800 tracking-tight">Detail Menu & Outlet</span>

                    <button
                        onClick={() => setIsOpenScan(true)}
                        className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-all border border-slate-100 active:scale-95 text-slate-700"
                        aria-label="Scan Barcode"
                    >
                        <ScanBarcode className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* SISI KIRI: MEDIA PREVIEW & DESKRIPSI DETAIL */}
                    <section className="lg:col-span-7 space-y-6">

                        {/* Foto Produk Premium Frame */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center aspect-square relative overflow-hidden group">
                            <img
                                src={selectedVariant?.image ?? product?.image}
                                alt={product?.name}
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                            />

                            {/* Badges Floating di Foto */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                {product?.category && (
                                    <span className="px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-100">
                                        {product?.category}
                                    </span>
                                )}
                                {hasDiscount && (
                                    <span className="px-3.5 py-1.5 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-rose-500/10">
                                        Diskon {Math.round((savedAmount / originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Deskripsi Produk */}
                        {product?.description && product?.description !== '' && (
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-6 rounded-full bg-[var(--product-primary-color)]" />
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Tentang Hidangan</h3>
                                </div>
                                <ExpendDescription
                                    htmlContent={product?.description}
                                    className="text-sm text-slate-500 leading-relaxed font-normal"
                                />
                            </div>
                        )}
                    </section>

                    {/* SISI KANAN: HARGA, VARIAN, OUTLET & AKSI TRANSAKSI */}
                    <section className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">

                            {/* Judul & Badge Potongan Harga */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    {product?.category && (
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--product-primary-color)]">
                                            {product.category}
                                        </span>
                                    )}
                                    {hasDiscount && (
                                        <div className="text-rose-500 flex items-center font-bold text-[11px] gap-1 bg-rose-50 px-2 py-0.5 rounded-md">
                                            <Tag size={12} className="fill-rose-50" />
                                            <span>Hemat Rp {savedAmount.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                                    {product?.name}
                                </h1>
                            </div>

                            {/* Box Harga Retail */}
                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Harga Terbaik</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black text-slate-900">
                                            Rp {finalPrice?.toLocaleString('id-ID')}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-xs font-bold text-slate-400 line-through decoration-slate-300">
                                                Rp {originalPrice?.toLocaleString('id-ID')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Sisa Stok Indicator */}
                                <div className="text-right">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Status Stok</span>
                                    {isOutOfStock ? (
                                        <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-lg">Stok Habis</span>
                                    ) : (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg animate-pulse">
                                            Ready {(selectedVariant ? selectedVariant.product_variant_stock : product?.product_stock)} Pcs
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Info Lokasi Outlet Aktif */}
                            <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-white shadow-xs">
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4 text-[var(--product-primary-color)]" />
                                    </div>
                                    <div className="space-y-0.5 min-w-0">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Lokasi Pembelian</span>
                                        <h4 className="text-xs font-bold text-slate-800 truncate">{outlet?.name}</h4>
                                        <p className="text-[11px] text-slate-500 font-medium leading-normal line-clamp-1">{outlet?.address}</p>
                                    </div>
                                </div>

                                <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-slate-450" />
                                        <span>{outlet?.day_open} - {outlet?.day_close}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-slate-450" />
                                        <span>{outlet?.time_open} - {outlet?.time_close}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Variant Picker */}
                            {product?.variants && product.variants.length > 0 && (
                                <div className="pt-2">
                                    <VariantPicker
                                        variants={product.variants}
                                        product={product}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={(v) => {
                                            setSelectedVariant(v);
                                            setIsNotified(false); // Reset status notifikasi
                                        }}
                                    />
                                </div>
                            )}

                            {/* Quantity Selector */}
                            {product && product.is_qty && (
                                <div className="pt-1">
                                    <QtySelector
                                        quantity={quantity}
                                        setQuantity={setQuantity}
                                        product={product}
                                        selectedVariant={selectedVariant}
                                    />
                                </div>
                            )}

                            {/* UX RECOVERY: INTERACTIVE FALLBACK JIKA STOK HABIS */}
                            {isOutOfStock && (
                                <div className="space-y-3.5 pt-1">
                                    <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl flex items-start gap-3">
                                        <div className="p-2 bg-amber-100 rounded-xl shrink-0 text-amber-700">
                                            <AlertTriangle className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-amber-800 text-xs sm:text-sm">Varian Produk Kosong</h4>
                                            <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                                                Waduh, maaf! Varian <span className="font-bold">"{selectedVariant?.name}"</span> sedang habis di {outlet?.name}. Silakan ganti ke varian lain yang bertanda hijau, atau daftarkan pengingat restock instan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SUMMARY PEMBELIAN & SUB-TOTAL */}
                            <div className="pt-4 border-t border-slate-100 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Item Dipilih</span>
                                        <span className="font-bold text-slate-800 text-xs mt-0.5 block truncate max-w-[180px] sm:max-w-[220px]">
                                            {quantity} X {product?.name} {selectedVariant ? `(${selectedVariant?.name})` : ''}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Subtotal</span>
                                        <span className="text-lg font-black text-slate-900 mt-0.5 block">
                                            Rp {((finalPrice ?? 0) * (isOutOfStock ? 0 : quantity)).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                {/* Tombol Aksi Transaksi Dinamis */}
                                <div className="space-y-2 pt-1">
                                    {isOutOfStock ? (
                                        /* JIKA OUT OF STOCK: GANTI TOMBOL BELI DENGAN TOMBOL "INGATKAN SAYA" */
                                        <button
                                            disabled={true}
                                            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border ${isNotified
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 cursor-default'
                                                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md border-transparent active:scale-[0.99]'
                                                }`}
                                        >
                                            <BellRing className="w-4 h-4" />
                                            <span>Stok Habis</span>
                                        </button>
                                    ) : (
                                        /* JIKA STOK TERSEDIA: TOMBOL BELI SEKARANG AKTIF / MATI KARENA TOKO TUTUP */
                                        <button
                                            disabled={!outlet?.is_currently_open || loading}
                                            onClick={handleCart}
                                            className="w-full py-4 text-xs font-black rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                                            style={{
                                                backgroundColor: outlet?.is_currently_open ? 'var(--product-primary-color)' : '#94a3b8',
                                                color: 'var(--product-secondary-color)',
                                            }}
                                        >
                                            {loading ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <ShoppingBag className="w-4 h-4" />
                                            )}
                                            <span>
                                                {outlet?.is_currently_open ? 'Beli Sekarang' : 'Outlet Sedang Tutup'}
                                            </span>
                                        </button>
                                    )}

                                    {/* Status operasional outlet alert jika outlet tutup */}
                                    {!outlet?.is_currently_open && (
                                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold pt-1">
                                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                                            <span>Pesanan hanya dapat diproses pada jam operasional outlet.</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Toast Notification Floating */}
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
                        {toast && (
                            <div className="p-4 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-bold flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200 border border-slate-800">
                                <span className="flex-1 leading-normal">{toast}</span>
                                <button
                                    onClick={() => setToast(null)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Simulasi Modal Scan */}
            {isOpenScan && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl border border-slate-100">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-600">
                            <ScanBarcode className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-slate-800">Pemindai Barcode</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Silakan dekatkan kode barcode produk ke kamera perangkat Anda untuk proses pemindaian otomatis cepat.
                            </p>
                        </div>
                        <div className="w-full aspect-video bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center text-xs text-slate-450 font-bold border-2 border-slate-200">
                            <div className="absolute inset-x-0 h-0.5 bg-rose-500 top-1/2 -translate-y-1/2 animate-pulse" />
                            <span>[ KAMERA AKTIF ]</span>
                        </div>
                        <button
                            onClick={() => setIsOpenScan(false)}
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}