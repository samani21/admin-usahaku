import React from 'react';
import { ShoppingBag, Star, MapPin } from 'lucide-react';
import { ProductsType } from '@/types/Admin/ProductsType';
import { BusinessType } from '@/types/Admin/BusinessType';

interface ProductType extends ProductsType {
    business: BusinessType;
    rating?: number;
}

type ProductProps = {
    data: ProductType;
};

export const CardProduct = ({ data }: ProductProps) => {
    // Logika deteksi diskon
    const hasDiscount = data?.final_price && data?.price && Number(data.final_price) < Number(data.price);
    const discountPercentage = hasDiscount
        ? Math.round(((Number(data.price) - Number(data.final_price)) / Number(data.price)) * 100)
        : 0;

    return (
        <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 hover:border-zinc-200/80 transition-all duration-300 flex flex-col sm:flex-col group h-full">
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-square bg-zinc-50 w-full">
                <img
                    src={data?.image}
                    alt={data?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Badges */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                    {/* Distance Badge */}
                    <div className="bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold text-zinc-700 flex items-center gap-1 shadow-sm border border-white/20">
                        <MapPin className="w-2.5 h-2.5 text-emerald-500 fill-emerald-50" />
                        <span>{data?.distance ?? '0 km'}</span>
                    </div>

                    {/* Discount Badge */}
                    {hasDiscount && (
                        <div className="bg-rose-500 text-white px-1.5 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold tracking-wide uppercase self-start shadow-sm">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between gap-3 sm:gap-4">
                {/* Information */}
                <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold uppercase tracking-wider truncate">
                        {data?.business?.name}
                    </p>
                    <h4 className="font-medium text-zinc-800 text-xs sm:text-base line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 leading-snug min-h-[32px] sm:min-h-[40px]">
                        {data?.name}
                    </h4>
                </div>

                {/* Footer Section */}
                <div className="space-y-2 sm:space-y-3">
                    {/* Rating Section */}
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] sm:text-xs font-bold text-zinc-600">
                            {data?.rating ?? '4.5'}
                        </span>
                        <span className="text-[9px] sm:text-[11px] text-zinc-400 truncate max-w-[70px] sm:max-w-none">
                            (Pre-release)
                        </span>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex items-center justify-between gap-1.5 pt-2 sm:pt-3 border-t border-zinc-100">
                        <div className="flex flex-col min-w-0">
                            {/* Original Price */}
                            {hasDiscount && (
                                <span className="text-[10px] sm:text-xs text-zinc-400 line-through decoration-zinc-300 truncate">
                                    Rp {Number(data?.price).toLocaleString('id-ID')}
                                </span>
                            )}
                            {/* Displayed Price */}
                            <span className="font-bold text-emerald-600 text-sm sm:text-lg tracking-tight truncate">
                                Rp {Number(data?.final_price ?? data?.price ?? 0).toLocaleString('id-ID')}
                            </span>
                        </div>

                        {/* Interactive Add Button */}
                        <button
                            onClick={() => window.location.href = `store/detail-product/${data?.business?.slug}/${data?.qrcode}`}
                            className="flex items-center justify-center gap-1 p-2 sm:px-3 sm:py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl sm:rounded-xl shadow-md shadow-emerald-500/20 active:scale-95 transition-all duration-200 group/btn shrink-0"
                            aria-label="Tambah ke keranjang"
                        >
                            <ShoppingBag className="w-4 h-4 group-hover/btn:animate-pulse" />
                            <span className="text-xs font-semibold hidden sm:inline">Tambah</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};