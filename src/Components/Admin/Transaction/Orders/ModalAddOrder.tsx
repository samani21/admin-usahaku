"use client"
import { OutletsType } from '@/types/Admin/OutletType';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { Get } from '@/utils/Get';
import { Post } from '@/utils/Post';
import { PlusIcon, TrashIcon, XIcon } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
    onClose: () => void;
    addToast: (v: string, status: string) => void;
    outlets: OutletsType[];
    handleSubmit: (token: string) => void;
}
// const STOCK_PRODUCTS = [
//     {
//         id: 'prod-1',
//         name: 'Produk 1',
//         price: 20000,
//         variants: [],
//         image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80'
//     },
//     {
//         id: 'prod-2',
//         name: 'Produk 2',
//         price: 50000,
//         variants: ['41', '42'],
//         image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=150&q=80'
//     },
//     {
//         id: 'prod-3',
//         name: 'Produk 3',
//         price: 75000,
//         variants: [],
//         image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=150&q=80'
//     },
//     {
//         id: 'prod-4',
//         name: 'Produk 4',
//         price: 35000,
//         variants: ['40', '41', '43'],
//         image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=150&q=80'
//     },
// ];
const ModalAddOrder = ({ onClose, addToast, outlets, handleSubmit }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [newOrder, setNewOrder] = useState({
        customerName: '',
        customerPhone: '',
        outletId: '', // Kosong di awal untuk memaksa pilih outlet
        paymentMethod: 'cash',
        items: [{ productId: '', variant: '', quantity: 1, price: 0 }] // Mulai kosong tanpa pre-select
    });
    const [uangDiterima, setUangDiterima] = useState<number>(0);
    const [uangDiterimaDisplay, setUangDiterimaDisplay] = useState<string>('');
    const [products, setProducts] = useState<ProductsType[]>([]);
    const [isDisplayItems, setIsDisplayItems] = useState<boolean>(false);
    const handlePhoneInputChange = (value: string) => {
        // Hanya simpan angka dan simbol '+'
        let cleaned = value.replace(/[^\d+]/g, '');

        // Konversi awal +62 menjadi 62
        if (cleaned.startsWith('+62')) {
            cleaned = '62' + cleaned.substring(3);
        } else if (cleaned.startsWith('+')) {
            // Biarkan dulu jika pengguna sedang mengetik '+'
        }

        // Bersihkan semua selain digit angka untuk verifikasi awalan
        let numbers = cleaned.replace(/\D/g, '');

        // Normalisasi awalan '08' menjadi '628'
        if (numbers.startsWith('08')) {
            numbers = '628' + numbers.substring(2);
        }
        // Normalisasi awalan '8' saja menjadi '628'
        else if (numbers.startsWith('8')) {
            numbers = '628' + numbers.substring(1);
        }

        return numbers;
    };

    const handleAddProductField = () => {
        setNewOrder((prev) => ({
            ...prev,
            items: [...prev.items, { productId: '', variant: '', quantity: 1, price: 0 }]
        }));
    };

    const handleProductFieldChange = (index: number, field: string, value: string) => {
        const updatedItems = [...newOrder.items];
        if (field === 'quantity') {
            updatedItems[index] = { ...updatedItems[index], quantity: Number(value) };
        } else {
            updatedItems[index] = { ...updatedItems[index], [field]: value, quantity: 1 };
        }
        if (field === 'productId') {
            const selectedProd = products.find(p => p.id === Number(value));
            updatedItems[index].variant = selectedProd && selectedProd.variants.length > 0 ? String(selectedProd.variants[0]?.id) : '';
            updatedItems[index].price = Number(selectedProd?.final_price) > 0 ? Number(selectedProd?.final_price) : Number(selectedProd?.price);
        }

        if (updatedItems[index].variant != '') {
            const selectedProd = products.find(p => p.id === Number(updatedItems[index].productId));
            const selectedVariant = selectedProd?.variants.find((v) => v.id === Number(updatedItems[index].variant));
            updatedItems[index].price = Number(selectedVariant?.final_price) > 0 ? Number(selectedVariant?.final_price) : Number(selectedVariant?.price);
        }
        setNewOrder((prev) => ({ ...prev, items: updatedItems }));
    };


    const handleRemoveProductField = (index: number) => {
        if (newOrder.items.length === 1) return;
        setNewOrder((prev) => ({
            ...prev,
            items: prev.items.filter((_, idx) => idx !== index)
        }));
    };

    const getProduct = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean, data: ProductsType[] }>(`orders/list-products?outlet=${newOrder.outletId}`);
            if (res?.success) {
                setProducts(res?.data)
            }
        } catch (e: any) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (newOrder.outletId != '') {
            setIsDisplayItems(true)
            getProduct()
        }
    }, [newOrder.outletId])

    const totalAmount = useMemo(() => {
        const calculatedItems = newOrder.items.map((item) => {
            return {
                price: item?.price,
                quantity: item?.quantity
            };
        });
        const totalAmount = calculatedItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
        return totalAmount;
    }, [newOrder]);
    const handleUangDiterimaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, ''); // Ambil angka saja
        const numericValue = rawValue ? parseInt(rawValue, 10) : 0;

        setUangDiterima(numericValue); // Simpan angka murni untuk kalkulasi matematika
        setUangDiterimaDisplay(numericValue ? numericValue.toLocaleString('id-ID') : ''); // Simpan string berformat untuk UI
    };

    const setUangPas = (nominal: number) => {
        setUangDiterima(nominal);
        setUangDiterimaDisplay(nominal ? nominal.toLocaleString('id-ID') : '');
    };

    const handleSubmitOrder = async (e: any) => {
        e.preventDefault();
        if (!newOrder.outletId) {
            addToast('Harap pilih outlet terlebih dahulu!', 'error');
            return;
        }

        const hasEmptyProduct = newOrder.items.some(item => !item.productId);
        if (hasEmptyProduct) {
            addToast('Harap pilih produk terlebih dahulu untuk semua item!', 'error');
            return;
        }
        setLoading(true)
        try {
            const formData = new FormData();

            formData.append('outlet_id', String(newOrder?.outletId));

            if (newOrder?.customerName) {
                formData.append('customer_name', newOrder.customerName);
            }

            if (newOrder?.customerPhone) {
                formData.append('phone_number', newOrder.customerPhone);
            }

            formData.append('payment_method', newOrder?.paymentMethod);

            newOrder?.items?.forEach((item, index) => {
                formData.append(
                    `items[${index}][product_id]`,
                    String(item.productId)
                );

                if (item.variant) {
                    formData.append(
                        `items[${index}][variant_id]`,
                        String(item.variant)
                    );
                }

                formData.append(
                    `items[${index}][qty]`,
                    String(item.quantity)
                );
                formData.append(
                    `items[${index}][price]`,
                    String(item.price)
                );
            });

            const res = await Post<any, FormData>(
                '/orders',
                formData
            );
            if (res?.success) {
                addToast('Pesanan baru berhasil dibuat!', 'success');
                handleSubmit(res?.data?.qr_token);
                setNewOrder({
                    customerName: '',
                    customerPhone: '',
                    outletId: '', // Reset ke pilihan awal wajib isi
                    paymentMethod: 'QRIS',
                    items: [{ productId: '', variant: '', quantity: 1, price: 0 }]
                });
            }

        } catch (e: any) {
            addToast(e?.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">

                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Buat Order Baru</h2>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmitOrder} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">

                    {/* Row Nama & Nomor HP */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pelanggan</label>
                            <input
                                type="text"
                                value={newOrder.customerName}
                                onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                                placeholder="Masukkan nama pelanggan..."
                                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009662] focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Handphone Pelanggan</label>
                            <input
                                type="text"
                                value={newOrder.customerPhone}
                                onChange={(e) => {
                                    const normalized = handlePhoneInputChange(e.target.value);
                                    setNewOrder({ ...newOrder, customerPhone: normalized });
                                }}
                                placeholder="Contoh: 08123456789"
                                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009662] focus:bg-white transition-all font-mono font-bold"
                            />
                            <span className="text-[10px] text-[#009662] font-semibold block mt-1">Otomatis berawalan 628</span>
                        </div>
                    </div>

                    {/* Outlet & Payment Selection */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Metode Bayar
                            </label>
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { id: 'cash', label: 'Cash', desc: 'Tunai' },
                                    { id: 'qrish', label: 'QRIS', desc: 'Instan' },
                                    { id: 'transfer', label: 'Transfer', desc: 'Manual VA' },
                                ].map((method) => {
                                    const isSelected = newOrder.paymentMethod === method.id;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setNewOrder({ ...newOrder, paymentMethod: method.id })}
                                            className={`p-3 rounded-xl border text-left transition-all duration-200 group relative overflow-hidden ${isSelected
                                                ? 'border-[#009662] bg-[#009662]/5 text-[#009662] ring-1 ring-[#009662]'
                                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                                                }`}
                                        >
                                            <p className="text-xs font-bold tracking-wide">{method.label}</p>
                                            <p className={`text-[10px] mt-0.5 font-medium ${isSelected ? 'text-[#009662]/80' : 'text-slate-400'}`}>
                                                {method.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {
                        newOrder?.outletId ? <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Kalkulator Pembayaran
                                </h3>
                                {/* Info Outlet Badge */}
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-200/60 rounded-md border border-slate-300/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#009662] animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                        {outlets?.find((e) => e?.id === Number(newOrder?.outletId))?.name || "Outlet Utama"} {/* Ganti dengan variabel nama outlet Anda */}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Total Belanja */}
                                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                    <span className="block text-[10px] text-slate-400 font-medium">Total Tagihan</span>
                                    <span className="text-lg font-bold text-slate-800">
                                        Rp {Number(totalAmount || 0).toLocaleString('id-ID')}
                                    </span>
                                </div>

                                {/* Kembalian */}
                                <div className={`p-3 rounded-lg border shadow-sm ${(uangDiterima - totalAmount) >= 0 ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
                                    <span className="block text-[10px] text-slate-400 font-medium">Kembalian</span>
                                    <span className={`text-lg font-bold ${(uangDiterima - totalAmount) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {uangDiterima - totalAmount >= 0
                                            ? `Rp ${(uangDiterima - totalAmount).toLocaleString('id-ID')}`
                                            : `- Rp ${Math.abs(uangDiterima - totalAmount).toLocaleString('id-ID')}`
                                        }
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Uang Diterima (Bayar)</label>
                                <div className="relative mt-1 rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-xs font-bold text-slate-400">Rp</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        value={uangDiterimaDisplay}
                                        onChange={handleUangDiterimaChange}
                                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] font-bold text-slate-700 tracking-wide"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setUangPas(totalAmount)}
                                    className="px-2 py-1 text-[10px] font-semibold bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition"
                                >
                                    Uang Pas
                                </button>
                                {[5000, 10000, 20000, 50000, 100000].map((nominal) => (
                                    <button
                                        key={nominal}
                                        type="button"
                                        onClick={() => setUangPas(nominal)}
                                        className="px-2 py-1 text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 rounded hover:bg-[#009662] hover:text-white hover:border-[#009662] transition"
                                    >
                                        {nominal.toLocaleString('id-ID')}
                                    </button>
                                ))}
                            </div>
                        </div> :
                            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center max-w-md mx-auto my-4 shadow-2xs relative overflow-hidden group hover:border-[#009662]/40 transition-all duration-200">

                                {/* Dekorasi Background Glow */}
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#009662]/5 rounded-full blur-xl group-hover:bg-[#009662]/10 transition-colors" />

                                {/* 1. Bagian Ikon / Visual */}
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100/80 text-[#009662] shadow-3xs animate-bounce duration-1000">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>

                                {/* 2. Judul & Deskripsi */}
                                <div className="space-y-1 mb-5">
                                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                                        Pilih Outlet Terlebih Dahulu
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium max-w-[280px] mx-auto leading-relaxed">
                                        Silakan tentukan lokasi outlet untuk menyesuaikan ketersediaan stok produk dan harga.
                                    </p>
                                </div>

                                {/* 3. Input Dropdown yang Dipercantik di dalam Card */}
                                <div className="relative text-left max-w-xs mx-auto">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                                        Lokasi Outlet Pesanan
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={newOrder.outletId}
                                            onChange={(e) => setNewOrder({ ...newOrder, outletId: e.target.value })}
                                            className="w-full appearance-none pl-3.5 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#009662] focus:ring-4 focus:ring-[#009662]/5 font-bold text-slate-700 cursor-pointer shadow-3xs transition-all"
                                        >
                                            <option value="" className="text-slate-400 font-medium">-- Cari / Pilih Outlet --</option>
                                            {outlets?.map((o, i) => (
                                                <option key={i} value={o?.id} className="text-slate-700 font-semibold">
                                                    {o?.name}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Indikator Panah Dropdown */}
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 group-focus-within:text-[#009662]">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    {/* Dynamic Product List Selection */}
                    {
                        isDisplayItems &&
                        <div className="space-y-3.5 pt-2">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Item Produk</span>
                                <button
                                    type="button"
                                    onClick={handleAddProductField}
                                    className="text-xs font-bold text-[#009662] hover:text-[#007d51] flex items-center gap-1"
                                >
                                    <PlusIcon /> Tambah Item
                                </button>
                            </div>
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                                {loading ? [1, 2].map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl border border-slate-200/85 p-4 shadow-2xs flex flex-col sm:flex-row gap-4 items-center relative animate-pulse"
                                    >
                                        {/* 1. KIRI: Skeleton Foto Produk */}
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-200 rounded-xl shrink-0" />

                                        {/* 2. KANAN: Skeleton Form Kontrol */}
                                        <div className="flex-1 w-full space-y-3">

                                            {/* Baris Atas: Label, Dropdown Select, & Tombol Hapus */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 space-y-1.5">
                                                    {/* Label */}
                                                    <div className="h-2.5 bg-slate-200 rounded w-16" />
                                                    {/* Input Select */}
                                                    <div className="h-8 bg-slate-100 rounded-lg w-full" />
                                                </div>
                                                {/* Tombol Hapus */}
                                                <div className="w-8 h-8 bg-rose-50/50 border border-rose-100/30 rounded-lg shrink-0 self-end mb-0.5" />
                                            </div>

                                            {/* Baris Bawah: Grid Varian, Jumlah, & Subtotal */}
                                            <div className="grid grid-cols-12 gap-3 items-end">
                                                {/* Kolom Varian */}
                                                <div className="col-span-4 space-y-1.5">
                                                    <div className="h-2.5 bg-slate-200 rounded w-10" />
                                                    <div className="h-7 bg-slate-100 rounded-lg w-full" />
                                                </div>

                                                {/* Kolom Jumlah */}
                                                <div className="col-span-4 space-y-1.5">
                                                    <div className="h-2.5 bg-slate-200 rounded w-10 mx-auto" />
                                                    <div className="h-7 bg-slate-100 rounded-lg w-full" />
                                                </div>

                                                {/* Kolom Subtotal */}
                                                <div className="col-span-4 text-right space-y-1.5">
                                                    <div className="h-2.5 bg-slate-200 rounded w-12 ml-auto" />
                                                    <div className="h-5 bg-slate-100 rounded w-20 ml-auto pb-1" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )) : newOrder.items.map((item, idx) => {
                                    const currentProduct = products.find(p => p.id === Number(item.productId));
                                    const variant = currentProduct?.variants?.find((v) => v?.id === Number(newOrder?.items[idx]?.variant));
                                    const itemSubtotal = currentProduct ? ((variant?.final_price || (currentProduct?.final_price === 0 ? currentProduct.price : currentProduct?.final_price ?? 0)) * Number(item.quantity)) : 0;
                                    const maxStock = variant?.product_variant_stock ?? currentProduct?.product_stock;
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-white rounded-2xl border border-slate-200/85 p-4 shadow-2xs flex flex-col sm:flex-row gap-4 items-center relative group hover:border-[#009662]/30 transition-all duration-150"
                                        >
                                            {/* 1. KIRI: Visual Foto Produk Dinamis atau Placeholder Kosong */}
                                            {currentProduct ? (
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                                                    <img
                                                        src={currentProduct.image}
                                                        alt={currentProduct.name}
                                                        className="max-w-full max-h-full object-contain animate-in fade-in zoom-in-95 duration-150"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0 text-slate-400">
                                                    <svg className="w-6 h-6 mb-1 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Pilih Item</span>
                                                </div>
                                            )}

                                            {/* 2. KANAN: Form Input Kontrol & Informasi */}
                                            <div className="flex-1 w-full space-y-3">

                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilih Produk</label>
                                                        <select
                                                            value={item.productId}
                                                            onChange={(e) => handleProductFieldChange(idx, 'productId', e.target.value)}
                                                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] font-semibold text-slate-700 disabled:opacity-60"
                                                        >
                                                            <option value="">-- Pilih Produk --</option>
                                                            {products.map(p => {
                                                                const isOutOfStock = Number(p?.product_stock) <= 0;
                                                                const priceDisplay = Number(p.final_price === 0 ? p?.price : p.final_price).toLocaleString('id-ID');

                                                                return (
                                                                    <option
                                                                        key={p.id}
                                                                        value={p.id}
                                                                        disabled={isOutOfStock}
                                                                        className={isOutOfStock ? "text-slate-400 italic" : "text-slate-700"}
                                                                    >
                                                                        {p.name} - Rp {priceDisplay} {isOutOfStock ? '(Stok Habis)' : `(Sisa: ${p.product_stock})`}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProductField(idx)}
                                                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg border border-rose-100/50 transition-colors duration-150 shrink-0 self-end mb-0.5"
                                                        disabled={newOrder.items.length === 1}
                                                        title="Hapus Item"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 items-end">

                                                    <div className="col-span-4">
                                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Varian</label>
                                                        {currentProduct && currentProduct.variants.length > 0 ? (
                                                            <select
                                                                value={item.variant}
                                                                onChange={(e) => handleProductFieldChange(idx, 'variant', e.target.value)}
                                                                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-center font-bold text-slate-700 disabled:opacity-60"
                                                            >
                                                                <option value="">-- Pilih Varian --</option>
                                                                {currentProduct.variants.map(v => {
                                                                    const isOutOfStock = Number(v?.product_variant_stock) <= 0;

                                                                    return (
                                                                        <option
                                                                            key={v?.id || v?.name}
                                                                            value={v?.id}
                                                                            disabled={isOutOfStock}
                                                                            className={isOutOfStock ? "text-slate-400 italic" : "text-slate-700"}
                                                                        >
                                                                            {v?.name} {isOutOfStock ? '(Habis)' : `(Sisa:${v?.product_variant_stock})`}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        ) : (
                                                            <div className="text-[10px] text-slate-400 italic text-center pb-1.5 font-medium">No Varian</div>
                                                        )}
                                                    </div>

                                                    <div className="col-span-4">
                                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">
                                                            Jumlah
                                                        </label>
                                                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-0.5">

                                                            {/* Tombol Kurang (-) */}
                                                            <button
                                                                type="button"
                                                                // Dikunci jika produk belum dipilih ATAU quantity sudah di angka 1 (mencegah minus/nol)
                                                                disabled={!currentProduct || Number(item.quantity) <= 1}
                                                                onClick={() => handleProductFieldChange(idx, 'quantity', String(Math.max(1, Number(item.quantity) - 1)))}
                                                                className="w-5.5 h-5.5 flex items-center justify-center font-black text-xs text-slate-500 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-all active:scale-95"
                                                            >
                                                                -
                                                            </button>

                                                            {/* Tampilan Angka */}
                                                            <span className="text-xs font-bold text-slate-800">{item.quantity}</span>

                                                            {/* Tombol Tambah (+) */}
                                                            <button
                                                                type="button"
                                                                // Dikunci jika produk belum dipilih ATAU quantity sudah mencapai batas maxStock
                                                                disabled={!currentProduct || Number(item.quantity) >= (maxStock ?? 0)}
                                                                onClick={() => handleProductFieldChange(idx, 'quantity', String(item.quantity + 1))}
                                                                className="w-5.5 h-5.5 flex items-center justify-center font-black text-xs text-slate-500 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-all active:scale-95"
                                                            >
                                                                +
                                                            </button>

                                                        </div>
                                                    </div>
                                                    <div className="col-span-4 text-right">
                                                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Subtotal</span>
                                                        <span className="text-xs font-extrabold text-[#009662] block pb-1">
                                                            Rp {itemSubtotal.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    }

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-bold text-white bg-[#009662] hover:bg-[#007d51] rounded-xl transition-colors shadow-sm shadow-[#009662]/10"
                        >
                            Simpan Order
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ModalAddOrder