"use client"

import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    ShoppingBasket,
    Waves,
    Cookie,
    Shirt,
    Coffee,
    Wrench,
    Scissors,
    Store,
    Croissant,
    Utensils,
    Camera,
    UserRound,
    Gamepad2,
    GraduationCap,
    Flower2,
    Dog,
    Search,
    Zap,
    Moon,
    Sun,
    ChevronUp
} from 'lucide-react';
import Header from '@/Components/LandingPage/Header';
import Link from 'next/link';
import Loading from '@/Components/Component/Loading';

const ThemePage = ({ setDetailTheme, setLoading }: { setDetailTheme: Dispatch<SetStateAction<boolean>>, setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const themes = [
        { id: 1, name: 'Minimarket', icon: <ShoppingBasket className="w-8 h-8" />, description: 'Kebutuhan harian lengkap', image: "tema_1.png", mode: "Light" },
        { id: 2, name: 'Laundry', icon: <Waves className="w-8 h-8" />, description: 'Cuci bersih & wangi', image: "tema_2.png", mode: "Auto" },
        { id: 3, name: 'Cemilan', icon: <Cookie className="w-8 h-8" />, description: 'Jajanan & snack lezat', image: "tema_3.png", mode: "Light" },
        { id: 4, name: 'Fashion', icon: <Shirt className="w-8 h-8" />, description: 'Pakaian tren masa kini', image: "tema_4.png", mode: "Auto" },
        { id: 5, name: 'Coffee Shop', icon: <Coffee className="w-8 h-8" />, description: 'Ruang kopi ternyaman', image: "tema_5.png", mode: "Dark" },
        { id: 6, name: 'Bengkel', icon: <Wrench className="w-8 h-8" />, description: 'Servis kendaraan ahli', image: "tema_6.png", mode: "Dark" },
        { id: 7, name: 'Jasa Jahit', icon: <Scissors className="w-8 h-8" />, description: 'Custom pakaian & reparasi', image: "tema_7.png", mode: "Light" },
        { id: 8, name: 'Sembako', icon: <Store className="w-8 h-8" />, description: 'Bahan pokok murah', image: "tema_8.png", mode: "Light" },
        { id: 9, name: 'Bakery', icon: <Croissant className="w-8 h-8" />, description: 'Roti & kue fresh', image: "tema_9.png", mode: "Light" },
        { id: 10, name: 'Warung Makan', icon: <Utensils className="w-8 h-8" />, description: 'Masakan rumah nikmat', image: "tema_10.png", mode: "Light" },
        { id: 11, name: 'Studio Foto', icon: <Camera className="w-8 h-8" />, description: 'Abadikan momen indah', image: "tema_11.png", mode: "Dark" },
        { id: 12, name: 'Barbershop', icon: <UserRound className="w-8 h-8" />, description: 'Gaya rambut pria modern', image: "tema_12.png", mode: "Dark" },
        { id: 13, name: 'Toko Mainan', icon: <Gamepad2 className="w-8 h-8" />, description: 'Dunia ceria anak-anak', image: "tema_13.png", mode: "Auto" },
        { id: 14, name: 'Kursus', icon: <GraduationCap className="w-8 h-8" />, description: 'Belajar keahlian baru', image: "tema_14.png", mode: "Light" },
        { id: 15, name: 'Florist', icon: <Flower2 className="w-8 h-8" />, description: 'Bunga segar & cantik', mode: "Light", image: "tema_15.png" },
        { id: 16, name: 'Pet Shop', icon: <Dog className="w-8 h-8" />, description: 'Keperluan hewan kesayangan', mode: "Light", image: "tema_16.png" },
    ];

    const filteredThemes = themes.filter(theme =>
        theme.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        <section id="themes" className="py-20 md:py-32 bg-gray-50">
            <div className="min-h-screen font-sans text-slate-800">
                <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
                    <h2 className="text-emerald-500 font-bold text-2xl md:text-3xl tracking-widest uppercase mb-4">
                        TEMA KATALOG RESPONSIF
                    </h2>
                    <p className="text-slate-500 text-lg mb-12 max-w-3xl mx-auto">
                        Pilih tema sesuai kebutuhan — produk, jasa, atau gabungan keduanya.
                    </p>

                    {/* Search Bar */}
                    <div className="mb-16 flex justify-center">
                        <div className="relative w-full max-w-lg group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari jenis usaha Anda..."
                                className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all text-lg shadow-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Themes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredThemes.map((theme) => (
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
                    <div onClick={() => setDetailTheme(false)} className='flex items-center justify-center cursor-pointer text-green-500 font-medium text-center text-lg mt-8'>
                        Tampilkan lebih sedikit <span><ChevronUp /></span>
                    </div>
                </main>

            </div>

        </section>
    );
};

export default ThemePage;