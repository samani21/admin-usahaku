"use client"
import { OrderType } from '@/types/Admin/Catalog/Order';
import { OutletsType } from '@/types/Admin/OutletType';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { Get } from '@/utils/Get';
import { Post } from '@/utils/Post';
import { PlusIcon, TrashIcon, XIcon } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { QRCodeCanvas } from "qrcode.react";

type Props = {
    onClose: () => void;
    token: string | null;
}
const ModalDetailOrder = ({ onClose, token }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<OrderType>();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const getOrder = async () => {
        setLoading(true);
        try {
            const res = await Get<{ success: Boolean, data: OrderType }>(`/orders/detail-order?token=${token}`);
            if (res?.success) {
                setData(res?.data)
            }
        } catch (e: any) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrder()
    }, [token])
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">

                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Detail Order</h2>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>
                <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pelanggan</label>
                            <div className="w-full px-3.5 py-2 h-9.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009662] focus:bg-white transition-all">{data?.customer_name ?? ''}</div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Handphone Pelanggan</label>
                            <div className="w-full px-3.5 py-2 h-9.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009662] focus:bg-white transition-all font-mono font-bold">{data?.phone_number ?? ''}</div>
                        </div>
                    </div>

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
                                    const isSelected = data?.payment_method === method.id;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            // onClick={() => setNewOrder({ ...newOrder, paymentMethod: method.id })}
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
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Pembayaran
                        </h3>
                        {/* Info Outlet Badge */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-200/60 rounded-md border border-slate-300/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#009662] animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                {data?.outlet?.name || "Outlet Utama"} {/* Ganti dengan variabel nama outlet Anda */}
                            </span>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {/* Total Belanja */}
                        <div>
                            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                <span className="block text-[10px] text-slate-400 font-medium">Total Tagihan</span>
                                <span className="text-lg font-bold text-slate-800">
                                    Rp {Number(data?.grand_total || 0).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <QRCodeCanvas value={`${baseUrl ?? ''}/${data?.slug}/detail/${data?.qr_token}`} size={180} />
                        </div>
                    </div>
                    <div className="space-y-3.5 pt-2">
                        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                            {loading ? [1].map((_, idx) => (
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
                            )) : data?.items.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl border border-slate-200/85 p-4 shadow-2xs flex flex-col sm:flex-row gap-4 items-center relative group hover:border-[#009662]/30 transition-all duration-150"
                                    >
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                                            <img
                                                src={item?.iamge_product}
                                                alt={item?.product_name}
                                                className="max-w-full max-h-full object-contain animate-in fade-in zoom-in-95 duration-150"
                                            />
                                        </div>

                                        {/* 2. KANAN: Form Input Kontrol & Informasi */}
                                        <div className="flex-1 w-full space-y-3">

                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1">
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pilih Produk</label>
                                                    <div
                                                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#009662] font-semibold text-slate-700 disabled:opacity-60"
                                                    >
                                                        {item?.product_name}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3 items-end">

                                                <div className="col-span-4">
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Varian</label>
                                                    {item?.variant ? (
                                                        <div
                                                            className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-center font-bold text-slate-700 disabled:opacity-60"
                                                        >
                                                            {item?.variant?.name}
                                                        </div>
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
                                                            disabled
                                                            className="w-5.5 h-5.5 flex items-center justify-center font-black text-xs text-slate-500 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-all active:scale-95"
                                                        >
                                                            -
                                                        </button>

                                                        {/* Tampilan Angka */}
                                                        <span className="text-xs font-bold text-slate-800">{item.qty}</span>

                                                        {/* Tombol Tambah (+) */}
                                                        <button
                                                            type="button"
                                                            // Dikunci jika produk belum dipilih ATAU quantity sudah mencapai batas maxStock
                                                            disabled
                                                            className="w-5.5 h-5.5 flex items-center justify-center font-black text-xs text-slate-500 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-all active:scale-95"
                                                        >
                                                            +
                                                        </button>

                                                    </div>
                                                </div>
                                                <div className="col-span-4 text-right">
                                                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Subtotal</span>
                                                    <span className="text-xs font-extrabold text-[#009662] block pb-1">
                                                        Rp {Number(item?.qty * item?.price).toLocaleString('id-ID')}
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetailOrder