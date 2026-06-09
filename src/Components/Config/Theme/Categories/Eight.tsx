import React from 'react'
import { CategoriesType } from "@/types/Admin/CategoriesType";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Eight = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">

                {/* CARD: SEMUA */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`group relative aspect-square rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2
                    ${isDarkMode
                            ? "bg-slate-900 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.02)]"
                            : "bg-slate-50 shadow-[12px_12px_24px_#d1d1d1,-12px_-12px_24px_#ffffff]"}`}
                >
                    <div className={`absolute inset-2 rounded-[2rem] overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
                        <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110 bg-[var(--category-primary-color)]/5" >
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full opacity-10 absolute scale-150 rotate-12 text-[var(--category-primary-color)]' />
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full relative z-0 text-[var(--category-primary-color)]' />
                        </div>
                        {/* Overlay lebih gelap di bawah untuk readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    </div>
                    <div className="absolute bottom-5 left-4 right-4 z-0">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[1.5rem] p-3 flex items-center justify-between shadow-2xl">
                            <div className="flex flex-col overflow-hidden text-white group-hover:text-black transition-colors">
                                <h3 className="font-black text-xs md:text-sm truncate uppercase tracking-tight">
                                    Semua
                                </h3>
                                <span className="text-[9px] opacity-70 font-bold uppercase tracking-widest">
                                    {totalItems} Products
                                </span>
                            </div>
                            <div className="bg-[var(--category-primary-color)] p-1.5 rounded-xl text-white">
                                <ArrowUpRight size={14} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CATEGORIES MAPPING */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className={`group relative aspect-square rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2
                        ${isDarkMode
                                ? "bg-slate-900 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.02)] hover:shadow-[var(--category-primary-color)]/10"
                                : "bg-slate-50 shadow-[12px_12px_24px_#d1d1d1,-12px_-12px_24px_#ffffff]"}`}
                    >
                        <div className={`absolute inset-2 rounded-[2rem] overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
                            {cat?.icon?.startsWith("http") ? (
                                <img
                                    src={cat.icon}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    alt={cat.name}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: `${cat.color}05` }}>
                                    <Icon color={cat?.color} icon={cat?.icon || 'cbi:bulb-general-group'} className='w-full h-full opacity-10 absolute scale-150 rotate-12 text-[var(--category-primary-color)]' />
                                    <Icon color={cat?.color} icon={cat?.icon || 'cbi:bulb-general-group'} className='w-full h-full relative z-0 text-[var(--category-primary-color)]' />
                                </div>
                            )}
                            {/* Overlay lebih gelap di bawah untuk readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        </div>

                        {/* Glass Label */}
                        <div className="absolute bottom-5 left-4 right-4 z-0">
                            <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-[1.5rem] p-3 flex items-center justify-between transition-all duration-500 group-hover:bg-white group-hover:border-white">
                                <div className="flex flex-col overflow-hidden text-white group-hover:text-black transition-colors">
                                    <h3 className="font-black text-xs md:text-sm truncate uppercase tracking-tight">
                                        {cat.name}
                                    </h3>
                                    <span className="text-[9px] opacity-70 font-bold uppercase tracking-widest">
                                        {cat.count || 0} Products
                                    </span>
                                </div>
                                <div
                                    className="p-1.5 rounded-xl transition-all duration-500 bg-[var(--category-primary-color)] text-white"
                                >
                                    <ArrowUpRight size={14} strokeWidth={3} className="group-hover:rotate-45 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Hover Border Accent */}
                        <div
                            className="absolute inset-0 border-2 border-transparent group-hover:border-current transition-colors duration-500 rounded-[2.5rem] pointer-events-none opacity-20"
                            style={{ color: cat.color }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Eight