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


const Fourteen = ({ headline, subHeadline, ctaText, isDarkMode }: Props) => {

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
            <div className="py-10 text-center space-y-8 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black leading-[0.85] tracking-tighter">
                    {headline.split(' ').map((w, i) => (
                        <span key={i} className={i % 2 !== 0 ? `text-transparent bg-clip-text bg-[var(--product-primary-color)]` : ''}>{w} </span>
                    ))}
                </h2>
                <p className={`text-md md:text-xl font-light max-w-2xl mx-auto leading-relaxed`}>{subHeadline}</p>
                <div className="pt-4">
                    <button onClick={handleScroll} className={`px-12 py-3 rounded-full text-white font-bold text-lg hover:shadow-2xl transition-all bg-[var(--hero-primary-color)]`} >
                        {ctaText}
                    </button>
                </div>
            </div>
        </section>


    )
}

export default Fourteen