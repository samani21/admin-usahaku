import { formatIDR } from '@/types/FormtRupiah';
import { ChevronRight } from 'lucide-react';
import React from 'react'
import HandleCheckout from './HandleCheckout';
import { OutletsType } from '@/types/Admin/OutletType';

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
    selectedOutlet: OutletsType | null
}

const Sevent = ({ isDarkMode, isBuild, totalCart, summary, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-0 ${isDarkMode ? "bg-slate-800 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-900"} border-t-2 px-2 sm:px-6 py-4 flex justify-between items-center`}>
                <p className="text-sm">
                    <span className="text-slate-400">Total: </span>
                    <span className="font-bold">{formatIDR(summary)}</span>
                </p>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className={`text-[var(--summary-primary-color)] font-bold text-sm flex items-center gap-1 uppercase tracking-widest`}>
                    Lanjut ({totalCart}) <ChevronRight size={16} />
                </HandleCheckout>
            </div>
        </div>
    )
}

export default Sevent