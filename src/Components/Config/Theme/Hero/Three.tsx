import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Three = ({ isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {
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
            <div className={`relative p-6 md:p-20 rounded-[3rem] overflow-hidden ${isDarkMode ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-slate-100 shadow-inner text-slate-900'}`}>
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-1">
                    <div className="flex-1 space-y-6">
                        <div className={`w-12 h-1 mb-4 bg-[var(--hero-primary-color)]`} />
                        <h2 className="text-2xl md:text-3xl font-extrabold leading-none">{headline}</h2>
                        <p className="text-md md:text-lg opacity-70">{subHeadline}</p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={handleScroll} className={`px-8 py-3 rounded-full text-[var(--hero-secondary-color)] font-bold bg-[var(--hero-primary-color)]`}>{ctaText}</button>
                            {/* <button className={`px-8 py-3 rounded-full border border-current font-bold flex items-center gap-2 ${color?.text600}`}><Play className="w-4 h-4" /> Lihat Video</button> */}
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full" />
                        {
                            imageHero &&
                            <img src={imageHero} alt="Hero" className="relative z-1 w-full h-80 sm:h-[350px] object-cover rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Three