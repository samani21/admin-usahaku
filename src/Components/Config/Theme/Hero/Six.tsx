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


const Six = ({ isDarkMode, headline, subHeadline, ctaText, imageHero, title }: Props) => {
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
            <div className={`rounded-3xl p-8 md:p-12 overflow-hidden relative border-4 border-black transition-all ${isDarkMode ? 'bg-slate-800 text-white' : '[var(--hero-primary-color)]/5'}`} >
                <div className="grid md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-3 space-y-6">
                        <div className="inline-block px-4 py-1 bg-black text-white rounded-full text-xs font-bold uppercase italic tracking-tighter shadow-[4px_4px_0px_#000]">{title}</div>
                        <h2 className={`text-3xl md:text-5xl font-black uppercase  leading-[0.9]`}>{headline}</h2>
                        <p className={`text-lg font-bold `}>{subHeadline}</p>
                        <div className="flex gap-4 pt-4">
                            <button onClick={handleScroll} className={`px-8 py-4 bg-[var(--hero-primary-color)] text-[var(--hero-secondary-color)] border-4 border-black font-black text-lg hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#000] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none uppercase`}>
                                {ctaText}
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 relative">
                        <div className={`absolute -inset-4 bg-[var(--hero-primary-color)] rounded-full scale-90 blur-xl opacity-20 animate-pulse`} />
                        {
                            imageHero &&
                            <img src={imageHero} alt="Hero" className="relative z-1 w-full h-40 md:h-[350px] object-cover drop-shadow-[10px_10px_0px_#000]" />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Six