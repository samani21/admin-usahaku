import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, CircleCheckBig, CircleCheckIcon, Sparkles, Tag } from 'lucide-react';
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

const Three = ({ products, isDarkMode, handleCart, selectedOutlet }: Props) => {
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

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant])

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-4 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const is_available = (p?.product_stock ?? 0) > 0;

                return (
                    <div
                        key={i}
                        onClick={() => is_available && setProduct(p)}
                        className={`group flex flex-col items-center justify-center transition-all duration-500 
                ${is_available ? "cursor-pointer" : "cursor-not-allowed opacity-80"}`}
                    >
                        {/* Image Container Circle */}
                        <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full shadow-2xl transition-all duration-500 border-[10px] 
                ${is_available ? "group-hover:-translate-y-4 shadow-black/20" : "grayscale shadow-none"} 
                ${isDarkMode ? "border-slate-800" : "border-white"}`}>

                            {/* Badge Diskon - Only show if available */}
                            {label && is_available && (
                                <div className="absolute top-2 right-2 z-1 bg-[var(--product-primary-color)] text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full uppercase italic shadow-lg border-2 border-white animate-bounce-slow">
                                    {label}
                                </div>
                            )}

                            {/* Sold Out Badge Overlay */}
                            {!is_available && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-[1px]">
                                    <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl border-2 border-black rotate-[-12deg]">
                                        Habis Terjual
                                    </span>
                                </div>
                            )}

                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src={p?.image}
                                    className={`w-full h-full object-cover transition-transform duration-700 
                            ${is_available ? "group-hover:scale-110" : ""}`}
                                    alt={p.name}
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className={`mt-8 flex flex-col items-center text-center space-y-2 transition-opacity duration-500 ${!is_available ? "opacity-50" : ""}`}>
                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">{p.category}</span>
                            <h3 className={`font-black text-sm sm:text-lg h-8 sm:h-12 uppercase italic leading-tight transition-colors line-clamp-2 
                    ${is_available ? "group-hover:text-[var(--product-primary-color)]" : "text-zinc-500"}`}>
                                {p.name}
                            </h3>

                            <div className="flex flex-col items-center gap-1">
                                <div className='h-6'>
                                    {label && is_available && (
                                        <span className="text-[12px] line-through opacity-30 font-bold">
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                </div>

                                {/* Price Button / Sold Out Button */}
                                <div className={`px-6 py-2 rounded-full font-black text-sm transition-all shadow-md 
                        ${is_available
                                        ? "bg-[var(--product-primary-color)] text-white group-hover:px-10 group-hover:bg-black group-hover:shadow-xl"
                                        : "bg-zinc-200 text-zinc-400 border border-zinc-300"}`}>
                                    {is_available ? formatIDR(finalPrice) : "OUT OF STOCK"}
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
                <div className='md:flex overflow-auto'>
                    <div className={`md:w-2/5 p-6 sm:p-12 ${isDarkMode ? "bg-slate-800" : "bg-slate-50"} flex flex-col gap-8`}>
                        <img src={selectedVariant?.image ?? product?.image} className="w-full aspect-square rounded-3xl object-cover shadow-xl" alt="" />
                        <div className="space-y-4">
                            {
                                product?.service && product?.service?.length > 0 && product?.service?.map((s, i) => (
                                    <div key={i} className={`flex items-center gap-3 text-sm font-bold opacity-60`}>
                                        <CircleCheckBig size={24} className={isDarkMode ? 'text-[var(--product-secondary-color)]' : 'text-[var(--product-primary-color)]'} />{s?.title}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="md:w-3/5 p-6 sm:p-12 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="grid ">
                                <div className='flex items-center justify-end w-full'>
                                    {
                                        product?.discount_price ?
                                            <div className="bg-rose-500 flex items-center gap-2 text-[12px] text-white px-4 py-2 rounded-2xl font-black italic">
                                                <span className='mt-1'>
                                                    <Tag size={16} />
                                                </span>
                                                -{Promo(product, selectedVariant)}
                                            </div> : ''
                                    }
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-3xl font-black">{product?.name}</h2>
                                    {
                                        product?.is_service ?
                                            <p className={`text-[var(--product-primary-color)] font-bold mt-1`}>Layanan Jasa Tersedia</p> :
                                            <p className={`text-[var(--product-primary-color)] font-bold mt-1`}>{product?.category}</p>
                                    }
                                    <div className='sm:flex items-center'>
                                        {
                                            product?.discount_price ?
                                                <p className="text-1xl font-black mr-4 line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</p> : ''
                                        }
                                        <p className="text-3xl font-black">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                                    </div>
                                </div>

                            </div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`opacity-50 text-sm`}
                            // Bisa diganti line-clamp-5 dll
                            />
                            {/* <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase opacity-30 tracking-widest">Pilih Paket Layanan</span>
                            <VariantButtons items={product?.variants} />
                        </div> */}
                            {product?.variants && product?.variants?.length > 0 ?
                                <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} /> : ""
                            }
                            {
                                product && product.is_qty ?
                                    <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                        </div>
                        <div className="sm:flex items-center gap-6 pt-4 " >
                            <div className="flex flex-col mb-4 sm:mb-0">
                                <span className="text-[10px] font-bold opacity-40 uppercase">Total</span>
                                {
                                    selectedVariant ? <span className="text-3xl font-black">{formatIDR((selectedVariant?.final_price ?? 0) * quantity)}</span> :
                                        <span className="text-3xl font-black">{formatIDR((product?.final_price ?? 0) * quantity)}</span>
                                }
                            </div>
                            <button disabled={disableButton} onClick={() => addCart()} className={`py-5 w-full bg-[var(--product-primary-color)] disabled:bg-gray-400 text-white rounded-3xl font-black flex items-center justify-center gap-3`}>
                                Order <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="bottom-center">
                <div className={`backdrop-blur-xl bg-slate-900 border border-emerald-500/20 p-4 rounded-full flex items-center justify-between gap-4 px-6 shadow-2xl`}>
                    <Sparkles className={'text-white'} size={20} />
                    <p className="text-sm font-bold text-white">Produk masuk keranjang!</p>
                    <div className="w-px h-4 bg-emerald-500/20" />
                    <button onClick={() => setActiveAlert(false)} className={`text-[10px] text-end  uppercase text-[var(--product-secondary-color)]`}>Tutup</button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Three