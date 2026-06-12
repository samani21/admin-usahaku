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

const Elevent = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0' : 'relative'} z-100 w-full pointer-events-none`}>
            {/* Inner Container: Classic Editorial Ribbon (Full Width) */}
            <div className={`pointer-events-auto w-full flex items-center justify-between px-6 md:px-12 py-3.5 border-y-[1.5px] border-[var(--header-primary-color)] backdrop-blur-md transition-all duration-400 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-950/85 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-white/90 shadow-[0_5px_20px_rgba(0,0,0,0.03)]'
                }`}
            >
                <div className="flex items-center gap-5 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:opacity-80 transition-opacity duration-300">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: Editorial Serif with Refined Underline */}
                    <h2 className="text-xl md:text-2xl font-serif truncate mt-0.5">
                        <span className={`${isDarkMode ? "text-slate-100" : "text-slate-800"} tracking-[0.15em] font-light`}>
                            {spanOne}
                        </span>
                        <span className="font-bold ml-3 tracking-wide text-[var(--header-primary-color)] underline decoration-[1.5px] underline-offset-[6px] decoration-[var(--header-primary-color)]/70 hover:decoration-[var(--header-primary-color)] transition-colors duration-300">
                            {spanTwo}
                        </span>
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

export default Elevent;