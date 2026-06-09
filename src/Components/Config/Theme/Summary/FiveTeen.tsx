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

const FiveTeen = ({ isDarkMode, isBuild, summary, totalCart, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className="sticky bottom-6 mx-4 rounded-2xl overflow-hidden shadow-2xl flex">
                <div className={`w-full ${isDarkMode ? " bg-slate-800" : "bg-slate-100"} px-6 py-4 flex-1`}>
                    <p className={`text-[10px] font-bold ${isDarkMode ? "text-slate-100" : "text-slate-500"} leading-none mb-1`}>Total</p>
                    <p className={`font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"} leading-none`}>{formatIDR(summary)}</p>
                </div>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className='bg-[var(--summary-primary-color)] text-white px-4 sm:px-8 font-black uppercase tracking-widest text-xs italic'>
                    Checkout ({totalCart})
                </HandleCheckout>
            </div>
        </div>

    )
}

export default FiveTeen