'use client'; // Wajib untuk Client Component

import CategorieConfig from '@/Components/Config/Theme/Categories';
import HeaderConfig from '@/Components/Config/Theme/Header';
import HeroConfig from '@/Components/Config/Theme/Hero';
import ProductConfig from '@/Components/Config/Theme/Products';
import SummaryConfig from '@/Components/Config/Theme/Summary';
import { TemaOne } from '@/data/TemaOne';
import { ThemePreview } from '@/data/TemaRouter';
import { CategoryType } from '@/types/Admin/Catalog/Categories';
import { CatalogHeaderType } from '@/types/Admin/Catalog/Header';
import { HeroType } from '@/types/Admin/Catalog/Hero';
import { ProductType } from '@/types/Admin/Catalog/Products';
import { SummaryType } from '@/types/Admin/Catalog/Summary';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

function PreviewPage() {
    const params = useParams();
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [header, setHeader] = useState<CatalogHeaderType>();
    const [hero, setHero] = useState<HeroType>();
    const [category, setCategory] = useState<CategoryType>();
    const [categories, setCategories] = useState<CategoriesType[]>();
    const [product, setProduct] = useState<ProductType>();
    const [dataProducts, setDataProducts] = useState<ProductsType[]>();
    const [summary, setSummary] = useState<SummaryType>();
    const [selectCategorie, setSeletctCategorie] = useState<string | null>(null);
    const tema = params.tema;
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        setIsDark(media.matches);

        const listener = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
        };

        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, []);
    const [cartItem, setCartItem] = useState<{
        item: number,
        amount: number
    }>({
        item: 0,
        amount: 0
    })
    const handleCart = (p: ProductsType | null, v: Variants | null, qty: number) => {
        console.log(p, v)
        const amount = v ? v?.final_price : p?.final_price;
        setCartItem({
            item: cartItem?.item + qty,
            amount: cartItem?.amount + (qty * (amount ?? 0))
        })
    }
    useEffect(() => {
        const theme: any = ThemePreview(Number(tema));
        setHeader(theme?.header as any)
        if (theme?.header?.mode === 'dark') {
            setIsDarkTheme(isDark)
        }
        setHero(theme?.hero)
        setCategory(theme?.category)
        setCategories(theme?.categories);
        setProduct(theme?.product);
        const updatedProducts = theme?.products?.map((product: any) => {
            return { ...product }; // Copy data awal
        });

        // 1. Tentukan jumlah produk yang akan dihabiskan (antara 3 sampai 4)
        const totalToEmpty = Math.floor(Math.random() * (4 - 3 + 1)) + 3;

        // 2. Acak index produk yang akan dikosongkan stoknya
        const indicesToEmpty = new Set<number>();
        while (indicesToEmpty.size < Math.min(totalToEmpty, updatedProducts.length)) {
            const randomIndex = Math.floor(Math.random() * updatedProducts.length);
            indicesToEmpty.add(randomIndex);
        }

        // 3. Update stok untuk semua produk
        const finalProducts = updatedProducts.map((product: any, index: number) => {
            let totalStock: number;

            if (indicesToEmpty.has(index)) {
                // Jika index terpilih, stok jadi 0
                totalStock = 0;
            } else {
                // Jika tidak, stok acak 10 - 30
                totalStock = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            }

            // 4. Distribusi ke variant jika ada
            if (product.variants && product.variants.length > 0) {
                let remainingStock = totalStock;
                const updatedVariants = product.variants.map((variant: any, vIndex: number) => {
                    let variantStock = 0;
                    if (totalStock > 0) {
                        if (vIndex === product.variants.length - 1) {
                            variantStock = remainingStock;
                        } else {
                            variantStock = Math.floor(Math.random() * (remainingStock + 1));
                            remainingStock -= variantStock;
                        }
                    }
                    return { ...variant, product_variant_stock: variantStock };
                });

                return { ...product, product_stock: totalStock, variants: updatedVariants };
            }

            return { ...product, product_stock: totalStock };
        });

        setDataProducts(finalProducts);
        setSummary(theme?.summary);
        if (theme?.header?.color) updateCssVariables('header', theme?.header.color);
        if (theme?.hero?.color) updateCssVariables('hero', theme?.hero.color);
        if (theme?.category?.color) updateCssVariables('category', theme?.category.color);
        if (theme?.product?.color) updateCssVariables('product', theme?.product.color);
        if (theme?.summary?.color) updateCssVariables('summary', theme?.summary.color);
    }, [tema, isDark])

    useEffect(() => {
        const primary = isDarkTheme ? '#020617' : '#f8fafc';   // slate-950 / slate-50
        const secondary = isDarkTheme ? '#f8fafc' : '#020617'; // kebalikannya

        const root = document.documentElement;
        root.style.setProperty('--mode-primary', primary);
        root.style.setProperty('--mode-secondary', secondary);
    }, [isDarkTheme]);
    const products = useMemo(() => {
        if (!dataProducts) return []

        if (selectCategorie) {
            return dataProducts.filter(
                (p) => p?.category === selectCategorie
            )
        }

        return dataProducts
    }, [dataProducts, selectCategorie])
    return (
        <div className={`flex flex-col overflow-hidden  items-center justify-center ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className='max-w-7xl  min-h-screen w-full space-y-6 relative'>
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
                            isBuild={true}
                            displayMode={header.mode}
                        />
                    )}
                </div>
                <div className={`mt-12 space-y-6 ${header?.layout_header === 3 ? "pt-35 sm:pt-28" : 'pt-16'} pb-18 px-2 `}>
                    <div className="animate-in fade-in slide-in-from-top duration-500">
                        <div className="max-w-7xl mx-auto ">
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
                                            Ini hanya contoh. Klik tombol untuk kembali ke daftar tema.
                                        </p>
                                    </div>
                                </div>

                                {/* Bagian Aksi/Tombol */}
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <Link
                                        href={'/'}
                                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-all active:scale-95 shadow-md"
                                    >
                                        <ArrowLeft size={18} />
                                        Kembali
                                    </Link>

                                </div>
                            </div>
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
                                handleCart={handleCart} />
                        }
                    </section>
                    <div className='fixed bottom-0 w-full flex z-3 items-center justify-center left-0'>
                        <div className='max-w-7xl w-full'>
                            {
                                summary && cartItem?.item > 0 &&
                                <SummaryConfig
                                    theme={summary?.layout_summary}
                                    isDarkMode={summary?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                                    totalCart={cartItem?.item}
                                    summary={cartItem?.amount}
                                    isBuild={true}
                                    selectedOutlet={null}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Tambahkan Section Hero di sini menggunakan catalogData?.hero */}
        </div>
    );
}

export default PreviewPage;