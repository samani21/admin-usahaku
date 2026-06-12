import React from 'react'
import LogoContainer from './LogoContainer'
import { FrameTheme, FrameType } from './FrameType';
import NavIcons from './NavIcons';

type Props = {
    themeMode: string;
    isBuild?: boolean;
    logoImage: string | null;
    frameType: FrameType;
    frameTheme: FrameTheme;
    toggleTheme: () => void;
    spanOne?: string;
    spanTwo?: string;
    displayMode: string;
}

const One = ({ isBuild, themeMode, logoImage, frameType, frameTheme, toggleTheme, spanOne, spanTwo, displayMode }: Props) => {
    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-4 px-4' : 'relative p-4'} z-100 w-full flex justify-center`}>
            {/* Inner Container: Glassmorphism & Premium Layout */}
            <div className={`w-full max-w-7xl flex items-center justify-between px-6 py-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 ease-in-out
                ${themeMode === 'dark'
                    ? 'bg-slate-900/80 border-slate-700/50 shadow-lg shadow-black/40'
                    : 'bg-white/85 border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
                }`}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {
                        logoImage &&
                        <div className="hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    <h2 className="text-xl font-extrabold tracking-tight truncate cursor-default">
                        <span className={`text-[var(--header-primary-color)] drop-shadow-sm`}>{spanOne}</span>
                        <span className={themeMode === 'dark' ? 'text-slate-100' : 'text-slate-800'}>{spanTwo}</span>
                    </h2>
                </div>

                <div className="flex items-center">
                    <NavIcons
                        isBuild={isBuild}
                        colorClass={`text-[var(--header-primary-color)] hover:opacity-80 transition-opacity duration-200`}
                        displayMode={displayMode}
                        toggleTheme={toggleTheme}
                        themeMode={themeMode}
                    />
                </div>
            </div>
        </header>
    )
}

export default One