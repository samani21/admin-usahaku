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

const Ten = ({ isDarkMode, isBuild, totalCart, summary, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-0  p-4 border-t-2 ${isDarkMode ? "bg-gray-700" : "bg-white"} border-[var(--summary-primary-color)] flex justify-between items-center`}>
                <div>
                    <p className={`text-[14px] font-bold ${isDarkMode ? "text-slate-300" : "text-slate-400"} uppercase tracking-wider`}>Keranjang ({totalCart})</p>
                    <p className={`text-lg font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"} leading-none`}>{formatIDR(summary)}</p>
                </div>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className={`bg-[var(--summary-primary-color)]/80 text-[var(--summary-secondary-color)] px-6 py-2 rounded-md font-black uppercase text-xs italic`}>Checkout</HandleCheckout>
            </div>
        </div>
    )
}

export default Ten