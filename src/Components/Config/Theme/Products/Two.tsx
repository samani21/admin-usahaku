import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import AlertWrapper from './AlertWrapper';
import { ArrowRight, X, ShoppingCart, Info } from 'lucide-react';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails } from './PromoType';
import { OutletsType } from '@/types/Admin/OutletType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
    selectedOutlet?: OutletsType | null
}

const Two = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product || !selectedOutlet) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);


    const mockItem = useMemo(() => ({
        name: productAlert?.name,
        price: productAlert?.final_price,
        image: productAlert?.image,
        category: productAlert?.category,
        quantity: quantity
    }), [productAlert, activeAlert, quantity])

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
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 h-full'>
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
                        className={`group flex flex-col items-center transition-all duration-500 
                ${is_available ? "cursor-pointer" : "cursor-not-allowed"}`}
                    >
                        {/* Image Container with Neo-Brutalism Touch */}
                        <div className={`relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 transition-all duration-500 transform 
                ${is_available ? "group-hover:-translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)]" : "grayscale opacity-80"} 
                ${isDarkMode ? "bg-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "bg-slate-100"}`}>

                            {/* Promo Label - Only show if available */}
                            {label && is_available && (
                                <div className="absolute top-5 left-5 z-1 bg-black text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                                    {label}
                                </div>
                            )}

                            {/* Sold Out Badge - Custom Neo-Brutalism Style */}
                            {!is_available && (
                                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                    <div className="bg-white text-black border-2 border-black font-black text-[10px] px-4 py-2 uppercase tracking-[0.3em] -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        Out of Stock
                                    </div>
                                </div>
                            )}

                            <img
                                src={p?.image}
                                className={`w-full h-full object-cover transition-transform duration-1000 
                        ${is_available ? "grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105" : "grayscale"}`}
                                alt={p.name}
                            />

                            {/* Floating Quick Action - Only for available products */}
                            {is_available && (
                                <div className="absolute bottom-5 right-5 z-20 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white text-black p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform">
                                        <ShoppingCart size={18} strokeWidth={2.5} />
                                    </div>
                                </div>
                            )}

                            <div className={`absolute inset-0 transition-opacity ${is_available ? "bg-black/10 opacity-0 group-hover:opacity-100" : ""}`} />
                        </div>

                        {/* Bold Editorial Text */}
                        <div className={`text-center w-full px-2 transition-opacity duration-500 ${!is_available ? "opacity-40" : ""}`}>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">{p?.category}</p>
                            <h3 className={`font-black text-sm md:text-base uppercase leading-tight mb-2 transition-colors line-clamp-2 
                    ${is_available ? "group-hover:text-[var(--product-primary-color)]" : ""}`}>
                                {p?.name}
                            </h3>

                            <div className="flex flex-col items-center">
                                {label && (
                                    <span className="text-[11px] line-through opacity-30 font-bold mb-1">
                                        {formatIDR(p.price)}
                                    </span>
                                )}
                                <p className={`font-black text-lg ${!is_available ? "text-zinc-500" : isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                                    {formatIDR(finalPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Immersive Modal Experience */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}
            >
                {/* Dynamic Background Blur */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover scale-150 blur-3xl" alt="" />
                </div>

                <div className="relative w-full p-6 sm:p-12 flex flex-col items-center text-center max-w-4xl mx-auto space-y-10 overflow-auto no-scrollbar">
                    {/* Hero Image Section */}
                    <div className="relative">
                        <div className={`w-48 h-48 sm:w-64 sm:h-64 rounded-[3.5rem] overflow-hidden shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-700 border-8 ${isDarkMode ? "border-zinc-800" : "border-white"}`}>
                            <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-[var(--product-primary-color)] text-white p-4 rounded-full -rotate-12 font-black text-xs">
                            BEST<br />PICK
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className={`text-[var(--product-primary-color)] font-black uppercase tracking-[0.5em] text-[10px]`}>{product?.category}</p>
                        <h2 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9]">{product?.name}</h2>
                    </div>

                    <div className="w-full grid md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-6 text-left">
                            <div className="flex items-center gap-2 opacity-50">
                                <Info size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Detail & Fit</span>
                            </div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`opacity-70 text-sm leading-relaxed`}
                            />
                        </div>

                        <div className="space-y-8">
                            {product?.variants && product?.variants?.length > 0 && (
                                <div className="text-left">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3 block text-center md:text-left">Pilih Gaya</span>
                                    <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                </div>
                            )}

                            <div className="bg-zinc-500/5 p-6 rounded-[2rem] space-y-6 backdrop-blur-sm border border-white/5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase opacity-50">Kuantitas</span>
                                    {product?.is_qty ? <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ''}
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    {product?.discount_price ? (
                                        <span className="text-sm line-through opacity-30 font-bold">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span>
                                    ) : ''}
                                    <div className="text-4xl font-black">
                                        {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * (product?.is_qty ? quantity : 1))}
                                    </div>
                                </div>

                                <button
                                    disabled={disableButton}
                                    onClick={() => addCart()}
                                    className={`w-full py-5 group/btn relative overflow-hidden rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all ${isDarkMode ? "bg-white text-black hover:bg-[var(--product-primary-color)] hover:text-white" : "bg-black text-white hover:bg-[var(--product-primary-color)]"
                                        } disabled:opacity-20`}
                                >
                                    <span className="relative z-10">Tambah ke Tas</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Premium Dynamic Alert */}
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-2 ${isDarkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-slate-100 text-slate-900"} overflow-hidden w-[320px] transform animate-in slide-in-from-right-10 duration-500`}>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Ditambahkan</span>
                            </div>
                            <X size={18} className="cursor-pointer opacity-20 hover:opacity-100 transition-opacity" onClick={() => setActiveAlert(false)} />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-20 h-24 rounded-2xl overflow-hidden bg-zinc-100">
                                <img src={mockItem.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h4 className="text-xs font-black uppercase italic leading-tight mb-2 line-clamp-2">{mockItem.name}</h4>
                                <p className="text-xs opacity-50 mb-1">Total Pesanan:</p>
                                <p className="text-base font-black text-[var(--product-primary-color)]">{formatIDR((mockItem.price ?? 0) * mockItem.quantity)}</p>
                            </div>
                        </div>

                        <button onClick={() => setActiveAlert(false)} className={`w-full py-4 ${isDarkMode ? 'bg-white text-black' : "bg-zinc-900 text-white"} rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 group`}>
                            Lihat Tas <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Two;