"use client"
import ModalScanProduct from '@/Components/Tenant/Components/ModalScanProduct';
import { History, Moon, ScanBarcode, Sun, Menu, X } from 'lucide-react'; // Menambahkan Menu dan X
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    colorClass: string;
    toggleTheme: () => void;
    themeMode: string;
    darkOnly?: boolean;
    displayMode: string;
    isBuild?: boolean;
}

const NavIcons = ({ colorClass, toggleTheme, themeMode, darkOnly, displayMode, isBuild }: Props) => {
    const pathname = usePathname()
    const { outlet } = useParams();
    const segments = pathname.split("/").filter(Boolean);
    const currentFirstSegment = segments[0];

    // State untuk Modal Scan
    const [isOpenScan, setIsOpenScan] = useState<boolean>(false);
    // State untuk Sidebar Mobile
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    // Komponen isi menu (supaya tidak duplikasi kode antara desktop & mobile)
    const MenuItems = () => (
        <>
            {!darkOnly && displayMode == 'auto' &&
                <button onClick={toggleTheme} className={`w-full md:w-auto flex items-center justify-left p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"} transition-colors`}>
                    {themeMode === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                    <span className="md:hidden ml-2">Ganti Tema</span> {/* Label teks hanya muncul di mobile */}
                </button>
            }
            <Link
                href={isBuild ? "#" : `${segments?.length > 0 && currentFirstSegment != outlet ? `/${currentFirstSegment}` : ""}/history`}
                onClick={() => setIsOpenSidebar(false)} // Tutup sidebar setelah link diklik
                className={`w-full md:w-auto flex items-center justify-left md:justify-start p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}
            >
                <History className={`w-5 h-5 ${colorClass}`} />
                <span className="md:hidden ml-2">Riwayat</span>
            </Link>
            <button
                onClick={() => {
                    setIsOpenScan(true);
                    setIsOpenSidebar(false); // Tutup sidebar saat modal scan dibuka
                }}
                className={`w-full md:w-9 md:h-9 rounded-xl flex items-center justify-left gap-2 p-2 md:p-0 transition-colors border border-slate-100 ${themeMode === 'dark' ? "hover:bg-slate-800 text-white" : "hover:bg-slate-50 text-slate-800"}`}
            >
                <ScanBarcode className="w-5 h-5" />
                <span className="md:hidden">Scan Produk</span>
            </button>
        </>
    );

    return (
        <div>
            {/* --- TAMPILAN DESKTOP (Layar Besar) --- */}
            <div className="hidden md:flex items-center gap-2">
                <MenuItems />
            </div >

            {/* --- TOMBOL HAMBURGER (Hanya muncul di Mobile) --- */}
            <div className="flex md:hidden">
                <button
                    onClick={() => setIsOpenSidebar(true)}
                    className={`p-2 rounded-lg border ${themeMode === 'dark' ? "border-slate-700 text-white" : "border-slate-200 text-slate-800"}`}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* --- SIDEBAR MOBILE (Geser dari Kanan) --- */}
            {isOpenSidebar && (
                <div className="fixed inset-0 z-50 flex justify-end md:hidden">
                    {/* Backdrop / Latar Belakang Gelap (Klik untuk menutup) */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpenSidebar(false)}
                    />

                    {/* Konten Sidebar */}
                    <div className={`relative w-64 h-full p-6 shadow-xl flex flex-col gap-6 transition-transform transform translate-x-0 ${themeMode === 'dark' ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>
                        {/* Tombol Close */}
                        <div className="flex justify-between items-center border-b pb-4 border-slate-200 dark:border-slate-700">
                            <span className="font-semibold">Menu</span>
                            <button
                                onClick={() => setIsOpenSidebar(false)}
                                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* List Menu di dalam Sidebar */}
                        <div className="flex flex-col items-start gap-4">
                            <MenuItems />
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Scan */}
            {isOpenScan && <ModalScanProduct onClose={() => setIsOpenScan(false)} />}
        </div>
    )
};

export default NavIcons