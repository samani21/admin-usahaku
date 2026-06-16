"use client"
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, CircleCheckBig, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails, Promo } from './PromoType';
import { OutletsType } from '@/types/Admin/OutletType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;

}

const Three = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const disableButton = useMemo(() => {
        if (!product) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);


    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);

    const addCart = () => {
        if (handleCart) handleCart(product, selectedVariant, quantity);
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1);
    };

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant, quantity]);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group flex flex-col items-center justify-start transition-all duration-500 ease-out 
                            ${is_available ? "cursor-pointer" : "cursor-not-allowed opacity-75"}`}
                    >
                        {/* 1. Image Container (Orbital Style) */}
                        <div className={`relative w-40 h-40 sm:w-56 sm:h-56 rounded-full transition-all duration-700 ease-out border-[8px] sm:border-[10px] flex items-center justify-center overflow-hidden z-10
                            ${is_available
                                ? "group-hover:-translate-y-3 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] group-hover:shadow-[0_25px_45px_-12px_rgba(0,0,0,0.2)]"
                                : "grayscale shadow-none"} 
                            ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-white bg-slate-50"}`}
                        >
                            <img
                                src={p?.image}
                                className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out 
                                    ${is_available ? "scale-100 group-hover:scale-110" : "scale-100"}`}
                                alt={p.name}
                            />

                            {/* Badge Diskon */}
                            {label && is_available && (
                                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[var(--product-primary-color)] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase italic shadow-lg border-2 border-white/20 z-20">
                                    {label}
                                </div>
                            )}

                            {/* Sold Out Overlay */}
                            {!is_available && (
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                                    <span className={`text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl border-2 rotate-[-12deg]
                                        ${isDarkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-900 border-slate-200"}`}>
                                        Habis
                                    </span>
                                </div>
                            )}

                            {/* Gradient Overlay for Hover */}
                            <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none 
                                ${is_available ? "bg-black/10 opacity-0 group-hover:opacity-100" : ""}`}
                            />
                        </div>

                        {/* 2. Content Area */}
                        <div className={`mt-6 flex flex-col items-center text-center space-y-2 w-full px-2 transition-opacity duration-500 
                            ${!is_available ? "opacity-50" : ""}`}>

                            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                {p.category}
                            </span>

                            <h3 className={`font-black text-sm sm:text-base uppercase italic leading-tight h-10 sm:h-12 line-clamp-2 transition-colors duration-300
                                ${is_available
                                    ? isDarkMode ? "text-slate-200 group-hover:text-white" : "text-slate-800 group-hover:text-[var(--product-primary-color)]"
                                    : isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
                                {p.name}
                            </h3>

                            <div className="flex flex-col items-center w-full mt-2">
                                <div className='h-4 mb-0.5'>
                                    {label && is_available && (
                                        <span className={`text-[11px] line-through font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                </div>

                                {/* Price Button / Sold Out Indicator */}
                                <div className={`px-5 py-2.5 rounded-full font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center w-full max-w-[160px]
                                    ${is_available
                                        ? isDarkMode
                                            ? "bg-[var(--product-primary-color)] text-white shadow-lg shadow-[var(--product-primary-color)]/20 group-hover:bg-white group-hover:text-slate-900"
                                            : "bg-[var(--product-primary-color)] text-white shadow-lg shadow-[var(--product-primary-color)]/20 group-hover:bg-slate-900"
                                        : isDarkMode
                                            ? "bg-slate-800 text-slate-500 border border-slate-700"
                                            : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                                    {is_available ? formatIDR(finalPrice) : "STOK KOSONG"}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* 3. Modal Experience */}
            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}
            >
                <div className='flex flex-col md:flex-row h-full overflow-y-auto no-scrollbar'>

                    {/* Visual / Left Side */}
                    <div className={`md:w-5/12 p-8 sm:p-12 flex flex-col items-center justify-start ${isDarkMode ? "bg-slate-800/50" : "bg-slate-50"}`}>
                        <div className="relative w-full max-w-[320px] aspect-square">
                            <img
                                src={selectedVariant?.image ?? product?.image}
                                className={`w-full h-full rounded-full object-cover shadow-2xl border-[12px] transition-all duration-500 
                                    ${isDarkMode ? "border-slate-800 shadow-black/40" : "border-white shadow-slate-300/50"}`}
                                alt={product?.name}
                            />
                        </div>

                        {/* Service List */}
                        {product?.service && product?.service?.length > 0 ? (
                            <div className="mt-10 w-full space-y-4 px-4">
                                {product.service.map((s, i) => (
                                    <div key={i} className={`flex items-start gap-3 text-sm font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                        <CircleCheckBig size={20} className="shrink-0 text-[var(--product-primary-color)] mt-0.5" />
                                        <span>{s?.title}</span>
                                    </div>
                                ))}
                            </div>
                        ) : ''}
                    </div>

                    {/* Content / Right Side */}
                    <div className="md:w-7/12 p-8 sm:p-12 flex flex-col h-full">
                        <div className="space-y-6 flex-grow">

                            {/* Header & Promo Info */}
                            <div className="space-y-4">
                                <div className='flex items-center justify-end w-full min-h-[32px]'>
                                    {product?.discount_price ? (
                                        <div className="bg-rose-500 flex items-center gap-2 text-[11px] text-white px-4 py-1.5 rounded-full font-black italic shadow-md">
                                            <Tag size={12} strokeWidth={2.5} />
                                            -{Promo(product, selectedVariant)}
                                        </div>
                                    ) : ''}
                                </div>

                                <div>
                                    <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none mb-2 
                                        ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                        {product?.name}
                                    </h2>
                                    <p className="text-[var(--product-primary-color)] font-bold text-sm tracking-wide">
                                        {product?.is_service ? 'Layanan Jasa Tersedia' : product?.category}
                                    </p>
                                </div>

                                {/* Price Section */}
                                <div className='flex items-end gap-3 pt-2'>
                                    <p className={`text-4xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                        {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                                    </p>
                                    {product?.discount_price ? (
                                        <p className={`text-lg font-bold line-through mb-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            {formatIDR(selectedVariant?.price ?? product?.price ?? 0)}
                                        </p>
                                    ) : ''}
                                </div>
                            </div>

                            <hr className={`border-dashed ${isDarkMode ? "border-slate-700" : "border-slate-200"}`} />

                            {/* Description */}
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                            />

                            {/* Selections */}
                            <div className="space-y-8 pt-4">
                                {product?.variants && product?.variants?.length > 0 ? (
                                    <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                ) : ''}

                                {product?.is_qty && (
                                    <div className="pt-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 block ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            Atur Jumlah
                                        </span>
                                        <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Sticky Action */}
                        <div className={`mt-8 pt-6 border-t ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex flex-col w-full sm:w-auto">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                        Total Harga
                                    </span>
                                    <span className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                        {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                    </span>
                                </div>

                                <button
                                    disabled={disableButton}
                                    onClick={addCart}
                                    className={`flex-1 w-full py-4 px-6 rounded-[1.2rem] font-black uppercase tracking-[0.1em] text-sm flex items-center justify-center gap-3 transition-all duration-300
                                        ${isDarkMode
                                            ? "bg-[var(--product-primary-color)] text-white hover:bg-white hover:text-slate-900"
                                            : "bg-[var(--product-primary-color)] text-white hover:bg-slate-900 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                                        } disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none`}
                                >
                                    <ShoppingBag size={18} strokeWidth={2.5} /> Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    )
}

export default Three;