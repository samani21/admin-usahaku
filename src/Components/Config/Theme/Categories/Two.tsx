import React from 'react'
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Two = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-12 px-4">
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">

                {/* TOMBOL SEMUA - Dibuat dengan Aksen Brand */}
                <div onClick={() => { onClick?.(null); handleScroll(); }}
                    className="group flex flex-col items-center cursor-pointer max-w-[140px]">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6">
                        {/* Outer Glow Rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-[var(--category-primary-color)]/30 transition-all duration-500 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-100 animate-spin-slow" />
                        <div className="absolute inset-0 rounded-full border border-[var(--category-primary-color)]/10 transition-all duration-700 scale-125 group-hover:scale-[1.4] opacity-0 group-hover:opacity-100" />

                        {/* Main Circle */}
                        <div className={`relative w-full h-full rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden shadow-2xl
                           ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]'}`}>
                            {/* Inner Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                            <Icon icon={'cbi:bulb-general-group'} className='w-1/2 h-1/2 text-[var(--category-primary-color)] relative z-0 group-hover:rotate-90 transition-transform duration-500' />
                        </div>

                        {/* Badge */}
                        <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black shadow-xl border-4 border-transparent bg-white text-[var(--category-primary-color)] z-0">
                            {totalItems}
                        </div>
                    </div>
                    <h3 className={`text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-[var(--category-primary-color)]'}`}>
                        Semua
                    </h3>
                </div>

                {/* CATEGORIES LOOP */}
                {categories.map((cat, i) => (
                    <div key={i} onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className="group flex flex-col items-center cursor-pointer max-w-[140px]">
                        <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6">

                            {/* Animasi Ring Berwarna sesuai Kategori */}
                            <div
                                className="absolute inset-0 rounded-full border-2 transition-all duration-500 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-100"
                                style={{ borderColor: `${cat?.color}50`, borderStyle: 'dashed' }}
                            />

                            {/* Glow behind the circle */}
                            <div
                                className="absolute inset-2 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                style={{ backgroundColor: cat?.color }}
                            />

                            {/* Main Circle Holder */}
                            <div className={`relative w-full h-full rounded-full p-1.5 transition-all duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]'}`}>
                                <div className="w-full h-full rounded-full overflow-hidden relative group-hover:shadow-inner transition-all">
                                    {cat?.icon?.startsWith("http") ? (
                                        <img
                                            src={cat.icon}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt={cat.name}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center relative transition-colors duration-500 group-hover:bg-slate-50">
                                            {/* Decorative background shape */}
                                            <div
                                                className="absolute inset-0 opacity-5 scale-150 rotate-12 text-[var(--category-primary-color)]"
                                                style={{ color: cat?.color }}
                                            >
                                                <Icon icon={cat?.icon || 'cbi:bulb-general-group'} className="w-full h-full" />
                                            </div>
                                            <Icon
                                                icon={cat?.icon || 'cbi:bulb-general-group'}
                                                className='w-1/2 h-1/2 relative text-[var(--category-primary-color)] z-0 transition-all duration-500 group-hover:scale-110'
                                                style={{ color: cat?.color }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Badge dengan warna kategori */}
                            <div
                                className="absolute -top-1 -right-1 w-9 h-9 rounded-full flex items-center bg-[var(--category-primary-color)] justify-center text-[10px] font-black text-white shadow-lg border-4 transition-all duration-500 group-hover:scale-110 z-0"
                            // style={{ backgroundColor: cat?.color, borderColor: isDarkMode ? '#1e293b' : '#fff' }}
                            >
                                {cat.count || 0}
                            </div>
                        </div>

                        {/* Label */}
                        <div className="text-center space-y-2">
                            <h3 className={`text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>
                                {cat.name}
                            </h3>
                            <div
                                className="h-1 w-2 group-hover:w-8 mx-auto transition-all duration-500 rounded-full opacity-0 group-hover:opacity-100"
                                style={{ backgroundColor: cat?.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Two