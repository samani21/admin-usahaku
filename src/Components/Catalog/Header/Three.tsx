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

const Three = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-4 px-4' : 'relative p-4'} z-[100] w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Compact Horizontal Boutique Style */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between py-3 px-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/80 border-slate-700/50 shadow-[0_15px_30px_rgba(0,0,0,0.4)]'
                    : 'bg-white/85 border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                }`}
            >
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    {
                        logoImage &&
                        <div className="drop-shadow-sm hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }

                    {/* Minimalist Vertical Divider */}
                    {logoImage && (
                        <div className={`hidden sm:block w-[1px] h-6 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                    )}

                    {/* Typography: Editorial Serif (Compact) */}
                    <h2 className="text-lg md:text-xl font-serif tracking-[0.15em] uppercase truncate mt-0.5">
                        <span className={`text-[var(--header-primary-color)] font-bold drop-shadow-sm`}>{spanOne}</span>
                        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-500'} ml-2 font-light`}>{spanTwo}</span>
                    </h2>
                </div>

                {/* Nav Area */}
                <div className="flex items-center pl-2">
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
    );
}

export default Three;