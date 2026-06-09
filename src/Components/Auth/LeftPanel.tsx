import React from 'react'


const LeftPanel = () => {
    return (
        <div className="hidden lg:flex lg:w-2/5 bg-slate-100 items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)]"></div>
            <div className="relative z-10 text-center">
                <h2 className="text-5xl font-extrabold text-white mb-6">
                    <span className="block text-[var(--primary-color)] ">Aliran Bisnis yang</span>
                    <span className="block text-[var(--secondary-color)]">Tak Tertandingi.</span>
                </h2>
                <p className="text-lg text-gray-800 max-w-md mx-auto mb-8">
                    Masuk ke Usahaku untuk kelola keuangan, katalog, dan operasional bisnis Anda di satu tempat.
                    Belum punya akun? Daftar gratis dan mulai kembangkan usaha Anda sekarang.
                </p>
                <div className='flex items-center justify-center '>
                    <img src={"/logo.png"} className='w-[120px]' />
                </div>
            </div>
        </div>
    )
}

export default LeftPanel