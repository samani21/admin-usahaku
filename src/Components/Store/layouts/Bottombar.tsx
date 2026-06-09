import React, { Dispatch, SetStateAction } from 'react'
import { Menus } from '../Menu';

type Props = {
    activeNav: string;
    setActiveNav: Dispatch<SetStateAction<string>>;
    setActiveCategory: Dispatch<SetStateAction<string>>;
}

const Bottombar = ({ activeNav, setActiveNav, setActiveCategory }: Props) => {
    return (
        <nav className="lg:hidden fixed bottom-0 inset-x-0 h-16 border-t border-zinc-200/80 bg-white/95 backdrop-blur-md z-45 flex items-center justify-around px-1 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
            {Menus.map(item => {
                const IconComponent = item.icon;
                const isActive = activeNav === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => window.location.href = `/store/${item?.herf}`}
                        className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all ${isActive ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'
                            }`}
                    >
                        <div className="relative">
                            <IconComponent size={19} strokeWidth={isActive ? 2.5 : 2} />
                            {/* {item.badge && item.id === 'Reels' && (
                                <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                            )} */}
                        </div>
                        <span className="text-[9px] font-bold mt-1 tracking-wide">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    )
}

export default Bottombar