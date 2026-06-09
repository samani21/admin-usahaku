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

const Fourteen = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>

            <div className={`flex items-center justify-between p-4 py-2 rounded-xl border-t-4 border-[var(--header-primary-color)] transition-all ${isDarkMode ? 'bg-slate-900 shadow-xl' : 'bg-white '}`} >
                <div className="flex flex-col min-w-0">
                    <h2 className="text-2xl font-serif font-black leading-none italic">
                        <span className={'text-[var(--header-primary-color)]'}>{spanOne}</span>
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mt-1">{spanTwo}</span>
                </div>
                <div className="flex items-center gap-4">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <NavIcons isBuild={isBuild} displayMode={displayMode} colorClass={`text-[var(--header-primary-color)]`} toggleTheme={toggleTheme} themeMode={themeMode} />
                </div>
            </div>
        </header>
    )
}

export default Fourteen