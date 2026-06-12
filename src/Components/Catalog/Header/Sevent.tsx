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

const Sevent = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-5 px-4' : 'relative p-5'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Minimalist Floating Bar */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-[1.5rem] border backdrop-blur-lg transition-all duration-300 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/80 border-slate-700/60 shadow-[0_8px_20px_rgba(0,0,0,0.3)]'
                    : 'bg-white/80 border-slate-200/50 shadow-[0_8px_20px_rgba(0,0,0,0.03)]'
                }`}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:opacity-80 transition-opacity duration-300">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: font-medium dengan jarak huruf renggang (tracking-wide) */}
                    <h2 className="text-lg font-medium tracking-wide truncate">
                        <span className="text-[var(--header-primary-color)] font-semibold">{spanOne}</span>
                        <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} ml-1.5 font-light`}>{spanTwo}</span>
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

export default Sevent;