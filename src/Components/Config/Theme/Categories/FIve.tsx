import { CategoriesType } from "@/types/Admin/CategoriesType";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";


type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Five = ({ categories, isDarkMode, onClick }: Props) => {
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
        <section>
            <div className="flex flex-wrap gap-4">
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            onClick && onClick(cat?.name)
                            handleScroll()
                        }}
                        className={` group relative flex items-center gap-4 px-6 py-3 rounded-full font-bold transition-all duration-300 border-2 w-full sm:w-auto overflow-hidden hover:border-[var(--category-primary-color)] ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-700 hover:text-black shadow-sm"}`}>
                        {/* Background Glow Effect on Hover */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none bg-[var(--category-primary-color)]"
                        />
                        <div className="relative z-1 w-10 h-10 rounded-full overflow-hidden flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-inner">

                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img
                                            src={cat.icon}
                                            className={`w-full h-full bg-white object-cover transition-all duration-500 ${isDarkMode ? "brightness-90 group-hover:brightness-110" : ""}`}
                                            alt={cat.name}
                                        />
                                    ) : (
                                        <div className={`w-full h-full  bg-white  flex items-center justify-center p-2`}>
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`w-full h-full   flex items-center justify-center p-2`}>
                                        <Icon icon={'cbi:bulb-general-group'} className='w-full h-full text-[var(--category-primary-color)]' />
                                    </div>
                                )
                            }
                        </div>

                        <span className="relative z-1 text-base md:text-lg tracking-tight">
                            {cat.name}
                        </span>

                        <div className="relative z-1 w-0 group-hover:w-6 transition-all duration-300 overflow-hidden flex items-center">
                            <ArrowUpRight
                                size={18}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--category-primary-color)]"
                            />
                        </div>

                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] group-hover:w-1/2 transition-all duration-500 rounded-t-full bg-[var(--category-primary-color)]"
                        />
                    </button>
                ))}
                <button
                    onClick={() => {
                        onClick && onClick(null)
                        handleScroll()
                    }}
                    className={` group relative flex items-center gap-4 px-6 py-3 rounded-full font-bold transition-all duration-300 border-2 w-full sm:w-auto overflow-hidden hover:border-[var(--category-primary-color)] ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-700 hover:text-black shadow-sm"}`}>
                    {/* Background Glow Effect on Hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none bg-[var(--category-primary-color)]"
                    />
                    <div className="relative z-1 w-10 h-10 rounded-full overflow-hidden flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-inner">

                        <div className={`w-full h-full  text-[var(--category-primary-color)] flex items-center justify-center p-2`}>
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                        </div>
                    </div>

                    <span className="relative z-1 text-base md:text-lg tracking-tight">
                        Semua
                    </span>

                    <div className="relative z-1 w-0 group-hover:w-6 transition-all duration-300 overflow-hidden flex items-center">
                        <ArrowUpRight
                            size={18}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--category-primary-color)]"
                        />
                    </div>
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] group-hover:w-1/2 transition-all duration-500 rounded-t-full bg-[var(--category-primary-color)]"
                    />
                </button>
            </div>
        </section>
    )
}

export default Five