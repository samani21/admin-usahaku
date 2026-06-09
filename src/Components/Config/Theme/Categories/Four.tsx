import React from 'react'
import { ArrowUpRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Four = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LIST ITEM: SEMUA */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`group relative flex items-center p-3 sm:p-4 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden
                    ${isDarkMode ? 'bg-slate-900/50 hover:bg-slate-800' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[var(--category-primary-color)]/10'}`}
                >
                    {/* Hover Background Decor */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-[var(--category-primary-color)] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r-full" />

                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mr-5 shadow-inner">
                        <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 ${isDarkMode ? "bg-slate-800 text-[var(--category-primary-color)]" : "bg-[var(--category-primary-color)]/5 text-[var(--category-primary-color)]"}`}>
                            <Icon icon={'cbi:bulb-general-group'} className='w-10 h-10' />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className={`text-lg font-black italic uppercase tracking-tighter transition-colors ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-[var(--category-primary-color)]'}`}>
                            Semua Produk
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-widest opacity-60 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {totalItems} Koleksi Tersedia
                        </p>
                    </div>

                    <div className={`mr-2 p-3 rounded-2xl transition-all duration-500 group-hover:bg-[var(--category-primary-color)] group-hover:text-white group-hover:rotate-12 ${isDarkMode ? "bg-slate-800" : "bg-slate-50"}`}>
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>

                {/* CATEGORIES MAPPING */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className={`group relative flex items-center p-3 sm:p-4 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden
                        ${isDarkMode ? 'bg-slate-900/50 hover:bg-slate-800' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'}`}
                        style={{
                            borderColor: !isDarkMode ? `${cat.color}10` : '',
                        }}
                    >
                        {/* Hover Color Border */}
                        <div
                            className="absolute inset-y-0 left-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r-full"
                            style={{ backgroundColor: cat.color }}
                        />

                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mr-5">
                            <div
                                className="w-full h-full flex items-center justify-center transition-all bg-[var(--category-primary-color)]/5 duration-700 group-hover:rotate-6 group-hover:scale-110"
                            >
                                {cat?.icon?.startsWith("http") ? (
                                    <img src={cat.icon} className="w-full h-full object-cover" alt={cat.name} />
                                ) : (
                                    <Icon icon={cat?.icon || 'cbi:bulb-general-group'} className='w-10 h-10 text-[var(--category-primary-color)]' style={{ color: cat.color }} />
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-black tracking-tight group-hover:translate-x-1 transition-transform">
                                {cat.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span
                                    className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider"
                                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                                >
                                    {cat.count} Item
                                </span>
                            </div>
                        </div>

                        <div
                            className={`mr-2 p-3 rounded-2xl transition-all duration-500 scale-0 group-hover:scale-100 group-hover:rotate-12`}
                            style={{ backgroundColor: `${cat.color}10`, color: cat.color }}
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Four