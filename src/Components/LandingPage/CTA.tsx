import React from 'react'


const CTA = () => {
    return (
        <section id="cta-final" className="py-20 md:py-24 bg-[var(--dark-bg)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 p-8 md:p-12 rounded-3xl border border-[var(--primary-color)]/20 shadow-2xl">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[1] mb-6 text-white">
                            Siap Go Digital?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            Gabung sekarang dan nikmati 14 hari trial Pro gratis tanpa kartu kredit.
                        </p>
                        <a href="#pricing" className="inline-block px-12 py-4 text-xl font-bold rounded-full text-gray-300 bg-[var(--primary-color)] hover:bg-opacity-90 transition duration-300 shadow-2xl shadow-[var(--primary-color)] transform hover:scale-[1.03] active:scale-95">
                            Start Free Trial
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA