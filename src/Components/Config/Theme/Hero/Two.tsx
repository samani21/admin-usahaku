import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Two = ({ headline, subHeadline, ctaText, imageHero }: Props) => {
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
            <div className="relative h-[500px] rounded-3xl overflow-hidden group">
                {
                    imageHero &&
                    <img src={imageHero} alt="Hero" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                }
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-wider">
                        {headline}
                    </h2>
                    <p className="text-white/80 max-w-lg mb-8">
                        {subHeadline}
                    </p>
                    <button onClick={handleScroll} className="px-10 py-3 bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-slate-100 transition-colors">
                        {ctaText}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Two