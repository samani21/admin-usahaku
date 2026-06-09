
import { CheckCircle, Zap } from 'lucide-react';
import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null;
    title: string;
}


const Nine = ({ headline, subHeadline, ctaText, imageHero, title }: Props) => {
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
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden grid md:grid-cols-12">
                <div className="md:col-span-7 p-8 md:p-16">
                    <div className="inline-flex items-center gap-2 mb-6 text-yellow-500 font-bold uppercase text-xs">
                        <Zap className="w-4 h-4 fill-current" /> {title}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">{headline}</h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">{subHeadline}</div>
                    </div>
                    <button onClick={handleScroll} className={`w-full md:w-auto px-10 py-4 font-bold rounded-lg  transition-colors hover:brightness-110 bg-[var(--hero-primary-color)] text-[var(--hero-secondary-color)]`}>
                        {ctaText}
                    </button>
                </div>
                <div className="md:col-span-5 relative min-h-[200px] sm:min-h-[300px]">
                    {
                        imageHero &&
                        <img src={imageHero} alt="Hero" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" />
                    }
                    <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default Nine