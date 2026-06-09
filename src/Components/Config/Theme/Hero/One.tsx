import { ShoppingBag, Star } from 'lucide-react';
import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
    title: string;
}


const One = ({ isDarkMode, headline, subHeadline, ctaText, imageHero, title }: Props) => {
    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    const Badge = () => (
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? `bg-[var(--hero-primary-color)] text-[var(--hero-secondary-color)]` : `bg-[var(--hero-secondary-color)] text-[var(--hero-primary-color)]`} mb-4`}>
            <Star className="w-3 h-3 fill-current" /> {title}
        </div>
    );
    return (
        <section className="group">
            <div className={`flex flex-col md:flex-row items-center gap-8 rounded-3xl overflow-hidden ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white shadow-xl text-slate-900'}`}>
                <div className="flex-1 p-8 md:p-12">
                    <Badge />
                    <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                        {headline}
                    </h2>
                    <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mb-8 max-w-md`}>
                        {subHeadline}
                    </p>
                    <button onClick={handleScroll} className={`px-8 py-4 rounded-xl text-white font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 bg-[var(--hero-primary-color)] `} >
                        <ShoppingBag className="w-5 h-5" /> {ctaText}
                    </button>
                </div>
                {
                    imageHero &&
                    <div className="flex-1 h-80 md:h-[410px] w-full">
                        <img src={imageHero} alt="Hero" className="w-full  h-full object-cover  md:rounded-lg " />
                    </div>
                }
            </div>
        </section>
    )
}

export default One