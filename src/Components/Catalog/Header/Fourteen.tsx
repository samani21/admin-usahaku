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

const Fourteen = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-5 px-4' : 'relative p-5'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Gallery Plaque / Editorial Crown Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-7 py-4 rounded-t-md rounded-b-2xl border-t-[4px] border-t-[var(--header-primary-color)] backdrop-blur-xl transition-all duration-400 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/90 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-x border-b border-slate-800/50'
                    : 'bg-white/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border-x border-b border-slate-100'
                }`}
            >
                {/* Left Side: Editorial Typography */}
                <div className="flex flex-col justify-center min-w-0 mt-1">
                    <h2 className="text-2xl md:text-3xl font-serif font-black leading-none italic truncate drop-shadow-sm">
                        <span className="text-[var(--header-primary-color)]">{spanOne}</span>
                    </h2>
                    <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-400'} text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mt-2 ml-0.5`}>
                        {spanTwo}
                    </span>
                </div>

                {/* Right Side: Logo & Navigation */}
                <div className="flex items-center gap-6">
                    {
                        logoImage &&
                        <div className="hover:-translate-y-1 transition-transform duration-300 ease-out drop-shadow-md">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }

                    {/* Pemisah Halus (Divider) antara Logo dan Navigasi */}
                    {logoImage && (
                        <div className={`hidden md:block w-[1.5px] h-8 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                    )}

                    <div className="flex items-center">
                        <NavIcons
                            isBuild={isBuild}
                            displayMode={displayMode}
                            colorClass={`text-[var(--header-primary-color)] hover:scale-110 transition-transform duration-200`}
                            toggleTheme={toggleTheme}
                            themeMode={themeMode}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Fourteen;