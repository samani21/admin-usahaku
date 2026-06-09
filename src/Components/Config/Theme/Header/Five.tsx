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

const Five = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between px-4 py-2 rounded-lg border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700' : `bg-white border-slate-200`}`}>
                <div className="flex items-center gap-3">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest">{spanOne}</span>
                        <span className={`text-xl font-serif font-bold uppercase text-[var(--header-primary-color)]`}>{spanTwo}</span>
                    </div>
                </div>
                <NavIcons isBuild={isBuild} colorClass={`text-[var(--header-primary-color)]`} toggleTheme={toggleTheme} displayMode={displayMode} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Five