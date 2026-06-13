import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Thirteen = ({ categories, isDarkMode, onClick }: Props) => {

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className={`p-3 sm:p-6 border transition-colors hover:bg-[var(--category-primary-color)]/5  ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}  ${isDarkMode && 'hover:text-gray-700'}`}>
                    <h3 className="text-xs sm:text-lg font-bold uppercase tracking-[0.4em]  mb-6">Semua</h3>
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-8">
                        <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                        </div>
                    </div>
                    <button className={`flex items-center gap-2 font-bold group text-[var(--category-primary-color)]`}>
                        EXPLORE
                        <div className={`w-8 h-[2px] ${isDarkMode ? "bg-white" : "bg-black"} group-hover:w-16 transition-all`} />
                    </button>
                </div>
                {categories.map((cat, i) => (
                    <div onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} key={i} className={`p-3 sm:p-6 border transition-colors hover:bg-[var(--category-primary-color)]/5  ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}  ${isDarkMode && 'hover:text-gray-700'}`}>
                        <h3 className="text-xs sm:text-lg font-bold uppercase tracking-[0.4em]  mb-6">{cat.name}</h3>
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-8">
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat?.icon} className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} />
                                    ) : (
                                        <div className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                                        <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                                    </div>
                                )
                            }
                        </div>
                        <button className={`flex items-center gap-2 font-bold group text-[var(--category-primary-color)]`}>
                            EXPLORE
                            <div className={`w-8 h-[2px] ${isDarkMode ? "bg-white" : "bg-black"} group-hover:w-16 transition-all`} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Thirteen