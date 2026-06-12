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

const Six = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    // Menyederhanakan penulisan useMemo
    const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-6 px-4' : 'relative p-6'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Solid Status Ribbon Concept */}
            <div className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-5 py-3.5 rounded-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-300 ease-in-out
                ${isDarkMode
                    ? 'bg-slate-900/85 border border-slate-700/50 shadow-[0_15px_40px_rgba(0,0,0,0.4)]'
                    : 'bg-white/90 border border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.06)]'
                }`}
            >
                {/* Bold Accent Ribbon - Representasi satu paket layanan unggulan yang solid */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[var(--header-primary-color)] shadow-[2px_0_12px_var(--header-primary-color)] opacity-90" />

                <div className="flex items-center gap-4 ml-3 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    <h2 className="text-xl font-bold tracking-tight truncate">
                        <span className="text-[var(--header-primary-color)]">{spanOne}</span>
                        <span className={`${isDarkMode ? "text-slate-200" : 'text-slate-700'} ml-1.5`}>{spanTwo}</span>
                    </h2>
                </div>

                <div className="flex items-center pl-4">
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

export default Six;