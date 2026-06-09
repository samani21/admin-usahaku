import { formatIDR } from '@/types/FormtRupiah';
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

const Nine = ({ isDarkMode, totalCart, summary, isBuild, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className="sticky bottom-4 flex justify-center">
                <div className={`${isDarkMode ? "bg-slate-50 text-gray-800" : "bg-slate-900/90 text-gray-100"} backdrop-blur-sm  px-8 py-3 rounded-full flex items-center gap-8 shadow-2xl`}>
                    <div className="flex flex-col items-start">
                        <span className="text-[9px] opacity-60">TOTAL BAYAR</span>
                        <span className="font-bold text-sm leading-none">{formatIDR(summary)}</span>
                    </div>
                    <div className="h-6 w-px bg-white/20"></div>
                    <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className={`font-bold text-sm text-[var(--summary-primary-color)] uppercase tracking-tighter`}>Checkout ({totalCart})</HandleCheckout>
                </div>
            </div>
        </div>
    )
}

export default Nine