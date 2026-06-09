import { useEditor } from '@tiptap/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
    icon: any;
    label: string;
    active: boolean;
    children?: any;
    parent: string;
    pathNameChild?: string;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const NavItem = ({ icon: Icon, label, active, children, parent, pathNameChild, setLoading }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const hasChildren = children && children.length > 0;
    const route = useRouter();
    const handleClick = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else {
            route.push(`/admin/${parent}`);
            setLoading(!active)
        }
    };

    useEffect(() => {
        setIsOpen(active)
    }, [active])
    return (
        <div className="w-full">
            <button
                onClick={handleClick}
                className={`group flex items-center justify-between w-full p-3 rounded-2xl transition-all duration-300 ${active
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} className={(active) ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                    <span className="font-semibold text-sm">{label}</span>
                </div>
                {hasChildren && (
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={16} />
                    </div>
                )}
            </button>
            {hasChildren && (
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-9 flex flex-col gap-1 border-l-2 border-emerald-100 pl-4 py-1">
                        {children?.map((child: any, idx: number) => {
                            const isActive = pathNameChild === `/admin${parent}${child?.href}`;
                            return <button
                                onClick={() => {
                                    route.push(`/admin${parent}/${child?.href}`);
                                    setLoading(!isActive);
                                }}
                                key={idx}
                                className={`text-left py-2 text-xs font-medium ${isActive ? 'text-emerald-600' : 'text-slate-400'}  hover:text-emerald-600 transition-colors`}
                            >
                                {child.label}
                            </button>
                        })}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default NavItem