'use client'
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Plus, ShoppingBag, Zap, X, ArrowRight, Lock } from 'lucide-react';
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

const Nine = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const disableButton = useMemo(() => {
        if (!product) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);

    useEffect(() => {
        document.body.style.overflow = product ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
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
    }, [selectedVariant, quantity])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group relative flex h-44 sm:h-56 md:h-64 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-300 border-[3px] 
                            ${is_available
                                ? `cursor-pointer ${isDarkMode
                                    ? 'bg-[#121214] border-zinc-800 hover:border-[var(--product-primary-color)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:-translate-y-1'
                                    : 'bg-white border-slate-200 hover:border-[var(--product-primary-color)] shadow-md hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1'}`
                                : `cursor-not-allowed ${isDarkMode ? 'bg-[#0a0a0c] border-zinc-900 opacity-70' : 'bg-slate-50 border-slate-200 opacity-70'}`
                            }`}
                    >
                        {/* Image Side */}
                        <div className={`w-[40%] sm:w-[45%] h-full relative overflow-hidden shrink-0 
                            ${isDarkMode ? "bg-zinc-900 border-r-2 border-zinc-800" : "bg-slate-100 border-r-2 border-slate-200"}
                            ${is_available && isDarkMode ? "group-hover:border-[var(--product-primary-color)]" : is_available && !isDarkMode ? "group-hover:border-[var(--product-primary-color)]" : ""}`}>

                            <img
                                src={p.image}
                                className={`w-full h-full object-cover transition-transform duration-700 ease-out
                                    ${is_available ? "group-hover:scale-110" : "grayscale opacity-60"}`}
                                alt={p.name}
                            />

                            {/* Promo Label */}
                            {label && is_available && (
                                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-[var(--product-primary-color)] text-white text-[9px] sm:text-[10px] font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg uppercase italic tracking-widest z-10">
                                    {label}
                                </div>
                            )}

                            {/* Sold Out Overlay for Image */}
                            {!is_available && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-10">
                                    <span className="text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] border-y-2 border-white/50 py-1 -rotate-12 bg-black/50 px-4">Sold Out</span>
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                            <div className={!is_available ? "opacity-50" : ""}>
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <span className={`h-1.5 rounded-full transition-all duration-300
                                        ${is_available ? "w-4 bg-[var(--product-primary-color)] group-hover:w-8" : "w-3 bg-zinc-400"}`}></span>
                                    <span className={`text-[9px] sm:text-[11px] font-black uppercase tracking-[0.25em] 
                                        ${isDarkMode ? "text-zinc-500" : "text-slate-400"}`}>
                                        {p.category}
                                    </span>
                                </div>
                                <h3 className={`font-black text-base sm:text-xl md:text-2xl uppercase italic leading-[1.1] line-clamp-2 tracking-tighter
                                    ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {p.name}
                                </h3>
                            </div>

                            <div className="flex items-end justify-between mt-4">
                                <div className={`flex flex-col ${!is_available ? "opacity-50" : ""}`}>
                                    {label && is_available && (
                                        <span className={`text-[10px] sm:text-xs line-through font-bold mb-0.5
                                            ${isDarkMode ? "text-zinc-500" : "text-slate-400"}`}>
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                    <p className={`font-black text-xl sm:text-2xl md:text-3xl italic leading-none tracking-tighter
                                        ${is_available ? "text-[var(--product-primary-color)]" : isDarkMode ? "text-zinc-600 line-through" : "text-slate-400 line-through"}`}>
                                        {formatIDR(finalPrice)}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-2
                                    ${!is_available
                                        ? isDarkMode ? 'bg-zinc-800 text-zinc-500 border-zinc-700' : 'bg-slate-100 text-slate-400 border-slate-200'
                                        : isDarkMode
                                            ? 'bg-transparent border-zinc-700 text-white group-hover:bg-[var(--product-primary-color)] group-hover:border-[var(--product-primary-color)] group-hover:rotate-12'
                                            : 'bg-transparent border-slate-200 text-slate-900 group-hover:bg-[var(--product-primary-color)] group-hover:text-white group-hover:border-[var(--product-primary-color)] group-hover:rotate-12'
                                    }`}>
                                    {is_available ? <Plus size={20} strokeWidth={3} /> : <Lock size={18} />}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal - Hypebeast Split Layout (Scroll Fixed) */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                {/* Scroll Wrapper diperbaiki: Tanpa overflow-hidden di mobile, agar flow natural */}
                <div className={`w-full flex flex-col lg:flex-row min-h-full shadow-2xl relative
                    ${isDarkMode ? 'bg-[#0f0f11] text-white' : 'bg-white text-slate-900'}`}>

                    {/* Visual Frame Section (Sticky on Desktop) */}
                    <div className="w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 h-[45vh] sm:h-[55vh] lg:h-auto lg:min-h-[85vh] lg:sticky lg:top-0 shrink-0 flex items-center justify-center relative">
                        {/* Background Atmospheric Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--product-primary-color)]/20 blur-[100px] pointer-events-none rounded-full" />

                        <div className={`relative w-full h-full max-w-lg aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border-[8px] lg:border-[12px] z-10 shadow-2xl
                            ${isDarkMode ? 'border-zinc-900 bg-black/40' : 'border-slate-100 bg-white'}`}>
                            <img
                                src={selectedVariant?.image ?? product?.image}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                alt={product?.name}
                            />
                            {product?.discount_price ? (
                                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[var(--product-primary-color)] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black italic shadow-2xl animate-bounce">
                                    OFF {Promo(product, selectedVariant)}
                                </div>
                            ) : ''}
                        </div>
                    </div>

                    {/* Order Details Section (Scrollable Area) */}
                    <div className={`w-full lg:w-1/2 flex flex-col z-10 ${isDarkMode ? "lg:border-l border-white/5" : "lg:border-l border-slate-200"}`}>
                        <div className="p-6 sm:p-8 lg:p-14 flex-grow space-y-8">

                            {/* Header Info */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] opacity-40 italic">
                                        {product?.category}
                                    </span>
                                    {product?.stock ? (
                                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase italic border
                                            ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                            {product?.stock} In Stock
                                        </span>
                                    ) : ''}
                                </div>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter leading-[0.9] uppercase">
                                    {product?.name}
                                </h2>
                                <div className="h-1.5 w-20 bg-[var(--product-primary-color)] rounded-full mt-2" />
                            </div>

                            {/* Description */}
                            <div className={`text-sm sm:text-base leading-relaxed font-medium 
                                ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                <ExpandableHTML htmlContent={product?.description} />
                            </div>

                            {/* Interactive Options */}
                            <div className={`space-y-8 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                                {product?.variants && product?.variants.length > 0 ? (
                                    <div className="space-y-4">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                                            Pilih Varian
                                        </p>
                                        <VariantPicker
                                            variants={product.variants}
                                            selectedVariant={selectedVariant}
                                            setSelectedVariant={setSelectedVariant}
                                            isDarkMode={isDarkMode}
                                        />
                                    </div>
                                ) : ''}

                                {product?.is_qty ? (
                                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-[2rem] border-2
                                        ${isDarkMode ? 'bg-zinc-900/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                        <div className="space-y-1">
                                            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Jumlah</p>
                                            <p className="text-xs font-bold opacity-60">Tentukan kuantitas</p>
                                        </div>
                                        <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    </div>
                                ) : ''}
                            </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className={`p-6 sm:p-8 lg:p-14 pt-6 mt-auto border-t flex flex-col gap-6
                            ${isDarkMode ? "border-white/10 bg-[#0f0f11]" : "border-slate-200 bg-white"}`}>

                            <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                                    Grand Total
                                </span>
                                <span className="text-3xl sm:text-4xl font-black italic tracking-tighter text-[var(--product-primary-color)] drop-shadow-sm">
                                    {formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}
                                </span>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className="w-full py-5 sm:py-6 bg-[var(--product-primary-color)] text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] shadow-[0_15px_30px_-10px_var(--product-primary-color)] text-xs sm:text-sm hover:bg-opacity-90 hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <Zap size={20} fill="white" /> Amankan Slot Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};

export default Nine;