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

const Fiveteen = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0' : 'relative'} z-100 w-full pointer-events-none`}>
            {/* Inner Container: Cinematic Minimalist / High-End Studio Concept */}
            <div className={`pointer-events-auto w-full flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500 ease-in-out backdrop-blur-md
                ${isDarkMode
                    ? 'bg-slate-950/85 border-b border-slate-800 shadow-sm'
                    : 'bg-white/90 border-b border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                }`}
            >
                <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:opacity-75 transition-opacity duration-300">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }

                    {/* Refined Hairline Divider */}
                    {logoImage && (
                        <div className={`hidden sm:block w-[1px] h-7 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
                    )}

                    {/* Typography: Cinematic uppercase with ultra-wide tracking */}
                    <h2 className="text-xs md:text-sm lg:text-base font-light uppercase tracking-[0.2em] sm:tracking-[0.35em] truncate mt-0.5">
                        <span className={`font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{spanOne}</span>
                        <span className="ml-2 sm:ml-3 text-[var(--header-primary-color)] font-medium">{spanTwo}</span>
                    </h2>
                </div>

                <div className="flex items-center">
                    <NavIcons
                        isBuild={isBuild}
                        displayMode={displayMode}
                        colorClass={`text-[var(--header-primary-color)] hover:scale-105 transition-transform duration-200`}
                        toggleTheme={toggleTheme}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default Fiveteen;