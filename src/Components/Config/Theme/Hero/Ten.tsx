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


const Ten = ({ headline, subHeadline, ctaText, isDarkMode }: Props) => {
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
            <div className={`p-8 md:p-20 rounded-[1rem] text-center border-2 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : `bg-gradient-to-br from-[var(--hero-primary-color)] to-[var(--hero-secondary-color)] to-black border-blue-100 shadow-xl shadow-blue-500/5`}`}>
                <h2 className={`text-4xl md:text-6xl ${isDarkMode ? "text-white" : "text-[var(--hero-secondary-color)]"} font-bold mb-6`}>{headline}</h2>
                <p className={`${isDarkMode ? "text-white" : "text-[var(--hero-secondary-color)]"} max-w-2xl mx-auto mb-10 text-lg leading-relaxed`}>{subHeadline}</p>
                <button onClick={handleScroll} className={`px-12 py-4 rounded-full text-[var(--hero-secondary-color)] font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-[var(--hero-primary-color)]`}>
                    {ctaText}
                </button>
            </div>
        </section>
    )
}

export default Ten