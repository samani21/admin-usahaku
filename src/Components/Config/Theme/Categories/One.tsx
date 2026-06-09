import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    categories: CategoriesType[];
    onClick?: (v: string | null) => void;
}

const One = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px] sm:auto-rows-[160px]">
                {/* TOMBOL "SEMUA" - Dibuat Standout dengan Bento Style */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`relative group overflow-hidden rounded-[2.5rem] cursor-pointer col-span-2 row-span-1 shadow-2xl transition-all duration-500 hover:-translate-y-2
                      ${isDarkMode ? "bg-slate-800" : "bg-slate-200 text-slate-900"}`}
                >
                    <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
                        <LayoutGrid className="w-full h-full p-4 rotate-12 text-[var(--category-primary-color)]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between px-8">
                        <div>
                            <h3 className="text-2xl font-black uppercase italic leading-none">Semua</h3>
                            <p className="text-sm opacity-80 font-bold">{totalItems} Produk</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <ChevronRight className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* CATEGORIES LOOP */}
                {categories.map((cat, i) => {
                    // Logika untuk membuat variasi ukuran grid (Bento Style)
                    const isLarge = i === 0 || i === 3;

                    return (
                        cat?.icon?.startsWith("http") ?
                            <div
                                key={i}
                                onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                                className={`relative group overflow-hidden rounded-[2.5rem] cursor-pointer shadow-lg transition-all duration-500 hover:-translate-y-2
                            ${isLarge ? "col-span-2 row-span-2" : "col-span-2 md:col-span-2 row-span-1 sm:row-span-2"}
                            ${isDarkMode ? "shadow-black/40" : "shadow-slate-200"}`}
                            >
                                {/* Image/Icon Layer */}
                                <img
                                    src={cat.icon}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt={cat.name}
                                />
                                {/* Overlay Gradient - Dibuat lebih halus */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity p-6 sm:p-8 flex flex-col justify-end">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 bg-white/20 backdrop-blur-md text-white"
                                            style={{ backgroundColor: `${cat.color}80` }}
                                        >
                                            Kategori
                                        </span>
                                        <h3 className="text-lg sm:text-2xl font-black text-white uppercase italic leading-tight group-hover:text-[var(--category-primary-color)] transition-colors">
                                            {cat.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 overflow-hidden">
                                            <p className="text-white/70 text-xs sm:text-sm font-medium">
                                                {cat?.count || 0} Items
                                            </p>
                                            <div className="h-[2px] w-0 group-hover:w-10 bg-[var(--category-primary-color)] transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Icon on Hover */}
                                <div className="absolute top-5 right-5 scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                                        <ChevronRight className="text-white w-5 h-5" />
                                    </div>
                                </div>
                            </div> :
                            <div
                                key={i}
                                onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                                className={`relative group overflow-hidden rounded-[2.5rem] cursor-pointer col-span-2 row-span-1 shadow-2xl transition-all duration-500 hover:-translate-y-2
                    ${isDarkMode ? "bg-slate-800" : "bg-slate-200 text-slate-900"}`}
                            >
                                <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
                                    <Icon
                                        icon={cat?.icon || 'cbi:bulb-general-group'}
                                        className="w-full h-full p-4 rotate-12 text-[var(--category-primary-color)]"
                                        color={cat?.color}
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-between px-8">
                                    <div>
                                        <h3 className="text-2xl font-black uppercase italic leading-none">{cat?.name}</h3>
                                        <p className="text-sm opacity-80 font-bold">{cat?.count} Produk</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                    );
                })}
            </div>
        </section>
    )
}

export default One