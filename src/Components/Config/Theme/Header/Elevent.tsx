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

const Elevent = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-4 py-2 rounded-none border-y-2 transition-all border-[var(--header-primary-color)] ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <h2 className="text-xl font-serif">
                        <span className={`${isDarkMode ? "text-white" : "text-slate-900"} tracking-widest`}>{spanOne}</span>
                        <span className={`font-bold ml-2 underline decoration-2 underline-offset-4 text-[var(--header-primary-color)]`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons isBuild={isBuild} displayMode={displayMode} colorClass={`text-[var(--header-primary-color)]`} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Elevent