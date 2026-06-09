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
    }, [product, selectedVariant]);


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
            //setActiveAlert(true);
            if (handleCart) handleCart(product, selectedVariant, quantity);
            setProduct(null);
            setSelectedVariant(null);
            setQuantity(1);
        }
    };

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant])

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
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
                        className={`group relative h-[450px] rounded-[3rem] overflow-hidden transition-all duration-500 bg-zinc-900 shadow-2xl 
                ${is_available
                                ? "cursor-pointer hover:shadow-[var(--product-primary-color)]/20 shadow-xl"
                                : "cursor-not-allowed shadow-none"}`}
                    >
                        {/* Background Image with Parallax & Availability Filter */}
                        <img
                            src={p?.image}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 
                    ${is_available
                                    ? "opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                    : "opacity-20 grayscale"}`}
                            alt={p.name}
                        />

                        {/* Top Info: Tag & Status Icon */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                            {label && is_available ? (
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-white italic">
                                    {label}
                                </div>
                            ) : !is_available ? (
                                <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-red-400">
                                    Out of Stock
                                </div>
                            ) : <div />}

                            <div className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300
                    ${is_available
                                    ? "bg-white/10 group-hover:bg-[var(--product-primary-color)] group-hover:border-transparent"
                                    : "bg-black/40 text-white/20 border-white/5"}`}>
                                {is_available ? <ArrowUpRight size={20} /> : <X size={20} />}
                            </div>
                        </div>

                        {/* Bottom Glass Panel */}
                        <div className={`absolute bottom-4 left-4 right-4 p-6 backdrop-blur-2xl border transition-all duration-500 rounded-[2.5rem] flex flex-col gap-4
                ${is_available
                                ? "bg-white/10 border-white/20 translate-y-2 group-hover:translate-y-0"
                                : "bg-black/40 border-white/5 translate-y-0"}`}>

                            <div className={!is_available ? "opacity-40" : ""}>
                                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-1 block
                        ${is_available ? "text-[var(--product-primary-color)]" : "text-zinc-500"}`}>
                                    {p.category}
                                </span>
                                <h3 className="text-xl font-black italic text-white leading-none uppercase tracking-tighter line-clamp-1">
                                    {p?.name}
                                </h3>
                            </div>

                            <div className={`flex items-center justify-between border-t pt-4 
                    ${is_available ? "border-white/10" : "border-white/5"}`}>

                                <div className={`flex flex-col ${!is_available ? "opacity-40" : ""}`}>
                                    {label && is_available && (
                                        <span className="text-[11px] line-through text-white/40 font-bold leading-none mb-1">
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                    <span className={`text-xl font-black leading-none tracking-tight 
                            ${is_available ? "text-white" : "text-zinc-500"}`}>
                                        {formatIDR(finalPrice)}
                                    </span>
                                </div>

                                <div className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                        ${is_available ? "text-white/40 group-hover:text-[var(--product-primary-color)]" : "text-red-500/50"}`}>
                                    {is_available ? "View Detail" : "Sold Out"}
                                </div>
                            </div>
                        </div>

                        {/* Overlay for Sold Out - Darkens the entire card slightly */}
                        {!is_available && (
                            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                        )}
                    </div>
                );
            })}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => {
                    setProduct(null);
                    setSelectedVariant(null);
                    setQuantity(1);
                }}
                isDarkMode={isDarkMode}
            >
                <div className="flex flex-col md:flex-row gap-0 max-h-[90vh]">
                    {/* Visual Section */}
                    <div className={`md:w-1/2 relative ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full object-cover"
                            alt={product?.name}
                        />
                        <div className="absolute bottom-8 left-8">
                            <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] text-white">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Unit Price</p>
                                <p className="text-3xl font-black italic">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className={`md:w-1/2 p-8 sm:p-12 ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={16} className="text-[var(--product-primary-color)] fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{product?.category}</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9]">
                                {product?.name}
                            </h2>
                            <div className="h-1.5 w-20 bg-[var(--product-primary-color)] mb-6" />
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className="text-sm opacity-50 font-medium leading-relaxed max-w-md"
                            />
                        </div>

                        <div className="space-y-10">
                            {product?.variants && product?.variants?.length > 0 && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Select Edition</p>
                                    <VariantPicker
                                        variants={product?.variants}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={setSelectedVariant}
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                            )}

                            {
                                product && product.is_qty ?
                                    <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                        </div>

                        <div className={`mt-12 pt-10 border-t ${isDarkMode ? ":border-zinc-800" : "border-zinc-200 "} flex flex-col gap-6`}>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Grand Total</p>
                                    <p className="text-4xl font-black italic tracking-tighter text-[var(--product-primary-color)]">
                                        {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                    </p>
                                </div>
                                {product?.discount_price ? (
                                    <div className="text-right pb-1">
                                        <p className="text-xs font-bold text-rose-500 uppercase tracking-tighter italic">Save {Promo(product, selectedVariant)}</p>
                                        <p className="text-sm opacity-30 line-through font-bold">{formatIDR((selectedVariant?.price ?? product?.price ?? 0) * quantity)}</p>
                                    </div>
                                ) : ''}
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`group relative w-full py-6 overflow-hidden rounded-2xl font-black uppercase text-sm tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50
                                    ${isDarkMode ? "bg-white text-black" : "bg-zinc-900 text-white"}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Confirm Order <Check size={20} strokeWidth={4} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Futuristic Bottom Right Alert */}
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className="relative group overflow-hidden bg-zinc-900 text-white p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-between gap-5">
                    <div className="absolute top-0 right-0 p-2 bg-[var(--product-primary-color)] rounded-bl-xl">
                        <ShoppingBag size={12} className="text-white" />
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20">
                        <img src={mockItem?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-[var(--product-primary-color)] tracking-widest">Added to Cart</p>
                        <p className="text-sm font-bold italic line-clamp-1">{mockItem?.name}</p>
                    </div>
                    <div onClick={() => setActiveAlert(false)} className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Check size={18} strokeWidth={3} />
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Four;