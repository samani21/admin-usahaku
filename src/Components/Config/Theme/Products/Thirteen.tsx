import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Tag, X } from 'lucide-react';
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

const Thirteen = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
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
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`text-center group flex flex-col items-center transition-all duration-700 
                ${is_available ? "cursor-pointer" : "cursor-not-allowed opacity-40 grayscale"}`}
                    >
                        {/* Frame Gambar */}
                        <div className={`aspect-[4/5] w-full mb-8 overflow-hidden relative 
                ${isDarkMode ? "bg-slate-900" : "bg-slate-50"} 
                ${!is_available ? "ring-1 ring-inset ring-current/10" : ""}`}>

                            <img
                                src={p.image}
                                className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out 
                        ${is_available
                                        ? (isDarkMode ? "mix-blend-normal opacity-70 group-hover:opacity-100 group-hover:scale-110"
                                            : "mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-110")
                                        : "opacity-20"}`}
                                alt={p.name}
                            />

                            {/* Decorative Border Frame - Hanya muncul jika tersedia */}
                            {is_available && (
                                <div className="absolute inset-0 border border-current m-4 sm:m-6 opacity-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none" />
                            )}

                            {/* Label Status */}
                            {label && is_available ? (
                                <div className="absolute top-0 right-0 bg-rose-600 text-white px-4 py-2 text-[10px] tracking-[0.2em] font-black z-1 shadow-lg">
                                    {label}
                                </div>
                            ) : !is_available && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[10px] tracking-[0.4em] uppercase font-light border-y border-current/20 py-2 px-4">
                                        Archive / Sold
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Info Produk Minimalist */}
                        {p.category && (
                            <p className={`text-[9px] sm:text-[10px] tracking-[0.6em] uppercase mb-4 transition-opacity 
                    ${is_available ? "opacity-40 group-hover:opacity-100" : "opacity-20"}`}>
                                {p.category}
                            </p>
                        )}

                        <h3 className={`text-md sm:text-lg font-light tracking-[0.2em] uppercase leading-relaxed mb-4 line-clamp-1 
                ${!is_available ? "text-current/50" : ""}`}>
                            {p.name}
                        </h3>

                        {/* Decorative Line - Statis jika habis */}
                        <div className={`h-px bg-current transition-all duration-700 mb-4 
                ${is_available ? "w-10 opacity-20 group-hover:w-20 group-hover:opacity-50" : "w-6 opacity-10"}`}
                        />

                        {/* Price Display */}
                        <div className="flex flex-col items-center gap-1">
                            {label && is_available && (
                                <span className="text-[10px] opacity-30 line-through tracking-widest uppercase">
                                    {formatIDR(p.price)}
                                </span>
                            )}
                            <span className={`font-bold text-sm tracking-widest ${!is_available ? "opacity-30 font-light" : ""}`}>
                                {is_available ? formatIDR(finalPrice) : "Out of Stock"}
                            </span>
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
                <div className="w-full flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 md:p-12 space-y-12 overflow-auto no-scrollbar">
                        <img src={selectedVariant?.image ?? product?.image} className="sm:hidden max-h-50 rounded-[24px] w-full h-full object-cover" alt="" />
                        <div className="space-y-4">
                            {
                                product?.category &&
                                <span className={`sm:hidden text-md font-black italic opacity-40 tracking-[0.2em] border-b ${isDarkMode ? "border-white/10 " : "border-black/10"} pb-2`}>{product?.category}</span>
                            }
                            <h2 className="text-xl sm:text-3xl font-black italic tracking-tighter leading-none">{product?.name}</h2>
                        </div>
                        <div className="space-y-2">
                            {/* <p className="text-2xl font-serif italic leading-relaxed opacity-80">"Kualitas bukan sekadar janji, tapi sebuah warisan yang kami tuangkan dalam setiap produk."</p> */}
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`text-sm opacity-70 leading-relaxed font-light`}
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-8 bg-black/5 dark:bg-white/5 p-6 md:p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5">
                                <div className="space-y-2">
                                    <div className="grid md:flex md:flex-wrap items-baseline md:gap-3">
                                        <span className="text-xl md:text-3xl font-black tracking-tighter text-rose-500 italic">
                                            {formatIDR(currentFinalPrice)}
                                        </span>
                                        {currentDiscount > 0 && (
                                            <span className="text-lg md:text-xl opacity-20 line-through italic font-black">
                                                {formatIDR(currentPrice)}
                                            </span>
                                        )}
                                    </div>

                                    {currentDiscount > 0 && (
                                        <div className="flex items-center gap-2 text-emerald-500 font-black italic text-sm animate-pulse">
                                            <Tag size={16} />
                                            HEMAT {formatIDR(currentDiscount)} {product?.percent_discount && `(${Promo(product, selectedVariant)})`}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    {product?.variants && product?.variants?.length > 0 && (
                                        <VariantPicker
                                            variants={product?.variants}
                                            selectedVariant={selectedVariant}
                                            setSelectedVariant={setSelectedVariant}
                                            isDarkMode={isDarkMode}
                                        />
                                    )}

                                    <div className='flex items-center justify-between gap-4'>
                                        {product?.is_qty ? (
                                            <QtySelector product={product} selectedVariant={selectedVariant} quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                        ) : <div></div>}
                                        <div className='text-right'>
                                            <p className={`text-[10px] font-bold uppercase opacity-40 ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>Subtotal</p>
                                            <p className='text-lg md:text-xl font-black italic tracking-tighter'>
                                                {formatIDR((currentFinalPrice) * quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button disabled={disableButton} onClick={() => addCart()} className={`px-12 disabled:bg-gray-600  py-6 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} rounded-full font-black uppercase italic tracking-widest text-sm hover:scale-105 transition-transform active:scale-95`}>Mulai Pesan</button>
                        </div>
                    </div>
                    <div className="hidden sm:grid md:w-1/2 relative min-h-[400px]">
                        <img src={selectedVariant?.image ?? product?.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                        {product?.category &&
                            <div className={`absolute top-12 left-0 -ml-8 px-8 py-4 ${isDarkMode ? "bg-slate-900" : 'bg-white'} shadow-2xl rounded-2xl font-black italic text-xl transform -rotate-6`}>{product?.category}</div>
                        }
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`bg-[var(--product-primary-color)] text-white rounded-full p-1 pl-4 flex items-center gap-4 shadow-2xl`}>
                    <span className="text-xs font-black uppercase tracking-tighter italic w-full">{mockItem?.name} Ok!</span>
                    <div onClick={() => setActiveAlert(false)} className="p-2 bg-white text-indigo-600 rounded-full cursor-pointer">
                        <X size={14} />
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Thirteen