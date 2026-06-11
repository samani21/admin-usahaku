"use client"
import { ChevronDown, HelpCircle, LayoutGrid, Settings, ShieldCheck, X } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SidebarItem from './SidebarItem';
import { usePathname, useRouter } from 'next/navigation';
import GlassCard from './GlassCard';
import NavItem from './NavItem';
import { menuSidebar } from '@/lib/MenuSidebar';

type Props = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}


const SidebarComponent = ({ isSidebarOpen, setIsSidebarOpen, setLoading }: Props) => {
    const pathname = usePathname();
    const [pathNameParent, setPathNameParent] = useState<string>('');
    const [pathNameChild, setPathNameChild] = useState<string>('');
    useEffect(() => {
        if (pathname) {
            const parts = pathname.split("/");
            const basePath = parts.slice(0, 3).join("/");
            const childbasePath = parts.slice(0, 4).join("/");
            setPathNameParent(basePath)
            setPathNameChild(childbasePath)
        }
    }, [pathname]);
    return (
        <aside className={`
          fixed sm:inset-y-4 sm:left-4 z-60 w-72 h-screen py-4 pl-4 transform transition-transform duration-300 ease-in-out lg:relative lg:inset-0 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'}
        `}>
            <div className='h-full '>
                <div className="h-full flex flex-col gap-6">
                    <GlassCard className="p-6 flex flex-col items-center flex-1 overflow-y-auto">
                        {/* Close Button Mobile */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 lg:hidden"
                        >
                            <X size={20} />
                        </button>

                        <div className='w-32 h-32'>
                            <img src="/logo.png" alt="" />
                        </div>
                        {/* <h1 className="text-xl font-black tracking-tight text-emerald-950">Usaha<span className="text-emerald-500">Ku</span></h1> */}

                        <nav className="w-full overflow-hidden  space-y-2">
                            <div className='h-[100%] overflow-auto no-scrollbar'>
                                {
                                    menuSidebar?.map((ms, i) => {
                                        const isOpen = pathNameParent === `${ms?.href}`
                                        return (
                                            ms?.child ?
                                                <NavItem
                                                    key={i}
                                                    icon={ms?.Icon}
                                                    label={ms?.label}
                                                    active={isOpen}
                                                    children={ms?.child}
                                                    parent={ms?.href}
                                                    setLoading={setLoading}
                                                    pathNameChild={pathNameChild}
                                                /> :
                                                <NavItem
                                                    icon={ms?.Icon}
                                                    label={ms?.label}
                                                    key={i}
                                                    setLoading={setLoading}
                                                    active={isOpen}
                                                    parent={ms?.href}
                                                />
                                        )
                                    })
                                }
                            </div>
                        </nav>


                    </GlassCard>
                </div>
            </div>
        </aside>

    )
}

export default SidebarComponent