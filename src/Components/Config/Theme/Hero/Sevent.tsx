
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


const Sevent = ({ isDarkMode, headline, subHeadline, ctaText, imageHero, title }: Props) => {
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
            <div className="relative grid md:grid-cols-2 gap-0 overflow-hidden rounded-3xl">
                <div className="h-full md:h-auto">
                    {
                        imageHero &&
                        <img src={imageHero} alt="Hero" className="w-full h-full  object-cover" />
                    }
                </div>
                <div className={`p-5 md:p-10  flex flex-col justify-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white shadow-2xl z-10 text-slate-900'}`}>
                    <span className={`text-xs font-bold tracking-[0.5em] mb-4 ${!isDarkMode && 'text-slate-400'} block uppercase`}>{title}</span>
                    <h2 className="text-xl md:text-2xl font-light mb-8 leading-tight tracking-tight">
                        <span className={`font-bold underline decoration-2 decoration-[var(--hero-primary-color)]`} >{headline}</span>
                    </h2>
                    <p className={`text-slate-500 mb-10 border-l-4 pl-6 border-[var(--hero-primary-color)]`}>{subHeadline}</p>
                    <div className="flex gap-4">
                        <button onClick={handleScroll} className="flex-1 py-4 bg-slate-900 text-white font-bold text-sm tracking-widest uppercase hover:bg-black">{ctaText}</button>
                        {/* <button className="w-14 h-14 border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"><Plus className="w-6 h-6" /></button> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sevent