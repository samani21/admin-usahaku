"use client"
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Minus, Plus, Tag, Zap, ArrowUpRight, ShoppingBag, X } from 'lucide-react';
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

const Four = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
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
    }, [productAlert])

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
            // setActiveAlert(true); // Uncomment jika ingin toast muncul saat klik order
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
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
                        className={`group relative h-[420px] sm:h-[480px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-out 
                            ${isDarkMode ? "bg-slate-900 border border-slate-800" : "bg-slate-100 border border-slate-200"}
                            ${is_available
                                ? "cursor-pointer hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                                : "cursor-not-allowed shadow-none opacity-90"}`}
                    >
                        {/* Background Image with Slow Parallax */}
                        <img
                            src={p?.image}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out 
                                ${is_available
                                    ? "opacity-90 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110"
                                    : "opacity-30 grayscale"}`}
                            alt={p.name}
                        />

                        {/* Gradient Overlay (Memastikan text di atas gambar selalu terbaca) */}
                        <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-opacity duration-700
                            ${isDarkMode ? "from-slate-900/90 via-slate-900/20" : "from-slate-900/70 via-slate-900/10"} to-transparent`} />

                        {/* Top Info: Tag & Status Icon */}
                        <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                            {label && is_available ? (
                                <div className={`backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-lg
                                    ${isDarkMode ? "bg-white/10 border border-white/20 text-white" : "bg-black/30 border border-white/30 text-white"}`}>
                                    {label}
                                </div>
                            ) : !is_available ? (
                                <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-red-200">
                                    Stok Habis
                                </div>
                            ) : <div />}

                            <div className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-500 shadow-lg
                                ${is_available
                                    ? isDarkMode
                                        ? "bg-white/10 border border-white/20 text-white group-hover:bg-[var(--product-primary-color)] group-hover:border-transparent group-hover:rotate-45 group-hover:scale-110"
                                        : "bg-black/20 border border-white/30 text-white group-hover:bg-[var(--product-primary-color)] group-hover:border-transparent group-hover:rotate-45 group-hover:scale-110"
                                    : "bg-black/40 text-white/40 border border-white/10"}`}>
                                {is_available ? <ArrowUpRight size={20} strokeWidth={2.5} /> : <X size={20} />}
                            </div>
                        </div>

                        {/* Bottom Glass Panel */}
                        <div className={`absolute bottom-4 left-4 right-4 p-5 sm:p-6 backdrop-blur-xl border transition-all duration-700 ease-out rounded-[2rem] flex flex-col gap-4 z-10
                            ${is_available
                                ? isDarkMode
                                    ? "bg-slate-900/60 border-white/10 translate-y-2 group-hover:translate-y-0 shadow-2xl"
                                    : "bg-white/70 border-white/40 translate-y-2 group-hover:translate-y-0 shadow-xl"
                                : isDarkMode
                                    ? "bg-slate-900/40 border-white/5 translate-y-0"
                                    : "bg-white/40 border-white/20 translate-y-0"}`}>

                            <div className={!is_available ? "opacity-50" : ""}>
                                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-1 block
                                    ${is_available
                                        ? isDarkMode ? "text-[var(--product-primary-color)]" : "text-[var(--product-primary-color)]"
                                        : isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                                    {p.category}
                                </span>
                                <h3 className={`text-lg sm:text-xl font-black italic leading-tight uppercase tracking-tight line-clamp-1
                                    ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                    {p?.name}
                                </h3>
                            </div>

                            <div className={`flex items-center justify-between border-t pt-4 
                                ${isDarkMode ? "border-white/10" : "border-slate-900/10"}`}>

                                <div className={`flex flex-col ${!is_available ? "opacity-50" : ""}`}>
                                    {label && is_available && (
                                        <span className={`text-[11px] line-through font-bold leading-none mb-1
                                            ${isDarkMode ? "text-white/40" : "text-slate-500"}`}>
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                    <span className={`text-xl font-black leading-none tracking-tight 
                                        ${is_available
                                            ? isDarkMode ? "text-white" : "text-slate-900"
                                            : isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                                        {formatIDR(finalPrice)}
                                    </span>
                                </div>

                                <div className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                                    ${is_available
                                        ? isDarkMode
                                            ? "text-white/40 group-hover:text-[var(--product-primary-color)]"
                                            : "text-slate-500 group-hover:text-[var(--product-primary-color)]"
                                        : "text-red-500/50"}`}>
                                    {is_available ? "Lihat Detail" : "Sold Out"}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal Experience (Split Layout) */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => {
                    setProduct(null);
                    setSelectedVariant(null);
                    setQuantity(1);
                }}
                isDarkMode={isDarkMode}
            >
                <div className="flex flex-col md:flex-row h-full">
                    {/* Visual Section */}
                    <div className={`md:w-5/12 relative ${isDarkMode ? "bg-slate-900" : "bg-slate-100"} overflow-hidden shrink-0`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-64 md:h-full object-cover"
                            alt={product?.name}
                        />
                        {/* Floating Price Tag inside Image */}
                        <div className="absolute bottom-6 left-6 hidden md:block">
                            <div className={`backdrop-blur-xl border p-5 rounded-[2rem] shadow-2xl
                                ${isDarkMode ? "bg-black/50 border-white/10 text-white" : "bg-white/60 border-white/40 text-slate-900"}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 
                                    ${isDarkMode ? "opacity-60" : "text-slate-500"}`}>Unit Price</p>
                                <p className="text-2xl font-black italic tracking-tight">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className={`md:w-7/12 p-8 sm:p-12 flex flex-col h-full overflow-y-auto no-scrollbar
                        ${isDarkMode ? "bg-[#0F172A]" : "bg-white"}`}>

                        <div className="mb-8 flex-shrink-0">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={16} className="text-[var(--product-primary-color)] fill-current" />
                                <span className={`text-[10px] font-black uppercase tracking-[0.4em] 
                                    ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{product?.category}</span>
                            </div>
                            <h2 className={`text-4xl sm:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9] 
                                ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                {product?.name}
                            </h2>
                            <div className="h-1.5 w-16 rounded-full bg-[var(--product-primary-color)] mb-6" />
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`text-sm font-medium leading-relaxed
                                    ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                            />
                        </div>

                        <div className="space-y-8 flex-grow">
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

                            {product && product.is_qty ? (
                                <div className="space-y-4">
                                    <p className={`text-[10px] font-black uppercase tracking-widest 
                                        ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Kuantitas</p>
                                    <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                </div>
                            ) : null}
                        </div>

                        {/* Sticky Bottom Summary */}
                        <div className={`mt-8 pt-8 border-t flex flex-col gap-6 flex-shrink-0
                            ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 
                                        ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Grand Total</p>
                                    <p className="text-3xl sm:text-4xl font-black italic tracking-tighter text-[var(--product-primary-color)]">
                                        {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                    </p>
                                </div>
                                {product?.discount_price ? (
                                    <div className="text-right pb-1">
                                        <p className="text-xs font-bold text-rose-500 uppercase tracking-tighter italic bg-rose-500/10 px-2 py-0.5 rounded mb-1">
                                            Hemat {Promo(product, selectedVariant)}
                                        </p>
                                        <p className={`text-sm font-bold line-through 
                                            ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
                                            {formatIDR((selectedVariant?.price ?? product?.price ?? 0) * quantity)}
                                        </p>
                                    </div>
                                ) : null}
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`group relative w-full py-5 overflow-hidden rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                                    ${isDarkMode
                                        ? "bg-white text-slate-900 hover:bg-[var(--product-primary-color)] hover:text-white"
                                        : "bg-slate-900 text-white hover:bg-[var(--product-primary-color)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)]"}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Konfirmasi Pesanan <Check size={18} strokeWidth={3} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    )
}

export default Four;