import ModalWrapper from './ModalWrapper';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Minus, Plus, ShoppingBag, X, ArrowUpRight, Maximize2 } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails } from './PromoType';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { OutletsType } from '@/types/Admin/OutletType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
    selectedOutlet?: OutletsType | null
}

const Six = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        className={`group relative flex flex-col transition-all duration-500 
                ${isDarkMode ? 'text-white' : 'text-zinc-900'}
                ${!is_available ? 'opacity-70' : ''}`}
                    >
                        {/* Image Container with Custom Frame */}
                        <div className={`relative overflow-hidden border-[1px] transition-colors duration-500
                ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"}
                ${!is_available ? "grayscale" : ""}`}>

                            {/* Promo Label Overlay - Hidden if sold out to keep it clean */}
                            {label && is_available && (
                                <div className={`absolute top-0 right-0 z-10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em]
                        ${isDarkMode ? "bg-white text-black" : " bg-zinc-900 text-white"}`}>
                                    {label}
                                </div>
                            )}

                            <img
                                src={p.image}
                                className={`w-full aspect-[4/5] object-cover transition-transform duration-700 
                        ${is_available ? "group-hover:scale-105" : ""}`}
                                alt={p.name}
                            />

                            {/* Hover Quick Action / Sold Out Status */}
                            <div
                                onClick={() => {
                                    if (is_available) {
                                        setProduct(p);
                                        setProductAlert(p);
                                    }
                                }}
                                className={`absolute inset-0 transition-all duration-300 flex items-center justify-center
                        ${is_available
                                        ? "bg-zinc-900/40 opacity-0 group-hover:opacity-100 cursor-pointer"
                                        : "bg-zinc-900/10 opacity-100 cursor-not-allowed"}`}
                            >
                                <div className={`px-6 py-3 flex items-center gap-3 font-bold text-xs tracking-widest transition-all duration-500
                        ${is_available
                                        ? "bg-white text-black translate-y-4 group-hover:translate-y-0"
                                        : "bg-zinc-400 text-white translate-y-0"}`}>
                                    {is_available ? (
                                        <>VIEW PRODUCT <Maximize2 size={14} /></>
                                    ) : (
                                        <>OUT OF STOCK <X size={14} /></>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Text Info - Offset Position */}
                        <div className={`mt-6 flex flex-col gap-2 relative transition-opacity ${!is_available ? "opacity-50" : ""}`}>
                            <div className="flex justify-between items-start gap-4">
                                <h3 className="font-bold text-xl uppercase tracking-tighter leading-none max-w-[70%]">
                                    {p.name}
                                </h3>
                                <p className={`text-lg font-light tracking-tighter italic 
                        ${is_available ? "opacity-70" : "line-through opacity-30"}`}>
                                    {formatIDR(finalPrice)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                                <span>{p.category}</span>
                                <span className="h-[1px] flex-1 bg-current mx-4 opacity-20"></span>
                                {!is_available && <span className="text-red-500">Currently Unavailable</span>}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal - Full Screen Aesthetics */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className={`w-full max-w-5xl flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>

                    {/* Left: Image (Split Screen) */}
                    <div className={`md:w-[55%] sticky top-0 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"} overflow-hidden`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="md:w-[45%] p-8 md:p-14 flex flex-col gap-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] opacity-50 uppercase">
                                <span>Category</span> / <span>{product?.category}</span>
                            </div>
                            <h2 className="text-5xl font-bold uppercase tracking-tighter leading-[0.9]">
                                {product?.name}
                            </h2>
                            <div className="h-1 w-20 bg-[var(--product-primary-color)]"></div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm opacity-40 uppercase tracking-widest">Pricing</span>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-light tracking-tighter">
                                    {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                                </span>
                                {product?.discount_price ? (
                                    <span className="text-sm line-through opacity-30">
                                        {formatIDR(selectedVariant?.price ?? product?.price ?? 0)}
                                    </span>
                                ) : ''}
                            </div>
                        </div>

                        <div className={`prose ${isDarkMode ? "prose-invert" : "prose-sm "}`}>
                            <ExpandableHTML htmlContent={product?.description} />
                        </div>

                        {/* Interactive UI */}
                        <div className="space-y-8">
                            {product?.variants && product?.variants?.length > 0 && (
                                <div className="">
                                    <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                </div>
                            )}

                            <div className={`flex items-center gap-10 pt-6 border-t ${isDarkMode ? "border-zinc-900" : "border-zinc-100"}`}>
                                {
                                    product && product.is_qty ?
                                        <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                                }
                                <div className="flex-1">
                                    <span className="text-[10px] font-black opacity-30 uppercase block">Total</span>
                                    <span className="text-2xl font-bold tracking-tighter italic">
                                        {formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] transition-all
                                    ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-black'}`}
                            >
                                ADD TO BAG <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Alert Minimalist */}
            <AlertWrapper activeAlert={activeAlert} position="bottom-center">
                <div className={`flex items-center justify-between gap-6 px-8 py-4 shadow-2xl ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Bag Updated</span>
                        <span className="text-sm font-black italic">{productAlert?.name} Secured</span>
                    </div>
                    <div className="h-8 w-[1px] bg-current opacity-20"></div>
                    <button onClick={() => setActiveAlert(false)} className="hover:rotate-90 transition-transform">
                        <X size={20} />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    );
}

export default Six;