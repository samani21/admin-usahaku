"use client"
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react'

const Header = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className='flex items-center'>
                    <img src="/logo.png" alt="" className='h-[50px] mr-2' />
                    {/* <a href="#" className="text-2xl font-bold flex items-center">
                        <span className="text-[var(--primary-cyan)]">Usaha</span><span className="text-[var(--primary-orange)]">Ku</span>
                    </a> */}
                </div>
                <button onClick={() => {
                    router?.push('/auth/login')
                    setLoading(true)
                }} className="cursor-pointer hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 transition duration-300 shadow-lg shadow-[var(--primary-color)]/30">
                    Mulai Uji Coba
                </button>
            </div>
        </header>
    )
}

export default Header