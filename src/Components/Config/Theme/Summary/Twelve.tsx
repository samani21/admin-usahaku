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

const Twelve = ({ isBuild, totalCart, summary, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className="sticky bottom-6 bg-[var(--summary-primary-color)] text-[var(--summary-secondary-color)] border-2 border-black p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex justify-between items-center">
                <span className="font-black text-xs">TOTAL: {formatIDR(summary)} ({totalCart})</span>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className="bg-black text-white px-4 py-1.5 text-[10px] font-black uppercase">Gas!</HandleCheckout>
            </div>
        </div>
    )
}

export default Twelve