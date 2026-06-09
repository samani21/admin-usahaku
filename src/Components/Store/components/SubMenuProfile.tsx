import React, { Dispatch, SetStateAction } from 'react'
import { menuItems } from '../Menu';

type Props = {
    activeMenu: string;
    setActiveMenu: Dispatch<SetStateAction<string>>;
}

const SubMenuProfile = ({ activeMenu, setActiveMenu }: Props) => {
    return (
        <nav className="sticky top-24 z-30">
            <div className="bg-white/60 backdrop-blur-xl p-1.5 rounded-[1.25rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex overflow-x-auto hide-scrollbar">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeMenu === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            className={`relative flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-300 z-10 ${isActive
                                ? 'text-slate-900'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80 -z-10 animate-[scaleIn_0.2s_ease-out]"></div>
                            )}
                            <IconComponent size={16} className={isActive ? 'text-emerald-500' : 'text-slate-400'} />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </nav>

    )
}

export default SubMenuProfile