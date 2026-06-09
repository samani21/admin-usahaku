import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, ShoppingBag, ShoppingCart, X, Plus, Info } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
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

const Five = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product || !selectedOutlet) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);


    const mockItem = useMemo(() => ({
        name: productAlert?.name,
        image: productAlert?.image,
    }), [productAlert])

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
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8'>
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
                        className={`group relative flex flex-col transition-all duration-700 ease-out
                ${is_available ? 'cursor-pointer' : 'cursor-not-allowed'}
                ${i % 2 === 0 ? 'md:translate-y-4' : 'md:-translate-y-4'}`}
                    >
                        {/* Image Frame with Minimal Polaroid Aesthetic */}
                        <div className={`relative aspect-[3/4] mb-4 overflow-hidden rounded-sm ring-1 transition-all duration-500
                ${is_available
                                ? (isDarkMode ? 'bg-zinc-900 ring-white/10' : 'bg-zinc-50 ring-black/5')
                                : (isDarkMode ? 'bg-zinc-950 ring-white/5 opacity-60' : 'bg-zinc-200 ring-black/5 opacity-70')}`}>

                            <img
                                src={p.image}
                                className={`w-full h-full object-cover transition-all duration-1000 
                        ${is_available ? 'group-hover:scale-105' : 'grayscale sepia-[0.2]'}`}
                                alt={p.name}
                            />

                            {/* Hover Overlay / Sold Out Overlay */}
                            <div className={`absolute inset-0 transition-colors duration-500 flex items-center justify-center
                    ${is_available ? 'bg-black/0 group-hover:bg-black/20' : 'bg-zinc-900/20'}`}>

                                {is_available ? (
                                    <div className="w-12 h-12 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 flex items-center justify-center text-black shadow-xl">
                                        <Plus size={24} strokeWidth={1.5} />
                                    </div>
                                ) : (
                                    <span className={`font-serif italic text-xs tracking-[0.2em] px-4 py-2 border backdrop-blur-sm
                            ${isDarkMode ? 'bg-black/40 border-white/10 text-zinc-400' : 'bg-white/60 border-black/5 text-zinc-500'}`}>
                                        Sold Out
                                    </span>
                                )}
                            </div>

                            {/* Label Tag - Only show if available */}
                            {label && is_available && (
                                <div className="absolute top-4 left-0 bg-rose-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest italic shadow-lg">
                                    {label}
                                </div>
                            )}
                        </div>

                        {/* Text Content - Editorial Serif */}
                        <div className={`text-center px-2 transition-opacity duration-500 ${!is_available ? 'opacity-40' : ''}`}>
                            <h3 className={`font-serif text-lg md:text-xl italic font-medium leading-tight mb-2 line-clamp-2 
                    ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                                {p.name}
                            </h3>
                            <div className="flex flex-col items-center gap-1">
                                {label && is_available && (
                                    <span className="text-[10px] opacity-40 line-through font-bold">
                                        {formatIDR(p.price)}
                                    </span>
                                )}
                                <p className={`text-sm md:text-base font-bold tracking-widest 
                        ${!is_available ? 'text-zinc-500' : isDarkMode ? 'text-[var(--product-primary-color)]' : 'text-zinc-900'}`}>
                                    {is_available ? formatIDR(finalPrice) : 'UNAVAILABLE'}
                                </p>
                            </div>
                        </div>
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
                <div className={`flex flex-col w-full  mx-auto overflow-hidden ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
                    {/* Hero Section */}
                    <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-zinc-950" : "from-white"} via-transparent to-transparent`} />
                    </div>

                    {/* Content Section */}
                    <div className="px-6 md:px-12 pb-12 -mt-16 relative z-10 flex flex-col items-center">
                        {/* Floating Badge Info */}
                        <div className={`mb-6 p-1.5 rounded-full border ${isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-white border-zinc-100 text-zinc-500"} flex items-center gap-3 pr-4 shadow-xl`}>
                            <div className="bg-[var(--product-primary-color)] text-white p-2 rounded-full">
                                <Info size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{product?.category} • {product?.stock} in stock</span>
                        </div>

                        <h2 className={`font-serif text-3xl md:text-5xl italic text-center leading-tight mb-6 ${isDarkMode ? "text-white" : "text-zinc-950"}`}>
                            {product?.name}
                        </h2>

                        <div className="w-full max-w-md space-y-8">
                            <div className={`prose ${isDarkMode ? "prose-invert" : "prose-sm"} max-w-none`}>
                                <ExpandableHTML
                                    htmlContent={product?.description}
                                    className={`${isDarkMode ? "text-slate-100" : "text-slate-900"} leading-relaxed font-medium`}
                                />
                            </div>

                            {/* Options Area */}
                            <div className={`flex flex-col gap-8 py-8 border-y ${isDarkMode ? "border-zinc-900" : "border-zinc-100"}`}>
                                {product?.variants && product?.variants?.length > 0 && (
                                    <div className="">
                                        <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                    </div>
                                )}

                                {product?.is_qty ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-center">Quantity</span>
                                        <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    </div>
                                ) : ''}
                            </div>

                            {/* Price and CTA */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Total Amount</p>
                                    <div className="flex flex-col items-center">
                                        {product?.discount_price ? (
                                            <span className="text-sm opacity-30 line-through font-bold">{formatIDR((selectedVariant?.price ?? product?.price ?? 0) * quantity)}</span>
                                        ) : ''}
                                        <span className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--product-primary-color)]">
                                            {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    disabled={disableButton}
                                    onClick={addCart}
                                    className={`w-full group relative py-5 rounded-full overflow-hidden transition-all duration-300 active:scale-95 disabled:grayscale
                                        ${isDarkMode ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white shadow-2xl shadow-zinc-200'}`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-4 font-black uppercase text-xs tracking-[0.2em]">
                                        <ShoppingCart size={18} /> Add To Collection
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Editorial Alert */}
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`${isDarkMode ? "bg-zinc-900 text-white border-zinc-800" : "bg-white text-zinc-900 border-zinc-200"} pl-2 pr-6 py-2 rounded-full shadow-2xl flex items-center gap-4 border animate-in justify-between fade-in slide-in-from-top-4`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={mockItem?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className="text-xs font-bold tracking-tight">Added <span className="italic font-serif font-medium">{mockItem?.name}</span> to cart</span>
                    <button onClick={() => setActiveAlert(false)} className="ml-2 opacity-40 hover:opacity-100 transition-opacity">
                        <X size={14} />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Five;