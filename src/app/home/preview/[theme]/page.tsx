"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Catalog } from '@/types/Admin/Catalog/Catalog';
import { Get } from '@/utils/Get';
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Navigation, X } from 'lucide-react';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import Loading from '@/Components/Loading';
import HeroConfig from '@/Components/Catalog/Hero';
import CategorieConfig from '@/Components/Catalog/Categories';
import ProductConfig from '@/Components/Catalog/Products';
import SummaryConfig from '@/Components/Catalog/Summary';
import HeaderConfig from '@/Components/Catalog/Header';
import { getThemeLayout } from '@/lib/Theme/Theme';
import { useParams } from 'next/navigation';

// Helpers
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


type CartState = {
    item: number;
    amount: number;
};

export default function PreviewTheme({ }) {
    const params = useParams();
    // State
    const [loading, setLoading] = useState<boolean>(true);
    const [catalogData, setCatalogData] = useState<Catalog | null>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [cart, setCart] = useState<CartState>({ item: 0, amount: 0 });
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    // CSS Variables Updater
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        // Mencegah error SSR di Next.js saat mengakses document
        if (typeof document === 'undefined') return;

        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        const root = document.documentElement;
        root.style.setProperty(`--${type}-primary-color`, color);
        root.style.setProperty(`--${type}-secondary-color`, contrast);
        root.style.setProperty(`--${type}-primary-rgb`, rgb);
        root.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);

    // Fetch Data
    useEffect(() => {
        if (params?.theme) {
            const layout = Number(params?.theme);
            const res = getThemeLayout(layout)
            if (res?.success && res.data) {
                console.log(res)
                const data = res.data as any;
                setCatalogData(data);
                setIsDarkTheme(data.header?.mode === 'dark');

                // Update CSS variables if colors exist
                if (data.header?.color) updateCssVariables('header', data.header.color);
                if (data.hero?.color) updateCssVariables('hero', data.hero.color);
                if (data.category?.color) updateCssVariables('category', data.category.color);
                if (data.product?.color) updateCssVariables('product', data.product.color);
                if (data.summary?.color) updateCssVariables('summary', data.summary.color);
                setLoading(false)
            }
        }
    }, [updateCssVariables, params]);

    // Derived State (Destructuring untuk akses lebih mudah dan bersih)
    const { header, hero, category, categories, product: productConfig, summary } = catalogData || {};

    const filteredProducts = useMemo(() => {
        if (!catalogData?.products) return [];
        if (selectedCategory) {
            return catalogData.products.filter((p) => p?.category === selectedCategory);
        }
        return catalogData.products;
    }, [catalogData, selectedCategory]);

    // Handlers
    const handleCart = (p: ProductsType | null, v: Variants | null, qty: number) => {
        const amount = v ? v.final_price : p?.final_price;
        setCart((prev) => ({
            item: prev.item + qty,
            amount: prev.amount + (qty * (amount ?? 0)),
        }));
        triggerToast(`✓ Berhasil ditambah ke keranjang  ${p?.name} ${v ? `(${v?.name})` : ''}`)
    };
    const triggerToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };
    // Render
    if (loading) return <Loading title='Sedang memuat halaman' />;

    const isDarkModeActive = isDarkTheme || header?.mode === 'dark';

    return (
        <div className={`flex flex-col items-center justify-center ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className='max-w-7xl w-full space-y-6 relative'>

                {/* Header Section */}
                <div className='fixed z-40 w-full max-w-7xl'>
                    {header && (
                        <HeaderConfig
                            layout={header.layout_header}
                            themeMode={isDarkModeActive ? "dark" : "light"}
                            logoImage={header.logo}
                            frameType={header.type_frame}
                            frameTheme={header.color_frame}
                            toggleTheme={() => setIsDarkTheme(!isDarkTheme)}
                            spanOne={header.span_one}
                            spanTwo={header.span_two}
                            displayMode={header.mode}
                            isBuild={true}
                            openScan={() => { }}
                        />
                    )}
                </div>
                {/* Main Content */}
                <div className={`mt-12 space-y-6 pt-22 pb-18 px-2`}>

                    {/* Preview Banner */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto w-full mb-8 px-4">
                        {/* Main Card - Glassmorphism Style */}
                        <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-[2rem] p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden">

                            {/* Decorative Background Glow */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/40 via-transparent to-purple-50/40 pointer-events-none" />

                            {/* 1. Bagian Kiri: Status Pratinjau */}
                            <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 shrink-0">
                                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl" />
                                    <Eye size={22} className="relative z-10" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 tracking-tight">
                                        Mode Pratinjau
                                    </span>
                                    <span className="text-xs font-medium text-gray-500">
                                        Simulasi tampilan desain
                                    </span>
                                </div>
                            </div>

                            {/* 2. Bagian Tengah: Kapsul Navigasi Tema */}
                            <div className="z-10 flex items-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-full border border-gray-200/50 w-full md:w-auto justify-between md:justify-center transition-all hover:bg-gray-100">
                                {/* Tombol Sebelumnya */}
                                <button
                                    disabled={Number(params?.theme) === 1}
                                    onClick={() => window.location.href = `/home/preview/${Number(params?.theme) - 1}`}
                                    className="disabled:bg-gray-200 flex items-center gap-1 px-3 md:px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-all shadow-none hover:shadow-sm group">
                                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                                    <span className="hidden sm:block">Sblm</span>
                                </button>

                                {/* Indikator Tema Aktif */}
                                <div className="px-4 py-1 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 whitespace-nowrap">
                                        Tema {params?.theme}
                                    </span>
                                </div>

                                {/* Tombol Selanjutnya */}
                                <button
                                    disabled={Number(params?.theme) === 20}
                                    onClick={() => window.location.href = `/home/preview/${Number(params?.theme) + 1}`}
                                    className="disabled:bg-gray-200  flex items-center gap-1 px-3 md:px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-all shadow-none hover:shadow-sm group">
                                    <span className="hidden sm:block">Lanjut</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* 3. Bagian Kanan: Tombol Aksi Utama */}
                            <div className="z-10 w-full md:w-auto shrink-0">
                                <button className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-2xl overflow-hidden transition-all active:scale-95 shadow-md hover:shadow-xl hover:shadow-gray-900/20">
                                    <ArrowLeft size={18} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                                    <span className="relative z-10">Kembali ke Editor</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Hero Section */}
                    {hero && (
                        <div className={`${(hero.mode !== "light" && isDarkTheme) || hero.mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <HeroConfig
                                theme={hero.layout_hero}
                                isDarkMode={hero.mode === 'light' ? false : isDarkTheme || hero.mode === 'dark'}
                                headline={hero.headline}
                                subHeadline={hero.sub_headline}
                                ctaText={hero.cta}
                                imageHero={hero.image ?? null}
                                title={hero.title}
                            />
                        </div>
                    )}

                    {/* Categories Section */}
                    {categories && category && (
                        <CategorieConfig
                            theme={category.layout_categories}
                            dataCategories={categories}
                            isDarkMode={category.mode === 'light' ? false : isDarkTheme || category.mode === 'dark'}
                            onClick={setSelectedCategory}
                        />
                    )}

                    {/* Products Section */}
                    {productConfig && filteredProducts.length > 0 && (
                        <div id='product-section' className={`${(productConfig.mode !== "light" && isDarkTheme) || productConfig.mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <ProductConfig
                                theme={productConfig.layout_products}
                                dataProducts={filteredProducts}
                                isDarkMode={productConfig.mode === 'light' ? false : isDarkTheme || productConfig.mode === 'dark'}
                                handleCart={handleCart}
                            />
                        </div>
                    )}

                    {/* Summary / Cart Section */}
                    <div className='fixed z-50 bottom-0 w-full flex items-center justify-center left-0'>
                        <div className='max-w-7xl w-full'>
                            {summary && cart.item > 0 && (
                                <SummaryConfig
                                    theme={summary.layout_summary}
                                    isDarkMode={summary.mode === 'light' ? false : isDarkTheme || category?.mode === 'dark'}
                                    totalCart={cart.item}
                                    summary={cart.amount}
                                    isBuild={true}
                                    selectedOutlet={null}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
            {toastMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[101] w-[calc(100%-2rem)] sm:w-max max-w-md bg-zinc-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4 animate-fade-in border border-zinc-800 transition-all hover:bg-zinc-900">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-xl text-zinc-200 shrink-0">
                            <Navigation className="w-4 h-4 animate-bounce" />
                        </div>
                        <span className="text-sm font-medium leading-snug">{toastMessage}</span>
                    </div>
                    <button
                        onClick={() => setToastMessage(null)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}