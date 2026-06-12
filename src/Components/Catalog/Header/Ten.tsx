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
    displayMode: string
}

const Ten = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-5 px-4' : 'relative p-5'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Exclusive Halo Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-5 py-3 rounded-[1.5rem] border backdrop-blur-xl transition-all duration-400 ease-out
                ${isDarkMode
                    ? 'bg-slate-900/80 border-slate-700/50 shadow-[0_15px_30px_rgba(0,0,0,0.4)]'
                    : 'bg-white/85 border-slate-200/50 shadow-[0_15px_30px_rgba(0,0,0,0.05)]'
                }`}
            >
                <div className="flex items-center gap-5 min-w-0">
                    {/* Stacked Elements Group */}
                    <div className="flex items-center -space-x-3 ml-1 group cursor-default">
                        {
                            logoImage &&
                            <div className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
                                <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                            </div>
                        }
                        {/* Halo / Accent Ring */}
                        <div className={`w-11 h-11 rounded-full relative z-0 transition-colors duration-300
                            ${isDarkMode
                                ? 'bg-slate-800/80 border-[3px] border-slate-900 shadow-inner'
                                : 'bg-slate-50/80 border-[3px] border-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.06)]'
                            }`}
                        />
                    </div>

                    {/* Typography */}
                    <h2 className="text-xl font-extrabold tracking-tight truncate mt-0.5">
                        <span className="text-[var(--header-primary-color)] drop-shadow-sm">{spanOne}</span>
                        <span className={`${isDarkMode ? "text-slate-300" : 'text-slate-700'} ml-1.5`}>{spanTwo}</span>
                    </h2>
                </div>

                <div className="flex items-center pr-2">
                    <NavIcons
                        isBuild={isBuild}
                        displayMode={displayMode}
                        colorClass={`text-[var(--header-primary-color)] hover:scale-110 hover:-rotate-3 transition-transform duration-200`}
                        toggleTheme={toggleTheme}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default Ten;