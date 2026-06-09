import { formatIDR } from '@/types/FormtRupiah';
import { useRouter } from 'next/navigation';
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

const Six = ({ totalCart, summary, isBuild, selectedOutlet }: Props) => {
    return (
        <div className="space-y-4">
            <div className="sticky bottom-6 mx-auto w-fit bg-white/40 backdrop-blur-xl border border-white/50 p-2 rounded-full shadow-xl flex items-center gap-4">
                <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                    <span className="font-black text-slate-800">{formatIDR(summary)}</span>
                </div>
                <HandleCheckout selectedOutlet={selectedOutlet} isBuild={isBuild} className="bg-slate-900 text-white pr-6 pl-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                    <span className={`bg-white/20 py-1 px-2 rounded-md text-[10px]`}>{totalCart}</span> Checkout
                </HandleCheckout>
            </div>
        </div>
    )
}

export default Six