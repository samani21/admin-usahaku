import React, { useMemo } from 'react'
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
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white overflow-hidden relative`}>
                {/* Accent Background */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-[var(--header-primary-color)]`} />
                <div className="flex items-center gap-3 min-w-0 relative z-10">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <h2 className="font-black italic text-xl truncate">
                        <span className="text-white">{spanOne}</span>
                        <span className={`text-[var(--header-primary-color)] ml-1`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons isBuild={isBuild} colorClass={`text-[var(--header-primary-color)]`} displayMode={displayMode} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Four