import React from 'react'
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Three = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`group relative p-6 sm:p-8 rounded-[2.5rem] flex flex-col items-start justify-between min-h-[220px] transition-all duration-500 cursor-pointer border-2 hover:-translate-y-3
                        ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-slate-700' : 'bg-white border-slate-50 shadow-xl shadow-slate-100 text-slate-900'}`}
                >
                    {/* Decorative Gradient Background (Hanya muncul saat hover) */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[2.5rem]"
                    />

                    {/* Top Icon Section */}
                    <div className="w-full flex justify-between items-start">
                        <div
                            className={`w-14 h-14 rounded-2xl bg-[var(--category-primary-color)]/5 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:shadow-xl`}
                        >
                            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                                <Icon icon={'cbi:bulb-general-group'} className='w-8 h-8 text-[var(--category-primary-color)]' />
                            </div>
                        </div>

                        <div
                            className="p-2 rounded-full opacity-0 group-hover:opacity-100 bg-[var(--category-primary-color)]/10 text-[var(--category-primary-color)] transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                        >
                            <ChevronRight className="w-4 h-4" strokeWidth={3} />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-4 relative z-0">
                        <h3 className="text-xl font-black tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">
                            Semua
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span
                                className="text-[10px] font-black px-3 py-1 bg-[var(--category-primary-color)]/15 text-[var(--category-primary-color)] rounded-lg uppercase tracking-wider"
                            >
                                {totalItems} Items
                            </span>
                        </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className={`w-full h-1 mt-6 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div
                            className="w-2 group-hover:w-full h-full bg-[var(--category-primary-color)] transition-all duration-700 ease-out"
                        />
                    </div>
                </div>

                {/* CATEGORIES MAPPING */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className={`group relative p-6 sm:p-8 rounded-[2.5rem] flex flex-col items-start justify-between min-h-[220px] transition-all duration-500 cursor-pointer border-2 hover:-translate-y-3
                        ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-slate-700' : 'bg-white border-slate-50 shadow-xl shadow-slate-100 text-slate-900'}`}
                        style={{
                            boxShadow: !isDarkMode ? `0 20px 40px ${cat.color}15` : '',
                        }}
                    >
                        {/* Decorative Gradient Background (Hanya muncul saat hover) */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[2.5rem]"
                            style={{ backgroundColor: cat.color }}
                        />

                        {/* Top Icon Section */}
                        <div className="w-full flex justify-between items-start">
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-[var(--category-primary-color)]/5 duration-500 group-hover:rotate-12 group-hover:shadow-xl`}
                    
                            >
                                <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                                    {cat?.icon?.startsWith("http") ? (
                                        <img src={cat.icon} className="w-full h-full object-cover" alt={cat.name} />
                                    ) : (
                                        <Icon icon={cat?.icon || 'cbi:bulb-general-group'} className='w-8 h-8 text-[var(--category-primary-color)]' style={{ color: cat.color }} />
                                    )}
                                </div>
                            </div>

                            <div
                                className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                                style={{ backgroundColor: `${cat.color}10`, color: cat.color }}
                            >
                                <ChevronRight className="w-4 h-4" strokeWidth={3} />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="mt-4 relative z-0">
                            <h3 className="text-xl font-black tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">
                                {cat.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span
                                    className="text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider"
                                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                                >
                                    {cat.count || 0} Items
                                </span>
                            </div>
                        </div>

                        {/* Bottom Accent Line */}
                        <div className={`w-full h-1 mt-6 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <div
                                className="w-2 group-hover:w-full h-full transition-all duration-700 ease-out"
                                style={{ backgroundColor: cat.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Three