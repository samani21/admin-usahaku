"use client"
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Minus, Package, Plus, Sparkles, X, ShoppingBag, Fingerprint } from 'lucide-react';
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

const Fourteen = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const disableButton = useMemo(() => {
        if (!product) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);

    const mockItem = useMemo(() => {
        return {
            name: product?.name,
            price: product?.final_price,
            image: product?.image,
            category: product?.category,
            quantity: quantity
        }
    }, [product, quantity])

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

    const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
    const currentFinalPrice = selectedVariant?.final_price ?? product?.final_price ?? 0;
    const currentDiscount = currentPrice - currentFinalPrice;

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant, quantity])

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-4 md:p-8 
            ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>

            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 border-2
                            ${is_available
                                ? `cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2
                                   ${isDarkMode ? 'bg-[#121212] border-zinc-800 hover:border-zinc-600' : 'bg-white border-slate-200 hover:border-slate-400'}`
                                : `cursor-not-allowed 
                                   ${isDarkMode ? 'bg-[#0a0a0a] border-zinc-900 opacity-70 grayscale-[0.8]' : 'bg-slate-50 border-slate-200 opacity-70 grayscale-[0.8]'}`
                            }`}
                    >
                        {/* Image Section with Urban/Tech Overlay */}
                        <div className={`relative aspect-[4/5] sm:aspect-square overflow-hidden
                            ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>

                            <img
                                src={p.image}
                                className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] 
                                    ${is_available ? "group-hover:scale-110" : "opacity-40"}`}
                                alt={p.name}
                            />

                            {/* Tech-Scanline Overlay (Muncul saat hover) */}
                            {is_available && (
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            )}

                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500
                                ${isDarkMode ? 'from-[#121212] via-transparent to-transparent' : 'from-white/90 via-transparent to-transparent'}
                                ${is_available ? "opacity-90 group-hover:opacity-60" : "opacity-100"}`}
                            />

                            {/* Status Badge */}
                            {is_available ? (
                                label && (
                                    <div className="absolute top-5 left-5 bg-[#eab308] text-black text-[10px] font-black px-4 py-1.5 rounded-sm uppercase tracking-widest shadow-lg -skew-x-12 group-hover:skew-x-0 transition-transform duration-300">
                                        {label}
                                    </div>
                                )
                            ) : (
                                <div className="absolute top-5 left-5 bg-zinc-800 text-zinc-400 text-[10px] font-black px-4 py-1.5 rounded-sm uppercase tracking-widest border border-zinc-700 shadow-lg">
                                    Off Grid
                                </div>
                            )}

                            {/* Category HUD */}
                            <div className={`absolute bottom-5 left-5 right-5 flex justify-between items-end transition-transform duration-500
                                ${is_available ? "translate-y-2 group-hover:translate-y-0" : "translate-y-0 opacity-50"}`}>
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                                    <Fingerprint size={12} className="text-[var(--product-primary-color)]" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{p.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tactical Ticket Perforation Area */}
                        <div className="relative h-8 flex items-center px-4 overflow-hidden">
                            {/* Kutub Lingkaran Kiri & Kanan meminjam warna background utama halaman agar terlihat bolong */}
                            <div className={`absolute -left-4 w-8 h-8 rounded-full border-r-2 z-10 
                                ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-50 border-slate-200'}`} />
                            <div className={`absolute -right-4 w-8 h-8 rounded-full border-l-2 z-10 
                                ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-50 border-slate-200'}`} />

                            <div className={`w-full border-t-[3px] border-dashed 
                                ${is_available
                                    ? (isDarkMode ? "border-zinc-800" : "border-slate-300")
                                    : (isDarkMode ? "border-zinc-900" : "border-slate-200")}`}
                            />
                        </div>

                        {/* Content Section */}
                        <div className={`p-6 sm:p-8 pt-2 space-y-5 transition-opacity ${!is_available ? "opacity-50" : ""}`}>

                            <h3 className={`font-black text-xl leading-none uppercase italic tracking-tighter line-clamp-2 transition-colors duration-300
                                ${is_available && isDarkMode ? "group-hover:text-zinc-300" : is_available && !isDarkMode ? "group-hover:text-slate-600" : ""}`}>
                                {p.name}
                            </h3>

                            <div className="flex items-center justify-between gap-4 mt-auto">
                                <div className="flex flex-col">
                                    {label && is_available && (
                                        <span className={`text-[10px] line-through font-black tracking-widest uppercase mb-0.5
                                            ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                    <p className={`text-2xl font-black italic tracking-tighter leading-none 
                                        ${is_available ? "text-[var(--product-primary-color)]" : isDarkMode ? "text-zinc-600" : "text-slate-500"}`}>
                                        {formatIDR(finalPrice)}
                                    </p>
                                </div>

                                {/* Tactical Action Button */}
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg border
                                    ${is_available
                                        ? `${isDarkMode ? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900"} -skew-x-12 group-hover:skew-x-0 group-hover:scale-110`
                                        : `${isDarkMode ? "bg-zinc-900 text-zinc-600 border-zinc-800" : "bg-slate-200 text-slate-400 border-slate-300"} skew-x-0 shadow-none`}`}>
                                    {is_available ? <Plus size={20} strokeWidth={3} /> : <Minus size={20} strokeWidth={3} />}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal - Techwear / Cyber Layout (Scroll Fixed) */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className={`w-full flex flex-col lg:flex-row min-h-full font-sans
                    ${isDarkMode ? 'bg-[#0f0f11] text-zinc-100' : 'bg-slate-50 text-slate-900'}`}>

                    {/* Visual Lab Section (Sticky on Desktop) */}
                    <div className={`w-full lg:w-[45%] h-[45vh] sm:h-[55vh] lg:h-auto lg:min-h-[100dvh] lg:sticky lg:top-0 relative shrink-0 group border-b lg:border-b-0
                        ${isDarkMode ? "bg-[#18181b] lg:border-r border-zinc-800" : "bg-slate-200 lg:border-r border-slate-300"}`}>

                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className='absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000'
                            alt={product?.name}
                        />

                        {/* Tech Grid Background / Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

                        {/* Floating Tech Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-3">

                            {product?.discount_price && (
                                <div className="bg-[var(--product-primary-color)] text-white px-5 py-2 rounded-sm font-black text-xl italic skew-x-[-12deg] shadow-xl w-fit">
                                    -{Promo(product, selectedVariant)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Urban Control Panel (Scrollable Content) */}
                    <div className="w-full lg:w-[55%] flex flex-col z-10">
                        <div className="p-6 sm:p-10 lg:p-14 flex-grow space-y-10">

                            {/* Product Title HUD */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[var(--product-primary-color)]">
                                    <Fingerprint size={16} strokeWidth={2.5} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                                        {product?.category || 'SYS.OBJ'}
                                    </span>
                                </div>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic leading-[0.85] uppercase tracking-tighter">
                                    {product?.name}
                                </h2>
                            </div>

                            {/* Description Terminal */}
                            <div className={`border-l-4 pl-6 italic opacity-80
                                ${isDarkMode ? "border-zinc-800" : "border-slate-300"}`}>
                                <ExpandableHTML htmlContent={product?.description} className="text-sm leading-relaxed" />
                            </div>

                            {/* System Options & Interactions */}
                            <div className="space-y-8 pt-6">
                                {product?.variants && product?.variants?.length > 0 && (
                                    <div className="space-y-4">
                                        <p className={`text-[10px] font-black uppercase tracking-widest 
                                        ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Pilih Varian</p>
                                        <VariantPicker
                                            variants={product?.variants}
                                            selectedVariant={selectedVariant}
                                            setSelectedVariant={setSelectedVariant}
                                            isDarkMode={isDarkMode}
                                        />
                                    </div>
                                )}

                                {/* Price Matrix Box */}
                                <div className={`p-6 rounded-[2rem] border-2 space-y-6
                                    ${isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>

                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Price Matrix</p>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-4xl sm:text-5xl font-black tracking-tighter italic text-[var(--product-primary-color)]">
                                                {formatIDR(currentFinalPrice)}
                                            </span>
                                            {currentDiscount > 0 && (
                                                <span className="text-lg opacity-30 line-through font-bold italic">
                                                    {formatIDR(currentPrice)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {product?.is_qty && (
                                        <div className={`pt-6 border-t border-dashed flex flex-col sm:flex-row sm:items-center justify-between gap-4
                                            ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Output Quantity</span>
                                            <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Checkout Sector (Sticky Footer) */}
                        <div className={`p-6 sm:p-10 lg:p-14 pt-6 mt-auto border-t flex flex-col gap-6
                            ${isDarkMode ? "bg-[#0f0f11] border-white/10" : "bg-slate-50 border-slate-200"}`}>

                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Settlement Total</span>
                                <span className="text-3xl font-black italic tracking-tighter">
                                    {formatIDR(currentFinalPrice * quantity)}
                                </span>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`w-full py-6 rounded-xl font-black uppercase italic text-sm tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group border-2
                                    ${isDarkMode
                                        ? "bg-white text-black border-white hover:bg-[var(--product-primary-color)] hover:border-[var(--product-primary-color)] hover:text-white"
                                        : "bg-black text-white border-black hover:bg-[var(--product-primary-color)] hover:border-[var(--product-primary-color)]"}`}
                            >
                                <ShoppingBag size={18} />
                                Add to Registry
                                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </ModalWrapper>
        </div>
    );
};

export default Fourteen;