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


const Thirteen = ({ isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {

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
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
                <div className={`p-8 rounded-2xl ${!imageHero && 'col-span-3'} flex flex-col justify-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-[var(--hero-primary-color)]/5'}`}>
                    <h2 className="text-3xl font-serif font-bold mb-4">{headline}</h2>
                    <p className="text-sm opacity-60 leading-relaxed mb-6">{subHeadline}</p>
                    <button onClick={handleScroll} className={`text-xs font-bold tracking-[0.2em] uppercase border-b-2 inline-block self-start pb-1 border-[var(--hero-primary-color)]`} >{ctaText}</button>
                </div>
                {
                    imageHero &&
                    <div className="md:col-span-2 h-40 md:h-[350px] rounded-2xl overflow-hidden">
                        <img src={imageHero} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                }
            </div>
        </section>

    )
}

export default Thirteen