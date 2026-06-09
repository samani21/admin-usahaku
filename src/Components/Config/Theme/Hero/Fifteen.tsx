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


const Fifteen = ({ isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {

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
            <div className={`grid md:grid-cols-2 bg-[var(--hero-primary-color)] text-white rounded-3xl overflow-hidden min-h-[500px]`}>
                <div className="z-2 p-6 sm:p-12 flex flex-col justify-center items-start text-left order-2 md:order-1">
                    <div className="w-12 h-[2px] bg-white/30 mb-8" />
                    <h2 className="text-2xl md:text-4xl font-serif mb-6 leading-tight italic">{headline}</h2>
                    <p className={`text-[var(--hero-secondary-color)] mb-10 max-w-sm`}>{subHeadline}</p>
                    <button onClick={handleScroll} className={`px-10 py-4 bg-white text-[var(--hero-primary-color)]  hover:bg-[var(--hero-secondary-color)]  font-bold uppercase tracking-widest text-xstransition-colors`}>{ctaText}</button>
                </div>
                <div className={`order-1 md:order-2 relative bg-[var(--hero-primary-color)]`}>
                    {
                        imageHero &&
                        <img src={imageHero} alt="Hero" className="absolute inset-0 w-full h-50 sm:h-full object-cover opacity-90 " />
                    }
                    <div className={`absolute inset-0 bg-gradient-to-t h-50 sm:h-full from-[var(--hero-primary-color)] to-transparent`} />
                </div>
            </div>
        </section>
    )
}

export default Fifteen