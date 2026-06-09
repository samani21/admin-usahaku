import { ProductsType, Variants } from '@/types/Admin/ProductsType'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    variants: Variants[];
    selectedVariant: Variants | null;
    setSelectedVariant: Dispatch<SetStateAction<Variants | null>>;
    product: ProductsType
}

const VariantPicker = ({ variants, selectedVariant, setSelectedVariant, product }: Props) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pilih Varian Menu</span>
                {selectedVariant && (
                    <span className="text-[11px] font-medium text-slate-500">
                        Stok: {(selectedVariant?.product_variant_stock ?? 0) > 0 ? (
                            <span className="text-emerald-600 font-bold">{selectedVariant.product_variant_stock} pcs tersedia</span>
                        ) : (
                            <span className="text-rose-500 font-bold">Habis</span>
                        )}
                    </span>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const isOutOfStock = v.product_variant_stock === 0;

                    return (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`group relative flex sm:flex-col justify-between p-3 rounded-xl border text-left transition-all duration-200 ${isSelected
                                ? 'border-[var(--product-primary-color)] bg-[rgba(var(--product-primary-rgb),0.06)] ring-1 ring-[var(--product-primary-color)]'
                                : 'border-slate-150 bg-white hover:border-slate-300'
                                } ${isOutOfStock ? 'opacity-70' : ''}`}
                        >
                            <div className="flex sm:flex-col gap-3 sm:gap-2 w-full items-center sm:items-start">
                                <div className="w-12 h-12 sm:w-full sm:h-24 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                                    <img src={v.image ?? product?.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="space-y-0.5 flex-1 sm:w-full min-w-0">
                                    <p className="font-bold text-slate-800 text-xs truncate leading-tight">{v.name}</p>
                                    <p className="text-[11px] text-slate-500 font-medium">
                                        Rp {v.final_price.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            {/* Status Indicator inside Varian */}
                            <div className="mt-0 sm:mt-2.5 pt-0 sm:pt-2 sm:border-t sm:border-slate-100/60 flex items-center justify-end w-auto sm:w-full shrink-0">
                                {isOutOfStock ? (
                                    <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">HABIS</span>
                                ) : (
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-[var(--product-primary-color)] text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {v.product_variant_stock} Pcs
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


export default VariantPicker