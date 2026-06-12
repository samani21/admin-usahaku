import React, { useMemo } from 'react';
import LogoContainer from './LogoContainer';
import NavIcons from './NavIcons';
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
}

const Nine = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-6 px-4' : 'relative p-6'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Classic Elegance / Soft Luxury Capsule */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between pl-6 pr-4 py-3 rounded-full border backdrop-blur-xl transition-all duration-400 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/85 border-slate-700/60 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
                    : 'bg-white/90 border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)]'
                }`}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:rotate-3 hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: Classic Serif & Light Italic Combo */}
                    <h2 className="text-xl md:text-2xl font-serif tracking-wide truncate">
                        <span className="text-[var(--header-primary-color)] font-bold">{spanOne}</span>
                        <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} ml-2 italic font-light`}>{spanTwo}</span>
                    </h2>
                </div>

                {/* Area navigasi dibungkus kapsul kecil agar selaras dengan tema utama */}
                <div className={`flex items-center justify-center px-3 py-1.5 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                    <NavIcons
                        isBuild={isBuild}
                        displayMode={displayMode}
                        colorClass={`text-[var(--header-primary-color)] hover:scale-110 transition-transform duration-200`}
                        toggleTheme={toggleTheme}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default Nine;