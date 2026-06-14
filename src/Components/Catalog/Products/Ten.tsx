"use client"
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, ShoppingBag, Zap, X, MoveUpRight, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
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
    selectedOutlet?: OutletsType | null
}

const Ten = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product || !selectedOutlet) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant, selectedOutlet]);

    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);

    useEffect(() => {
        document.body.style.overflow = product ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [product]);

    const addCart = () => {
        if (selectedOutlet) {
            if (handleCart) handleCart(product, selectedVariant, quantity);
            setProduct(null);
            setSelectedVariant(null);
            setQuantity(1);
            setActiveAlert(true);
        }
    };

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant, quantity])

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 p-4 md:p-8 max-w-7xl auto-rows-[200px] md:auto-rows-[240px]'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                // Pola Bento Box: Kartu pertama dari setiap kelipatan 5 akan membesar
                const isLarge = i % 5 === 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group relative rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end
                            ${isLarge ? "col-span-2 row-span-2" : "col-span-2 row-span-1"}
                            ${is_available
                                ? `cursor-pointer ${isDarkMode ? "bg-zinc-900 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1" : "bg-white shadow-xl shadow-slate-200/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1"}`
                                : `cursor-not-allowed ${isDarkMode ? "bg-black opacity-60 grayscale-[0.5]" : "bg-zinc-200 opacity-80 grayscale-[0.5]"}`
                            }`}
                    >
                        {/* Background Image (Absolute Full Bleed) */}
                        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                            <img
                                src={p?.image}
                                className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out 
                                    ${is_available ? "group-hover:scale-110" : ""}`}
                                alt={p.name}
                            />
                        </div>

                        {/* Smart Gradient Overlay for Readability */}
                        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500
                            ${is_available
                                ? (isDarkMode ? "from-black/90 via-black/20 to-transparent" : "from-black/80 via-black/10 to-transparent")
                                : "from-black/95 via-black/50 to-black/20"} 
                            ${is_available ? "opacity-80 group-hover:opacity-100" : "opacity-100"}`}
                        />

                        {/* Top Layer - Badges & Icons */}
                        <div className="absolute top-0 left-0 right-0 p-5 md:p-6 flex justify-between items-start z-10">
                            {label && is_available ? (
                                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] md:text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    {label}
                                </span>
                            ) : !is_available ? (
                                <span className="bg-red-500/80 backdrop-blur-md text-white text-[9px] md:text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    Sold Out
                                </span>
                            ) : <div />}

                            <div className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-500 shadow-lg
                                ${is_available
                                    ? "bg-white/10 border-white/20 text-white opacity-0 group-hover:opacity-100 group-hover:bg-[var(--product-primary-color)] group-hover:border-transparent group-hover:rotate-45"
                                    : "bg-black/60 border-white/10 text-white/50 opacity-100"}`}>
                                {is_available ? <MoveUpRight size={18} strokeWidth={2.5} /> : <Lock size={16} />}
                            </div>
                        </div>

                        {/* Bottom Layer - Content */}
                        <div className="relative z-10 p-5 md:p-6 text-white w-full">
                            <div className={`flex flex-col ${isLarge ? "gap-2" : "gap-1"}`}>
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">
                                    {p.category}
                                </p>

                                <h3 className={`font-black italic uppercase leading-none tracking-tighter drop-shadow-md line-clamp-2
                                    ${isLarge ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>
                                    {p.name}
                                </h3>

                                <div className={`flex items-baseline gap-3 mt-1 ${isLarge ? "mt-3" : ""}`}>
                                    <p className={`font-black drop-shadow-md tracking-tighter
                                        ${isLarge ? "text-2xl md:text-3xl" : "text-xl"} 
                                        ${is_available ? "text-[var(--product-primary-color)]" : "text-zinc-400 line-through"}`}>
                                        {formatIDR(finalPrice)}
                                    </p>

                                    {isLarge && label && is_available && (
                                        <span className="text-sm line-through opacity-50 font-bold tracking-tight">
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Subtle Inner Border for Bento aesthetic */}
                        <div className={`absolute inset-0 rounded-[2rem] border pointer-events-none 
                            ${isDarkMode ? 'border-white/10' : 'border-white/20'}`} />

                        {/* Empty Watermark for Large Sold Out items */}
                        {!is_available && isLarge && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none z-0">
                                <p className="text-white/10 font-black text-6xl md:text-8xl border-4 border-white/5 px-8 py-2 uppercase tracking-tighter rounded-3xl">
                                    Empty
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Modal - Modern Reversed Flow (Scroll Fixed) */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => {
                    setProduct(null);
                    setSelectedVariant(null);
                    setQuantity(1);
                }}
                isDarkMode={isDarkMode}
            >
                {/* Native Scroll Wrapper: Image Right (Desktop), Image Top (Mobile) */}
                <div className={`w-full flex flex-col md:flex-row-reverse min-h-full 
                    ${isDarkMode ? 'bg-[#0a0a0c] text-white' : 'bg-white text-slate-900'}`}>

                    {/* Visual Section - Sticky on Desktop, naturally on top for Mobile */}
                    <div className={`w-full md:w-[45%] h-[40vh] md:h-auto md:min-h-[100dvh] md:sticky md:top-0 shrink-0 relative overflow-hidden
                        ${isDarkMode ? "bg-zinc-900" : "bg-slate-100"}`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={product?.name}
                        />
                        {/* Minimal Overlay Gradient inside Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                    </div>

                    {/* Content Section - Flows natively, scrollable on Desktop */}
                    <div className={`w-full md:w-[55%] flex flex-col z-10 ${isDarkMode ? "md:border-r border-white/5" : "md:border-r border-slate-200"}`}>

                        <div className="p-6 md:p-10 lg:p-14 flex-grow space-y-8">
                            {/* Product Header */}
                            <div className="space-y-5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest
                                        ${isDarkMode ? "bg-white/10 text-white" : "bg-slate-900 text-white"}`}>
                                        {product?.category}
                                    </span>
                                    {product?.discount_price && (
                                        <span className="px-4 py-1.5 rounded-full bg-[var(--product-primary-color)] text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[var(--product-primary-color)]/20">
                                            HEMAT {Promo(product, selectedVariant)}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] italic uppercase">
                                    {product?.name}
                                </h2>
                            </div>

                            {/* Description Box */}
                            <div className={`text-sm leading-relaxed font-medium 
                                ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                <ExpandableHTML htmlContent={product?.description} />
                            </div>

                            {/* Quick Stats (Bento Style Info) */}
                            <div className={`grid grid-cols-2 gap-4 border-y py-8 
                                ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>
                                <div className={`p-5 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-1
                                        ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Harga per Item</span>
                                    <div className="text-2xl font-black tracking-tighter">
                                        {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                                    </div>
                                    {product?.discount_price && (
                                        <div className={`text-sm line-through font-bold mt-1 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {formatIDR(selectedVariant?.price ?? product?.price ?? 0)}
                                        </div>
                                    )}
                                </div>
                                <div className={`p-5 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-1
                                        ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Ketersediaan</span>
                                    <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
                                        <Check size={20} className="text-emerald-500" strokeWidth={3} />
                                        {selectedVariant?.product_variant_stock ?? product?.stock} <span className="text-sm font-bold opacity-50">Unit</span>
                                    </div>
                                </div>
                            </div>

                            {/* Selectors Area */}
                            <div className="space-y-8">
                                {product?.variants && product?.variants?.length > 0 && (
                                    <div className="space-y-4">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Varian Pilihan</p>
                                        <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                    </div>
                                )}

                                {product && product?.is_qty && (
                                    <div className="space-y-4">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Kuantitas</p>
                                        <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className={`p-6 md:p-10 lg:p-14 pt-6 mt-auto border-t flex flex-col gap-6
                            ${isDarkMode ? "border-white/10 bg-[#0a0a0c]" : "border-slate-200 bg-white"}`}>

                            <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                    Total Harga
                                </span>
                                <span className="text-3xl sm:text-4xl font-black tracking-tighter italic text-[var(--product-primary-color)]">
                                    {formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}
                                </span>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={() => addCart()}
                                className={`w-full py-5 md:py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs sm:text-sm shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                                    ${isDarkMode
                                        ? "bg-white text-black hover:bg-[var(--product-primary-color)] hover:text-white"
                                        : "bg-slate-900 text-white hover:bg-[var(--product-primary-color)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"}`}>
                                <ShieldCheck size={20} strokeWidth={2.5} /> Confirm Order
                            </button>
                        </div>
                    </div>

                </div>
            </ModalWrapper>
        </div>
    );
}

export default Ten;