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

const Thirteen = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-6 px-4' : 'relative p-6'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Organic Soft Pill Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between pl-6 pr-3 py-2.5 rounded-[3rem] border backdrop-blur-xl transition-all duration-400 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/80 border-slate-700/50 shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
                    : 'bg-white/85 border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]'
                }`}
            >
                <div className="flex items-center gap-3.5 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: Friendly yet Premium */}
                    <h2 className="text-lg md:text-xl tracking-tight truncate mt-0.5">
                        <span className="font-extrabold text-[var(--header-primary-color)]">{spanOne}</span>
                        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-500'} ml-1.5 font-medium`}>{spanTwo}</span>
                    </h2>
                </div>

                {/* Area ikon dibungkus dengan background yang menyatu dengan bentuk kapsul */}
                <div className={`flex items-center justify-center px-3 py-1.5 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100/50 hover:bg-slate-100'}`}>
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

export default Thirteen;