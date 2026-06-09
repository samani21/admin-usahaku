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
    logoImage: string | null
    isBuild?: boolean;
    displayMode: string;
}

const Two = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center  justify-between p-2 pl-4 pr-2 py-2 rounded-full border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-3 min-w-0">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <h2 className="text-lg font-black uppercase truncate">
                        <span className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{spanOne}</span>
                        <span className={`text-[var(--header-primary-color)]`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons isBuild={isBuild} colorClass={`text-[var(--header-primary-color)]`} displayMode={displayMode} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Two