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

const Eight = ({ isDarkMode, isBuild, totalCart, summary, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-8 mx-6 ${isDarkMode ? "bg-slate-600" : "bg-white"} p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${isDarkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"} rounded-xl flex items-center justify-center  font-black`}>
                        {totalCart}
                    </div>
                    <span className={`text-lg font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{formatIDR(summary)}</span>
                </div>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className='bg-[var(--summary-primary-color)] text-white px-6 py-3 rounded-xl font-bold text-sm'>
                    Bayar
                </HandleCheckout>
            </div>
        </div>

    )
}

export default Eight