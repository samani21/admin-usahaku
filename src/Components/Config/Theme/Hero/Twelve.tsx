import { Heart, Zap } from 'lucide-react';
import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Twelve = ({ isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {
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
            <div className={`min-h-[200px] sm:min-h-[400px] rounded-3xl overflow-hidden relative group ${isDarkMode ? 'border-2 border-gray-600' : "text-slate-900"}`}>
                <div className={isDarkMode ? "hidden" : `absolute inset-0 transition-transform duration-[2000ms] group-hover:scale-125 bg-gradient-to-r from-white to-[var(--hero-primary-color)]`} />
                <div className="absolute inset-0 flex items-center justify-between p-6 md:p-12">
                    <div className="max-w-md ">
                        <h2 className={`text-xl md:text-2xl font-black mb-6 uppercase  tracking-tighter leading-none italic`}>{headline}</h2>
                        <p className={`mb-8`}>{subHeadline}</p>
                        <button onClick={handleScroll} className={`px-8 py-3 bg-[var(--hero-primary-color)] text-[var(--hero-secondary-color)] rounded-full font-bold flex items-center gap-3`}>
                            {ctaText}
                        </button>
                    </div>
                    <div className="hidden md:block w-64 h-64 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 p-8">
                        <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                            {
                                imageHero &&
                                <img src={imageHero} className='rounded-full object-cover w-50 h-50' />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Twelve