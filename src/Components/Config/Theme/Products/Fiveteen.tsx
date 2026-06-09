import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Zap, ShoppingCart, X, Star, ArrowRight } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails, Promo } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
}

const Fiveteen = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);

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
        //setActiveAlert(true);
        if (handleCart) handleCart(product, selectedVariant, quantity);
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1);
    };

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant])
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6 `}>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group relative flex flex-col items-center transition-all duration-500 
                ${is_available ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
                    >
                        {/* Discount Badge - Hidden if out of stock, or kept for info */}
                        {label && is_available && (
                            <div className={`absolute top-2 right-2 z-1 bg-[var(--product-primary-color)] text-white text-[10px] font-black w-12 h-12 flex items-center justify-center rounded-full shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 border-2 ${isDarkMode ? "border-zinc-900" : "border-white"}`}>
                                {label}
                            </div>
                        )}
                        {/* Out of Stock Overlay Badge */}
                        {!is_available && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-2xl rotate-[-10deg]">
                                Sold Out
                            </div>
                        )}
                        {/* Main Image Orbit */}
                        <div className={`relative w-full aspect-square rounded-full border-2 border-dashed transition-all duration-700 p-4
                ${!is_available ? "grayscale border-zinc-400" : isDarkMode ? "border-zinc-800 group-hover:border-zinc-600" : "border-slate-200 group-hover:border-[var(--product-primary-color)]"}`}>

                            <div className={`sm:w-full sm:h-full rounded-full overflow-hidden border-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all
                    ${isDarkMode ? "border-zinc-900" : 'border-white'} 
                    ${is_available ? "group-hover:shadow-[0_20px_50px_rgba(var(--product-primary-rgb),0.3)]" : ""}`}>

                                <img
                                    src={p?.image}
                                    className={`w-full h-full object-cover transition-transform duration-700 
                            ${is_available ? "group-hover:scale-110" : ""}`}
                                    alt={p.name}
                                />
                            </div>

                            {/* Floating Icon Decor - Hidden or changed when out of stock */}
                            {is_available && (
                                <div className={`absolute bottom-4 right-4 ${isDarkMode ? "bg-zinc-800" : "bg-white"} p-3 rounded-full shadow-lg transform group-hover:-translate-y-2 transition-transform`}>
                                    <ShoppingCart size={18} className="text-[var(--product-primary-color)]" />
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className={`mt-6 text-center space-y-2 ${!is_available ? "opacity-50" : ""}`}>
                            {p?.category && (
                                <span className="text-[10px] font-black tracking-[0.2em] opacity-40 uppercase">{p?.category}</span>
                            )}
                            <h3 className={`text-lg font-black uppercase italic leading-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                                {p?.name}
                            </h3>

                            <div className="flex flex-col items-center">
                                {label && (
                                    <span className="text-[11px] line-through opacity-30 font-bold mb-1">{formatIDR(p.price)}</span>
                                )}
                                <p className={`text-xl font-black tracking-tighter ${!is_available ? "text-zinc-500" : "text-[var(--product-primary-color)]"}`}>
                                    {formatIDR(finalPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}

            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--product-primary-color)] opacity-10 blur-[100px] rounded-full" />

                    <div className="relative p-6 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                        {/* Image Showcase */}
                        <div className="w-full md:w-1/2 group">
                            <div className={`relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 ${isDarkMode ? "border-zinc-800" : " border-white"} shadow-2xl`}>
                                <img
                                    src={selectedVariant?.image ?? product?.image}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    alt=""
                                />
                                {product?.category && (
                                    <div className={`absolute top-6 left-6 ${isDarkMode ? "bg-zinc-900/90" : "bg-white/90"} backdrop-blur-md px-5 py-2 rounded-2xl`}>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{product?.category}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Panel */}
                        <div className={`w-full md:w-1/2 space-y-8 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                            <div className="space-y-4">

                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-[0.9] uppercase">{product?.name}</h2>
                                <div className="h-1.5 w-24 bg-[var(--product-primary-color)] rounded-full" />
                            </div>

                            <ExpandableHTML
                                htmlContent={product?.description}
                                className="text-sm opacity-60 leading-relaxed font-medium"
                            />

                            <div className="space-y-6 pt-4">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-black tracking-tighter text-[var(--product-primary-color)]">
                                        {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                                    </span>
                                    {product?.discount_price ? (
                                        <div className="flex flex-col">
                                            <span className="text-sm line-through opacity-30 font-bold">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span>
                                            <span className="text-[10px] font-black text-rose-500 uppercase">Save {Promo(product, selectedVariant)}</span>
                                        </div>
                                    ) : ''}
                                </div>

                                {product?.variants && product?.variants?.length > 0 && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Select Configuration</p>
                                        <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                    </div>
                                )}

                                <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 p-6 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-zinc-100 border-zinc-200"} rounded-[2.5rem] border`}>
                                    {product?.is_qty ? (
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black opacity-30 uppercase">Quantity</p>
                                            <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} product={product} selectedVariant={selectedVariant} />
                                        </div>
                                    ) : <div></div>}
                                    <div className="text-right space-y-1">
                                        <p className="text-[9px] font-black opacity-30 uppercase">Subtotal</p>
                                        <p className="text-2xl font-black italic tracking-tighter">
                                            {formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    disabled={disableButton}
                                    onClick={addCart}
                                    className={`w-full group relative overflow-hidden disabled:bg-zinc-600 py-6 ${isDarkMode ? "bg-white text-zinc-900 hover:bg-[var(--product-primary-color)]" : " bg-zinc-900 text-white hover:bg-[var(--product-primary-color)]"} rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all  hover:text-white`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        <Zap size={18} fill="currentColor" />
                                        Secure This Unit
                                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
}

export default Fiveteen;