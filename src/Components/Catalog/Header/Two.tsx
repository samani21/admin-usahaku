import React, { useMemo } from 'react'
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
    logoImage: string | null
    isBuild?: boolean;
    displayMode: string;
}

const Two = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode])

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-6 px-4' : 'relative p-6'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Pill Container - pointer-events-auto agar hanya bagian kapsul yang bisa diklik */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between p-2 pl-6 pr-3 rounded-full border backdrop-blur-xl transition-all duration-500 ease-out
                ${isDarkMode
                    ? 'bg-slate-900/75 border-slate-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.3)]'
                    : 'bg-white/80 border-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]'
                }`}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:rotate-6 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Tipografi Uppercase dengan spasi lebar (tracking-widest) untuk kesan premium */}
                    <h2 className="text-sm md:text-base font-extrabold uppercase tracking-widest truncate">
                        <span className={`${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{spanOne}</span>
                        <span className={`text-[var(--header-primary-color)] ml-1.5`}>{spanTwo}</span>
                    </h2>
                </div>

                {/* Area ikon dibungkus dengan background tipis agar terlihat seperti modul terpisah yang elegan */}
                <div className={`flex items-center rounded-full px-2 py-1 transition-colors duration-300 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100/80'}`}>
                    <NavIcons
                        isBuild={isBuild}
                        colorClass={`text-[var(--header-primary-color)] hover:scale-105 transition-transform duration-200`}
                        displayMode={displayMode}
                        toggleTheme={toggleTheme}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default Two