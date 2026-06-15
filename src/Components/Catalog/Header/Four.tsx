"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { History, Moon, ScanBarcode, Sun, Zap } from 'lucide-react';
import LogoContainer from './LogoContainer';
import { FrameTheme, FrameType } from './FrameType';

type Props = {
    themeMode: string;
    spanOne?: string;
    spanTwo?: string;
    toggleTheme: () => void;
    frameType: FrameType;
    frameTheme: FrameTheme;
    logoImage: string | null;
    isBuild?: boolean;
    displayMode: string;
    isConfigHeader: boolean;
}

const Four = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode, isConfigHeader }: Props) => {
    // Navigasi & URL Logic
    const pathname = usePathname();
    const { outlet } = useParams();
    const segments = pathname?.split("/").filter(Boolean) || [];
    const currentFirstSegment = segments[0];
    const historyLink = isBuild ? "#" : `${segments?.length > 0 && currentFirstSegment != outlet ? `/${currentFirstSegment}` : ""}/history`;

    // State Local
    const [isOpenScan, setIsOpenScan] = useState(false);

    // Karena tema ini mengusung gaya Tech/Dark secara default di containernya
    const isDarkMode = themeMode === 'dark';

    return (
        <>
            {/* --- DESKTOP & MOBILE HEADER --- */}
            <header className={`${!isBuild ? 'absolute top-0 md:top-4 left-0 pt-4 md:pt-0 px-4 md:px-6' : 'relative p-4 md:p-6'} z-[60] w-full flex justify-center pointer-events-none transition-all duration-300`}>

                {/* Inner Container: Tech/Dynamic Command Center Style */}
                <div className="pointer-events-auto w-full max-w-7xl flex items-center justify-between pl-5 pr-3 py-2.5 rounded-2xl bg-slate-950/90 text-white border border-slate-800/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group">

                    {/* Glowing Accent Indicator (Left Side) */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--header-primary-color)] shadow-[0_0_20px_var(--header-primary-color)] opacity-90" />

                    {/* Subtle Cyber Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--header-primary-color)]/20 via-transparent to-transparent opacity-30 pointer-events-none" />

                    {/* Moving Scanline Effect (Hover Only) */}
                    <div className="absolute inset-0 w-full h-[2px] bg-[var(--header-primary-color)]/30 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_2s_ease-in-out_infinite] pointer-events-none blur-sm" />

                    {/* --- KIRI: Logo & Dynamic Tipografi --- */}
                    <div className="flex items-center gap-4 min-w-0 relative z-10">
                        {logoImage && (
                            <div className="drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] hover:scale-110 hover:-rotate-3 transition-transform duration-300 ease-out cursor-pointer">
                                <LogoContainer logoImage={logoImage} frameType={frameType} frameTheme={frameTheme} />
                            </div>
                        )}

                        <h2 className="font-black italic text-lg md:text-xl tracking-wider truncate flex items-center mt-1">
                            <span className="text-slate-100 drop-shadow-md">{spanOne}</span>
                            <span className="text-[var(--header-primary-color)] ml-1.5 drop-shadow-[0_0_10px_var(--header-primary-color)]">
                                {spanTwo}
                            </span>
                        </h2>
                    </div>

                    {/* --- KANAN: Desktop Command Nav --- */}
                    <div className="hidden md:flex relative z-10 items-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 rounded-xl p-1.5 border border-white/10 transition-colors duration-300 shadow-inner">
                        {displayMode === 'auto' && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}

                        <div className="w-px h-6 bg-slate-700/50 mx-1" />

                        <Link
                            href={historyLink}
                            className="p-2 rounded-lg text-[var(--header-primary-color)] hover:bg-white/10 hover:shadow-[0_0_15px_var(--header-primary-color)] transition-all duration-200"
                        >
                            <History className="w-5 h-5" />
                        </Link>

                        <button
                            onClick={() => setIsOpenScan(true)}
                            className="flex items-center gap-2 px-4 py-1.5 ml-1 rounded-lg bg-[var(--header-primary-color)] text-slate-950 hover:opacity-90 transition-all active:scale-95 font-bold uppercase tracking-wider text-xs shadow-[0_0_15px_var(--header-primary-color)]"
                        >
                            <ScanBarcode className="w-4 h-4" />
                            Scan
                        </button>
                    </div>

                    {/* --- KANAN: Mobile Filler (Hanya penyeimbang karena menu di bawah) --- */}
                    <div className="flex md:hidden relative z-10 items-center pr-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--header-primary-color)] shadow-[0_0_10px_var(--header-primary-color)] animate-pulse" />
                    </div>
                </div>
            </header>

            {
                isConfigHeader ?
                    <div className="md:hidden pointer-events-none flex items-center justify-center">
                        <div className='w-[92%] max-w-sm'>
                            <div className="pointer-events-auto flex items-center justify-around py-3 px-2 rounded-2xl h-16  bg-slate-950/95 border border-slate-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-3xl ">

                                {/* Top Glow Accent for Bottom Nav */}
                                <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[var(--header-primary-color)] to-transparent opacity-50" />

                                {/* Nav Items */}
                                {displayMode === 'auto' && (
                                    <button
                                        onClick={toggleTheme}
                                        className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-white transition-colors active:scale-95"
                                    >
                                        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
                                        <span className="text-[10px] font-semibold uppercase tracking-wider">Tema</span>
                                    </button>
                                )}

                                {/* Main Action Button (Scan) - Di tengah dan menyala */}
                                <div className="absolute -top-5 z-100">
                                    <div className="absolute inset-0 bg-[var(--header-primary-color)] rounded-full blur-md opacity-40 animate-pulse" />
                                    <button
                                        onClick={() => setIsOpenScan(true)}
                                        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border-2 border-[var(--header-primary-color)] text-[var(--header-primary-color)] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform active:scale-90"
                                    >
                                        <ScanBarcode className="w-6 h-6" />
                                    </button>
                                </div>

                                <Link
                                    href={historyLink}
                                    className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-[var(--header-primary-color)] transition-colors active:scale-95"
                                >
                                    <History className="w-5 h-5" />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider">Riwayat</span>
                                </Link>
                            </div>
                        </div>
                    </div> :
                    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-[100] pointer-events-none">
                        <div className="pointer-events-auto flex items-center justify-around py-3 px-2 rounded-2xl h-16  bg-slate-950/95 border border-slate-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-3xl ">

                            {/* Top Glow Accent for Bottom Nav */}
                            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[var(--header-primary-color)] to-transparent opacity-50" />

                            {/* Nav Items */}
                            {displayMode === 'auto' && (
                                <button
                                    onClick={toggleTheme}
                                    className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-white transition-colors active:scale-95"
                                >
                                    {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
                                    <span className="text-[10px] font-semibold uppercase tracking-wider">Tema</span>
                                </button>
                            )}

                            {/* Main Action Button (Scan) - Di tengah dan menyala */}
                            <div className="absolute -top-5 z-100">
                                <div className="absolute inset-0 bg-[var(--header-primary-color)] rounded-full blur-md opacity-40 animate-pulse" />
                                <button
                                    onClick={() => setIsOpenScan(true)}
                                    className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border-2 border-[var(--header-primary-color)] text-[var(--header-primary-color)] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform active:scale-90"
                                >
                                    <ScanBarcode className="w-6 h-6" />
                                </button>
                            </div>

                            <Link
                                href={historyLink}
                                className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-[var(--header-primary-color)] transition-colors active:scale-95"
                            >
                                <History className="w-5 h-5" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider">Riwayat</span>
                            </Link>
                        </div>
                    </div>
            }

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scanline {
                    0% { transform: translateY(-10px); }
                    50% { transform: translateY(40px); }
                    100% { transform: translateY(-10px); }
                }
            `}} />
        </>
    )
}

export default Four