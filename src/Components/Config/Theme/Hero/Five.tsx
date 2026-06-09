import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Five = ({ headline, subHeadline, ctaText, imageHero }: Props) => {

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
            <div className="bg-black rounded-3xl overflow-hidden relative min-h-[400px] flex items-center px-8">
                <div
                    className={`absolute top-0 right-0 w-1/3 z-0 h-2/3 opacity-20 blur-3xl pointer-events-none bg-gradient-to-r from-[var(--hero-primary-color)] to-[var(--hero-secondary-color)]`}
                />
                <div className="grid md:grid-cols-2 items-center gap-12 w-full relative z-0 py-12">
                    <div className="order-2 md:order-1">
                        <h2 className="text-2xl md:text-5xl font-black text-white mb-6 flex flex-wrap gap-2 italic uppercase leading-none tracking-tighter">
                            {headline.split(' ').map((word, i) => (
                                <span key={i} className={i % 2 === 0 ? 'block' : `block text-[var(--hero-primary-color)]`} >{word} </span>
                            ))}
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-sm border-l-2 border-slate-800 pl-4">{subHeadline}</p>
                        <button onClick={handleScroll} className={`px-10 py-4 font-black italic uppercase skew-x-[-10deg] text-white hover:brightness-125 transition-all bg-[var(--hero-primary-color)]`}>
                            {ctaText}
                        </button>
                    </div>
                    {
                        imageHero &&
                        <div className="order-1 md:order-2 ">
                            <img src={imageHero} alt="Hero" className="w-full h-40 md:h-[350px] object-cover drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                        </div>
                    }
                </div>
            </div>
        </section>


    )
}

export default Five