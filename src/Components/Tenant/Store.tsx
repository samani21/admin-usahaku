"use client"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Loading from '@/Components/Component/Loading';
import HeaderConfig from '@/Components/Config/Theme/Header';
import { Catalog } from '@/types/Admin/Catalog/Catalog';
import { Get } from '@/utils/Get';
import HeroConfig from '@/Components/Config/Theme/Hero';
import CategorieConfig from '@/Components/Config/Theme/Categories';
import ProductConfig from '@/Components/Config/Theme/Products';
import SummaryConfig from '@/Components/Config/Theme/Summary';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { v4 as uuidv4 } from "uuid";
import { Post } from '@/utils/Post';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Store as IconStore, ChevronRight, Clock, CheckCircle2, AlertCircle, Phone, Navigation, X, ChevronLeft, Sun, History, Scan, Moon, ScanBarcode } from 'lucide-react';
import ModalOutlet from './Components/ModalOutlet';
import { OutletsType } from '@/types/Admin/OutletType';
import ModalScanProduct from './Components/ModalScanProduct';


interface Cart {
    item: number,
    amount: number
}

interface CatalogType extends Catalog {
    cart: Cart;
    outlet: OutletsType;
}

const getContrastColor = (hex: string | undefined) => {
    if (!hex) return '#1e293b';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
};

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};


export default function Store() {
    const { outlet } = useParams();
    const params = useParams();
    const outletName = typeof outlet === 'string'
        ? decodeURIComponent(outlet)
        : '';
    const [loading, setLoading] = useState<boolean>(true);
    const [catalogData, setCatalogData] = useState<CatalogType | null>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectCategorie, setSeletctCategorie] = useState<string | null>(null);
    const [cartItem, setCartItem] = useState<Cart>({
        item: 0,
        amount: 0
    })
    const [retryEffect, setRetreyEffect] = useState<boolean>(false);
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedOutlet, setSelectedOutlet] = useState<OutletsType | null>(null);
    const [dataProduct, setdataProducts] = useState<ProductsType[]>([]);
    const [tenant, setTenant] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isOpenScan, setIsOpenScan] = useState<boolean>(false);
    // State untuk Sidebar Mobile
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    useEffect(() => {
        const path = window.location.pathname;
        let tenant: string | null = null;
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 0) {
            setTenant(segments[0]);
        }

    }, [])

    useEffect(() => {
        const primary = isDarkTheme ? '#020617' : '#f8fafc';   // slate-950 / slate-50
        const secondary = isDarkTheme ? '#f8fafc' : '#020617'; // kebalikannya

        const root = document.documentElement;
        root.style.setProperty('--mode-primary', primary);
        root.style.setProperty('--mode-secondary', secondary);
    }, [isDarkTheme]);
    const fetchCatalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: CatalogType }>(`/customer/tenant`);
            if (res?.success && res.data) {
                setCatalogData(res.data);
                setIsDarkTheme(res.data.header?.mode === 'dark');
                setdataProducts(res?.data?.products)
                setCartItem({
                    item: res?.data?.cart?.item,
                    amount: res?.data?.cart?.amount
                })
                setSelectedOutlet(res?.data?.outlet)
                // Update CSS variables if colors exist
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
                if (res.data.hero?.color) updateCssVariables('hero', res.data.hero.color);
                if (res.data.category?.color) updateCssVariables('category', res.data.category.color);
                if (res.data.product?.color) updateCssVariables('product', res.data.product.color);
                if (res.data.summary?.color) updateCssVariables('summary', res.data.summary.color);
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

    useEffect(() => {
        const device_id = localStorage.getItem('device_id');
        const token = localStorage.getItem('customer_token');
        if (device_id && token) {
            fetchCatalog()
        } else {
            getInitToken();
        }
    }, [updateCssVariables, retryEffect]);


    const header = catalogData?.header;
    const hero = catalogData?.hero;
    const category = catalogData?.category;
    const categories = catalogData?.categories;
    const product = catalogData?.product
    const products = useMemo(() => {
        if (!dataProduct) return []

        if (selectCategorie) {
            return dataProduct.filter(
                (p) => p?.category === selectCategorie
            )
        }

        return dataProduct
    }, [catalogData, selectCategorie, dataProduct])
    const summary = catalogData?.summary;


    const handleCart = async (p: ProductsType | null, v: Variants | null, qty: number) => {
        // setLoading(true)
        if (!selectedOutlet) {
            setToastMessage("Silahkan pilih outlet dulu!")
            setIsOpenModal(true);
            return
        }
        try {
            const formData = new FormData();
            formData.append('product_id', String(p?.id));
            if (v) {
                formData.append('variant_id', String(v?.id));
            }
            formData.append('qty', String(qty));
            const res = await Post<any, FormData>('/customer/add-cart', formData)
            if (res?.success) {
                // console.log('res?.cartItem', res)
                setCartItem({
                    item: res?.data?.cartItem?.item,
                    amount: res?.data?.cartItem?.amount
                })

                const productNew: ProductsType[] = dataProduct?.map((p) => {
                    // hanya update product yang cocok
                    if (p.id === Number(res?.data?.item?.product_id)) {
                        let updatedProduct = {
                            ...p,
                            product_stock: (p.product_stock ?? 0) - (Number(res?.data?.qty) ?? 0),
                        };

                        // 👉 jika ada variant_id
                        if (res?.data?.item?.variant_id) {
                            updatedProduct = {
                                ...updatedProduct,
                                variants: p.variants?.map((v) => {
                                    if (v.id === Number(res?.data?.item?.variant_id)) {
                                        return {
                                            ...v,
                                            product_variant_stock:
                                                (v.product_variant_stock ?? 0) - (Number(res?.data?.qty) ?? 0),
                                        };
                                    }
                                    return v;
                                }) ?? [],
                            };
                        }

                        return updatedProduct;
                    }

                    return p;
                }) ?? [];

                setdataProducts(productNew);
                triggerToast(`✓ Berhasil ditambah ke keranjang  ${p?.name} ${v ? `(${v?.name})` : ''}`)
            }
        } catch (e: any) {
            // console.error(e);
            triggerToast(e?.message)
        } finally {
            // setLoading(false)
        }

    }

    if (loading) return <Loading title='Sedang memuat halaman' />;
    const triggerToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };
    return (
        <div className={`flex flex-col overflow-hidden  items-center justify-center ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className='max-w-7xl  min-h-screen w-full space-y-6 relative'>
                <div className='fixed z-40  w-full max-w-7xl'>
                    {params?.tenant === tenant ?
                        <header className={`sticky top-0 z-50 w-full ${isDarkTheme ? "bg-slate-900/90" : "bg-white/90 "} backdrop-blur-md border-b ${isDarkTheme ? "border-slate-800/80" : "border-slate-100/80"} px-4 sm:px-6 h-16 flex items-center justify-between transition-colors duration-300`}>

                            {/* SISI KIRI: Tombol Kembali */}
                            <div className="flex flex-1 items-center justify-start">
                                <button
                                    onClick={() => window.location.href = '/store'}
                                    className={`flex items-center justify-center w-9 h-9 rounded-xl border ${isDarkTheme ? "border-slate-800 bg-slate-800/40 hover:bg-slate-800" : "border-slate-100 bg-slate-50/50 hover:bg-slate-100"}  transition-all duration-200 active:scale-95`}
                                    aria-label="Kembali"
                                >
                                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                                </button>
                            </div>

                            {/* SISI TENGAH: Identitas Bisnis */}
                            <div className="flex flex-auto items-center justify-center gap-2.5 max-w-xs sm:max-w-md">
                                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border p-0.5 shadow-sm overflow-hidden shrink-0 ${isDarkTheme ? "bg-slate-800 border-slate-700 " : "bg-slate-50 border-slate-100"}`}>
                                    <img
                                        src={header?.logo ?? '/logo.png'}// Sesuaikan path logo usaha Anda
                                        alt="Logo"
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                </div>
                                <h1
                                    className="font-bold text-base tracking-tight truncate"
                                >
                                    {header?.span_one} {header?.span_two}
                                </h1>
                            </div>

                            {/* SISI KANAN: Panel Menu Fitur */}
                            <div className="flex flex-1 items-center justify-end gap-1.5">
                                <div className={`flex items-center gap-1 p-1 rounded-2xl border ${isDarkTheme ? "bg-slate-800/80 border-slate-700/50" : "bg-slate-50/80 border-slate-100/50"}`}>
                                    {
                                        header?.mode === 'auto' &&
                                        <button
                                            className={`p-2 rounded-xl transition-all active:scale-95 group ${isDarkTheme ? "hover:bg-slate-700 hover:shadow-none" : "hover:shadow-sm hover:bg-white"}`}
                                            title="Ubah Tema"
                                            onClick={() => setIsDarkTheme(!isDarkTheme)}
                                        >
                                            <Sun className={`w-4.5 h-4.5 ${isDarkTheme ? "hidden" : "block"} group-hover:rotate-45 transition-transform`} />
                                            <Moon className={`w-4.5 h-4.5 ${isDarkTheme ? "block" : "hidden"}`} />
                                        </button>
                                    }
                                    <button
                                        onClick={() => window.location.href = `/${tenant}/history`}
                                        className={`p-2  rounded-xl transition-all active:scale-95 ${isDarkTheme ? "hover:bg-slate-700 hover:shadow-none" : "hover:bg-white hover:shadow-sm"}`}
                                        title="Riwayat"
                                    >
                                        <History className="w-4.5 h-4.5" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsOpenScan(true);
                                            setIsOpenSidebar(false); // Tutup sidebar saat modal scan dibuka
                                        }}
                                        className={`p-2 dark: rounded-xl transition-all active:scale-95 ${isDarkTheme ? "hover:bg-slate-700 hover:shadow-none" : "hover:bg-white hover:shadow-sm"}`}
                                        title="Scan QR"
                                    >
                                        <ScanBarcode className="w-4.5 h-4.5" />
                                    </button>

                                </div>
                            </div>
                        </header> :
                        header && (
                            <HeaderConfig
                                layout={header.layout_header}
                                themeMode={isDarkTheme || header?.mode == 'dark' ? "dark" : "light"}
                                logoImage={header.logo}
                                frameType={header.type_frame}
                                frameTheme={header.color_frame}
                                toggleTheme={() => setIsDarkTheme(!isDarkTheme)}
                                spanOne={header.span_one}
                                spanTwo={header.span_two}
                                displayMode={header.mode}
                            />
                        )
                    }
                </div>
                <div className={`mt-8 space-y-6 ${header?.layout_header === 3 ? "pt-26" : 'pt-16'} pb-18 px-2 `}>
                    <div className='flex items-center justify-center'>
                        <div className="w-full  bg-white rounded-3xl shadow-lg hover:shadow-xl border border-zinc-200/80 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col md:flex-row min-h-[140px]">

                            {selectedOutlet ? (
                                <>
                                    <div className="md:w-5/12 p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] md:min-h-auto">
                                        <div className="absolute right-[-10%] bottom-[-10%] text-white/5 pointer-events-none">
                                            <MapPin className="w-44 h-44 rotate-12" />
                                        </div>

                                        <div className="flex justify-start items-start relative z-10">

                                        </div>

                                        <div className="relative z-10 mt-6 md:mt-12">
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-300 bg-black/30 px-2 py-0.5 rounded">
                                                {header?.span_one} {header?.span_two}
                                            </span>
                                            <h2 className="text-xl sm:text-2xl font-black mt-2 tracking-tight leading-snug">
                                                {selectedOutlet.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-6">

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4.5 h-4.5 text-zinc-400" />
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Jam Operasional</p>
                                                        <p className="text-sm font-bold text-zinc-800">
                                                            {selectedOutlet.time_open} - {selectedOutlet.time_close}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Status Badge */}
                                                <div>
                                                    {selectedOutlet.is_currently_open ? (
                                                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                            Buka
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold">
                                                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                                            Tutup
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Alamat */}
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-700">
                                                        <MapPin className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Alamat Lengkap</p>
                                                    <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed mt-0.5">
                                                        {selectedOutlet.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tombol Navigasi / Ganti Outlet */}
                                        <div className="grid grid-cols-1 gap-3 pt-2">
                                            {/* <button
                                                onClick={() => triggerToast(`Navigasi rute aktif menuju ${selectedOutlet.name}`)}
                                                className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-3 px-3 rounded-xl font-bold text-xs transition-colors duration-200"
                                            >
                                                <Navigation className="w-4 h-4 text-zinc-500" />
                                                Petunjuk Rute
                                            </button> */}

                                            <button
                                                onClick={() => setIsOpenModal(true)}
                                                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-950 text-white py-3 px-3 rounded-xl font-bold text-xs shadow-md transition-all duration-200"
                                            >
                                                <IconStore className="w-4 h-4" />
                                                Ganti Outlet
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* JIKA OUTLET BELUM DIPILIH (EMPTY STATE) */
                                <>
                                    {/* Left Side (Column 1): Brand Banner Static */}
                                    <div className="md:w-5/12 p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] md:min-h-auto">
                                        {/* Subtle Map Pin Background Pulsing */}
                                        <div className="absolute right-[-10%] bottom-[-10%] text-white/5 pointer-events-none">
                                            <MapPin className="w-44 h-44 rotate-12 animate-pulse" />
                                        </div>

                                        <div className="flex justify-start items-start relative z-10">
                                            <span className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm border border-white/10">
                                                📍 Lokasi Belum Ditentukan
                                            </span>
                                        </div>

                                        <div className="relative z-10 mt-6 md:mt-12">
                                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 bg-white/10 px-2 py-0.5 rounded">
                                                {header?.span_one} {header?.span_two}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Side (Column 2): Call To Action Placeholder */}
                                    <div className="md:w-7/12 p-6 flex flex-col justify-center items-center text-center space-y-6">
                                        <div className="space-y-2 max-w-sm">
                                            <div className="mx-auto bg-zinc-100 w-12 h-12 rounded-2xl flex items-center justify-center text-zinc-650 mb-3 animate-bounce">
                                                <IconStore className="w-6 h-6 text-zinc-800" />
                                            </div>
                                            <h3 className="text-base font-bold text-zinc-900">Temukan Outlet Terdekat</h3>
                                            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                                                Silakan pilih lokasi outlet terdekat untuk memantau jam operasional secara real-time, alamat navigasi, dan kontak pemesanan.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setIsOpenModal(true)}
                                            className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-950 text-white rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <IconStore className="w-4 h-4" />
                                            Pilih Outlet Sekarang
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                    {hero && (
                        <HeroConfig
                            theme={hero?.layout_hero}
                            isDarkMode={hero?.mode === 'light' ? false : isDarkTheme || hero?.mode == 'dark'}
                            headline={hero?.headline}
                            subHeadline={hero?.sub_headline}
                            ctaText={hero?.cta}
                            imageHero={hero?.image ?? null}
                            title={hero?.title} />
                    )}
                    {
                        categories && category &&
                        <CategorieConfig
                            theme={category?.layout_categories}
                            categories={categories}
                            isDarkMode={category?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                            onClick={(e) => setSeletctCategorie(e)} />
                    }
                    <section id="product-section">
                        {
                            product && products &&
                            <ProductConfig
                                theme={product?.layout_products}
                                products={products}
                                isDarkMode={product?.mode === 'light' ? false : isDarkTheme || product?.mode == 'dark'}
                                handleCart={handleCart}
                                selectedOutlet={selectedOutlet} />
                        }
                    </section>
                    <div className='fixed bottom-0 w-full flex z-20 items-center justify-center left-0'>
                        <div className='max-w-7xl w-full'>
                            {
                                summary && cartItem?.item > 0 && selectedOutlet &&
                                <SummaryConfig
                                    theme={summary?.layout_summary}
                                    isDarkMode={summary?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                                    totalCart={cartItem?.item}
                                    summary={cartItem?.amount}
                                    selectedOutlet={selectedOutlet}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpenModal && <ModalOutlet onClose={() => setIsOpenModal(false)} tenant={tenant} selectedOutlet={selectedOutlet} />
            }
            {toastMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-zinc-800">
                    <div className="bg-zinc-800 p-1.5 rounded-lg text-zinc-300">
                        <Navigation className="w-4 h-4 animate-bounce" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold pr-2">{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
            {isOpenScan && <ModalScanProduct onClose={() => setIsOpenScan(false)} />}
        </div>
    );
}