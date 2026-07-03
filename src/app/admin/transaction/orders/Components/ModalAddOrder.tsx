"use client"
import { OutletsType } from '@/types/Admin/OutletType';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { Get } from '@/utils/Get';
import { Post } from '@/utils/Post';
import {
    PlusIcon, TrashIcon, XIcon, CheckCircle2,
    Clock, Wallet, User, MapPin, Receipt
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
    onClose: () => void;
    addToast: (v: string, status: string) => void;
    outlets: OutletsType[];
    handleSubmit: (token: string) => void;
}

const ModalAddOrder = ({ onClose, addToast, outlets, handleSubmit }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    // State Order
    const [newOrder, setNewOrder] = useState({
        customerName: '',
        customerPhone: '',
        outletId: '',
        paymentMethod: 'cash',
        paymentStatus: 'paid', // 'paid' atau 'unpaid'
        items: [{ productId: '', variant: '', quantity: 1, price: 0, qty_package: 1 }]
    });

    const [uangDiterima, setUangDiterima] = useState<number>(0);
    const [uangDiterimaDisplay, setUangDiterimaDisplay] = useState<string>('');
    const [products, setProducts] = useState<ProductsType[]>([]);
    const [isDisplayItems, setIsDisplayItems] = useState<boolean>(false);

    // Filter Input No HP
    const handlePhoneInputChange = (value: string) => {
        let cleaned = value.replace(/[^\d+]/g, '');
        if (cleaned.startsWith('+62')) cleaned = '62' + cleaned.substring(3);

        let numbers = cleaned.replace(/\D/g, '');
        if (numbers.startsWith('08')) numbers = '628' + numbers.substring(2);
        else if (numbers.startsWith('8')) numbers = '628' + numbers.substring(1);

        return numbers;
    };

    // Item Management
    const handleAddProductField = () => {
        setNewOrder((prev) => ({
            ...prev,
            items: [...prev.items, { productId: '', variant: '', quantity: 1, price: 0, qty_package: 1 }]
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

            // Set qty_package default ke 1 jika baru ganti produk (sebelum pilih varian khusus)
            updatedItems[index].qty_package = 1;
        }

        if (updatedItems[index].variant !== '') {
            const selectedProd = products.find(p => p.id === Number(updatedItems[index].productId));
            const selectedVariant = selectedProd?.variants.find((v) => v.id === Number(updatedItems[index].variant));
            updatedItems[index].price = Number(selectedVariant?.final_price) > 0 ? Number(selectedVariant?.final_price) : Number(selectedVariant?.price);
            updatedItems[index].qty_package = selectedVariant?.qty_package ?? 1;
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

    // Fetch Products
    const getProduct = async () => {
        setLoading(true);
        try {
            const res = await Get<{ success: boolean, data: ProductsType[] }>(`orders/list-products?outlet=${newOrder.outletId}`);
            if (res?.success) setProducts(res?.data);
        } catch (e: any) {
            // console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (newOrder.outletId !== '') {
            setIsDisplayItems(true);
            getProduct();
        }
    }, [newOrder.outletId]);

    // Kalkulasi Total
    const totalAmount = useMemo(() => {
        return newOrder.items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    }, [newOrder]);

    // Kalkulasi Uang
    const handleUangDiterimaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
        setUangDiterima(numericValue);
        setUangDiterimaDisplay(numericValue ? numericValue.toLocaleString('id-ID') : '');
    };

    const setUangPas = (nominal: number) => {
        setUangDiterima(nominal);
        setUangDiterimaDisplay(nominal ? nominal.toLocaleString('id-ID') : '');
    };

    // Submit Handler
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

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('outlet_id', String(newOrder?.outletId));
            if (newOrder?.customerName) formData.append('customer_name', newOrder.customerName);
            if (newOrder?.customerPhone) formData.append('phone_number', newOrder.customerPhone);

            formData.append('payment_method', newOrder?.paymentMethod);
            formData.append('payment_status', newOrder?.paymentStatus);
            formData.append('cash_received', String(uangDiterima));

            newOrder?.items?.forEach((item, index) => {
                formData.append(`items[${index}][product_id]`, String(item.productId));
                if (item.variant) formData.append(`items[${index}][variant_id]`, String(item.variant));
                formData.append(`items[${index}][qty]`, String(item.quantity));
                formData.append(`items[${index}][price]`, String(item.price));
            });

            const res = await Post<any, FormData>('/orders', formData);
            if (res?.success) {
                addToast('Pesanan baru berhasil dibuat!', 'success');
                handleSubmit(res?.data?.qr_token);
                setNewOrder({
                    customerName: '',
                    customerPhone: '',
                    outletId: '',
                    paymentMethod: 'QRIS',
                    paymentStatus: 'paid',
                    items: [{ productId: '', variant: '', quantity: 1, price: 0, qty_package: 1 }]
                });
                setUangDiterima(0);
                setUangDiterimaDisplay('');
                setIsDisplayItems(false);
            }
        } catch (e: any) {
            addToast(e?.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
            <div className="bg-slate-50 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#009662]/10 flex items-center justify-center text-[#009662]">
                            <Receipt size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 leading-tight">Buat Pesanan Baru</h2>
                            <p className="text-xs font-medium text-slate-500">Isi detail pesanan dan pembayaran di bawah ini</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                        <XIcon size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Form Body */}
                <form id="form-add-order" onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">

                    {/* Section 1: Outlet & Info Pelanggan */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <User size={16} className="text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Informasi Umum</h3>
                        </div>

                        {/* Pilihan Outlet */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
                                <MapPin size={14} className="text-[#009662]" /> Lokasi Outlet <span className="text-rose-500">*</span>
                            </label>
                            <select
                                required
                                value={newOrder.outletId}
                                onChange={(e) => setNewOrder({ ...newOrder, outletId: e.target.value })}
                                className="w-full appearance-none px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] focus:ring-2 focus:ring-[#009662]/20 font-semibold text-slate-700 cursor-pointer transition-all"
                            >
                                <option value="" className="text-slate-400">-- Pilih Outlet Pesanan --</option>
                                {outlets?.map((o, i) => (
                                    <option key={i} value={o?.id}>{o?.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Row Nama & Nomor HP */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Pelanggan</label>
                                <input
                                    type="text"
                                    value={newOrder.customerName}
                                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                                    placeholder="Masukkan nama..."
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] focus:ring-2 focus:ring-[#009662]/20 transition-all text-slate-700 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">No. Handphone</label>
                                <input
                                    type="text"
                                    value={newOrder.customerPhone}
                                    onChange={(e) => setNewOrder({ ...newOrder, customerPhone: handlePhoneInputChange(e.target.value) })}
                                    placeholder="Contoh: 08123456789"
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] focus:ring-2 focus:ring-[#009662]/20 transition-all font-mono font-medium text-slate-700"
                                />
                                <span className="text-[10px] text-[#009662] font-semibold block mt-1">Otomatis berawalan 628</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Detail Pesanan (Produk) */}
                    {isDisplayItems && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Receipt size={16} className="text-slate-400" />
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Detail Produk</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddProductField}
                                    className="text-xs font-bold bg-[#009662]/10 text-[#009662] hover:bg-[#009662]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                                >
                                    <PlusIcon size={14} /> Tambah
                                </button>
                            </div>

                            <div className="space-y-3">
                                {loading ? (
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center animate-pulse">
                                        <p className="text-sm font-medium text-slate-400">Memuat katalog produk...</p>
                                    </div>
                                ) : newOrder.items.map((item, idx) => {
                                    const currentProduct = products.find(p => p.id === Number(item.productId));
                                    const variant = currentProduct?.variants?.find((v) => v?.id === Number(item.variant));
                                    const itemSubtotal = currentProduct ? ((variant?.final_price || (currentProduct?.final_price === 0 ? currentProduct.price : currentProduct?.final_price ?? 0)) * Number(item.quantity)) : 0;

                                    // ----------------------------------------------------
                                    // PERBAIKAN: Hitung MAX STOCK untuk batas tombol QTY (+)
                                    // ----------------------------------------------------

                                    // 1. Hitung total produk ini (Quantity * QtyPackage) yang sudah dipakai di baris LAIN
                                    const totalConsumedOtherRows = newOrder.items
                                        .filter((pr, prIdx) => Number(pr.productId) === currentProduct?.id && prIdx !== idx)
                                        .reduce((sum, prItem) => {
                                            const qty = Number(prItem.quantity) || 0;
                                            const pkg = Number(prItem.qty_package) || 1;
                                            return sum + (qty * pkg);
                                        }, 0);

                                    // 2. Sisa stok riil produk secara global dikurangi yang dipakai baris lain
                                    const productRemainingStock = (variant?.product_variant_stock ?? currentProduct?.product_stock ?? 0) - totalConsumedOtherRows;

                                    // 3. Batas max klik tombol (+) untuk baris ini = (Sisa Stok / Package Varian Ini)
                                    const currentQtyPackage = Number(item.qty_package) || 1;
                                    const maxStock = Math.floor(productRemainingStock / currentQtyPackage);

                                    return (
                                        <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200/80 p-3 flex flex-col sm:flex-row gap-3 relative group hover:border-[#009662]/40 transition-colors">
                                            {/* Image & Basic Info */}
                                            {currentProduct ? (
                                                <div className="w-16 h-16 bg-white border border-slate-100 rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                                                    <img src={currentProduct.image} alt={currentProduct.name} className="max-w-full max-h-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 bg-slate-100 border border-dashed border-slate-300 rounded-lg flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase text-center leading-tight">Pilih<br />Item</span>
                                                </div>
                                            )}

                                            {/* Form Controls */}
                                            <div className="flex-1 grid grid-cols-12 gap-3 items-end">

                                                {/* Select Product */}
                                                <div className="col-span-12 sm:col-span-5 relative">
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">PRODUK</label>
                                                    <select
                                                        value={item.productId}
                                                        onChange={(e) => handleProductFieldChange(idx, 'productId', e.target.value)}
                                                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:border-[#009662] focus:ring-1 focus:ring-[#009662] font-semibold text-slate-700"
                                                    >
                                                        <option value="">-- Pilih --</option>
                                                        {products.map(p => {
                                                            // ----------------------------------------------------
                                                            // PERBAIKAN: Hitung sisa stok untuk dropdown
                                                            // ----------------------------------------------------
                                                            const totalConsumed = newOrder.items
                                                                .filter((pr, prIdx) => Number(pr.productId) === p.id && prIdx !== idx)
                                                                .reduce((sum, prItem) => {
                                                                    const qty = Number(prItem.quantity) || 0;
                                                                    const pkg = Number(prItem.qty_package) || 1;
                                                                    return sum + (qty * pkg);
                                                                }, 0);

                                                            // Stok yang ditampilkan adalah: Stok Awal - Total terpakai baris lain
                                                            const stock = Number(p?.product_stock) - totalConsumed;
                                                            const isOutOfStock = stock <= 0;
                                                            const priceDisplay = Number(p.final_price === 0 ? p?.price : p.final_price).toLocaleString('id-ID');

                                                            return (
                                                                <option key={p.id} value={p.id} disabled={isOutOfStock} className={isOutOfStock ? "text-slate-400" : "text-slate-700"}>
                                                                    {p.name} - Rp {priceDisplay} {isOutOfStock ? '(Stok Habis)' : `(Stok: ${stock})`}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>

                                                {/* Select Variant */}
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">VARIAN</label>
                                                    {currentProduct && currentProduct.variants.length > 0 ? (
                                                        <select
                                                            value={item.variant}
                                                            onChange={(e) => handleProductFieldChange(idx, 'variant', e.target.value)}
                                                            className="w-full px-2 py-2 text-xs bg-white border border-slate-200 rounded-md focus:border-[#009662] focus:ring-1 focus:ring-[#009662] font-semibold text-slate-700"
                                                        >
                                                            <option value="">Pilih</option>
                                                            {currentProduct.variants.map(v => {
                                                                const totalConsumed = newOrder.items
                                                                    .filter((pr, prIdx) => Number(pr.productId) === currentProduct.id && prIdx !== idx)
                                                                    .reduce((sum, prItem) => {
                                                                        const qty = Number(prItem.quantity) || 0;
                                                                        const pkg = Number(prItem.qty_package) || 1;
                                                                        return sum + (qty * pkg);
                                                                    }, 0);
                                                                const stok = Number(v?.product_variant_stock) - totalConsumed
                                                                const maxStocVariant = Math.floor(stok / Number(v?.qty_package));
                                                                const isOutOfStock = maxStocVariant <= 0;

                                                                return (
                                                                    <option key={v?.id} value={v?.id} disabled={isOutOfStock} className={isOutOfStock ? "text-slate-400" : "text-slate-700"}>
                                                                        {v?.name} {isOutOfStock ? '(Habis)' : `(Stok: ${maxStocVariant} )`}
                                                                    </option>
                                                                )
                                                            })}
                                                        </select>
                                                    ) : (
                                                        <div className="px-2 py-2 text-xs bg-slate-100 border border-slate-200 rounded-md text-slate-400 italic text-center">
                                                            N/A
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Quantity */}
                                                <div className="col-span-6 sm:col-span-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <label className="block text-[10px] font-bold text-slate-500">QTY</label>
                                                        {currentProduct && (
                                                            <span className="text-[9px] font-semibold text-[#009662]">
                                                                Max: {maxStock}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-md p-1 h-[34px]">
                                                        <button
                                                            type="button"
                                                            disabled={!currentProduct || Number(item.quantity) <= 1}
                                                            onClick={() => handleProductFieldChange(idx, 'quantity', String(Math.max(1, Number(item.quantity) - 1)))}
                                                            className="w-6 h-full flex items-center justify-center font-bold text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 transition-colors"
                                                        >-</button>
                                                        <span className="text-xs font-bold text-slate-800">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            disabled={!currentProduct || Number(item.quantity) >= (maxStock ?? 0)}
                                                            onClick={() => handleProductFieldChange(idx, 'quantity', String(item.quantity + 1))}
                                                            className="w-6 h-full flex items-center justify-center font-bold text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 transition-colors"
                                                        >+</button>
                                                    </div>
                                                </div>

                                                {/* Delete Button */}
                                                <div className="col-span-12 sm:col-span-1 flex justify-end sm:justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProductField(idx)}
                                                        disabled={newOrder.items.length === 1}
                                                        className="h-[34px] w-[34px] flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-md border border-rose-100 disabled:opacity-50 transition-colors"
                                                    >
                                                        <TrashIcon size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal Overlay Indicator */}
                                            {itemSubtotal > 0 && (
                                                <div className="absolute -top-2.5 -right-2.5 bg-[#009662] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md border border-white">
                                                    Rp {itemSubtotal.toLocaleString('id-ID')}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Section 3: Status & Metode Pembayaran */}
                    {isDisplayItems && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-5">
                            <div className="flex items-center gap-2 mb-2">
                                <Wallet size={16} className="text-slate-400" />
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Pembayaran</h3>
                            </div>

                            {/* Status Pembayaran (Segmented Control) */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2">Status Pembayaran</label>
                                <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200/50">
                                    <button
                                        type="button"
                                        onClick={() => setNewOrder({ ...newOrder, paymentStatus: 'paid' })}
                                        className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-xs font-bold rounded-md transition-all duration-200 ${newOrder.paymentStatus === 'paid'
                                            ? 'bg-white shadow-sm text-emerald-600 ring-1 ring-slate-200/50'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                            }`}
                                    >
                                        <CheckCircle2 size={16} className={newOrder.paymentStatus === 'paid' ? 'text-emerald-500' : 'opacity-50'} />
                                        Sudah Dibayar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewOrder({ ...newOrder, paymentStatus: 'unpaid' })}
                                        className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-xs font-bold rounded-md transition-all duration-200 ${newOrder.paymentStatus === 'unpaid'
                                            ? 'bg-white shadow-sm text-amber-600 ring-1 ring-slate-200/50'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                            }`}
                                    >
                                        <Clock size={16} className={newOrder.paymentStatus === 'unpaid' ? 'text-amber-500' : 'opacity-50'} />
                                        Belum Dibayar
                                    </button>
                                </div>
                            </div>

                            {/* Metode Bayar */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2">Metode Bayar</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'cash', label: 'Cash', desc: 'Tunai' },
                                        { id: 'qris', label: 'QRIS', desc: 'Instan' },
                                        { id: 'transfer', label: 'Transfer', desc: 'Manual VA' },
                                    ].map((method) => {
                                        const isSelected = newOrder.paymentMethod === method.id;
                                        return (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setNewOrder({ ...newOrder, paymentMethod: method.id })}
                                                className={`p-3 rounded-xl border text-center transition-all duration-200 ${isSelected
                                                    ? 'border-[#009662] bg-[#009662]/5 ring-1 ring-[#009662]/50'
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                                    }`}
                                            >
                                                <p className={`text-xs font-bold tracking-wide ${isSelected ? 'text-[#009662]' : 'text-slate-700'}`}>{method.label}</p>
                                                <p className={`text-[10px] mt-0.5 font-medium ${isSelected ? 'text-[#009662]/80' : 'text-slate-400'}`}>
                                                    {method.desc}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Kalkulator Pembayaran */}
                            {newOrder.paymentStatus === 'paid' && (
                                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wide">Total Tagihan</span>
                                            <span className="text-lg font-black text-slate-800">
                                                Rp {totalAmount.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        {newOrder.paymentMethod === 'cash' && (
                                            <div className={`p-3 rounded-lg border shadow-sm transition-colors ${(uangDiterima - totalAmount) >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                                                <span className="block text-[10px] font-bold uppercase tracking-wide opacity-70">Kembalian</span>
                                                <span className={`text-lg font-black ${(uangDiterima - totalAmount) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                    {(uangDiterima - totalAmount) >= 0
                                                        ? `Rp ${(uangDiterima - totalAmount).toLocaleString('id-ID')}`
                                                        : `- Rp ${Math.abs(uangDiterima - totalAmount).toLocaleString('id-ID')} (Kurang)`
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {newOrder.paymentMethod === 'cash' && (
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1.5">Nominal Uang Diterima</label>
                                            <div className="relative mb-2">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                                    <span className="text-sm font-bold text-slate-400">Rp</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    value={uangDiterimaDisplay}
                                                    onChange={handleUangDiterimaChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] focus:ring-2 focus:ring-[#009662]/20 font-bold text-slate-700 text-lg transition-all"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <button type="button" onClick={() => setUangPas(totalAmount)} className="px-3 py-1.5 text-[11px] font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-colors">
                                                    Uang Pas
                                                </button>
                                                {[50000, 100000].map((nominal) => (
                                                    <button key={nominal} type="button" onClick={() => setUangPas(nominal)} className="px-3 py-1.5 text-[11px] font-bold bg-white border border-slate-200 hover:border-[#009662] hover:text-[#009662] text-slate-600 rounded-md transition-colors shadow-sm">
                                                        {nominal.toLocaleString('id-ID')}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                </form>

                {/* Footer / Actions */}
                <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        form="form-add-order"
                        disabled={loading || !newOrder.outletId}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-[#009662] hover:bg-[#007d51] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-[#009662]/20 flex items-center gap-2"
                    >
                        {loading ? 'Memproses...' : 'Simpan Pesanan'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalAddOrder