import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Percent, Plus, ShoppingCart, Zap } from 'lucide-react';
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

const Eleven = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);
    const disableButton = useMemo(() => {
        if (!product || !selectedOutlet) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);

    const mockItem = useMemo(() => {
        return {
            name: product?.name,
            price: product?.final_price,
            image: product?.image,
            category: product?.category,
            quantity: quantity
        }
    }, [activeAlert])
    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);
    useEffect(() => {
        if (product) {
            // Jika modal aktif (product tidak null), kunci scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Jika modal tutup, kembalikan scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function untuk memastikan scroll kembali normal jika komponen unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
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
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`relative p-1 rounded-[2rem] transition-all duration-500 overflow-hidden h-[320px] sm:h-[400px]
                ${is_available
                                ? "bg-gradient-to-br from-indigo-400 via-pink-400 to-amber-300 cursor-pointer group shadow-xl hover:shadow-2xl hover:-translate-y-2"
                                : "bg-slate-400 cursor-not-allowed opacity-80"}`}
                    >

                        {/* Badge Status */}
                        {is_available ? (
                            label && (
                                <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-xl font-black italic text-xs flex items-center gap-1 shadow-lg animate-pulse">
                                    {label}
                                </div>
                            )
                        ) : (
                            <div className="absolute top-4 right-4 z-10 bg-slate-800/80 backdrop-blur-md border border-white/10 text-white/50 px-3 py-1.5 rounded-xl font-black italic text-[10px] tracking-widest uppercase">
                                Habis
                            </div>
                        )}

                        <div className={`h-full w-full rounded-[1.8rem] p-4 sm:p-6 flex flex-col items-center text-center justify-between transition-colors duration-500
                ${isDarkMode ? 'bg-slate-900/95 text-white' : 'bg-white/95 text-slate-900'}
                ${!is_available ? 'grayscale-[0.8]' : ''}`}>

                            {/* Image Container */}
                            <div className={`relative w-full h-32 aspect-square rounded-[1.5rem] overflow-hidden ring-4 transition-all duration-500
                    ${is_available
                                    ? "bg-slate-100 ring-white/10 shadow-inner group-hover:scale-105"
                                    : "bg-slate-200 ring-slate-300/20"}`}>

                                <img
                                    src={p?.image}
                                    className={`w-full h-full object-cover ${!is_available ? 'opacity-40' : ''}`}
                                    alt={p.name}
                                />

                                {label && is_available && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--product-primary-color)]/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-[10px] font-black uppercase tracking-tighter italic">Potongan {formatIDR(finalPrice)}</p>
                                    </div>
                                )}
                            </div>

                            <div className={`space-y-2 transition-opacity ${!is_available ? 'opacity-40' : ''}`}>
                                {p?.category && (
                                    <span className={`text-[10px] font-black tracking-[0.3em] uppercase italic border-b line-clamp-1 pb-1
                            ${is_available ? 'opacity-30 border-[var(--product-primary-color)]/20' : 'opacity-20 border-slate-500'}`}>
                                        {p?.category}
                                    </span>
                                )}
                                <h3 className={`font-black text-md sm:text-xl h-12 tracking-tighter uppercase leading-tight transition-colors line-clamp-2
                        ${is_available ? 'group-hover:text-[var(--product-primary-color)]' : ''}`}>
                                    {p?.name}
                                </h3>

                                <div className="flex flex-col items-center gap-0">
                                    <p className={`text-md sm:text-2xl font-black italic tracking-tighter 
                            ${is_available ? 'text-[var(--product-primary-color)]' : 'text-slate-500 line-through'}`}>
                                        {formatIDR(finalPrice)}
                                    </p>
                                    <div className='h-8'>
                                        {label && is_available && (
                                            <p className="text-xs opacity-30 line-through font-bold italic tracking-wider">
                                                {formatIDR(p?.price ?? 0)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:grid w-full pt-2">
                                <div className={`w-full py-3 rounded-xl border font-black uppercase italic text-[10px] tracking-widest transition-all
                        ${is_available
                                        ? "border-white/5 bg-white/5 group-hover:bg-[var(--product-primary-color)] group-hover:text-white"
                                        : "border-slate-700 bg-slate-800/50 text-slate-500"}`}>
                                    {is_available ? "View Details" : "Out of Stock"}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}>
                <div className="w-full flex flex-col md:flex-row min-h-full">
                    {/* Bagian Kiri: Gambar (60% Desktop) */}
                    <div className="md:w-3/5 h-[400px] md:h-auto relative md:overflow-hidden">
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="" />
                        {product?.discount_price && (
                            <div className="absolute top-8 left-8 bg-[var(--product-primary-color)] text-white px-6 py-3 rounded-2xl font-black italic shadow-2xl border border-white/20 scale-110">
                                -{Promo(product, selectedVariant)}
                            </div>
                        )}
                    </div>

                    {/* Bagian Kanan: Detail (40% Desktop) */}
                    <div className="md:w-2/5 p-8 md:p-12 flex flex-col md:overflow-auto md:overflow-x-hidden no-scrollbar">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">{product?.category}</span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter mb-2 leading-tight">
                            {product?.name}
                        </h2>

                        {/* Harga dengan Logika Coret */}
                        <div className="mb-8">
                            {product?.discount_price ? (
                                <div className="space-y-1">
                                    <div className="text-3xl font-black text-[var(--product-primary-color)] italic tracking-tighter">
                                        {formatIDR(selectedVariant?.final_price || (product?.final_price ?? 0))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold opacity-30 line-through italic">
                                            {formatIDR(selectedVariant?.price || product?.price)}
                                        </span>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase italic">Hemat {formatIDR(currentDiscount)}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-3xl font-black text-[var(--product-primary-color)] italic tracking-tighter">
                                    {formatIDR(currentPrice)}
                                </div>
                            )}
                        </div>

                        {/* Area Deskripsi dengan Scroll */}
                        <div className="flex-1  pr-2 mb-8 space-y-4 ">
                            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Deskripsi Produk</h4>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className="text-sm opacity-60 leading-relaxed italic font-medium"
                            />
                        </div>

                        {/* Kontrol & Aksi Terpaku di Bawah */}
                        <div className={`pt-8 border-t ${isDarkMode ? "border-slate-800" : "border-slate-200"} space-y-6`}>
                            <div>
                                {product?.variants && product?.variants?.length > 0 && (
                                    <VariantPicker
                                        variants={product?.variants}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={setSelectedVariant}
                                        isDarkMode={isDarkMode}
                                    />
                                )}

                                <div className="flex items-end justify-between gap-4 mt-2">
                                    {product?.is_qty ? (
                                        <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    ) : <div></div>}
                                    <div className="text-right">
                                        <p className={`text-[10px] font-black uppercase opacity-40 tracking-widest ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>Subtotal</p>
                                        <p className="text-xl font-black italic tracking-tighter">
                                            {formatIDR(currentFinalPrice * quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={() => addCart()}
                                className={`w-full py-6 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} rounded-[2rem] font-black uppercase italic tracking-[0.2em] text-sm shadow-2xl hover:scale-[1.02] transition-all active:scale-95 disabled:bg-gray-600 flex items-center justify-center gap-3`}
                            >
                                Checkout
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"} p-5 rounded-2xl shadow-2xl border-l-4 border-[var(--product-primary-color)]`}>
                    <h4 className="text-sm font-bold">Lanjutkan Belanja?</h4>
                    <p className="text-[10px] opacity-50 mt-1">{mockItem?.name} masuk keranjang belanja Anda.</p>
                    <div className="flex gap-2 mt-4">
                        <button onClick={() => setActiveAlert(false)} className={`flex-1 py-2 ${isDarkMode ? " bg-slate-800 text-white" : "bg-slate-800 text-white"} text-[10px] rounded-lg`}>BELANJA LAGI</button>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Eleven