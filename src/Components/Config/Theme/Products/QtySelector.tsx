import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { Minus, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    setQuantity: (val: number) => void;
    quantity: number;
    isDarkMode: boolean;
    product: ProductsType | null
    selectedVariant?: Variants | null
}

const QtySelector = ({ setQuantity, quantity, isDarkMode, product, selectedVariant }: Props) => {
    // Menentukan max stock berdasarkan varian yang dipilih atau stok produk utama
    const maxStock = selectedVariant?.product_variant_stock ?? product?.product_stock ?? 0;

    const handleIncrease = () => {
        if (quantity < maxStock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className={`flex items-center gap-4 ${isDarkMode ? "bg-zinc-800" : "bg-slate-100"} p-1 rounded-2xl w-fit border ${isDarkMode ? "border-zinc-700" : "border-slate-200"}`}>
            {/* Tombol Minus */}
            <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className={`p-2 rounded-xl transition-all shadow-sm 
                    ${isDarkMode
                        ? 'hover:bg-zinc-700 text-white disabled:text-zinc-600'
                        : 'hover:bg-white text-slate-900 disabled:text-slate-300'} 
                    disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <Minus size={16} />
            </button>

            {/* Angka Quantity */}
            <span className={`w-8 text-center font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {quantity}
            </span>

            {/* Tombol Plus */}
            <button
                onClick={handleIncrease}
                disabled={quantity >= maxStock || (product?.has_variant && !selectedVariant)}
                className={`p-2 rounded-xl transition-all shadow-sm 
                    ${isDarkMode
                        ? 'hover:bg-zinc-700 text-white disabled:text-zinc-600'
                        : 'hover:bg-white text-slate-900 disabled:text-slate-300'} 
                    disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <Plus size={16} />
            </button>
        </div>
    )
}

export default QtySelector