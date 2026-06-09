import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Four = ({ isDarkMode, headline, subHeadline, ctaText }: Props) => {
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
            <div className={`p-8 md:p-16 rounded-2xl border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : `bg-[var(--hero-primary-color)]/5 border-[var(--hero-primary-color)]`}`}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className={`text-4xl md:text-6xl font-serif ${isDarkMode ? 'text-[var(--hero-secondary-color)]' : 'text-[var(--hero-primary-color)]'} mb-6`}>{headline}</h2>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px bg-[var(--hero-primary-color)]/20 flex-1" />
                        <div className={`w-3 h-3 rounded-full bg-[var(--hero-primary-color)]`} />
                        <div className="h-px bg-[var(--hero-primary-color)]/20 flex-1" />
                    </div>
                    <p className={` text-lg mb-10 leading-relaxed font-serif`}>{subHeadline}</p>
                    <div className="relative inline-block group">
                        <div className={`absolute inset-0 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 bg-[var(--hero-primary-color)]`} />
                        <button onClick={handleScroll} className="relative px-8 py-3 bg-white border-2 border-current text-black font-bold uppercase tracking-widest">{ctaText}</button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Four