import React from 'react'
import { ArrowUpRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Six = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                {/* CARD: SEMUA */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className="relative h-48 sm:h-72 rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg transition-all duration-700 hover:shadow-[var(--category-primary-color)]/20 hover:-translate-y-2">

                    {/* Background Layer */}
                    <div className={`absolute inset-0 transition-transform duration-1000 group-hover:scale-110 flex items-center justify-center 
                        ${isDarkMode ? "bg-slate-900" : "bg-[var(--category-primary-color)]"}`}>
                        {/* Mesh Decor untuk Non-Image */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[50px] rounded-full animate-pulse" />
                        <Icon icon={'cbi:bulb-general-group'} className='w-1/2 h-1/2 text-white/10 rotate-12' />
                    </div>

                    {/* Dark Overlay & Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Content Section */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                        <div className="backdrop-blur-md bg-white/10 px-6 py-4 rounded-3xl border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:bg-white/20">
                            <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter text-center">
                                Semua
                            </h3>
                            <div className="flex items-center justify-center gap-2 mt-1 opacity-80">
                                <span className="text-[10px] font-bold tracking-[0.2em]">{totalItems} ITEM</span>
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CATEGORIES MAPPING */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className="relative h-48 sm:h-72 rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg transition-all duration-700 hover:-translate-y-2"
                    >

                        {/* Dynamic Background */}
                        <div className="absolute inset-0 w-full h-full">
                            {cat?.icon?.startsWith("http") ? (
                                <img
                                    src={cat.icon}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                                    alt={cat.name}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center transition-colors duration-700 bg-[var(--category-primary-color)]">
                                    {/* Animated Mesh Circle */}
                                    <div className="absolute inset-0 opacity-30 blur-[40px] animate-spin-slow bg-gradient-to-r from-[var(--category-primary-color)] to-transparent" />
                                    <Icon icon={cat?.icon || 'cbi:bulb-general-group'}
                                        className='w-1/2 h-1/2 opacity-20 group-hover:opacity-40 transition-opacity  text-white' />
                                </div>
                            )}
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70" />

                        {/* Text Overlay with Glassmorphism */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <div className="relative group-hover:-translate-y-2 transition-transform duration-500 text-center">
                                <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-none">
                                    {cat.name}
                                </h3>
                                <div className="mt-3 flex items-center justify-center gap-2">
                                    <div className="h-[1px] w-4 bg-white/50" />
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                                        {cat.count || 0} Products
                                    </span>
                                    <div className="h-[1px] w-4 bg-white/50" />
                                </div>
                            </div>

                            {/* Hover Button Effect */}
                            <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full">
                                Explore <ArrowUpRight size={12} strokeWidth={3} />
                            </div>
                        </div>

                        {/* Thin Inner Border */}
                        <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Six