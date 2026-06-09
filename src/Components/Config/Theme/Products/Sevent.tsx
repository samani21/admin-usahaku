import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ShoppingBag, X, ChevronRight, Zap, Flame, LayoutGrid, ArrowRight } from 'lucide-react';
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

const Sevent = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
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
        <div >
            {/* Interactive Stack Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto'>
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
                            className={`group relative p-4 rounded-[2rem] transition-all duration-500 
                ${is_available
                                    ? 'cursor-pointer hover:-translate-y-2'
                                    : 'cursor-not-allowed opacity-70 grayscale-[0.5]'
                                } border ${isDarkMode
                                    ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/5'
                                    : 'bg-white hover:bg-slate-50 border-slate-200/60'
                                }`}
                        >
                            {/* Floating Image Section */}
                            <div className="relative h-64 w-full mb-6 rounded-[1.5rem] overflow-hidden">
                                <img
                                    src={p?.image}
                                    className={`w-full h-full object-cover transition-transform duration-700 
                        ${is_available ? 'group-hover:scale-110' : ''}`}
                                    alt={p?.name}
                                />

                                {/* Promo Label - Only show if available */}
                                {label && is_available && (
                                    <div className="absolute top-4 left-4 bg-[var(--product-primary-color)] text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-lg">
                                        <Zap size={10} fill="currentColor" /> {label}
                                    </div>
                                )}

                                {/* Sold Out Overlay Badge */}
                                {!is_available && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-white/90 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            Habis
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Detailed Text Section */}
                            <div className={`px-2 space-y-4 ${!is_available ? 'opacity-50' : ''}`}>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] 
                            ${is_available ? 'text-[var(--product-primary-color)]' : 'text-zinc-500'}`}>
                                            {p.category}
                                        </p>
                                        <h3 className="text-lg font-extrabold leading-tight line-clamp-1 italic text-current">
                                            {p.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-500/20">
                                    <div className="flex flex-col">
                                        <p className={`text-xl font-black tracking-tighter ${!is_available ? 'line-through' : ''}`}>
                                            {formatIDR(finalPrice)}
                                        </p>
                                    </div>

                                    {/* Button Action - Adaptive */}
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 
                        ${!is_available
                                            ? 'bg-zinc-200 text-zinc-400'
                                            : isDarkMode
                                                ? 'bg-white text-black group-hover:rounded-[1.5rem] group-hover:rotate-6'
                                                : 'bg-slate-900 text-white group-hover:rounded-[1.5rem] group-hover:rotate-6'}`}>
                                        {is_available ? <ChevronRight size={20} /> : <X size={18} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal - Modern Smooth Layout */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className={`w-full  p-2 rounded-[2.5rem] ${isDarkMode ? 'bg-zinc-950/80 border-white/10' : 'bg-white/90 border-slate-200'} border backdrop-blur-2xl`}>
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Hero Image Section */}
                        <div className="md:w-1/2 p-6">
                            <div className={`h-full min-h-[350px] rounded-[2rem] overflow-hidden ${isDarkMode ? "bg-zinc-900" : "bg-slate-100"} flex items-center justify-center relative`}>
                                <img
                                    src={selectedVariant?.image || product?.image}
                                    className="w-full h-full object-contain p-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                                    alt=""
                                />
                                <div className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <ShoppingBag size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Order Detail Section */}
                        <div className="md:w-1/2 p-8 md:py-12 flex flex-col justify-between">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    {product?.category ?
                                        <span className="px-3 py-1 rounded-md bg-[var(--product-primary-color)]/10 text-[var(--product-primary-color)] text-[10px] font-black uppercase tracking-widest border border-[var(--product-primary-color)]/20">
                                            {product?.category}
                                        </span> : ''
                                    }
                                    <h2 className="text-4xl font-black tracking-tighter leading-none italic">{product?.name}</h2>
                                    <div className="flex items-baseline gap-3">
                                        <p className="text-3xl font-black text-[var(--product-primary-color)]">{formatIDR(selectedVariant?.final_price || product?.final_price || 0)}</p>
                                        {product?.discount_price ? (
                                            <p className="text-sm line-through opacity-30 font-bold">{formatIDR(selectedVariant?.price || product?.price || 0)}</p>
                                        ) : ''}
                                    </div>
                                </div>

                                <div className="text-sm opacity-60 leading-relaxed font-medium">
                                    <ExpandableHTML htmlContent={product?.description} />
                                </div>

                                {product?.variants && product?.variants.length > 0 && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Pilihan Variasi</p>
                                        <VariantPicker
                                            variants={product.variants}
                                            selectedVariant={selectedVariant}
                                            setSelectedVariant={setSelectedVariant}
                                            isDarkMode={isDarkMode}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-10 space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-500/5 rounded-2xl border border-slate-500/10">
                                    {
                                        product && product.is_qty ?
                                            <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                                    }
                                    <div className="text-right">
                                        <p className="text-[9px] font-black opacity-30 uppercase tracking-widest">Grand Total</p>
                                        <p className="text-2xl font-black">{formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}</p>
                                    </div>
                                </div>

                                <button
                                    disabled={disableButton}
                                    onClick={addCart}
                                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3
                                    ${isDarkMode ? 'bg-white text-black hover:bg-[var(--product-primary-color)] hover:text-white' : 'bg-slate-900 text-white hover:bg-[var(--product-primary-color)]'} shadow-xl shadow-[var(--product-primary-color)]/10`}
                                >
                                    Konfirmasi Pesanan <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Alert: Modern Notification Bar */}
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className={`p-1 pr-6 flex items-center justify-between gap-4 rounded-full ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-200'} border shadow-2xl`}>
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                        <Zap size={18} fill="currentColor" />
                    </div>
                    <div className="flex flex-col py-2">
                        <p className="text-[10px] font-black opacity-40 uppercase leading-none">Status Sistem</p>
                        <p className="text-xs font-bold italic tracking-tight">Produk berhasil diamankan</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)} className="ml-4 opacity-30 hover:opacity-100 transition-opacity">
                        <X size={16} />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    );
};

export default Sevent;