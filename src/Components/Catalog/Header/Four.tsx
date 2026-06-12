import React from 'react'
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

const Four = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    return (
        <header className={`${!isBuild ? 'absolute top-0 left-0 pt-5 px-4' : 'relative p-5'} z-100 w-full flex justify-center pointer-events-none`}>
            {/* Inner Container: Tech/Dynamic Premium Style */}
            <div className="pointer-events-auto w-full max-w-7xl flex items-center justify-between pl-5 pr-3 py-3 rounded-2xl bg-slate-950/90 text-white border border-slate-800/60 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden relative transition-all duration-300">

                {/* Glowing Accent Indicator */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--header-primary-color)] shadow-[0_0_20px_var(--header-primary-color)] opacity-90" />

                {/* Subtle Background Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--header-primary-color)]/10 to-transparent opacity-20 pointer-events-none" />

                <div className="flex items-center gap-4 min-w-0 relative z-10">
                    {
                        logoImage &&
                        <div className="drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-300 ease-out">
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        </div>
                    }
                    {/* Typography: Dynamic, modern italic dengan tracking lebar */}
                    <h2 className="font-black italic text-xl tracking-wide truncate">
                        <span className="text-slate-100">{spanOne}</span>
                        {/* Memberikan sedikit efek glow pada teks warna utama */}
                        <span className="text-[var(--header-primary-color)] ml-1.5 drop-shadow-[0_0_8px_var(--header-primary-color)]">{spanTwo}</span>
                    </h2>
                </div>

                {/* Glassy Nav Wrapper */}
                <div className="relative z-10 flex items-center bg-white/5 hover:bg-white/10 rounded-xl px-3 py-1.5 border border-white/10 transition-colors duration-300">
                    <NavIcons
                        isBuild={isBuild}
                        colorClass="text-slate-200 hover:text-white transition-colors"
                        displayMode={displayMode}
                        toggleTheme={toggleTheme}
                        themeMode={'dark'}
                    />
                </div>
            </div>
        </header>
    )
}

export default Four