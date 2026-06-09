import { CategoriesType } from "@/types/Admin/CategoriesType";

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Sevent = ({ categories, isDarkMode, onClick }: Props) => {
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
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className={`flex gap-8 group border-b ${isDarkMode ? "border-slate-800" : " border-slate-200"} pb-8 cursor-pointer`}>
                    <span className="text-4xl font-light opacity-20 group-hover:opacity-100 transition-opacity">01</span>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Semua</h3>
                        <p className="text-slate-500 mb-4">{totalItems} tersedia.</p>
                        <span className={`text-xs font-bold tracking-widest uppercase text-[var(--category-primary-color)]`} >Jelajahi Sekarang</span>
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div key={i} onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} className={`flex gap-8 group border-b ${isDarkMode ? "border-slate-800" : " border-slate-200"} pb-8 cursor-pointer`}>
                        <span className="text-4xl font-light opacity-20 group-hover:opacity-100 transition-opacity">0{i + 2}</span>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">{cat.name}</h3>
                            <p className="text-slate-500 mb-4">{cat.count} tersedia.</p>
                            <span className={`text-xs font-bold tracking-widest uppercase text-[var(--category-primary-color)]`} >Jelajahi Sekarang</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Sevent