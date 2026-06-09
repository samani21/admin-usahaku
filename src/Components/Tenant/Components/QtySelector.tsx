import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
    product: ProductsType;
    selectedVariant: Variants | null
}

const QtySelector = ({ quantity, setQuantity, product, selectedVariant }: Props) => {
    const maxStock = selectedVariant ? selectedVariant.product_variant_stock : product.product_stock;

    return (
        <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Jumlah</span>
                <span className="text-xs font-semibold text-slate-600">Sesuaikan jumlah pembelian</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    disabled={quantity <= 1 || maxStock === 0}
                    onClick={() => setQuantity(q => q - 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-slate-300 active:scale-95 transition-all text-sm font-bold flex items-center justify-center disabled:opacity-40"
                >
                    -
                </button>
                <span className="font-bold text-sm text-slate-800 min-w-[24px] text-center">
                    {maxStock === 0 ? 0 : quantity}
                </span>
                <button
                    disabled={quantity >= (maxStock ?? 0) || maxStock === 0}
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-slate-300 active:scale-95 transition-all text-sm font-bold flex items-center justify-center disabled:opacity-40"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QtySelector