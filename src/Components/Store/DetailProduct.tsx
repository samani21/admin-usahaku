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
    BellRing,
    CheckCircle2
} from 'lucide-react';
import { Get } from '@/utils/Get';
import { useParams, useRouter } from 'next/navigation';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { Post } from '@/utils/Post';
import ExpendDescription from './components/ExpendDescription';
import VariantPicker from './components/VariantPicker';
import QtySelector from './components/QtySelector';
import { UserLocationType } from './StoresType';
import { StoresType } from '@/types/StoresType';


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

interface OutletsType extends StoresType {
    product_stock?: number;
    is_currently_open: boolean;
    variants: Variants[];
}

export default function DetailProduct() {
    const [retryEffect, setRetreyEffect] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    // Menggunakan data mock dengan struktur persis seperti data database milikmu
    const [product, setProduct] = useState<ProductsType>();
    const [selectedoutlet, setSelectedOutlet] = useState<OutletsType>();
    const [outlets, setOutlets] = useState<OutletsType[]>();

    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [toast, setToast] = useState<string | null>(null);
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
    const [userLocation, setUserLocation] = useState<UserLocationType | null>(null);
    const [address, setAddress] = useState<string>("Mencari lokasi GPS...");
    const [addressLoading, setAddressLoading] = useState<boolean>(true);
    const getReadableAddress = async (lat: number, lng: number) => {
        setAddressLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=id`
            );
            const data = await response.json();

            if (data && data.address) {
                const addr = data.address;
                // Mengambil nama kecamatan/kelurahan/kota terdekat
                const district = addr.suburb || addr.village || addr.city_district || addr.municipality || "";
                const city = addr.city || addr.town || addr.regency || addr.county || "";

                if (district && city) {
                    setAddress(`${district}, ${city}`);
                } else if (city) {
                    setAddress(city);
                } else {
                    // Fallback jika tidak menemukan info detail
                    const cleanName = data.display_name.split(',').slice(0, 2).join(', ');
                    setAddress(cleanName || "Lokasi Terdeteksi");
                }
            } else {
                setAddress("Lokasi tidak dikenal");
            }
        } catch (error) {
            console.error("Gagal mendapatkan alamat:", error);
            setAddress("Gagal memuat nama lokasi");
        } finally {
            setAddressLoading(false);
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation tidak didukung");
            setAddress("GPS Tidak Didukung");
            setAddressLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation({ lat, lng });
                getReadableAddress(lat, lng);
            },
            (error) => {
                setUserLocation({
                    lat: 0,
                    lng: 0,
                });
                setAddress("Akses GPS Ditolak / Gagal");
                setAddressLoading(false);
                console.log("Gagal ambil lokasi:", error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    }, []);

    useEffect(() => {

        const device_id = localStorage.getItem('device_id');
        const token = localStorage.getItem('customer_token');
        if (device_id && token) {
            if (userLocation != null) {
                fetDetailProduct();
            }
        } else {
            getInitToken();
        }
    }, [userLocation, retryEffect]);

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
            const res = await Get<{ success: boolean; data: any }>(`/customer/store/detail-product/${params?.token}?tenant=${params?.tenant}&lat=${userLocation?.lat !== 0 ? userLocation?.lat : ''}&lng=${userLocation?.lng !== 0 ? userLocation?.lng : ""}`);
            if (res?.success) {
                setProduct(res?.data?.products)
                if (res?.data?.products?.variants && res?.data?.products.variants.length > 0) {
                    setSelectedVariant(res?.data?.products.variants[0]);
                }
                setSelectedOutlet(res?.data?.outlets[0])
                setQuantity(res?.data?.outlets[0]?.product_stock > 0 ? 1 : 0)
                setOutlets(res?.data?.outlets)
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
    const getInitToken = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('/customer/init')
            if (res?.success) {
                localStorage.setItem("device_id", res?.data.device_id)
                localStorage.setItem("customer_token", res?.data.token)
                setRetreyEffect(true);
            }
        } catch (e: any) {
            // console.error(e)
        }
    }
    const handleCart = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('product_id', String(product?.id));
            if (selectedVariant) {
                formData.append('variant_id', String(selectedVariant?.id));
            }
            formData.append('qty', String(quantity));
            formData.append('tenant', String(params?.tenant));
            formData.append('outlet', String(selectedoutlet?.name));
            const res = await Post<any, FormData>('/customer/add-cart', formData)
            if (res?.success) {
                router.push(`/${params?.tenant}/${selectedoutlet?.name}`)
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
        setToast(`🔔 Kami akan memberi tahu Anda jika stok ${selectedVariant?.name || product?.name} di ${selectedoutlet?.name} telah tersedia kembali!`);
        setTimeout(() => setToast(null), 4000);
    };

    // Cek apakah stok varian terpilih / stok produk utama kosong
    const isOutOfStock = selectedVariant
        ? selectedVariant.product_variant_stock === 0
        : (selectedoutlet?.product_stock === 0);

    // Hitung persentase hemat diskon
    const originalPrice = selectedVariant ? selectedVariant.price : product?.price;
    const finalPrice = selectedVariant ? selectedVariant.final_price : product?.final_price;
    const hasDiscount = originalPrice && finalPrice && finalPrice < originalPrice;
    const savedAmount = (originalPrice ?? 0) - (finalPrice ?? 0);

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-24 text-slate-900 font-sans antialiased">
            <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3.5">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => router?.back()}
                        className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-all border border-slate-100 active:scale-95 group"
                        aria-label="Kembali"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <span className="text-sm font-bold text-slate-800 tracking-tight">Detail Menu & Outlet</span>
                    <div>

                    </div>
                </div>
            </nav>
            <main className="max-w-5xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <section className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center aspect-square relative overflow-hidden group">
                            <img
                                src={selectedVariant?.image ?? product?.image}
                                alt={product?.name}
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                            />

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
                        <div className="space-y-3.5">
                            {outlets && outlets?.length > 0 ? (
                                outlets.map((out) => {
                                    const isSelected = out.id === selectedoutlet?.id;
                                    const stockAtThisOutlet = out.product_stock ?? 0;
                                    const isStockOut = stockAtThisOutlet === 0;

                                    return (
                                        <div
                                            key={out.id}
                                            onClick={() => {
                                                setSelectedOutlet(out);
                                                setSelectedVariant(out?.variants[0])
                                            }}
                                            className={`group relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${isSelected
                                                ? 'border-[var(--product-primary-color)] bg-[rgba(var(--product-primary-rgb),0.03)] ring-1 ring-[var(--product-primary-color)] shadow-xs'
                                                : 'border-slate-150 hover:border-slate-300 bg-white shadow-xs'
                                                }`}
                                        >
                                            <div className="space-y-2 flex-1 min-w-0 pr-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${out.is_currently_open ? 'bg-emerald-500' : 'bg-rose-400 animate-pulse'}`} />
                                                    <h4 className="font-extrabold text-slate-800 text-sm truncate">{out.name}</h4>
                                                    {isSelected && (
                                                        <span className="text-[9px] bg-[var(--product-primary-color)] text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Check className="w-2.5 h-2.5" /> Aktif
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-1">{out.address}</p>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-semibold">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {out.distance} dari lokasi Anda
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {out.time_open} - {out.time_close}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4 sm:mt-0 flex sm:flex-col items-end gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                                {isStockOut ? (
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100/60 flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" /> Habis di Sini
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/60 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready {stockAtThisOutlet} Pcs
                                                    </span>
                                                )}

                                                {!out.is_currently_open && (
                                                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">TUTUP</span>
                                                )}

                                                <span className={`text-[11px] font-bold hidden sm:flex items-center gap-0.5 ${isSelected ? 'text-[var(--product-primary-color)]' : 'text-slate-400 group-hover:text-slate-700'}`}>
                                                    {isSelected ? 'Sedang Dipilih' : 'Pilih Outlet'} <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-xs text-slate-500 font-bold">Outlet tidak ditemukan. Silakan ganti kata kunci pencarian Anda.</p>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">

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

                            <div className="p-3 sm:p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col xs:flex-row gap-3 xs:gap-2 items-start xs:items-center justify-between min-w-0">
                                {/* Kolom Kiri: Informasi Harga */}
                                <div className="min-w-0 w-full xs:w-auto">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                                        Harga Terbaik
                                    </span>
                                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                                        <span className="text-xl sm:text-2xl font-black text-slate-900 break-all xs:break-normal">
                                            Rp {finalPrice?.toLocaleString('id-ID')}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-[11px] sm:text-xs font-bold text-slate-400 line-through decoration-slate-300 truncate">
                                                Rp {originalPrice?.toLocaleString('id-ID')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Kolom Kanan: Status Stok */}
                                <div className="text-left xs:text-right shrink-0 w-full xs:w-auto pt-2 xs:pt-0 border-t border-dashed border-slate-200 xs:border-none">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 xs:mb-1">
                                        Status Stok
                                    </span>
                                    {isOutOfStock ? (
                                        <span className="inline-block text-[10px] font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-lg">
                                            Stok Habis
                                        </span>
                                    ) : (
                                        <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg animate-pulse whitespace-nowrap">
                                            Ready {(selectedVariant ? selectedVariant.product_variant_stock : selectedoutlet?.product_stock)} Pcs
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-white shadow-xs">
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4 text-[var(--product-primary-color)]" />
                                    </div>
                                    <div className="space-y-0.5 min-w-0">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Lokasi Pembelian</span>
                                        <h4 className="text-xs font-bold text-slate-800 truncate">{selectedoutlet?.name}</h4>
                                        <p className="text-[11px] text-slate-500 font-medium leading-normal line-clamp-1">{selectedoutlet?.address}</p>
                                    </div>
                                </div>

                                <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-slate-450" />
                                        <span>{selectedoutlet?.day_open} - {selectedoutlet?.day_close}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-slate-450" />
                                        <span>{selectedoutlet?.time_open} - {selectedoutlet?.time_close}</span>
                                    </div>
                                </div>
                            </div>

                            {product && selectedoutlet?.variants && selectedoutlet.variants.length > 0 && (
                                <div className="pt-2">
                                    <VariantPicker
                                        variants={selectedoutlet.variants}
                                        product={product}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={(v) => {
                                            setSelectedVariant(v);
                                            setIsNotified(false); // Reset status notifikasi
                                        }}
                                    />
                                </div>
                            )}

                            {product && product.is_qty && (
                                <div className="pt-1">
                                    <QtySelector
                                        quantity={quantity}
                                        setQuantity={setQuantity}
                                        stock={selectedoutlet?.product_stock ?? 0}
                                        selectedVariant={selectedVariant}
                                    />
                                </div>
                            )}

                            {isOutOfStock && (
                                <div className="space-y-3.5 pt-1">
                                    <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl flex items-start gap-3">
                                        <div className="p-2 bg-amber-100 rounded-xl shrink-0 text-amber-700">
                                            <AlertTriangle className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-amber-800 text-xs sm:text-sm">Varian Produk Kosong</h4>
                                            <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                                                Waduh, maaf! Varian <span className="font-bold">"{selectedVariant?.name}"</span> sedang habis di {selectedoutlet?.name}. Silakan ganti ke varian lain yang bertanda hijau, atau daftarkan pengingat restock instan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                            disabled={!selectedoutlet?.is_currently_open || loading}
                                            onClick={handleCart}
                                            className="w-full py-4 text-xs font-black rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                                            style={{
                                                backgroundColor: selectedoutlet?.is_currently_open ? 'var(--product-primary-color)' : '#94a3b8',
                                                color: 'var(--product-secondary-color)',
                                            }}
                                        >
                                            {loading ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <ShoppingBag className="w-4 h-4" />
                                            )}
                                            <span>
                                                {selectedoutlet?.is_currently_open ? 'Beli Sekarang' : 'Outlet Sedang Tutup'}
                                            </span>
                                        </button>
                                    )}

                                    {!selectedoutlet?.is_currently_open && (
                                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold pt-1">
                                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                                            <span>Pesanan hanya dapat diproses pada jam operasional outlet.</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </section>
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
        </div>
    );
}