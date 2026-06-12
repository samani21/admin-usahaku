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

const Eight = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-5 px-4' : 'relative p-5'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Dynamic Anchor Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-6 py-3.5 rounded-t-2xl rounded-b-lg border-b-[4px] border-b-[var(--header-primary-color)] backdrop-blur-xl transition-all duration-300 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/90 border-x border-t border-slate-700/50 shadow-[0_15px_30px_rgba(0,0,0,0.4)]'
                    : 'bg-white/90 border-x border-t border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                }`}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:-translate-y-0.5 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: Sporty/Dynamic Anchor */}
                    <h2 className="text-xl font-black italic tracking-wide truncate mt-0.5">
                        <span className={`${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>{spanOne}</span>
                        <span className="text-[var(--header-primary-color)] ml-1.5 drop-shadow-sm">{spanTwo}</span>
                    </h2>
                </div>

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
        </header>
    )
}

export default Eight;