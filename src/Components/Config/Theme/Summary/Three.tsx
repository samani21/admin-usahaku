import { formatIDR } from '@/types/FormtRupiah';
import { ShoppingCart } from 'lucide-react'
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

const Three = ({ isDarkMode, totalCart, summary, isBuild, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className="sticky bottom-10 flex justify-end px-4">
                <div className={`${isDarkMode ? "bg-gray-800 border-slate-600 " : "bg-gray-100 border-slate-100 "} p-3 rounded-3xl shadow-2xl border flex items-center gap-4`}>
                    <div className="text-right">
                        <p className={`text-[14px] font-bold ${isDarkMode ? "text-white" : "text-[var(--summary-primary-color)]"} uppercase`}>Total ({totalCart})</p>
                        <p className={`font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{formatIDR(summary)}</p>
                    </div>
                    <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className={`bg-[var(--summary-primary-color)] text-white p-3 rounded-2xl`}>
                        <ShoppingCart size={20} />
                    </HandleCheckout>
                </div>
            </div>
        </div>

    )
}

export default Three