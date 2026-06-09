"use client"
import { ChevronDown, Coffee, Moon, ShoppingBasket, Sun, Waves, Zap } from 'lucide-react';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'
import Loading from '../Component/Loading';

const ThemeSection = ({ setDetailTheme, setLoading }: { setDetailTheme: Dispatch<SetStateAction<boolean>>, setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const themes = [
        { id: 1, name: 'Minimarket', icon: <ShoppingBasket className="w-8 h-8" />, description: 'Kebutuhan harian lengkap', image: "tema_1.png", mode: "Light" },
        { id: 2, name: 'Laundry', icon: <Waves className="w-8 h-8" />, description: 'Cuci bersih & wangi', image: "tema_2.png", mode: "Auto" },
        { id: 3, name: 'Coffee Shop', icon: <Coffee className="w-8 h-8" />, description: 'Ruang kopi ternyaman', image: "tema_5.png", mode: "Dark" },
    ];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return (
        <section id="themes" className="py-20 md:py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-[var(--primary-color)] text-3xl font-semibold uppercase tracking-widest">Tema Katalog Responsif</h2>
                    <p className="text-xl text-center text-gray-500 mb-16 max-w-2xl mx-auto">Pilih tema sesuai kebutuhan — produk, jasa, atau gabungan keduanya.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {themes.map((theme) => (
                        <Link
                            href={`/preview/${theme?.id}`}
                            key={theme.id}
                            onClick={() => setLoading(true)}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            <div className="w-full  bg-white rounded-2xl border border-gray-100 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden relative mb-6">
                                {/* Mock UI elements inside card like the screenshot */}
                                <div className="p-6 h-full flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <div className="w-12 h-2.5 bg-gray-200 rounded-full" />
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                                            <div className="w-2 h-2 bg-slate-300 rounded-full opacity-50" />
                                        </div>
                                    </div>
                                    {/* <div className="w-3/4 h-2.5 bg-gray-200 rounded-full" /> */}
                                    <img src={`${baseUrl}/image/tema/${theme?.image}`} className='rounded-md' />
                                    <div className="mt-auto w-full h-12 border border-gray-100 rounded-xl flex items-center justify-center text-emerald-500 bg-emerald-50/30">
                                        {theme.icon}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">
                                {theme.name}
                            </h3>
                            <p className="text-slate-400 text-sm">{theme.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm border ${theme.mode === 'Auto' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                    theme.mode === 'Dark' ? 'bg-slate-900 text-white border-slate-800' :
                                        'bg-orange-50 text-orange-600 border-orange-100'}`}>

                                    {theme.mode === 'Auto' ? (
                                        <><Zap className="w-3 h-3 fill-current" /> Auto</>
                                    ) : theme.mode === 'Dark' ? (
                                        <><Moon className="w-3 h-3 fill-current" /> Hanya Dark</>
                                    ) : (
                                        <><Sun className="w-3 h-3 fill-current" /> Hanya Light</>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div onClick={() => setDetailTheme(true)} className='flex items-center justify-center cursor-pointer text-green-500 font-medium text-center text-lg mt-4'>
                Tampilkan lebih banyak <span><ChevronDown /></span>
            </div>
        </section>
    )
}

export default ThemeSection