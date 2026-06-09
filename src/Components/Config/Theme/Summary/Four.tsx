
import { formatIDR } from '@/types/FormtRupiah';
import React from 'react'
import HandleCheckout from './HandleCheckout';
import { OutletsType } from '@/types/Admin/OutletType';

type Props = {
    isDarkMode: boolean;
    totalCart: number;
    summary: number;
    isBuild?: boolean;
    selectedOutlet: OutletsType | null
}

const Four = ({ isDarkMode, isBuild, totalCart, summary, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-4 mx-4 bg-gradient-to-r from-[var(--summary-primary-color)] to-[var(--summary-primary-color)]/30 p-[1px] rounded-2xl shadow-lg`}>
                <div className={`${isDarkMode ? "bg-black/75" : "bg-white/80"} rounded-[15px] p-3 flex items-center justify-between`}>
                    <span className={`text-sm font-bold pl-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                        {totalCart} Barang • <span className={isDarkMode ? 'text-[var(--summary-primary-color)]' : 'text-[var(--summary-primary-color)]'}>{formatIDR(summary)}</span>
                    </span>
                    <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className={`bg-[var(--summary-primary-color)] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider`}>Beli</HandleCheckout>
                </div>
            </div>
        </div>
    )
}

export default Four