import React from 'react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Eleven = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-6">

                {/* BIG FEATURE CARD: SEMUA */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`group relative col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700
                    ${isDarkMode ? 'bg-slate-900 border border-white/5' : 'bg-white shadow-2xl shadow-slate-200'}`}
                >
                    <div className="absolute inset-0 z-0">
                        <div className={`w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${isDarkMode ? 'bg-[var(--category-primary-color)]' : 'bg-[var(--category-primary-color)]'}`} />
                        <Icon
                            icon="solar:Widget-6-bold-duotone"
                            className="absolute -right-10 -bottom-10 w-64 h-64 text-[var(--category-primary-color)]/20 rotate-12 group-hover:rotate-0 transition-transform duration-1000"
                        />
                    </div>

                    <div className="relative z-0 h-full p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-[var(--category-primary-color)] text-white text-[10px] font-bold uppercase tracking-widest mb-4">
                                Global Catalog
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
                                Lihat<br />Semua
                            </h2>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-sm font-medium opacity-50 uppercase tracking-widest">
                                Total {totalItems} Koleksi Terkini
                            </p>
                            <div className="w-14 h-14 rounded-2xl bg-[var(--category-primary-color)] flex items-center justify-center text-white shadow-lg shadow-[var(--category-primary-color)]/30 group-hover:scale-110 transition-transform">
                                <ArrowRight size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* DYNAMIC CATEGORY CARDS */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className={`group relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500
                        ${i % 3 === 0 ? 'md:col-span-2' : 'col-span-1'} 
                        ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-white hover:shadow-xl'}`}
                    >
                        {/* Background Visual */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0" style={{ backgroundColor: `${cat.color}15` }} />
                        </div>

                        <div className="relative z-0 h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 text-[var(--category-primary-color)] bg-[var(--category-primary-color)]/20"
                                >

                                    {cat?.icon?.startsWith("http") ? (
                                        <img src={cat.icon} className="w-full h-full rounded-xl" alt={cat.name} />
                                    ) : (
                                        <Icon icon={cat?.icon || 'cbi:bulb-general-group'} className="w-7 h-7 text-[var(--category-primary-color)]" />
                                    )}
                                </div>
                                <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 transition-opacity">
                                    0{i + 1}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 truncate">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="h-[2px] w-4 bg-current opacity-20 transition-all duration-500 group-hover:w-8" style={{ color: cat.color }} />
                                    <span className="text-[10px] font-bold uppercase opacity-40">
                                        {cat.count} Items
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Image Reveal (Small) */}
                        {cat?.icon?.startsWith("http") && (
                            <img
                                src={cat.icon}
                                className="absolute top-0 right-0 w-24 h-24 object-cover opacity-0 group-hover:opacity-10 -rotate-12 translate-x-4 -translate-y-4 transition-all duration-700"
                                alt=""
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Eleven;