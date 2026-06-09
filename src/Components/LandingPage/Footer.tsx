import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-slate-200 text-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:flex items-center justify-between gap-8 border-b border-gray-700 pb-8 mb-8">
                    <div className="col-span-2 md:col-span-2">
                        <div className='flex items-center'>
                            <img src="/logo/logo.png" alt="" className='h-[28px]' />
                            {/* <a href="#" className="text-2xl font-bold flex items-center">
                                <span className="text-[var(--primary-color)]">Usaha</span><span className="text-[var(--secondary-color)]">Ku</span>
                            </a> */}
                            <img src={'/logo.png'} className='w-30'/>
                        </div>
                        <p className="mt-4 text-sm text-gray-700 max-w-xs">
                            Platform digital untuk membantu UMKM go online, kelola operasional, dan promosikan usaha lokal dengan mudah.
                        </p>
                    </div>

                    <div className='grid gap-8 md:flex md:gap-24'>
                        <div>
                            <h4 className="text-md font-semibold mb-4 text-primary-accent">Produk</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li><a href="#features" className="hover:text-white transition duration-200">Website Katalog</a></li>
                                <li><a href="#pricing" className="hover:text-white transition duration-200">Peta UsahaKu</a></li>
                                <li><a href="#" className="hover:text-white transition duration-200">Saldo UsahaKu</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-md font-semibold mb-4 text-primary-accent">Kontak</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li><a href="#" className="hover:text-white transition duration-200">bisnisku8821@gmail.com</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="text-center text-sm text-gray-700">
                    &copy; 2026 UsahaKu
                </div>
            </div>
        </footer>
    )
}

export default Footer