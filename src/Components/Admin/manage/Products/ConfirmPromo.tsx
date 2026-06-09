import Alert from '@/Components/Component/Alert';
import Loading from '@/Components/Component/Loading';
import { ProductPromoHistoryType } from '@/types/Admin/ProductPromoHistoriesType';
import { ProductsType } from '@/types/Admin/ProductsType'
import { AlertType } from '@/types/Alert';
import { Get } from '@/utils/Get';
import { Post } from '@/utils/Post';
import { ArrowLeft, Banknote, Calendar, Check, Clock, History, Info, Sparkles, Tag, TrendingDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
    productInfo: ProductsType | null;
    onBack: () => void;
    fetchProducts: () => void;
}
const formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' } as any;
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const ConfirmPromo = ({ productInfo, onBack, fetchProducts }: Props) => {
    const [promoName, setPromoName] = useState('');
    const [promoType, setPromoType] = useState<'percentage' | 'nominal'>('percentage');
    const [selectedHistory, setSelectedHistory] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [useGlobal, setUseGlobal] = useState<boolean>(false);
    const [globalValue, setGlobalValue] = useState<string | "">("");
    const [selectedVariantIds, setSelectedVariantIds] = useState(productInfo?.variants.map(v => v.id));
    const [variants, setVariants] = useState(productInfo?.variants);
    const [showAlert, setShowAlert] = useState<AlertType | null>(null)
    const [promoHistories, setPromoHistories] = useState<ProductPromoHistoryType[]>();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        getPromoHistory();
        setUseGlobal(productInfo?.variants && productInfo?.variants?.length > 0 ? (productInfo?.is_global ?? false) : true)
        setSelectedVariantIds(
            productInfo?.variants
                ?.filter((v) => v?.discount_price || v?.percent_discount)
                ?.map((v) => v?.id) || []
        );

        if (productInfo?.promo_id) {
            setSelectedHistory(productInfo?.promo_id);
            setStartDate(productInfo?.start_date ?? '');
            setEndDate(productInfo?.end_date ?? '');
            setPromoName(productInfo.name_promo ?? '');
            setPromoType(productInfo.type as 'percentage' | 'nominal');
            if (productInfo?.is_global) {
                setGlobalValue(String(productInfo?.percent_discount ?? productInfo?.discount_price))
            }
        }
    }, [productInfo]);

    const handleApplyHistory = (item: ProductPromoHistoryType) => {
        setSelectedHistory(item.id);
        setEndDate(item?.end_date ?? '');
        setStartDate(item.start_date ?? '');
        setPromoName(item.name_promo);
        setPromoType(item.type as 'percentage' | 'nominal');
        setGlobalValue(item.type === 'percentage' ? String(item?.percent) : String(item.price));
        setUseGlobal(true);
    };

    const toggleVariantSelection = (id: number) => {
        if (selectedVariantIds?.includes(id)) {
            setSelectedVariantIds(selectedVariantIds?.filter(vId => vId !== id));
        } else {
            setSelectedVariantIds([...(selectedVariantIds ?? []), id]);
        }
    };
    const updateVariantValue = (id: number, val: any) => {
        setVariants(variants?.map(v => v.id === id ? { ...v, customValue: val } : v));
    };
    const calculateDiscount = (originalPrice: number, val: any) => {
        if (!val || val <= 0) return { price: originalPrice, savings: 0, percent: 0 };
        const numVal = parseFloat(val);
        let discounted = originalPrice;
        let savings = 0;
        let percent = 0;
        if (promoType === 'percentage') {
            savings = originalPrice * (numVal / 100);
            percent = numVal;
            discounted = originalPrice - savings;
        } else {
            savings = numVal;
            percent = (numVal / originalPrice) * 100;
            discounted = originalPrice - numVal;
        }
        const finalPrice = discounted < 0 ? 0 : discounted;
        return { price: finalPrice, savings: savings, percent: percent > 100 ? 100 : percent };
    };

    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('product_id', String(productInfo?.id));
            formData.append('name_promo', promoName);
            formData.append('type', promoType);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            if (useGlobal) {
                formData.append('is_global', "1");
                if (promoType == 'percentage') {
                    formData.append('percent', String(globalValue));
                }
                if (promoType == 'nominal') {
                    formData.append('price', String(globalValue));
                }
            } else {
                const idVariant = selectedVariantIds && selectedVariantIds[0];
                const variant = variants?.find((v) => v?.id == idVariant);
                formData.append('is_global', "0");
                if (promoType == 'percentage') {
                    formData.append('percent', String(variant?.customValue ?? variant?.percent_discount));
                }
                if (promoType == 'nominal') {
                    formData.append('price', String(variant?.customValue ?? variant?.discount_price));
                }
            }

            for (let i = 0; variants && variants?.length > i; i++) {
                formData.append(`variant[${i}][id]`, String(variants[i]?.id))
                if (variants[i]?.id === (selectedVariantIds?.find((s) => s === variants[i]?.id))) {
                    formData.append(`variant[${i}][is_promo]`, "1")
                } else {
                    formData.append(`variant[${i}][is_promo]`, "0")
                }

                if (useGlobal) {
                    if (promoType == 'percentage') {
                        formData.append(`variant[${i}][percent]`, String(globalValue));
                    }
                    if (promoType == 'nominal') {
                        formData.append(`variant[${i}][price]`, String(globalValue));
                    }
                } else {
                    if (promoType == 'percentage') {
                        formData.append(`variant[${i}][percent]`, String(variants[i]?.customValue ?? variants[i]?.percent_discount));
                    }
                    if (promoType == 'nominal') {
                        formData.append(`variant[${i}][price]`, String(variants[i]?.customValue ?? variants[i]?.discount_price));
                    }
                }
            }

            const res = await Post<any, FormData>('product-promo-history', formData);
            if (res) {
                getPromoHistory()
                fetchProducts()
                setSelectedHistory(res?.data?.id)
                setShowAlert({
                    type: 'success',
                    message: 'Berhasil update data',
                    isOpen: true
                })
            }
        } catch (e: any) {
            setShowAlert({
                type: 'error',
                message: 'Gagal proses data, ' + e.message,
                isOpen: true
            })
            setLoading(false)
            console.log(e.message || "Gagal mengambil data");
        }
    }

    const getPromoHistory = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean; data: ProductPromoHistoryType[]; }>(`product-promo-history?product_id=${productInfo?.id}&limit=99999`);
            if (res) {
                setPromoHistories(res?.data)
                setLoading(false)
            }
        } catch (e: any) {
            setLoading(false)
            console.log(e.message || "Gagal mengambil data");
        }
    }

    return (
        <>
            <div className="flex-1 overflow-y-auto  lg:p-8">
                <div className="mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <div>
                            <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 mb-1.5 group transition-all font-bold text-[12px] uppercase tracking-widest">
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                                Kembali
                            </button>
                            <h2 className="heading-font text-2xl font-extrabold text-slate-900 tracking-tight">Pengaturan Diskon</h2>
                        </div>
                        <button onClick={HandleSubmit} className="hidden sm:flex heading-font bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center gap-2 tracking-wide">
                            <Sparkles className="w-3.5 h-3.5" /> Simpan Promo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-6">

                            {/* Product Info Compact */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-5 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 p-2 flex items-center justify-center">
                                    <img src={productInfo?.image} alt={productInfo?.name} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[12px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md uppercase tracking-wider mb-1 inline-block">
                                        {productInfo?.category}
                                    </span>
                                    <h3 className="heading-font text-lg font-bold text-slate-800 leading-tight">{productInfo?.name}</h3>
                                    <p className="text-[11px] text-slate-400 font-medium mt-1 flex items-center gap-3">
                                        <span>{productInfo?.variants?.length} Varian</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span>Stok: {productInfo?.variants?.reduce((a, b) => a + (b.stock ?? 0), 0)}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Configuration Card */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                                <div className="sm:flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center heading-font font-bold text-lg">1</div>
                                        <h4 className="heading-font font-bold text-slate-800 text-base">Metode Promo</h4>
                                    </div>

                                    {productInfo?.variants && productInfo?.variants?.length > 0 && (
                                        <div className="bg-slate-50 p-1 rounded-xl flex border mt-2 border-slate-100">
                                            <button onClick={() => setUseGlobal(true)} className={`w-full px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${useGlobal ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>GLOBAL</button>
                                            <button onClick={() => setUseGlobal(false)} className={`w-full px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${!useGlobal ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>CUSTOM</button>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Nama Promo</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                                            <Tag className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={promoName}
                                            onChange={(e) => setPromoName(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:border-emerald-500 outline-none text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-300"
                                            placeholder="Contoh: Promo Ramadhan Heboh"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <button onClick={() => setPromoType('percentage')} className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${promoType === 'percentage' ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${promoType === 'percentage' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-300'}`}>
                                            <span className="text-lg font-bold">%</span>
                                        </div>
                                        <span className="heading-font font-bold text-slate-800 text-xs">Persen</span>
                                    </button>
                                    <button onClick={() => setPromoType('nominal')} className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${promoType === 'nominal' ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${promoType === 'nominal' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-300'}`}>
                                            <Banknote className="w-5 h-5" />
                                        </div>
                                        <span className="heading-font font-bold text-slate-800 text-xs">Nominal</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Tanggal Mulai</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:border-emerald-500 outline-none text-xs font-semibold text-slate-900 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Tanggal Berakhir</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:border-emerald-500 outline-none text-xs font-semibold text-slate-900 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {(useGlobal || !(productInfo?.variants && productInfo?.variants?.length > 0)) && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Nilai Diskon</label>
                                            <div className="relative">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-xl text-slate-300">
                                                    {promoType === 'percentage' ? '%' : 'Rp'}
                                                </div>
                                                <input
                                                    type="number"
                                                    value={globalValue}
                                                    onChange={(e) => setGlobalValue(e.target.value)}
                                                    // Tambahkan baris di bawah ini:
                                                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 pl-16 pr-6 focus:bg-white focus:border-emerald-500 outline-none heading-font font-bold text-3xl text-slate-900 transition-all placeholder:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        {/* Simulasi Card Compact */}
                                        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">Simulasi Harga Final</p>
                                                    <h5 className="heading-font text-2xl font-bold text-emerald-400">
                                                        Rp {calculateDiscount((productInfo?.price ?? 0), globalValue).price?.toLocaleString()}
                                                    </h5>
                                                </div>
                                                <div className="md:text-right flex flex-col md:items-end gap-1">
                                                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-bold border border-emerald-500/20">
                                                        <TrendingDown className="w-3.5 h-3.5" /> Hemat Rp {calculateDiscount((productInfo?.price ?? 0), globalValue).savings?.toLocaleString()}
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 font-medium">Awal: Rp {(productInfo?.price ?? 0)?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="mt-5 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 transition-all duration-700 shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: `${calculateDiscount((productInfo?.price ?? 0), globalValue).percent}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Variants Table Compact */}
                            {productInfo?.variants && productInfo?.variants?.length > 0 && (
                                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center heading-font font-bold text-lg">2</div>
                                        <h4 className="heading-font font-bold text-slate-800 text-base tracking-tight">Varian Produk</h4>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="text-slate-400 text-[12px] font-bold uppercase tracking-widest border-b border-slate-50">
                                                    <th className="py-5 px-6 w-12 text-center">Set</th>
                                                    <th className="py-5 px-4">Info Ukuran</th>
                                                    <th className="py-5 px-4 text-center">Diskon</th>
                                                    <th className="py-5 px-6 text-right">Harga Akhir</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {variants?.map((v) => {
                                                    const isSelected = selectedVariantIds?.includes(v.id);
                                                    const currentVal = useGlobal ? globalValue : v.customValue;
                                                    const res = calculateDiscount(v.price, currentVal);

                                                    return (
                                                        <tr key={v.id} className={`${isSelected ? 'bg-emerald-50/5' : 'opacity-40'} transition-all`}>
                                                            <td className="py-4 px-6">
                                                                <button onClick={() => toggleVariantSelection(v.id)} className={`w-5 h-5 rounded-md border-2 mx-auto flex items-center justify-center transition-all ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'border-slate-200 bg-white'}`}>
                                                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                                                </button>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <span className="font-bold text-slate-800 block text-xs"> {v.name}</span>
                                                                <span className="text-[10px] text-slate-400 font-medium">Rp {v.price?.toLocaleString()}</span>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                {isSelected ? (
                                                                    useGlobal ? (
                                                                        <div className="bg-slate-100 text-slate-600 text-[12px] font-bold px-3 py-1 rounded-md inline-block">
                                                                            {promoType === 'percentage' ? `${globalValue || 0}%` : `Rp ${Number(globalValue || 0)?.toLocaleString()}`}
                                                                        </div>
                                                                    ) : (
                                                                        <input
                                                                            type="number"
                                                                            value={v.customValue ?? 0}
                                                                            onChange={(e) => updateVariantValue(v.id, e.target.value)}
                                                                            className="w-20 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[11px] font-bold focus:bg-white focus:border-emerald-500 outline-none text-center"
                                                                            placeholder="0"
                                                                        />
                                                                    )
                                                                ) : <span className="text-[12px] font-medium text-slate-300">-</span>}
                                                            </td>

                                                            <td className="py-4 px-6 text-right">
                                                                <span className={`heading-font font-bold text-lg ${isSelected && currentVal ? 'text-emerald-600' : 'text-slate-800'}`}>
                                                                    Rp {isSelected ? res.price?.toLocaleString() : v.price?.toLocaleString()}
                                                                </span>
                                                                {isSelected && res.percent > 0 && (
                                                                    <div className="text-[8px] font-bold text-emerald-500 uppercase mt-0.5 tracking-tighter">
                                                                        OFF {res.percent.toFixed(0)}%
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Right Compact */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <History className="w-4 h-4 text-slate-400" />
                                    <h5 className="heading-font font-bold text-slate-800 text-lg">Riwayat Promo</h5>
                                </div>
                                <div className="space-y-3">
                                    {promoHistories?.map((item) => {
                                        const priceProduct = productInfo?.price ?? 0;
                                        const promoPrice = item?.price
                                        const percent = item.percent ?? 100 - (((priceProduct - promoPrice) / priceProduct) * 100);
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => handleApplyHistory(item)}
                                                className={`w-full text-left p-4 rounded-xl border transition-all active:scale-95 ${selectedHistory === item.id ? 'border-emerald-600 bg-emerald-600 text-white shadow-md' : 'border-slate-50 bg-slate-50 hover:border-slate-100 hover:bg-white'}`}
                                            >
                                                <span className={`text-[8px] font-bold uppercase tracking-widest block mb-1.5 ${selectedHistory === item.id ? 'text-emerald-100' : 'text-slate-400'}`}>{formatDate(item.created_at)}</span>
                                                <span className="font-bold text-xs block mb-3 leading-none">{item.name_promo}</span>
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-[10px] font-bold">
                                                        {item.type === 'percentage' ? `${item.percent}% OFF` : `Rp ${item.price?.toLocaleString()}`}
                                                    </span>
                                                    <div className="flex-1 h-1 rounded-full bg-black/5 overflow-hidden">
                                                        <div className={`h-full rounded-full ${selectedHistory === item.id ? 'bg-white' : 'bg-emerald-500'}`} style={{ width: `${percent}%` }}></div>
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
                                <h5 className="heading-font font-bold text-lg mb-4 relative z-10 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-emerald-200" /> Bantuan
                                </h5>
                                <div className="relative z-10 text-[14px] font-medium leading-relaxed opacity-90 space-y-3">
                                    <p>Diskon akan langsung tampil di etalase setelah Anda menekan tombol simpan.</p>
                                    <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-[10px]">
                                        <span className="font-bold">Info:</span> Pastikan harga jual tidak di bawah harga modal (COGS).
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Action Compact */}
            <div className="md:hidden p-4 bg-white border-t border-slate-100 sticky bottom-0 z-50">
                <button className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-[11px] font-bold shadow-lg uppercase tracking-widest">
                    Simpan Promo
                </button>
            </div>
            {loading && <Loading title='Sedang Proses' />}
            {
                showAlert?.isOpen &&
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            }
        </>
    )
}

export default ConfirmPromo