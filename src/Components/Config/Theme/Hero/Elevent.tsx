import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Elevent = ({ isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {
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
            <div className={`p-8 rounded-[1rem] transition-all flex flex-col md:flex-row items-center gap-8 ${isDarkMode ? 'bg-slate-900 shadow-inner text-white' : `shadow-sm bg-[var(--hero-primary-color)]/5`}`}>

                {
                    imageHero &&
                    <div className={`w-2/4 md:w-1/4 aspect-square rounded-[2rem] overflow-hidden border-8 ${isDarkMode ? "border-slate-800" : "border-white"} rotate-[-4deg]`}>
                        <img src={imageHero} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                }
                <div className="flex-1 text-center md:text-left">
                    <h2 className={`text-4xl md:text-5xl font-black  mb-4`}> {headline}</h2>
                    <p className={`text-lg mb-8`}>{subHeadline}</p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <button onClick={handleScroll} className={`px-8 py-4 bg-[var(--hero-primary-color)] text-white rounded-full font-bold shadow-lg`}>{ctaText}</button>
                        {/* <button className="p-4 bg-white dark:bg-slate-800 rounded-full text-orange-600 shadow-sm"><Heart /></button> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Elevent