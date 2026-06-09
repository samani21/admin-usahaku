"use client"
import React, { useEffect, useState } from 'react';
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
    AlertTriangle
} from 'lucide-react';
import { Get } from '@/utils/Get';
import Loading from '../Component/Loading';
import { useParams, useRouter } from 'next/navigation';
import { BanksType } from '@/types/Admin/Banks';
import { Post } from '@/utils/Post';
import { CatalogHeaderType } from '@/types/Admin/Catalog/Header';
import { Delete } from '@/utils/Delete';

interface CartItemsType {
    id: number;
    device_id: number;
    business_id: number;
    product_id: number;
    variant_id: number;
    qty: number;
    price: number;
    subtotal: number;
    product_stock: number;
    product_variant_stock: number;
    name_product: string;
    iamge_product: string;
    name_variant: string;
    iamge_variant: string;
}

interface CartsType {
    items: CartItemsType[];
    total: number;
    is_bank: boolean;
    is_qris: boolean;
    header: CatalogHeaderType;
}

interface StockAvailableType {
    available_stock: number;
    max_allowed_qty: number;
    product_id: number;
    product_name: number;
    requested_qty: number;
    variant_id?: number
}

const CheckOutComponent = () => {
    const { outlet } = useParams();
    const [darkMode, setDarkMode] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showMobileUpload, setShowMobileUpload] = useState(false);
    const [items, setItems] = useState<CartItemsType[]>([]);
    const [isBank, setIsBank] = useState<boolean>(false);
    const [isQris, setIsQris] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [stockAvailable, setStockAvailable] = useState<StockAvailableType[]>([]);
    const [tenant, setTenant] = useState<string>('');
    const [header, setHeader] = useState<CatalogHeaderType | null>(null);
    useEffect(() => {
        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 0) {
            setTenant(segments[0]);
        }

    }, [])
    // Fungsi untuk memformat nomor ke 628
    const handlePhoneChange = (e: any) => {
        let input = e.target.value.replace(/\D/g, ''); // Hapus semua karakter non-angka
        if (input.startsWith('0')) {
            input = '62' + input.substring(1);
        } else if (input.startsWith('8')) {
            input = '62' + input;
        } else if (input.startsWith('+62')) {
            // Ini ditangani oleh replace non-angka di atas menjadi 62
        }
        setPhoneNumber(input);
    };
    const updateQty = (id: number, delta: number) => {
        setItems(prevItems =>
            prevItems.map(item => {

                if (Number(item.id) !== Number(id)) return item;

                const maxStock =
                    item.product_variant_stock ??
                    item.product_stock ??
                    0;

                const newQty = Number(item.qty) + Number(delta);

                // hapus item jika qty <= 0
                if (newQty <= 0) {
                    return null;
                }

                // batasi hanya saat tambah qty
                if (delta > 0 && maxStock > 0 && newQty > maxStock) {
                    return item;
                }

                return {
                    ...item,
                    qty: newQty,
                    subtotal: item.price * newQty
                };

            }).filter(Boolean) as typeof prevItems
        );
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    // const shipping = items.length > 0 ? 25000 : 0;
    const total = items.reduce((acc, item) => {
        return acc + (item.price * item.qty);
    }, 0);

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(String(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {

            if (!customerName) {
                setError("Harap isi nama penerima")
                return
            }
            if (!phoneNumber) {
                setError("Harap Isi no Whatsapp")
                return
            }
            const formData = new FormData();

            formData.append('payment_method', paymentMethod);
            formData.append('customer_name', customerName);
            formData.append('phone_number', phoneNumber);

            items.forEach((item, index) => {
                formData.append(`items[${index}][product_id]`, String(item.product_id));
                if (item.variant_id) {
                    formData.append(`items[${index}][variant_id]`, String(item.variant_id) || '');
                }
                formData.append(`items[${index}][qty]`, item.qty.toString());
            });
            const res = await Post<any, FormData>('/customer/create-order', formData)
            if (!paymentMethod || items.length === 0) return;
            setIsPaid(true);
            if (res?.success) {
                if (tenant === outlet) {
                    router?.push(`/detail/${res?.data?.qr_token}`)
                } else {
                    router?.push(`/${tenant}/detail/${res?.data?.qr_token}`)
                }
            } else {
            }
        } catch (e: any) {
            setStockAvailable(e?.raw?.response?.data?.data)

        } finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        getCarts()
    }, [])
    const getCarts = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean, data: CartsType }>('customer/list-cart');
            if (res?.success) {
                setItems(res?.data?.items)
                setIsBank(res?.data?.is_bank);
                setIsQris(res?.data?.is_qris);
                setHeader(res?.data?.header)
            }
        } catch (e: any) {

        } finally {
            setLoading(false)

        }
    }
    const handleDeleteItem = async (id: number) => {
        try {
            const res = await Delete(`customer/delete/items/${id}`);
            if (res) {
                getCarts()
            }
        } catch (e: any) {

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
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="text-emerald-500" size={32} />
                        </div>
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>Ambil foto struk atau screenshot transfer Anda.</p>
                    </div>
                    <label className="block w-full border-2 border-dashed border-emerald-500/50 bg-emerald-500/5 rounded-2xl p-10 text-center cursor-pointer hover:bg-emerald-500/10 transition-all">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => { handleFileUpload(e); setShowMobileUpload(false); }} />
                        <Upload className="mx-auto mb-4 text-emerald-500" size={40} />
                        <p className={`${darkMode && 'text-white'} font-bold `}>Pilih File / Kamera</p>
                    </label>
                </div>
            </div>
        );
    }

    if (isPaid) {
        return (
            <div className={`${darkMode ? 'dark bg-[#0a0f18]' : 'bg-gray-50'} min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300`}>
                <div className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-10 rounded-3xl text-center max-w-md w-full shadow-2xl border `}>
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className={`text-3xl font-bold mb-2 ${darkMode && "text-white"}`}>Pesanan Diterima!</h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
                        {paymentMethod === 'cash'
                            ? 'Silakan datang ke kasir untuk menyelesaikan pembayaran.'
                            : 'Pembayaran Anda sedang kami verifikasi. Mohon tunggu sebentar.'}
                    </p>
                    <button
                        // onClick={() => { setIsPaid(false); setItems([{ id: 1, name_product: 'Nike Air Max Pro', price: 1500000, qty: 1, iamge_product: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' }]); setPaymentMethod(''); setImagePreview(null); }}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className={`${darkMode ? 'dark bg-[#0a0f18] text-white' : 'bg-gray-50 text-gray-900'} min-h-screen font-sans p-4 md:p-8 transition-colors duration-300`}>
            {/* Header */}
            <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
                <button onClick={() => router?.back()} className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"} hover:text-emerald-500 transition-colors`}>
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Kembali</span>
                </button>
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
                            {!paymentMethod && (
                                <span className={`text-[10px] ${darkMode ? 'bg-emerald-900/30' : "bg-emerald-100"} text-emerald-600 px-2 py-1 rounded-md animate-pulse`}>Wajib Pilih Satu</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {['cash', 'transfer', 'qris']
                                .filter((method) => {
                                    if (method === 'transfer') return isBank;
                                    if (method === 'qris') return isQris;
                                    return true; // 'cash' selalu tampil
                                })
                                .map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => { setPaymentMethod(method); setImagePreview(null); }}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${paymentMethod === method
                                            ? `border-emerald-500 ${darkMode ? "bg-emerald-500/10" : "bg-emerald-50"}`
                                            : `${darkMode ? "border-gray-800 bg-[#0f1520]" : "border-gray-100 bg-gray-50"} hover:border-emerald-200`
                                            }`}
                                    >
                                        {paymentMethod === method && (
                                            <div className="absolute top-2 right-2">
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            </div>
                                        )}

                                        {/* Icon Picker */}
                                        {method === 'cash' && <Banknote size={32} className={paymentMethod === 'cash' ? 'text-emerald-500' : 'text-gray-400'} />}
                                        {method === 'transfer' && <CreditCard size={32} className={paymentMethod === 'transfer' ? 'text-emerald-500' : 'text-gray-400'} />}
                                        {method === 'qris' && <QrCode size={32} className={paymentMethod === 'qris' ? 'text-emerald-500' : 'text-gray-400'} />}

                                        <span className={`font-semibold capitalize ${paymentMethod === method
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
                        {paymentMethod && (
                            <div className={`mt-8 p-6 ${darkMode ? "bg-[#0f1520] border-gray-800" : "bg-gray-50 border-gray-200"} rounded-2xl border animate-in fade-in zoom-in-95 duration-300`}>
                                <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                    <Info size={16} className="text-emerald-500" /> Instruksi Pembayaran {paymentMethod === 'cash' ? 'Tunai' : paymentMethod === 'transfer' ? 'Transfer' : 'QRIS'}
                                </h4>

                                {paymentMethod === 'cash' ? (
                                    <div className="space-y-4">
                                        <div className={`flex gap-4 items-start ${darkMode ? "bg-blue-900/20 border-blue-900/30" : "bg-blue-50 border-blue-100"} p-4 rounded-xl border `}>
                                            <Store className="text-blue-600 shrink-0" size={24} />
                                            <div className={`text-xs ${darkMode ? "text-blue-300" : " text-blue-800"} leading-relaxed`}>
                                                <p className="font-bold mb-1">Langkah Pembayaran:</p>
                                                <ul className="list-decimal list-inside space-y-1 opacity-90">
                                                    <li>Selesaikan pesanan dengan klik tombol di samping.</li>
                                                    <li>Kunjungi toko fisik kami terdekat.</li>
                                                    <li>Tunjukkan <b>ID Pesanan (#TS-9921)</b> kepada kasir.</li>
                                                    <li>Lakukan pembayaran sesuai total belanja Anda.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
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
                            {items.length > 0 ? (
                                items.map((item) => {
                                    const maxStock = stockAvailable?.find((s) => s?.variant_id === item?.variant_id)?.available_stock ?? stockAvailable?.find((s) => s?.product_id === item?.product_id)?.available_stock ?? item?.product_variant_stock ?? item?.product_stock; // 👉 statis dulu (dummy)
                                    const isOver = maxStock != 0 && item.qty > maxStock || maxStock === 0;
                                    const overQty = item.qty - maxStock;
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

                                                <p className={`${darkMode ? "text-emerald-400" : "text-emerald-600"} font-bold text-sm mt-0.5`}>
                                                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                                                </p>
                                                {/* 🔥 INFO STOCK */}

                                                <p className={`text-[10px] mt-1 ${isOver ? "text-red-500" : "text-gray-400"}`}>
                                                    {isOver
                                                        ? `⚠ Maksimal ${maxStock} item (kelebihan ${overQty})`
                                                        : `Maksimal ${maxStock} item`}
                                                </p>

                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className={`flex items-center ${darkMode ? "bg-[#0f1520] border-gray-800" : "bg-gray-100 border-gray-200"} rounded-lg p-1 border`}>
                                                        <button
                                                            onClick={() => item.qty === 1 ? handleDeleteItem(item?.id) : updateQty(item.id, -1)}
                                                            className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} rounded-md transition-colors text-gray-500`}
                                                        >
                                                            {item.qty === 1 ? <Trash2 size={12} className="text-emerald-500" /> : <Minus size={12} />}
                                                        </button>

                                                        <span className="text-xs font-bold px-2 min-w-[20px] text-center">
                                                            {item.qty}
                                                        </span>

                                                        <button
                                                            disabled={maxStock != 0 && item.qty >= maxStock}
                                                            onClick={() => updateQty(item.id, 1)}
                                                            className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} rounded-md transition-colors text-gray-500`}
                                                        >
                                                            <Plus size={12} className={maxStock != 0 && item.qty >= maxStock ? "opacity-30" : ""} />
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

                        <div className={`space-y-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"} pt-6 text-[13px]`}>
                            <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <span>Subtotal</span>
                                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                            </div>
                            {/* <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <span>Ongkos Kirim</span>
                                <span className="text-green-600 font-bold">Rp {shipping.toLocaleString('id-ID')}</span>
                            </div> */}
                            <div className={`flex justify-between text-lg font-black pt-4 border-t ${darkMode ? "text-white border-gray-800" : "border-gray-100"} mt-4`}>
                                <span>Total Bayar</span>
                                <span className="text-emerald-600">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {/* Input Nama */}
                            <div>
                                <label className={`block text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    NAMA PENERIMA <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${darkMode
                                        ? `bg-[#0f1520] text-white ${!customerName && items.length > 0 ? "border-red-900/50 focus:border-red-500" : "border-gray-800 focus:border-emerald-500"}`
                                        : `bg-gray-50 ${!customerName && items.length > 0 ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`
                                        }`}
                                />
                                {!customerName && items.length > 0 && (
                                    <p className="text-[10px] text-red-500 mt-1 italic">* Nama wajib diisi untuk pengiriman</p>
                                )}
                            </div>

                            {/* Input WhatsApp */}
                            <div>
                                <label className={`block text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    NOMOR WHATSAPP <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: 0812..."
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${darkMode
                                        ? `bg-[#0f1520] text-white ${(phoneNumber && !phoneNumber.startsWith('628')) || (items.length > 0 && !phoneNumber) ? "border-red-900/50 focus:border-red-500" : "border-gray-800 focus:border-emerald-500"}`
                                        : `bg-gray-50 ${(phoneNumber && !phoneNumber.startsWith('628')) || (items.length > 0 && !phoneNumber) ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`
                                        }`}
                                />

                                {/* Pesan Error Spesifik */}
                                {items.length > 0 && !phoneNumber ? (
                                    <p className="text-[10px] text-red-500 mt-1 italic">* Nomor WA wajib diisi</p>
                                ) : phoneNumber && !phoneNumber.startsWith('628') ? (
                                    <div className="flex items-center gap-1 mt-1 text-red-500">
                                        <span className="text-[10px] font-medium italic">Format salah! Gunakan awalan 628</span>
                                    </div>
                                ) : phoneNumber && phoneNumber.length < 10 ? (
                                    <p className="text-[10px] text-orange-500 mt-1 italic">Nomor terlalu pendek...</p>
                                ) : null}
                            </div>
                        </div>
                        {
                            error && <div className='bg-red-50 text-xs text-red-600 flex items-center gap-2 px-4 py-2 mt-2 rounded-lg'>
                                <AlertTriangle size={14} /> {error}
                            </div>
                        }
                        <button
                            disabled={!paymentMethod || items.length === 0 && !imagePreview}
                            onClick={handleCheckout}
                            className={`w-full mt-8 py-4 rounded-2xl font-black transition-all transform active:scale-95 flex items-center justify-center gap-2 ${(!paymentMethod || items.length === 0 && !imagePreview)
                                ? `${darkMode ? "bbg-gray-800" : "bg-gray-200"} text-gray-400 cursor-not-allowed shadow-none`
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30'
                                }`}
                        >
                            BUAT PESANAN
                        </button>
                    </section>
                </div>
            </div>
            {
                loading && <Loading />
            }
        </div>
    );
};

export default CheckOutComponent;