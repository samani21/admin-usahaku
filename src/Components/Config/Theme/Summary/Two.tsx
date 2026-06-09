import { formatIDR } from '@/types/FormtRupiah';
import { ShoppingBag } from 'lucide-react'
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

const Two = ({ isDarkMode, totalCart, summary, isBuild, selectedOutlet }: Props) => {
    return (

        <div className="space-y-4">
            <div className={`sticky bottom-0 border-t ${isDarkMode ? "bg-slate-800 border-slate-600" : "bg-white border-slate-200"} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className={`relative ${isDarkMode ? "bg-slate-500" : "bg-slate-100"} p-2 rounded-lg`}>
                        <ShoppingBag size={18} className={isDarkMode ? "text-slate-300" : "text-slate-600"} />
                        <span className={`absolute -top-1 -right-1 bg-[var(--summary-primary-color)] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center`}>
                            {totalCart}
                        </span>
                    </div>
                    <span className={`font-bold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{formatIDR(summary)}</span>
                </div>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold">Checkout</HandleCheckout>
            </div>
        </div>

    )
}

export default Two