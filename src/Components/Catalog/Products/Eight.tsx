"use client"
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ShoppingBag, Tag, X, ArrowUpRight, CheckCircle2, Info } from 'lucide-react';
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

const Eight = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product || !selectedOutlet) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant, selectedOutlet]);

    const mockItem = useMemo(() => {
        return {
            name: productAlert?.name,
            price: productAlert?.final_price,
            image: productAlert?.image,
        }
    }, [productAlert]);

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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-4 md:p-8'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => {
                            if (is_available) {
                                setProduct(p);
                                setProductAlert(p);
                            }
                        }}
                        className={`group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 ease-out border shadow-sm
                            ${is_available
                                ? "cursor-pointer hover:-translate-y-2 " + (isDarkMode
                                    ? 'bg-[#0f0f11] border-white/10 hover:border-[var(--product-primary-color)]/60 hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.05)]'
                                    : 'bg-white border-slate-200 hover:border-[var(--product-primary-color)]/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]')
                                : "cursor-not-allowed opacity-80 " + (isDarkMode ? 'bg-[#0a0a0c] border-white/5' : 'bg-slate-50 border-slate-200')
                            }`}
                    >
                        {/* Image Canvas */}
                        <div className={`relative aspect-[4/5] overflow-hidden ${isDarkMode ? "bg-[#18181b]" : "bg-slate-100"}`}>
                            <img
                                src={p?.image}
                                className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]
                                    ${is_available ? "group-hover:scale-110" : "grayscale opacity-50"}`}
                                alt={p?.name}
                            />

                            {/* Floating Action Header */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                {label && is_available ? (
                                    <div className="bg-[var(--product-primary-color)] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest italic border border-white/20 backdrop-blur-md">
                                        {label}
                                    </div>
                                ) : !is_available ? (
                                    <div className="bg-slate-900/80 backdrop-blur-md text-white/70 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/10">
                                        Sold Out
                                    </div>
                                ) : <div />}

                                {is_available && (
                                    <div className={`h-10 w-10 backdrop-blur-md rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg
                                        ${isDarkMode
                                            ? 'bg-white/10 border-white/20 text-white group-hover:bg-[var(--product-primary-color)] group-hover:border-transparent'
                                            : 'bg-black/10 border-white/40 text-slate-900 group-hover:bg-[var(--product-primary-color)] group-hover:text-white group-hover:border-transparent'}`}>
                                        <ArrowUpRight size={18} strokeWidth={2.5} />
                                    </div>
                                )}
                            </div>

                            {/* Gradient Overlay for Text Readability */}
                            <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t pointer-events-none
                                ${isDarkMode ? 'from-black/90 via-black/20 to-transparent' : 'from-slate-900/80 via-transparent to-transparent'}
                                ${is_available ? "opacity-70 group-hover:opacity-90" : "opacity-90"}`}
                            />

                            {/* Centered Sold Out Text */}
                            {!is_available && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <span className="text-white font-black text-3xl tracking-tighter uppercase -rotate-6 select-none bg-black/40 px-6 py-2 backdrop-blur-sm border-y border-white/10">
                                        Habis
                                    </span>
                                </div>
                            )}

                            {/* Info overlaid on image */}
                            <div className={`absolute bottom-0 left-0 right-0 p-6 flex flex-col transition-transform duration-500 transform
                                ${is_available ? 'translate-y-2 group-hover:translate-y-0' : 'translate-y-0'}`}>

                                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5
                                    ${is_available ? "text-[var(--product-primary-color)]" : "text-slate-400"}`}>
                                    {p.category}
                                </span>

                                <h3 className="text-xl md:text-2xl font-black leading-tight line-clamp-2 tracking-tighter italic text-white mb-3 shadow-black/50 drop-shadow-md">
                                    {p.name}
                                </h3>

                                <div className="flex items-end justify-between border-t border-white/20 pt-4">
                                    <div className="flex flex-col">
                                        {label && is_available && (
                                            <span className="text-[11px] line-through opacity-60 font-medium text-white mb-0.5">
                                                {formatIDR(p.price)}
                                            </span>
                                        )}
                                        <span className={`text-2xl font-black tracking-tighter 
                                            ${is_available ? "text-white" : "text-slate-400 line-through"}`}>
                                            {formatIDR(finalPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal - Tech Minimalist Split Layout (Scroll Fixed) */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className={`w-full flex flex-col lg:flex-row min-h-full overflow-hidden shadow-2xl 
                    ${isDarkMode ? 'bg-[#0f0f11] text-white' : 'bg-white text-slate-900'}`}>

                    {/* Media Section (Sticky on Desktop) */}
                    <div className={`w-full lg:w-[50%] h-[40vh] md:h-[50vh] lg:h-auto lg:min-h-[85vh] lg:sticky lg:top-0 relative shrink-0 flex items-center justify-center p-6 md:p-12
                        ${isDarkMode ? "bg-[#18181b]" : "bg-slate-50"}`}>

                        {/* High-Tech Background Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}>
                        </div>

                        <img
                            src={selectedVariant?.image || product?.image}
                            className="w-full h-full max-h-[600px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative z-10 transition-transform duration-500 hover:scale-105"
                            alt={product?.name}
                        />
                    </div>

                    {/* Logic & Detail Section (Scrollable Area) */}
                    <div className={`w-full lg:w-[50%] flex flex-col z-10 ${isDarkMode ? "lg:border-l border-white/5" : "lg:border-l border-slate-200"}`}>
                        <div className="p-6 md:p-10 lg:p-14 flex-grow space-y-8">

                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="h-1.5 w-8 bg-[var(--product-primary-color)] rounded-full"></span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {product?.category}
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter leading-[0.9] uppercase">
                                    {product?.name}
                                </h2>
                            </div>

                            {/* Price Block */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl md:text-5xl font-black text-[var(--product-primary-color)] tracking-tighter">
                                        {formatIDR(selectedVariant?.final_price || product?.final_price || 0)}
                                    </span>
                                    {product?.discount_price && (
                                        <span className={`text-xl line-through font-bold italic ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {formatIDR(selectedVariant?.price || product?.price || 0)}
                                        </span>
                                    )}
                                </div>
                                {product?.discount_price && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mt-2 rounded-lg bg-emerald-500/10 text-emerald-500 font-black text-[10px] uppercase tracking-widest border border-emerald-500/20 w-fit">
                                        <Tag size={12} strokeWidth={3} /> HEMAT {formatIDR(product?.discount_price)} {product?.percent_discount && `(${Promo(product, selectedVariant)})`}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className={`text-sm leading-relaxed font-medium py-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ExpandableHTML htmlContent={product?.description} />
                            </div>

                            {/* Interactive Selectors */}
                            <div className={`pt-6 space-y-8 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                                {product?.variants && product?.variants?.length > 0 && (
                                    <div className="space-y-4">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                            Spesifikasi Pilihan
                                        </p>
                                        <VariantPicker
                                            variants={product.variants}
                                            selectedVariant={selectedVariant}
                                            setSelectedVariant={setSelectedVariant}
                                            isDarkMode={isDarkMode}
                                        />
                                    </div>
                                )}

                                {product?.is_qty && (
                                    <div className="space-y-4">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                            Kuantitas Pesanan
                                        </p>
                                        <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className={`p-6 md:p-10 lg:p-14 pt-6 mt-auto border-t flex flex-col gap-6
                            ${isDarkMode ? "border-white/10 bg-[#0f0f11]" : "border-slate-200 bg-white"}`}>

                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                    Total Estimasi
                                </span>
                                <span className="text-3xl font-black tracking-tighter italic">
                                    {formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}
                                </span>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] italic flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                                    ${isDarkMode
                                        ? 'bg-white text-black hover:bg-[var(--product-primary-color)] hover:text-white'
                                        : 'bg-slate-900 text-white hover:bg-[var(--product-primary-color)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]'}`}
                            >
                                <ShoppingBag size={18} strokeWidth={2.5} /> Amankan Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};

export default Eight;