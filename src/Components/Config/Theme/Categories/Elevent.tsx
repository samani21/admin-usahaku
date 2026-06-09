import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Elevent = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);
    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <section className="py-12 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
                <div
                    onClick={() => {
                        onClick && onClick(null)
                        handleScroll()
                    }}
                    className={`group relative bg-white p-3 pb-8 md:p-4 md:pb-12 shadow-2xl transition-all duration-500 cursor-pointer  rotate-[1deg] hover:rotate-0 hover:scale-110 hover:z-1  ${isDarkMode ? 'ring-1 ring-white/10' : ''}`}
                >
                    {/* Efek Selotip / Tape di bagian atas */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-white/20 rotate-[-5deg] z-1 opacity-60 group-hover:opacity-100 transition-opacity" />

                    {/* Container Foto (Main Image/Icon) */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100 mb-4 md:mb-6">
                        <div className="w-full h-full flex text-[var(--category-primary-color)] items-center justify-center p-8 transition-transform duration-500 group-hover:scale-110">
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                        </div>

                        {/* Overlay Tekstur Kertas Tua */}
                        <div className="absolute inset-0 bg-orange-900/5 pointer-events-none mix-blend-multiply opacity-20" />
                    </div>

                    {/* Teks Kategori */}
                    <div className="px-1 text-center">
                        <h3 className="text-slate-800 font-serif text-lg md:text-xl font-bold italic leading-tight decoration-[var(--category-primary-color)]/30 underline decoration-4 underline-offset-4 group-hover:decoration-[var(--category-primary-color)] transition-all">
                            Semua
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-2 font-sans font-semibold">
                            {totalItems} Item.
                        </p>
                    </div>

                    {/* Bayangan Soft di bawah kartu */}
                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/5 blur-xl group-hover:bg-black/10 transition-all" />
                </div>
                {categories.map((cat, i) => {
                    // Rotasi acak untuk kesan scrapbook yang alami
                    const rotations = ['rotate-[2deg]', 'rotate-[-1deg]', 'rotate-[4deg]', 'rotate-[-2deg]'];
                    const randomRotation = rotations[i % rotations.length];
                    return (
                        <div
                            onClick={() => {
                                onClick && onClick(cat?.name)
                                handleScroll()
                            }}
                            key={i}
                            className={`group relative bg-white p-3 pb-8 md:p-4 md:pb-12 shadow-2xl transition-all duration-500 cursor-pointer  ${randomRotation} hover:rotate-0 hover:scale-110 hover:z-1  ${isDarkMode ? 'ring-1 ring-white/10' : ''}`}
                        >
                            {/* Efek Selotip / Tape di bagian atas */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-white/20 rotate-[-5deg] z-10 opacity-60 group-hover:opacity-100 transition-opacity" />

                            {/* Container Foto (Main Image/Icon) */}
                            <div className="relative aspect-square overflow-hidden bg-slate-100 mb-4 md:mb-6">
                                {
                                    cat?.icon ? (
                                        cat.icon.startsWith("http") ? (
                                            <img
                                                src={cat.icon}
                                                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                                alt={cat.name}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-110">
                                                <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                            </div>
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-110">
                                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full text-[var(--category-primary-color)]' />
                                        </div>
                                    )
                                }

                                {/* Overlay Tekstur Kertas Tua */}
                                <div className="absolute inset-0 bg-orange-900/5 pointer-events-none mix-blend-multiply opacity-20" />
                            </div>

                            {/* Teks Kategori */}
                            <div className="px-1 text-center">
                                <h3 className="text-slate-800 font-serif text-lg md:text-xl font-bold italic leading-tight decoration-[var(--category-primary-color)]/30 underline decoration-4 underline-offset-4 group-hover:decoration-[var(--category-primary-color)] transition-all">
                                    {cat.name}
                                </h3>
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-2 font-sans font-semibold">
                                    {cat?.count} Item.
                                </p>
                            </div>

                            {/* Bayangan Soft di bawah kartu */}
                            <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/5 blur-xl group-hover:bg-black/10 transition-all" />
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default Elevent