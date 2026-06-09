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

const Fiveteen = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-4 py-2 transition-all ${isDarkMode ? 'bg-slate-900 shadow-xl' : 'bg-white '}`}>
                <div className="flex items-center gap-4">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <div className={`w-[2px] h-8 ${isDarkMode ? 'bg-slate-200' : "bg-slate-800"}`} />
                    <h2 className="text-xl font-light sm:tracking-[0.5em]">
                        <span className={`font-bold ${isDarkMode ? 'text-slate-200' : "text-slate-800"}`}>{spanOne}</span>
                        <span className={`ml-2 text-[var(--header-primary-color)]`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons isBuild={isBuild} displayMode={displayMode} colorClass={`text-[var(--header-primary-color)]`} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Fiveteen