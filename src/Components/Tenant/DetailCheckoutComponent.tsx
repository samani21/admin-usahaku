"use client"
import React, { useCallback, useEffect, useState } from 'react';
import {
    ShoppingBag,
    CreditCard,
    Banknote,
    QrCode,
    Upload,
    ArrowLeft,
    CheckCircle2,
    Smartphone,
    Camera,
    Sun,
    Moon,
    Store,
    Plus,
    Minus,
    Trash2,
    Info,
    ChevronRight,
    Copy,
    AlertTriangle,
    PhoneCall
} from 'lucide-react';
import { Get } from '@/utils/Get';
import Loading from '../Component/Loading';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { BanksType } from '@/types/Admin/Banks';
import { Post } from '@/utils/Post';
import { QRCodeCanvas } from 'qrcode.react';
import { CatalogHeaderType } from '@/types/Admin/Catalog/Header';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface CartItemsType {
    id: number;
    device_id: number;
    business_id: number;
    product_id: number;
    variant_id: number;
    qty: number;
    price: number;
    subtotal: number;
    name_product: string;
    iamge_product: string;
    name_variant: string;
    iamge_variant: string;
}

interface CartsType {
    items: CartItemsType[];
    total: number;
    banks: BanksType[];
    payment_method: string;
    payment_status: string;
    payment_proof?: string;
    customer_name: string;
    slug: string;
    outlet: string;
    phone_number: string;
    qr_order?: string;
    grand_total: number;
    total_price: number;
    unique_code: number;
    header: CatalogHeaderType;
    id: number
}

const getContrastColor = (hex: string | undefined) => {
    if (!hex) return '#1e293b';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
};

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const DetailCheckoutComponent = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { token } = useParams();
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const [darkMode, setDarkMode] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [modalBeforePaid, setModalBeforePaid] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showMobileUpload, setShowMobileUpload] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [header, setHeader] = useState<CatalogHeaderType | null>(null);
    const [filePaymentProof, setPaymentProof] = useState<File | null>(null);
    const [disableButtonProof, setDisableButtonProof] = useState<boolean>(true);
    const [dataOrder, setDataOrder] = useState<CartsType | null>(null);
    const updateCssVariables = useCallback((type: 'header', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        setPaymentProof(file);
        setDisableButtonProof(false)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(String(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        getOrders()
    }, [])

    const handlePaymentProof = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (filePaymentProof) {
                formData.append('payment_proof', filePaymentProof);
            }
            const res = await Post<any, any>(`customer/paymen-proof/${dataOrder?.id}`, formData)
        } catch (e: any) {
            setImagePreview(e?.raw?.response?.data?.data)
        } finally {
            setDisableButtonProof(true)
            setLoading(false);
        }
    }
    const handleCancelledOrder = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('status', 'cancelled');
            formData.append('payment_status', 'cancelled');
            const res = await Post<any, any>(`customer/paymen-proof/${dataOrder?.id}`, formData)
        } catch (e: any) {
        } finally {
            setDisableButtonProof(true)
            setLoading(false);
        }
    }

    if (showMobileUpload) {
        return (
            <div className={`${darkMode ? 'dark bg-[#0a0f18]' : 'bg-gray-50'} min-h-screen transition-colors duration-300 p-6 flex flex-col items-center`}>
                <div className={`w-full max-w-md ${darkMode ? "bg-[#161d2a] border-gray-800" : " bg-white border-gray-200"} rounded-3xl p-8 border shadow-2xl`}>
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={() => setShowMobileUpload(false)} className={`p-2 ${darkMode ? 'bg-[#0f1520] text-white' : "bg-gray-100"} rounded-xl`}>
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className={`text-xl font-bold ${darkMode && "text-white"}`}>Upload Bukti</h2>
                        <div className="w-10"></div>
                    </div>
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-[var(--header-primary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="text-[var(--header-primary-color)]" size={32} />
                        </div>
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>Ambil foto struk atau screenshot transfer Anda.</p>
                    </div>
                    <label className="block w-full border-2 border-dashed border-[var(--header-primary-color)]/50 bg-[var(--header-primary-color)]/5 rounded-2xl p-10 text-center cursor-pointer hover:bg-[var(--header-primary-color)]/10 transition-all">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => { handleFileUpload(e); setShowMobileUpload(false); }} />
                        <Upload className="mx-auto mb-4 text-[var(--header-primary-color)]" size={40} />
                        <p className={`${darkMode && 'text-white'} font-bold `}>Pilih File / Kamera</p>
                    </label>
                </div>
            </div>
        );
    }

    // if (modalBeforePaid) {
    //     return (
    //         <div className={`${darkMode ? 'dark bg-[#0a0f18]' : 'bg-gray-50'} min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300`}>
    //             <div className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-10 rounded-3xl text-center max-w-md w-full shadow-2xl border `}>
    //                 <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
    //                 <h2 className={`text-xl lg:text-3xl font-bold mb-2 ${darkMode && "text-white"}`}>Pesanan Diterima!</h2>
    //                 <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
    //                     {dataOrder?.payment_method === 'cash'
    //                         ? 'Silakan datang ke kasir untuk menyelesaikan pembayaran.'
    //                         : 'Pembayaran Anda sedang kami verifikasi. Mohon tunggu sebentar.'}
    //                 </p>
    //                 <button
    //                     onClick={() => setModalBeforePaid(false)}
    //                     className="w-full py-4 bg-[var(--header-primary-color)] hover:bg-[var(--header-primary-color)] text-white rounded-xl font-bold transition-all"
    //                 >
    //                     Selesai
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }
    const getOrders = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean, data: CartsType }>(`customer/show-order?token=${token}`);
            if (res?.success) {
                setHeader(res?.data.header);
                setDataOrder(res?.data);
                // setIsPaid(res?.data?.payment_status === 'paid' || res?.data?.payment_status === 'pending_verification');
                setModalBeforePaid(res?.data?.payment_status === 'paid' || res?.data?.payment_status === 'pending_verification');
                setIsPaid(res?.data?.payment_status === 'paid');
                setImagePreview(res?.data?.payment_proof ?? null)
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
            }
        } catch (e: any) {

        } finally {
            setLoading(false)

        }
    }

    // const invalidItems = items.filter((item) => item.qty > maxStock);
    const url = segments
        ?.map((s, i) =>
            i + 2 < segments?.length
                ? `/${s}`
                : ""
        )
        .join("");
    return (
        <div className={`${darkMode ? 'dark bg-[#0a0f18] text-white' : 'bg-gray-50 text-gray-900'} min-h-screen font-sans p-4 md:p-8 transition-colors duration-300`}>
            {/* Header */}
            <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
                <Link href={String(url) + '/history'} className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"} hover:text-[var(--header-primary-color)] transition-colors`}>
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Kembali</span>
                </Link>
                <div className="flex items-center gap-2">
                    {
                        header?.logo && <img src={header?.logo} className='w-18 h-18 rounded-md' />
                    }
                    <span className="text-xl font-bold italic text-[var(--header-primary-color)]">{header?.span_one}<span className={darkMode ? "text-white" : "text-gray-900"}>{header?.span_two}</span></span>
                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-3 rounded-xl ${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} border   shadow-sm flex items-center gap-2 transition-all hover:scale-105`}
                >
                    {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
                    <span className="text-xs font-bold uppercase hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
                </button>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-6 rounded-3xl border shadow-sm`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <CreditCard className="text-emerald-500" /> Metode Pembayaran
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className={`space-y-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"} pt-6 text-[13px]`}>
                                <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    <span>Subtotal</span>
                                    <span>Rp {(Number(dataOrder?.total_price)).toLocaleString('id-ID')}</span>
                                </div>
                                <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    <span>Pembayaran Uniq</span>
                                    <span>Rp {(Number(dataOrder?.unique_code)).toLocaleString('id-ID')}</span>
                                </div>
                                {/* <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <span>Ongkos Kirim</span>
                                <span className="text-green-600 font-bold">Rp {shipping.toLocaleString('id-ID')}</span>
                            </div> */}
                                <div className={`flex justify-between text-lg font-black pt-4 border-t ${darkMode ? "text-white border-gray-800" : "border-gray-100"} mt-4`}>
                                    <span>Total Bayar</span>
                                    <span className="text-emerald-500">Rp {(Number(dataOrder ? (dataOrder?.grand_total) : 0)).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                            {['cash', 'transfer', 'qris'].map((method) => (
                                method === dataOrder?.payment_method && <button
                                    key={method}
                                    className={`p-4 rounded-2xl border-2 flex items-center justify-center  transition-all flex flex-col items-center gap-3 relative overflow-hidden ${dataOrder?.payment_method === method
                                        ? `border-emerald-500 ${darkMode ? "bg-emerald-500/10" : "bg-emerald-50"}`
                                        : `${darkMode ? "border-gray-800 bg-[#0f1520]" : "border-gray-100 bg-gray-50"} hover:border-emerald-200`
                                        }`}
                                >
                                    {dataOrder?.payment_method === method && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        </div>
                                    )}

                                    {/* Icon Picker */}
                                    {method === 'cash' && <Banknote size={32} className={dataOrder?.payment_method === 'cash' ? 'text-emerald-500' : 'text-gray-400'} />}
                                    {method === 'transfer' && <CreditCard size={32} className={dataOrder?.payment_method === 'transfer' ? 'text-emerald-500' : 'text-gray-400'} />}
                                    {method === 'qris' && <QrCode size={32} className={dataOrder?.payment_method === 'qris' ? 'text-emerald-500' : 'text-gray-400'} />}

                                    <span className={`font-semibold capitalize ${dataOrder?.payment_method === method
                                        ? (darkMode ? "text-white" : "text-emerald-600")
                                        : "text-gray-500"
                                        }`}>
                                        {method === 'cash' ? 'Tunai' : method === 'transfer' ? 'Transfer Bank' : 'QRIS'}
                                    </span>
                                </button>
                            ))
                            }
                        </div>

                        {/* Area Instruksi Dinamis */}
                        {dataOrder?.payment_method && (
                            <div className={`mt-8 p-6 ${darkMode ? "bg-[#0f1520] border-gray-800" : "bg-gray-50 border-gray-200"} rounded-2xl border animate-in fade-in zoom-in-95 duration-300`}>
                                {/* Header */}
                                <h4 className={`text-sm font-bold mb-6 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                    <Info size={16} className="text-emerald-500" />
                                    Instruksi Pembayaran {dataOrder?.payment_method === 'cash' ? 'Tunai' : dataOrder?.payment_method === 'transfer' ? 'Transfer' : 'QRIS'}
                                </h4>

                                {/* Main Content Layout */}
                                {dataOrder?.payment_method === 'cash' ? (
                                    /* ================= KONDISI: CASH ================= */
                                    <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
                                        <div className="space-y-4 flex-1 w-full">
                                            <div className={`flex gap-4 items-start ${darkMode ? "bg-blue-900/20 border-blue-900/30" : "bg-blue-50 border-blue-100"} p-5 rounded-xl border`}>
                                                <Store className="text-blue-600 shrink-0 mt-0.5" size={24} />
                                                <div className={`text-xs ${darkMode ? "text-blue-300" : "text-blue-800"} leading-relaxed`}>
                                                    <p className="font-bold mb-2 text-sm">Langkah Pembayaran:</p>
                                                    <ul className="list-decimal list-inside space-y-2 opacity-90">
                                                        <li>Selesaikan pesanan Anda.</li>
                                                        <li>Kunjungi <span className="font-semibold">{dataOrder?.outlet}</span>.</li>
                                                        <li><b>Tunjukkan QR code di samping</b> kepada kasir untuk proses yang lebih cepat.</li>
                                                        <li>Lakukan pembayaran sesuai total belanja Anda.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* QR Code Token untuk Kasir */}
                                        <div className='flex items-center justify-center my-2'>
                                            <div className={`shrink-0 p-4 text-center ${darkMode ? "bg-slate-800 border-gray-700" : "bg-white border-gray-200"} sm:w-auto  dark: rounded-xl border shadow-sm`}>
                                                <div className='bg-slate-100 p-2 rounded-lg'>
                                                    <QRCodeCanvas value={String(dataOrder?.qr_order)} size={120} />
                                                </div>
                                                <span className="text-[10px] text-gray-400 mt-2 font-medium tracking-wider">QR konfirmasi pesanan</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* ================= KONDISI: NON-CASH (TRANSFER / QRIS) ================= */
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                        {/* Panel Kiri: Aksi QR / Visual Bank (Lebar: 2/5) */}
                                        <div className="md:col-span-2 flex flex-col justify-center">
                                            {dataOrder?.payment_method === 'qris' ? (
                                                <div className="space-y-4 text-center">
                                                    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 inline-block">
                                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS_DEMO" alt="QRIS" className="w-36 h-36 mx-auto" />
                                                    </div>
                                                    <p className="text-[11px] text-gray-500 font-medium italic max-w-xs mx-auto leading-relaxed">
                                                        Pindai kode QR di atas menggunakan aplikasi bank atau e-wallet (Gopay/OVO/Dana).
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {dataOrder?.banks?.map((b, i) => (
                                                        <div key={i} className={`p-4 ${darkMode ? "border-gray-700 bg-[#1a2333]" : "bg-white border-gray-200"} rounded-xl border shadow-sm`}>
                                                            <div className="flex justify-between items-center mb-3">
                                                                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{b?.master_bank?.name}</span>
                                                                <img src={b?.master_bank?.logo} alt={b?.master_bank?.name} className="h-4 object-contain" />
                                                            </div>
                                                            <p className="text-[11px] text-gray-400 mb-1">Nomor Rekening:</p>
                                                            <div className={`flex items-center justify-between  ${darkMode ? "bg-[#0f1520]" : "bg-gray-50"}   p-2 rounded-lg border border-gray-100 dark:border-gray-800/50`}>
                                                                <p className={`text-base font-mono font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{b?.account_number}</p>
                                                                <button className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Salin Rekening">
                                                                    <Copy size={14} />
                                                                </button>
                                                            </div>
                                                            <p className="text-[11px] text-gray-500 mt-2 font-medium">a/n {b?.account_name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Panel Kanan: Upload Bukti & Tombol Submit (Lebar: 3/5) */}
                                        <div className={`md:col-span-3 border-t md:border-t-0 md:border-l ${darkMode ? "border-gray-800" : "border-gray-200"} pt-6 md:pt-0 md:pl-8 flex flex-col justify-between`}>
                                            <div>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Upload Bukti Transfer</p>
                                                <label className={`relative group cursor-pointer block border-2 border-dashed ${darkMode ? "bg-[#1a2333] border-gray-700 hover:border-gray-500" : "border-gray-300 bg-white hover:border-blue-400"} rounded-2xl p-6 text-center transition-all`}>
                                                    {
                                                        dataOrder?.payment_status === 'unpaid' || dataOrder?.payment_status === 'pending_verification' ?
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} /> : ""
                                                    }
                                                    {imagePreview ? (
                                                        <div className="relative py-2">
                                                            <img src={imagePreview} alt="Preview" className="h-32 mx-auto rounded-lg shadow-md object-cover" />
                                                            {
                                                                (dataOrder?.payment_status === 'unpaid' || dataOrder?.payment_status === 'pending_verification') &&
                                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                                                                    <span className="text-xs text-white font-semibold bg-gray-900/80 px-3 py-1.5 rounded-md">Ganti Foto</span>
                                                                </div>
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div className="py-4">
                                                            <div className={`w-12 h-12 ${darkMode ? "bg-[#0f1520]" : "bg-gray-50"} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                                                <Upload className="text-gray-400 group-hover:text-blue-500" size={20} />
                                                            </div>
                                                            <span className="text-xs text-gray-500 block font-medium">Klik untuk pilih file atau foto struk</span>
                                                            <span className="text-[10px] text-gray-400 italic mt-1 block">Maks. 5MB (JPG, PNG)</span>
                                                        </div>
                                                    )}
                                                </label>

                                                <div className="mt-4 flex items-start gap-2 text-[11px] text-gray-400 leading-normal">
                                                    <Smartphone size={13} className="shrink-0 mt-0.5 text-gray-500" />
                                                    <p>Atau <button onClick={() => setShowMobileUpload(true)} className="text-blue-500 font-bold hover:underline">Scan QR</button> di sisi bawah untuk upload langsung dari perangkat lain.</p>
                                                </div>

                                                {dataOrder?.qr_order ? <div className=' my-2'>
                                                    <div className={`shrink-0 text-center p-4 ${darkMode ? "bg-slate-800 border-gray-700" : "bg-white border-gray-200"} sm:w-auto  dark: rounded-xl border shadow-sm`}>
                                                        <div className='flex items-center justify-center'>
                                                            <div className='bg-slate-100 p-2 rounded-lg'>
                                                                <QRCodeCanvas value={String(dataOrder?.qr_order)} size={120} />
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] text-gray-400 mt-2 font-medium tracking-wider">QR konfirmasi pesanan</span>
                                                    </div>
                                                </div> :
                                                    <div className=' my-2'>
                                                        <div className={`shrink-0 text-center p-4 ${darkMode ? "bg-slate-800 border-gray-700" : "bg-white border-gray-200"} sm:w-auto  dark: rounded-xl border shadow-sm`}>
                                                            <div className='flex items-center justify-center'>
                                                                <div className='bg-slate-100 p-2 rounded-lg'>
                                                                    <QRCodeCanvas value={`${baseUrl ?? ''}/${dataOrder?.slug}/detail/${token}`} size={120} />
                                                                </div>
                                                            </div>
                                                            <span className="text-[10px] text-gray-400 mt-2 font-medium tracking-wider">QR upload bukti pembayaran</span>
                                                        </div>
                                                    </div>

                                                }
                                            </div>
                                            {/* Tombol Aksi Upload Bukti Pembayaran */}
                                            {imagePreview && !disableButtonProof && (
                                                <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                    <button
                                                        onClick={handlePaymentProof}
                                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        Kirim Bukti Pembayaran
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>
                <div className="lg:col-span-1">
                    <section className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-6 rounded-3xl border sticky top-8 shadow-md`}>
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${darkMode && 'text-white'}`}>
                            <ShoppingBag className="text-emerald-500" /> Ringkasan
                        </h3>

                        <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {dataOrder && dataOrder?.items?.length > 0 ? (
                                dataOrder?.items.map((item) => {

                                    return (
                                        <div key={item.id} className="flex gap-4 group">
                                            <img
                                                src={item.iamge_variant || item?.iamge_product}
                                                alt={item.name_variant || item?.name_product}
                                                className={`w-16 h-16 rounded-xl object-cover border ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h4 className={`font-semibold text-xs ${darkMode && "text-white"} truncate`}>
                                                    {item.name_product}
                                                    {item?.name_variant ? ` (${item?.name_variant})` : ''}
                                                </h4>

                                                <p className={`text-emerald-500 font-bold text-sm mt-0.5`}>
                                                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className={`flex items-center ${darkMode ? "bg-[#0f1520] border-gray-800" : "bg-gray-100 border-gray-200"} rounded-lg p-1 border`}>
                                                        <button
                                                            disabled={true}
                                                            className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} rounded-md transition-colors text-gray-500`}
                                                        >
                                                            <Minus size={12} className='opacity-30' />
                                                        </button>

                                                        <span className="text-xs font-bold px-2 min-w-[20px] text-center">
                                                            {item.qty}
                                                        </span>

                                                        <button
                                                            disabled={true}
                                                            className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} rounded-md transition-colors text-gray-500`}
                                                        >
                                                            <Plus size={12} className={'opacity-30'} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-10 opacity-50">
                                    <ShoppingBag size={40} className="mx-auto mb-2 text-gray-300" />
                                    <p className="text-xs text-gray-400 italic">Keranjang belanja Anda kosong.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 space-y-4">
                            {/* Input Nama */}
                            <div>
                                <label className={`block text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    NAMA PENERIMA
                                </label>
                                <div
                                    className={`w-full p-3 rounded-xl border text-sm outline-none border-gray-200 transition-all ${darkMode
                                        ? `bg-[#0f1520] text-white`
                                        : `bg-gray-50 `
                                        }`}
                                >
                                    {dataOrder?.customer_name}
                                </div>
                            </div>

                            {/* Input WhatsApp */}
                            <div>
                                <label className={`block text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    NOMOR WHATSAPP
                                </label>
                                <div
                                    className={`w-full p-3 rounded-xl border text-sm border-gray-200 outline-none transition-all ${darkMode
                                        ? `bg-[#0f1520] text-white `
                                        : `bg-gray-50`
                                        }`}
                                >
                                    {dataOrder?.phone_number}
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2 py-2'>
                            {/* Tombol Hubungi Outlet */}
                            <button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2 px-4 py-2.5 rounded-xl transition duration-200 shadow-sm'>
                                <Icon icon={'ic:baseline-whatsapp'} fontSize={18} />
                                <span>Hubungi Outlet</span>
                            </button>

                            {/* Tombol Batalkan Pesanan */}
                            <button onClick={handleCancelledOrder} className='w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-2 px-4 py-2.5 rounded-xl transition duration-200 shadow-sm'>
                                <Icon icon={'material-symbols:cancel-outline'} fontSize={18} />
                                <span>Batalkan Pesanan</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            {
                loading && <Loading />
            }
        </div >
    );
};

export default DetailCheckoutComponent;