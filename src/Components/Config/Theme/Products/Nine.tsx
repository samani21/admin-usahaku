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
    selectedOutlet?: OutletsType | null
}

const Nine = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product || !selectedOutlet) return true;
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group relative flex h-40 sm:h-52 rounded-[2.5rem] overflow-hidden transition-all duration-500 border-2 ${is_available
                            ? `cursor-pointer ${isDarkMode
                                ? 'bg-zinc-900 border-white/5 hover:border-[var(--product-primary-color)]/50'
                                : 'bg-white border-slate-100 hover:border-[var(--product-primary-color)] shadow-xl shadow-slate-200/50'}`
                            : `cursor-not-allowed ${isDarkMode ? 'bg-zinc-950 border-white/5 opacity-60' : 'bg-slate-100 border-slate-200 opacity-80'}`
                            }`}
                    >
                        {/* Image Side */}
                        <div className={`w-1/3 sm:w-2/5 h-full relative overflow-hidden ${isDarkMode ? "bg-zinc-800" : 'bg-zinc-100'}`}>
                            <img
                                src={p.image}
                                className={`w-full h-full object-cover transition-transform duration-700 
                        ${is_available ? "group-hover:scale-110" : "grayscale"}`}
                                alt={p.name}
                            />

                            {/* Promo Label - Only for available items */}
                            {label && is_available && (
                                <div className="absolute top-4 left-4 bg-rose-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg uppercase italic tracking-tighter z-1">
                                    {label}
                                </div>
                            )}

                            {/* Sold Out Overlay for Image */}
                            {!is_available && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                                    <span className="text-white font-black text-[10px] uppercase tracking-widest border-b-2 border-white/50">Sold Out</span>
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between">
                            <div className={!is_available ? "opacity-40" : ""}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`h-1 rounded-full transition-all 
                            ${is_available ? "w-4 bg-[var(--product-primary-color)] group-hover:w-8" : "w-2 bg-zinc-400"}`}></span>
                                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{p.category}</span>
                                </div>
                                <h3 className="font-black text-sm sm:text-xl uppercase italic leading-tight line-clamp-2 tracking-tighter">
                                    {p.name}
                                </h3>
                            </div>

                            <div className="flex items-end justify-between">
                                <div className={`space-y-0.5 ${!is_available ? "opacity-30" : ""}`}>
                                    {label && is_available && <span className="text-[10px] line-through opacity-30 font-bold">{formatIDR(p.price)}</span>}
                                    <p className={`font-black text-xl sm:text-3xl italic leading-none tracking-tighter
                            ${is_available ? "text-[var(--product-primary-color)]" : "text-zinc-500"}`}>
                                        {formatIDR(finalPrice)}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className={`h-10 w-10 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center transition-all duration-300 
                        ${!is_available
                                        ? 'bg-zinc-200 text-zinc-400'
                                        : isDarkMode
                                            ? 'bg-white text-black group-hover:rounded-full group-hover:rotate-45'
                                            : 'bg-slate-900 text-white group-hover:rounded-full group-hover:rotate-45'
                                    }`}>
                                    {is_available ? <Plus size={20} strokeWidth={3} /> : <Lock size={18} />}
                                </div>
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
                <div className={`relative w-full max-w-5xl rounded-[3rem] overflow-hidden ${isDarkMode ? 'bg-zinc-950 border border-white/10' : 'bg-white'}`}>
                    {/* Atmospheric Glow */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-[var(--product-primary-color)]/10 blur-[120px] pointer-events-none" />

                    <div className="relative flex flex-col lg:flex-row min-h-[600px]">
                        {/* Visual Frame */}
                        <div className="lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
                            <div className={`relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden border-[12px] ${isDarkMode ? 'border-zinc-900' : 'border-slate-50'} shadow-2xl`}>
                                <img
                                    src={selectedVariant?.image ?? product?.image}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                                {product?.discount_price && (
                                    <div className="absolute top-6 left-6 bg-[var(--product-primary-color)] text-white px-6 py-2 rounded-2xl font-black italic shadow-2xl animate-bounce">
                                        OFF {Promo(product, selectedVariant)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">{product?.category}</span>
                                        {product?.stock && (
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase italic border border-emerald-500/20">
                                                {product?.stock} In Stock
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-[0.85] uppercase">
                                        {product?.name}
                                    </h2>
                                    <div className="h-1.5 w-20 bg-[var(--product-primary-color)] rounded-full" />
                                </div>

                                <div className="prose  opacity-80 leading-relaxed font-medium">
                                    <ExpandableHTML htmlContent={product?.description} />
                                </div>

                                <div className="space-y-6 pt-6 border-t border-slate-500/10">
                                    {product?.variants && product?.variants.length > 0 && (
                                        <VariantPicker
                                            variants={product.variants}
                                            selectedVariant={selectedVariant}
                                            setSelectedVariant={setSelectedVariant}
                                            isDarkMode={isDarkMode}
                                        />
                                    )}

                                    <div className={`flex items-center justify-between p-6 rounded-[2rem] ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                                        {product?.is_qty ? (
                                            <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                        ) : <div />}
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase opacity-30 italic">Grand Total</p>
                                            <p className="text-3xl font-black italic tracking-tighter text-[var(--product-primary-color)]">
                                                {formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className="mt-10 w-full py-7 bg-[var(--product-primary-color)] text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] shadow-xl shadow-[var(--product-primary-color)]/20 text-sm hover:bg-[var(--product-primary-color)] transition-all active:scale-95 disabled:grayscale flex items-center justify-center gap-4"
                            >
                                <Zap size={22} fill="white" /> Amankan Slot Pesanan
                            </button>
                        </div>
                    </div>

                </div>
            </ModalWrapper>

            <AlertWrapper activeAlert={activeAlert} position="center">
                <div className={`${isDarkMode ? 'bg-zinc-900' : 'bg-white'} p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10 text-center space-y-8 animate-in zoom-in-95 duration-300`}>
                    <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                        <div className="relative w-full h-full bg-emerald-500 text-white rounded-[1.8rem] rotate-12 flex items-center justify-center shadow-lg">
                            <Check size={40} strokeWidth={3} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black italic tracking-tighter mb-2">SIAP DIKIRIM!</h3>
                        <p className="text-sm opacity-50 font-medium">Produk pilihanmu sudah masuk antrean belanja.</p>
                    </div>
                    <button
                        onClick={() => setActiveAlert(false)}
                        className="w-full py-5 bg-[var(--product-primary-color)] text-white rounded-2xl font-black uppercase italic tracking-widest text-xs flex items-center justify-center gap-2"
                    >
                        Lanjutkan Belanja <ArrowRight size={16} />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    );
};

export default Nine;