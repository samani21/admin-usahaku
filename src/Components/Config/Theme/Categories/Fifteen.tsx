import React, { useState } from 'react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Sixteen = ({ categories, isDarkMode, onClick }: Props) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);
    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };


    return (
        <section className="px-4  mx-auto">
            <div className="flex flex-col gap-2">
                <div
                    onClick={() => { onClick?.(null); handleScroll(); }}
                    className={`group relative flex items-center justify-between p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] cursor-pointer transition-all duration-500 overflow-hidden
                        ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-100'}`}
                >
                    {/* Background Reveal (Floating Image/Icon) */}
                    <div className={`absolute right-[15%] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-0 transition-all duration-700 pointer-events-none scale-50 rotate-12 group-hover:opacity-20 group-hover:scale-100 group-hover:-rotate-12`}>
                        <Icon icon={'cbi:bulb-general-group'} className='w-full h-full text-[var(--category-primary-color)]' />
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10 flex items-center gap-6 md:gap-10">
                        <span className={`text-xl md:text-2xl font-black opacity-20 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            0
                        </span>
                        <div className="flex flex-col">
                            <h3 className={`text-2xl md:text-6xl font-black uppercase text-[var(--category-primary-color)] tracking-tighter transition-all duration-500 group-hover:translate-x-4
                                    ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                Semua
                            </h3>
                            <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-40 mt-2 group-hover:translate-x-6 transition-all duration-700">
                                {totalItems} Available Items
                            </p>
                        </div>
                    </div>

                    {/* Action Icon */}
                    <div className={`relative z-10 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100
                            ${isDarkMode ? 'border-white/20 text-white' : 'border-slate-900/10 text-slate-900'} bg-[var(--category-primary-color)] border-[var(--category-primary-color)]`}
                    >
                        <Icon icon="cbi:bulb-general-group" className={`w-1/2 h-1/2`} />
                    </div>

                    {/* Bottom Line Decor */}
                    <div className={`absolute bottom-0 left-0 h-[2px] text-[var(--category-primary-color)] bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-700 w-0 group-hover:w-full opacity-10`}
                    />
                </div>
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => {
                            onClick?.(cat.name === "Semua" ? null : cat.name);
                            handleScroll();
                        }}
                        className={`group relative flex items-center justify-between p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] cursor-pointer transition-all duration-500 overflow-hidden
                        ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-100'}`}
                    >
                        {/* Background Reveal (Floating Image/Icon) */}
                        <div className={`absolute right-[15%] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-0 transition-all duration-700 pointer-events-none scale-50 rotate-12 group-hover:opacity-20 group-hover:scale-100 group-hover:-rotate-12`}>
                            {cat?.icon?.startsWith("http") ? (
                                <img src={cat.icon} className="w-full h-full object-contain" alt="" />
                            ) : (
                                <Icon icon={cat?.icon || 'solar:tag-bold-duotone'} color={cat.color} className='w-full h-full' />
                            )}
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 flex items-center gap-6 md:gap-10">
                            <span className={`text-xl md:text-2xl font-black opacity-20 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                0{i + 1}
                            </span>
                            <div className="flex flex-col">
                                <h3 className={`text-2xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4
                                    ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                    style={{ color: hoveredIndex === i ? cat.color : '' }}>
                                    {cat.name}
                                </h3>
                                <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-40 mt-2 group-hover:translate-x-6 transition-all duration-700">
                                    {cat.count || 0} Available Items
                                </p>
                            </div>
                        </div>

                        {/* Action Icon */}
                        <div className={`relative z-10 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100
                            ${isDarkMode ? 'border-white/20 text-white' : 'border-slate-900/10 text-slate-900'}`}
                            style={{ backgroundColor: hoveredIndex === i ? cat.color : '', borderColor: hoveredIndex === i ? cat.color : '' }}>
                            <Icon icon="solar:arrow-right-up-bold" className={`w-1/2 h-1/2 ${hoveredIndex === i ? 'text-white' : ''}`} />
                        </div>

                        {/* Bottom Line Decor */}
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-700 w-0 group-hover:w-full opacity-10`}
                            style={{ color: cat.color }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Sixteen;