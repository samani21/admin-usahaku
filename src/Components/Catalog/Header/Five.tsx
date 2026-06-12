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

const Five = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-6 px-4' : 'relative p-6'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Bespoke Label / VIP Ticket Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-6 py-3.5 rounded-xl border-[1.5px] border-dashed backdrop-blur-md transition-all duration-300 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/60 border-slate-600/60 shadow-lg shadow-black/20'
                    : 'bg-slate-50/80 border-slate-300/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                }`}
            >
                <div className="flex items-center gap-4">
                    {
                        logoImage &&
                        <div className="hover:opacity-80 transition-opacity duration-300">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }

                    {/* Stacked Typography */}
                    <div className="flex flex-col justify-center mt-0.5">
                        <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5 ml-0.5">
                            {spanOne}
                        </span>
                        <span className="text-xl md:text-2xl font-serif font-bold uppercase text-[var(--header-primary-color)] leading-none drop-shadow-sm">
                            {spanTwo}
                        </span>
                    </div>
                </div>

                <div className="flex items-center">
                    <NavIcons
                        isBuild={isBuild}
                        colorClass={`text-[var(--header-primary-color)] hover:scale-110 transition-transform duration-200`}
                        toggleTheme={toggleTheme}
                        displayMode={displayMode}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    );
}

export default Five;