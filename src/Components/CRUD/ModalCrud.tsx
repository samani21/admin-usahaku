import { Layers, X } from 'lucide-react';
import React from 'react'

type Props = {
    children: React.ReactNode
    isOpen: boolean;
    title: string;
    onClose: () => void
}

const ModalCrud = ({ children, isOpen, title, onClose }: Props) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-70 overflow-y-auto bg-gray-900/70 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-300">
            <div
                className="bg-white rounded-4xl max-h-screen py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-xl transform transition-transform duration-300 scale-100 opacity-100 modal-no-scrollbar">
                {/* Header Section */}
                <div className="relative px-8 pt-4 pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-5">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{title}</h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-2xl transition-all duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className='px-6 py-4 overflow-auto no-scrollbar max-h-[80vh]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalCrud