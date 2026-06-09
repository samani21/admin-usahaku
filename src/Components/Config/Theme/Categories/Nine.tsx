import React from 'react'
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Nine = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* CARD: SEMUA */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`group relative overflow-hidden rounded-[2.5rem] flex h-44 sm:h-56 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1
                    ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-xl shadow-slate-200/50'}`}
                >
                    {/* Visual Side */}
                    <div className="w-2/5 sm:w-1/3 relative overflow-hidden h-full">
                        <div className={`w-full h-full flex items-center justify-center p-6 transition-transform duration-700 group-hover:scale-110 ${isDarkMode ? "bg-slate-800" : "bg-[var(--category-primary-color)]/10"}`}>
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full text-[var(--category-primary-color)] opacity-20 absolute scale-150 rotate-12' />
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full text-[var(--category-primary-color)] relative z-0' />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center relative">
                        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500">
                            <ArrowUpRight size={32} />
                        </div>

                        <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tighter mb-1">
                            Semua
                        </h3>
                        <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 opacity-40`}>
                            {totalItems} Koleksi Produk
                        </p>

                        <div className="flex items-center gap-2 group/btn">
                            <span className={`text-xs sm:text-sm font-black uppercase tracking-wider py-2 px-5 rounded-full border-2 transition-all duration-300 ${isDarkMode ? 'border-white/10 group-hover:bg-white group-hover:text-black' : 'border-slate-900 group-hover:bg-slate-900 group-hover:text-white'}`}>
                                Lihat Semua
                            </span>
                        </div>
                    </div>
                </div>

                {/* CATEGORIES MAPPING */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className={`group relative overflow-hidden rounded-[2.5rem] flex h-44 sm:h-56 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1
                        ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-xl shadow-slate-200/50'}`}
                    >
                        {/* Visual Side */}
                        <div className="w-2/5 sm:w-1/3 relative overflow-hidden h-full">
                            {cat?.icon?.startsWith("http") ? (
                                <img src={cat.icon} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.name} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center p-6 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" style={{ backgroundColor: `${cat.color}10` }}>
                                    <Icon color={cat?.color} icon={cat?.icon || 'cbi:bulb-general-group'} className='w-full h-full opacity-10 absolute scale-125 text-[var(--category-primary-color)]' />
                                    <Icon color={cat?.color} icon={cat?.icon || 'cbi:bulb-general-group'} className='w-full h-full relative z-0 text-[var(--category-primary-color)]' />
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center relative">
                            {/* Accent Background Letter */}
                            <span className="absolute -bottom-4 -right-2 text-8xl font-black opacity-[0.03] pointer-events-none select-none">
                                {cat.name.charAt(0)}
                            </span>

                            <h3 className="text-xl sm:text-3xl font-black tracking-tighter mb-1 group-hover:translate-x-1 transition-transform duration-500">
                                {cat.name}
                            </h3>
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 opacity-40">
                                {cat.count} Item Tersedia
                            </p>

                            <div className="flex items-center gap-2">
                                <span
                                    className="text-xs sm:text-sm font-black uppercase tracking-wider py-2 px-5 rounded-full border-2 transition-all duration-300"
                                    style={{
                                        borderColor: `${cat.color}30`,
                                        color: isDarkMode ? '#fff' : cat.color
                                    }}
                                >
                                    Kunjungi
                                </span>
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500"
                                    style={{ backgroundColor: cat.color, color: '#fff' }}
                                >
                                    <ArrowUpRight size={16} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Nine