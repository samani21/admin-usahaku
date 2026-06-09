import { Maximize } from 'lucide-react'
import React from 'react'


const HeroSection = () => {
    return (
        <section id="hero" className="hero-bg pt-12 md:pt-16 pb-20 md:pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1] mb-6 text-gray-900">
                        <span className="block">Bangun Bisnis UMKM-mu Lebih Mudah dengan,</span>
                        <span className="block text-[var(--primary-color)]">UsahaKu</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
                        Buat website katalog sendiri, kelola pesanan, laporan, dan promosi — semua dalam satu sistem yang dirancang khusus untuk kemajuan UMKM Indonesia.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <a href="#pricing" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-[var(--primary-color)] hover:bg-green-500 transition duration-300 shadow-xl shadow-[var(--primary-color)]/40">
                            Coba sekarang
                        </a>
                        <a href="#features" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[var(--primary-color)] text-base font-semibold rounded-xl text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition duration-300">
                            Bnyak Fitur
                        </a>
                    </div>
                </div>

                <div className="lg:w-1/2 mt-10 lg:mt-0">
                    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto bg-gray-50 rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden">
                        <div className="absolute top-4 right-4 z-2 text-xs font-medium bg-[var(--secondary-color)] text-white px-3 py-2 rounded-full shadow-md"><Maximize /></div>
                        <div className=''>
                            <img
                                src="https://plus.unsplash.com/premium_photo-1661443415470-f50f32b31e09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxlLWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
                                className="w-full h-auto drop-shadow-lg rounded-[12px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HeroSection