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
    displayMode: string
}

const Ten = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 py-2 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-2">
                        {
                            logoImage &&
                            <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                        }
                        <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-slate-800 border-slate-900' : "bg-slate-100 border-white"} border-2 `} />
                    </div>
                    <h2 className="text-lg font-bold">
                        <span className={'text-[var(--header-primary-color)]'}>{spanOne}</span>
                        <span className={`${isDarkMode ? "text-slate-400" : 'text-slate-800'} ml-1`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons isBuild={isBuild} displayMode={displayMode} colorClass={`text-[var(--header-primary-color)]`} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Ten