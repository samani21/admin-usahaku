import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Minus, Package, Plus, Sparkles, X, ShoppingBag } from 'lucide-react';
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

const Fourteen = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
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

    const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
    const currentFinalPrice = selectedVariant?.final_price ?? product?.final_price ?? 0;
    const currentDiscount = currentPrice - currentFinalPrice;

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant])
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 ${is_available
                            ? `cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-slate-100'}`
                            : `cursor-not-allowed ${isDarkMode ? 'bg-zinc-950 border border-zinc-900 opacity-60' : 'bg-slate-100 border border-slate-200 opacity-80'}`
                            }`}
                    >
                        {/* Image Section with Urban Overlay */}
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={p.image}
                                className={`w-full h-full object-cover transition-transform duration-1000 ${is_available ? "group-hover:scale-110" : "grayscale opacity-30"}`}
                                alt={p.name}
                            />

                            {/* Overlay: Darker when sold out */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity ${is_available ? "opacity-60 group-hover:opacity-40" : "opacity-90"}`} />

                            {/* Status Badge */}
                            {is_available ? (
                                label && (
                                    <div className="absolute top-6 left-6 bg-yellow-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg -rotate-12 group-hover:rotate-0 transition-transform">
                                        {label}
                                    </div>
                                )
                            ) : (
                                <div className="absolute top-6 left-6 bg-zinc-800 text-zinc-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg border border-zinc-700">
                                    Out of Stock
                                </div>
                            )}

                            <div className={`absolute bottom-6 left-6 right-6 flex justify-between items-end transition-transform ${is_available ? "translate-y-2 group-hover:translate-y-0" : "translate-y-0 opacity-50"}`}>
                                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                                    <span className="text-[10px] font-black text-white/70 uppercase">{p.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Perforation Area */}
                        <div className="relative h-8 flex items-center px-4">
                            <div className={`absolute -left-4 w-8 h-8 rounded-full ${isDarkMode ? 'bg-black' : 'bg-slate-50'} z-0 border-r ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`} />
                            <div className={`absolute -right-4 w-8 h-8 rounded-full ${isDarkMode ? 'bg-black' : 'bg-slate-50'} z-0 border-l ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`} />
                            <div className={`w-full border-t-2 border-dashed ${is_available ? "border-zinc-700/30 opacity-50" : "border-zinc-800 opacity-20"}`} />
                        </div>

                        {/* Content Section */}
                        <div className={`p-8 pt-2 space-y-4 transition-opacity ${!is_available ? "opacity-40" : ""}`}>
                            <h3 className={`font-black text-xl leading-none uppercase italic tracking-tighter transition-colors line-clamp-2 ${is_available ? "group-hover:text-[var(--product-primary-color)]" : ""}`}>
                                {p.name}
                            </h3>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    {label && is_available && (
                                        <span className="text-[10px] line-through opacity-30 font-black tracking-widest">{formatIDR(p.price)}</span>
                                    )}
                                    <p className={`text-2xl font-black italic tracking-tighter leading-none ${is_available ? "" : "text-zinc-600"}`}>
                                        {formatIDR(finalPrice)}
                                    </p>
                                </div>

                                {/* Action Icon */}
                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-xl 
                        ${is_available
                                        ? `${isDarkMode ? "bg-white text-black" : "bg-black text-white"} transform rotate-3 group-hover:rotate-12`
                                        : "bg-zinc-800 text-zinc-600 rotate-0 shadow-none"}`}>
                                    {is_available ? <Plus size={20} strokeWidth={3} /> : <Minus size={20} strokeWidth={3} />}
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
                <div className={`w-full flex flex-col md:flex-row max-h-[90vh] ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>

                    {/* Visual Lab Section */}
                    <div className={`md:w-1/2 relative ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"} group`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className='h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700'
                            alt={product?.name}
                        />
                        {/* Floating Tech Badges */}
                        <div className="absolute top-8 left-8 flex flex-col gap-2">
                            {product?.discount_price && (
                                <div className="bg-[var(--product-primary-color)] text-white px-4 py-2 rounded-sm font-black text-xl italic skew-x-[-12deg]">
                                    -{Promo(product, selectedVariant)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Urban Control Panel */}
                    <div className="md:w-1/2 p-8 md:p-14 flex flex-col gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[var(--product-primary-color)]">
                                <Sparkles size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">{product?.category || 'Limited Edition'}</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic leading-[0.85] uppercase tracking-tighter break-words">{product?.name}</h2>
                        </div>

                        <div className={`border-l-4 ${isDarkMode ? "border-zinc-800" : "border-zinc-200"} pl-6 italic opacity-60`}>
                            <ExpandableHTML htmlContent={product?.description} className="text-sm leading-relaxed" />
                        </div>

                        <div className="space-y-6">
                            {/* Variants System */}
                            {product?.variants && product?.variants.length > 0 && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">System Options:</p>
                                    <div className="flex flex-wrap gap-3">
                                        {product.variants.map((v) => (
                                            <button
                                                key={v.id}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`px-6 py-3 border-2 font-black text-[10px] uppercase italic transition-all ${selectedVariant?.id === v.id ? `${isDarkMode ? "bg-white text-black" : "bg-black text-white"} border-transparent scale-105` : `${isDarkMode ? "border-zinc-800" : "border-zinc-200"} hover:border-zinc-500`}`}
                                            >
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Logic Box */}
                            <div className={`space-y-2 p-4 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-zinc-100 border-zinc-200"} rounded-[2rem] border `}>
                                <div className="flex-1 space-y-1">
                                    <p className="text-[10px] font-black uppercase opacity-30">Price Matrix</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black tracking-tighter italic">{formatIDR(currentFinalPrice)}</span>
                                        {currentDiscount > 0 && <span className="text-sm opacity-20 line-through font-bold">{formatIDR(currentPrice)}</span>}
                                    </div>
                                </div>
                                <div className='flex items-center justify-end'>
                                    {product?.is_qty ? <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ''}
                                </div>
                            </div>
                        </div>

                        {/* Checkout Sector */}
                        <div className="mt-auto pt-8 flex flex-col gap-4">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-black uppercase opacity-40">Settlement Total</span>
                                <span className="text-2xl font-black italic tracking-tighter">{formatIDR(currentFinalPrice * quantity)}</span>
                            </div>
                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`w-full py-6 ${isDarkMode ? "bg-white text-black hover:bg-[var(--product-primary-color)]" : "bg-black text-white hover:bg-[var(--product-primary-color)]"} rounded-full font-black uppercase italic text-sm tracking-[0.2em] shadow-2xl  hover:text-white transition-all flex items-center justify-center gap-4 group`}
                            >
                                <ShoppingBag size={18} />
                                Add to Registry
                                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`min-w-[320px] ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'} p-1 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex items-center gap-4 border border-white/10`}>
                    <div className="h-14 w-14 bg-[var(--product-primary-color)] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg animate-pulse">
                        <Package size={24} />
                    </div>
                    <div className="flex-1 pr-4">
                        <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Confirmed</p>
                        <p className="text-xs font-black uppercase italic leading-tight truncate">{product?.name || 'Unit'} Locked in Bag</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)} className={`h-10 w-10 flex items-center justify-center ${isDarkMode ? "bg-white/10" : "bg-zinc-100"} rounded-full mr-2`}>
                        <X size={16} />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    );
};

export default Fourteen;