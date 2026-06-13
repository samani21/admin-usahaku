import React from 'react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const FourTen = ({ categories, isDarkMode, onClick }: Props) => {
    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const cardBg = isDarkMode ? 'bg-slate-900' : 'bg-white';
    const borderColor = isDarkMode ? 'border-slate-700' : 'border-slate-900';

    return (
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">

                {/* CARD: SEMUA */}
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className="relative group cursor-pointer aspect-[4/5]"
                >
                    {/* Offset Shadow Layer */}
                    <div className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3 bg-[var(--category-primary-color)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300" />

                    {/* Main Card */}
                    <div className={`relative h-full rounded-2xl border-4 ${borderColor} ${cardBg} overflow-hidden flex flex-col transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1`}>
                        <div className="flex-1 relative bg-[var(--category-primary-color)]/5 flex items-center justify-center p-8">
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full text-[var(--category-primary-color)] transition-transform duration-500 group-hover:scale-110' />
                        </div>

                        {/* Label */}
                        <div className={`p-3 py-1 border-t-4 ${borderColor} ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                            <h3 className="font-black uppercase italic tracking-tighter text-sm md:text-lg leading-none truncate">
                                Semua
                            </h3>
                            <p className="text-[10px] font-bold opacity-60 mt-1 uppercase">Explore All</p>
                        </div>
                    </div>
                </div>

                {/* CATEGORIES MAPPING */}
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => { onClick?.(cat?.name); handleScroll(); }}
                        className="relative group cursor-pointer aspect-[4/5]"
                    >
                        {/* Dynamic Offset Shadow */}
                        <div
                            className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 opacity-40"
                            style={{ backgroundColor: cat.color || '#000' }}
                        />

                        {/* Main Card */}
                        <div className={`relative h-full rounded-2xl border-4 ${borderColor} ${cardBg} overflow-hidden flex flex-col transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1`}>
                            <div className="flex-1 relative flex items-center justify-center p-8 bg-[var(--category-primary-color)]/10" >
                                {cat?.icon?.startsWith("http") ? (
                                    <img
                                        src={cat.icon}
                                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isDarkMode ? 'brightness-90' : ''}`}
                                        alt={cat.name}
                                    />
                                ) : (
                                    <Icon
                                        color={cat?.color}
                                        icon={cat?.icon || 'cbi:bulb-general-group'}
                                        className='w-full h-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 text-[var(--category-primary-color)]'
                                    />
                                )}
                            </div>

                            {/* Label */}
                            <div className={`p-3 py-1 border-t-4 ${borderColor} ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                                <h3 className="font-black uppercase italic tracking-tighter text-sm md:text-lg leading-none truncate">
                                    {cat.name}
                                </h3>
                                <p className="text-[10px] font-bold opacity-60 mt-1 uppercase">
                                    {cat.count || 0} Items
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FourTen;