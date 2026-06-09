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
import { ArrowLeft, Eye } from 'lucide-react';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';

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

type Props = {
    onClose: () => void;
}

export default function PreviewPage({ onClose }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [catalogData, setCatalogData] = useState<Catalog | null>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectCategorie, setSeletctCategorie] = useState<string | null>(null);
    const [cartItem, setCartItem] = useState<{
        item: number,
        amount: number
    }>({
        item: 0,
        amount: 0
    })
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);

    const fetchCatalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');
            if (res?.success && res.data) {
                setCatalogData(res.data);
                setIsDarkTheme(res.data.header?.mode === 'dark');

                // Update CSS variables if colors exist
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
                if (res.data.hero?.color) updateCssVariables('hero', res.data.hero.color);
                if (res.data.category?.color) updateCssVariables('category', res.data.category.color);
                if (res.data.product?.color) updateCssVariables('product', res.data.product.color);
                if (res.data.summary?.color) updateCssVariables('summary', res.data.summary.color);
            }
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalog();
    }, [updateCssVariables]);


    const header = catalogData?.header;
    const hero = catalogData?.hero;
    const category = catalogData?.category;
    const categories = catalogData?.categories;
    const product = catalogData?.product
    const products = useMemo(() => {
        if (!catalogData?.products) return []

        if (selectCategorie) {
            return catalogData.products.filter(
                (p) => p?.category === selectCategorie
            )
        }

        return catalogData.products
    }, [catalogData, selectCategorie])
    const summary = catalogData?.summary;

    if (loading) return <Loading title='Sedang memuat halaman' />;

    const handleCart = (p: ProductsType | null, v: Variants | null, qty: number) => {
        console.log(p, v)
        const amount = v ? v?.final_price : p?.final_price;
        setCartItem({
            item: cartItem?.item + qty,
            amount: cartItem?.amount + (qty * (amount ?? 0))
        })
    }
    return (
        <div className={`flex flex-col items-center justify-center ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className='max-w-7xl w-full space-y-6 relative'>
                <div className='fixed z-40  w-full max-w-7xl'>
                    {header && (
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
                            isBuild={true}
                        />
                    )}
                </div>
                <div className={`mt-12 space-y-6 ${header?.layout_header === 3 ? "pt-26" : 'pt-16'} pb-18 px-2 `}>
                    <div className="animate-in fade-in slide-in-from-top duration-500">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white/80 backdrop-blur-md border border-blue-100 shadow-lg rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">

                                {/* Bagian Teks & Ikon */}
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-blue-200 shadow-lg">
                                        <Eye size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold text-sm md:text-base">
                                            Mode Pratinjau Aktif
                                        </h3>
                                        <p className="text-gray-500 text-xs md:text-sm">
                                            Ini hanya tampilan sementara. Klik tombol untuk kembali ke editor.
                                        </p>
                                    </div>
                                </div>

                                {/* Bagian Aksi/Tombol */}
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-all active:scale-95 shadow-md"
                                    >
                                        <ArrowLeft size={18} />
                                        Kembali
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    {hero && (
                        <div className={`${(hero?.mode != "light" && isDarkTheme) || hero?.mode == 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <HeroConfig
                                theme={hero?.layout_hero}
                                isDarkMode={hero?.mode === 'light' ? false : isDarkTheme || hero?.mode == 'dark'}
                                headline={hero?.headline}
                                subHeadline={hero?.sub_headline}
                                ctaText={hero?.cta}
                                imageHero={hero?.image ?? null}
                                title={hero?.title} />
                        </div>
                    )}
                    {
                        categories && category &&
                        <CategorieConfig
                            theme={category?.layout_categories}
                            categories={categories}
                            isDarkMode={category?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                            onClick={(e) => setSeletctCategorie(e)} />
                    }
                    {
                        product && products &&
                        <div className={`${(product?.mode != "light" && isDarkTheme) || product?.mode == 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <ProductConfig
                                theme={product?.layout_products}
                                products={products}
                                isDarkMode={product?.mode === 'light' ? false : isDarkTheme || product?.mode == 'dark'}
                                handleCart={handleCart} />
                        </div>
                    }
                    <div className='fixed bottom-0 w-full flex items-center justify-center left-0'>
                        <div className='max-w-7xl w-full'>
                            {
                                summary &&
                                <SummaryConfig
                                    theme={summary?.layout_summary}
                                    isDarkMode={summary?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                                    totalCart={cartItem?.item}
                                    summary={cartItem?.amount}
                                    isBuild={true}
                                    selectedOutlet={null} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Tambahkan Section Hero di sini menggunakan catalogData?.hero */}
        </div>
    );
}