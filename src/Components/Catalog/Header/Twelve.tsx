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

const Twelve = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-6 px-4' : 'relative p-6'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Illuminated Frame Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-5 py-3 rounded-2xl border-[1.5px] border-[var(--header-primary-color)]/40 backdrop-blur-xl transition-all duration-300 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/85 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
                    : 'bg-white/85 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]'
                }`}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: Bold, tight, and tech-forward */}
                    <h2 className="text-xl md:text-2xl font-black tracking-tighter truncate mt-0.5">
                        <span className="text-[var(--header-primary-color)] drop-shadow-sm">{spanOne}</span>
                        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-500'} ml-1.5`}>{spanTwo}</span>
                    </h2>
                </div>

                <div className="flex items-center">
                    <NavIcons
                        isBuild={isBuild}
                        displayMode={displayMode}
                        colorClass={`text-[var(--header-primary-color)] hover:opacity-75 transition-opacity duration-200`}
                        toggleTheme={toggleTheme}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default Twelve;