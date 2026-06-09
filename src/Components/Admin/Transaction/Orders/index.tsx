"use client"
import Loading from '@/Components/Component/Loading'
import { OrderType } from '@/types/Admin/Catalog/Order'
import { Meta } from '@/types/Public'
import { Get } from '@/utils/Get'
import { AlertCircle, AlertTriangle, CalendarIcon, Check, CheckCheck, CheckCheckIcon, CheckCircle2, CheckIcon, Clock, ClockIcon, Eye, FileCheck2, Hourglass, Package, PackageCheck, Play, PlusIcon, ScanBarcode, SearchIcon, ShoppingBagIcon, Signature, SlidersIcon, TimerOff, TruckIcon, Wallet, XCircle, XIcon } from 'lucide-react'
import React, { use, useEffect, useMemo, useState } from 'react'
import ModalPayment from './ModalPayment'
import { Post } from '@/utils/Post'
import ModalScan from './ModalScan'
import ModalAddOrder from './ModalAddOrder'
import { OutletsType } from '@/types/Admin/OutletType'
import ModalDetailOrder from './ModalDetailOrder'

type Props = {}
interface dataType {
    summary: {
        count: number;
        pending: number;
        processing: number;
        completed: number;
        paid: number;
        unpaid: number;
        expired: number;
        cancelled: number;
    }
    data: OrderType[];
    outlets: OutletsType[];
    meta: Meta;
}
const OrdersComponent = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedOutlet, setSelectedOutlet] = useState<string>('all');
    const [dataOrders, setDataOrders] = useState<dataType>();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [activeVerifyOrder, setActiveVerifyOrder] = useState<OrderType | null>(null);
    const [isOpenScan, setIsOpenScan] = useState<boolean>(false);
    const [toasts, setToasts] = useState<{ message: string, type: string } | null>(null);
    const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
    const [outlets, setOutlets] = useState<OutletsType[]>([]);
    const [qrToken, setQrToken] = useState<string | null>(null);
    useEffect(() => {
        getOrder();
    }, [])
    const getOrder = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: Boolean, data: dataType }>(`orders?per_page=${itemsPerPage}&page=${currentPage}`);
            if (res?.success) {
                setDataOrders(res?.data)
                setOutlets(res?.data?.outlets)
            }
        } catch (e: any) {

        } finally {
            setLoading(false);
        }
    }

    const statusMeta: Record<string, { bg: string; icon: React.ReactNode; label: string }> = {
        pending: {
            bg: 'bg-amber-50 text-amber-700 border-amber-200/60',
            icon: <Clock size={16} />,
            label: 'Menunggu'
        },
        unpaid: {
            bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
            icon: <Wallet size={16} />, // Lebih cocok untuk pembayaran dibanding Clock
            label: 'Belum Dibayar'
        },
        processing: {
            bg: 'bg-blue-50 text-blue-700 border-blue-200/60',
            icon: <Package size={16} />, // Package/Box menggambarkan proses packing/persiapan barang
            label: 'Diproses'
        },
        completed: {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
            icon: <CheckCircle2 size={16} />,
            label: 'Selesai'
        },
        done: {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
            icon: <PackageCheck size={16} />, // Membedakan 'completed' dan 'done' jika alurnya berbeda (misal: Selesai diterima)
            label: 'Pesanan Diterima'
        },
        paid: {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
            icon: <FileCheck2 size={16} />, // Signature diganti ke konfirmasi dokumen/pembayaran sukses
            label: 'Sudah Dibayar'
        },
        cancelled: {
            bg: 'bg-rose-50 text-rose-700 border-rose-200/60',
            icon: <XCircle size={16} />,
            label: 'Dibatalkan'
        },
        expired: {
            bg: 'bg-gray-50 text-gray-700 border-gray-200/60',
            icon: <Hourglass size={16} />, // Pengganti TimerOff yang lebih umum di Lucide
            label: 'Kadaluwarsa'
        }
    };
    const handleTriggerProcess = (order: OrderType) => {
        if (order.payment_method === 'cash') {
            // Jika pembayaran Cash, langsung ubah status menjadi processing
            handleUpdateStatus(order, 'processing', 'paid');
        } else {
            // Jika pembayaran QRIS atau Transfer Bank, buka modal verifikasi pembayaran
            setActiveVerifyOrder(order);
            setShowPaymentModal(true);
        }
    };

    const handleUpdateStatus = async (order: OrderType, status: string, payment_status?: string) => {
        setLoading(true)
        try {
            const formData = new FormData();
            if (payment_status) {
                formData.append('payment_status', payment_status);
            }
            formData.append('status', status);
            const res = await Post<any, FormData>(`orders/${order?.id}`, formData);
            if (res?.success) {
                getOrder()
                setShowPaymentModal(false);
                setActiveVerifyOrder(null)
                setIsOpenScan(false);
            }
        } catch (e: any) {

        } finally {
            setLoading(false);
        }
    }
    const addToast = (message: string, type: string = 'success') => {
        const id = Date.now();
        const toast = {
            message: message,
            type: type
        }
        setToasts(toast);
        setTimeout(() => {
            setToasts(null);
        }, 3000);
    };
    return (
        <div>
            <div className="lg:p-6 mx-auto space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Pesanan</span>
                        <p className="text-2xl font-black text-slate-800 mt-1">{dataOrders?.summary?.count}</p>
                    </div>

                    <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">Belum Dibayar</span>
                        <p className="text-2xl font-black text-indigo-700 mt-1">{dataOrders?.summary?.unpaid}</p>
                    </div>

                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Menunggu Verifikasi</span>
                        <p className="text-2xl font-black text-amber-700 mt-1">{dataOrders?.summary?.pending}</p>
                    </div>

                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Dibayar</span>
                        <p className="text-2xl font-black text-amber-700 mt-1">{dataOrders?.summary?.paid}</p>
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">Diproses</span>
                        <p className="text-2xl font-black text-blue-700 mt-1">{dataOrders?.summary?.processing}</p>
                    </div>

                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-[#009662] uppercase tracking-wider block">Orderan/Pesanan Selesai</span>
                        <p className="text-2xl font-black text-[#009662] mt-1">{dataOrders?.summary?.completed}</p>
                    </div>

                    <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Dibatalkan/Expired</span>
                        <p className="text-2xl font-black text-rose-700 mt-1">{dataOrders?.summary?.cancelled}</p>
                    </div>
                    <div className="bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100/50 shadow-2xs">
                        <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">Expired</span>
                        <p className="text-2xl font-black text-zinc-700 mt-1">{dataOrders?.summary?.expired}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="relative w-full ">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama pelanggan, nomor invoice..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#009662] focus:bg-white transition-all text-slate-700 placeholder-slate-400"
                        />
                    </div>
                    {/* Search Input */}
                    <div className="relative w-full">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama pelanggan, nomor invoice..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#009662] focus:bg-white transition-all text-slate-700 placeholder-slate-400"
                        />

                    </div>

                    {/* Dropdown Filters & Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-end">

                        {/* Filter Outlet */}
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={selectedOutlet}
                                onChange={(e) => setSelectedOutlet(e.target.value)}
                                className="w-full sm:w-44 pl-3 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl text-slate-600 font-semibold focus:outline-none focus:border-[#009662] appearance-none"
                            >
                                <option value="all">Semua Outlet</option>
                                <option value="Outlet 1">Outlet 1</option>
                                <option value="Outlet 2">Outlet 2</option>
                                <option value="Outlet 3">Outlet 3</option>
                            </select>
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</span>
                        </div>

                        {/* Filter Status */}
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full sm:w-44 pl-3 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl text-slate-600 font-semibold focus:outline-none focus:border-[#009662] appearance-none"
                            >
                                <option value="all">Semua Status</option>
                                <option value="pending">Menunggu</option>
                                <option value="processing">Dipzincs</option>
                                <option value="completed">Selesai</option>
                                <option value="cancelled">Dibatalkan</option>
                            </select>
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</span>
                        </div>

                        {/* Reset Filter Button */}
                        <button
                            // onClick={handleResetFilter}
                            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/50"
                        >
                            <SlidersIcon />
                            <span>Reset</span>
                        </button>
                        <div className='flex items-center gap-2 w-full'>
                            <button
                                onClick={() => setIsOpenScan(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/50"
                            >
                                <ScanBarcode />
                                <span>Scan</span>
                            </button>
                            <button
                                onClick={() => setOpenModalAdd(true)}
                                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-[#009662] hover:bg-[#007d51] active:scale-95 rounded-xl transition-all duration-150 shadow-sm shadow-[#009662]/15"
                            >
                                <PlusIcon />
                                <span>Order</span>
                            </button>
                        </div>
                    </div>
                </div>
                {dataOrders?.data.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto shadow-xs">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBagIcon />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">Order tidak ditemukan</h3>
                        <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian lain atau sesuaikan filter Anda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {dataOrders?.data?.map((order) => {

                            // Color mapping sesuai status
                            const status = statusMeta;
                            const date = new Date(order.created_at);

                            const formattedDate = date.toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            });

                            const formattedTime = date.toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="p-5 border-b border-slate-50 bg-slate-50/20">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                                                    {order.order_number}
                                                </span>
                                                <h3 className="text-base font-bold text-slate-800 mt-0.5">
                                                    {order.customer_name}
                                                </h3>
                                            </div>
                                            {/* Pill Status */}
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status?.[order?.payment_status === 'unpaid' ? order?.payment_status : order?.status]?.bg}`}>
                                                {status?.[order?.payment_status === 'unpaid' ? order?.payment_status : order?.status]?.icon}
                                                <span>{status?.[order?.payment_status === 'unpaid' ? order?.payment_status : order?.status]?.label}</span>
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                                            <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md border border-slate-200/40">
                                                {order.outlet?.name}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon />
                                                <span>{formattedDate} {formattedTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body - Products List */}
                                    <div className="p-5 flex-1 space-y-3.5">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <ShoppingBagIcon />
                                            <span>Rincian Produk ({order.items.length})</span>
                                        </div>

                                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                            {order.items.map((item, idx) => (
                                                <div key={item.id || idx} className="flex justify-between items-start text-xs text-slate-600 pb-2.5 last:pb-0 border-b border-slate-50 last:border-0">
                                                    <div className="space-y-0.5">
                                                        <p className="font-bold text-slate-800">{item.product?.name}</p>
                                                        {item.variant && (
                                                            <span className="inline-block text-[10px] font-medium bg-slate-100 border border-slate-200/50 text-slate-500 px-1.5 py-0.2 rounded-md">
                                                                Varian: {item.variant?.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-slate-400">{item.qty}x</p>
                                                        <p className="font-bold text-slate-700">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Card Footer - Dynamic Actions depending on current status */}
                                    <div className="p-5 bg-slate-50/30 border-t border-slate-100 flex flex-col gap-3">

                                        {/* Summary Metrik */}
                                        <div className="flex items-center justify-between text-xs">
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metode</p>
                                                <span className="inline-block px-2 py-0.5 rounded-md font-bold text-slate-600 border border-slate-200 bg-white mt-0.5">
                                                    {order.payment_method}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Pembayaran</p>
                                                <p className="text-base font-black text-[#009662] mt-0.5">
                                                    Rp {Number(order.grand_total ?? 0).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Interactive Actions */}
                                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                            {/* Tombol Detail selalu muncul */}
                                            <button
                                                onClick={() => setQrToken(order?.qr_token)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 text-xs font-bold rounded-lg transition-all"
                                                title="Lihat Detail Pesanan"
                                            >
                                                <Eye size={14} />
                                                Detail
                                            </button>

                                            {/* STATUS: PENDING */}
                                            {order.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleTriggerProcess(order)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-blue-500/10"
                                                    >
                                                        <Play size={14} fill="currentColor" />
                                                        {order.payment_method === 'cash' ? 'Proses Pesanan' : 'Verifikasi & Proses'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(order, 'cancelled', 'cancelled')}
                                                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-rose-500 hover:bg-rose-50 border border-rose-200/60 text-xs font-bold rounded-lg transition-all"
                                                        title="Batalkan Pesanan"
                                                    >
                                                        <XCircle size={14} />
                                                        Batal
                                                    </button>
                                                </>
                                            )}

                                            {/* STATUS: PAID */}
                                            {order.status === 'paid' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(order, 'processing')}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-blue-500/10"
                                                >
                                                    <Play size={14} fill="currentColor" />
                                                    Proses Pesanan
                                                </button>
                                            )}

                                            {/* STATUS: PROCESSING */}
                                            {order.status === 'processing' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(order, 'completed')}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#009662] hover:bg-[#007d51] text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-[#009662]/10"
                                                    >
                                                        <Check size={14} strokeWidth={3} />
                                                        Selesaikan Pesanan
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(order, order?.payment_method === 'cash' ? 'pending' : 'paid')}
                                                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-rose-500 hover:bg-rose-50 border border-rose-200/60 text-xs font-bold rounded-lg transition-all"
                                                    >
                                                        <XCircle size={14} />
                                                        Batal
                                                    </button>
                                                </>
                                            )}

                                            {/* STATUS: COMPLETED */}
                                            {order.status === 'completed' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(order, 'done')}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#009662] hover:bg-[#007d51] text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-[#009662]/10"
                                                >
                                                    <CheckCheck size={14} strokeWidth={2.5} />
                                                    Selesaikan Orderan
                                                </button>
                                            )}

                                            {/* STATUS: DONE / CANCELLED (READ ONLY BADGE) */}
                                            {(order.status === 'done' || order.status === 'cancelled') && (
                                                <div className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg">
                                                    {order.status === 'done' ? (
                                                        <>
                                                            <CheckCheck size={13} className="text-emerald-500" />
                                                            Orderan Telah Selesai
                                                        </>
                                                    ) : (
                                                        <>
                                                            <AlertCircle size={13} className="text-rose-400" />
                                                            Pesanan Dibatalkan
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    {/* Entries Info */}
                    <p className="text-xs text-slate-500 font-semibold">
                        Menampilkan <span className="text-slate-800 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> sampai{' '}
                        <span className="text-slate-800 font-bold">{Math.min(currentPage * itemsPerPage, Number(dataOrders?.meta?.total ?? 0))}</span> dari{' '}
                        <span className="text-slate-800 font-bold">{Number(dataOrders?.meta?.total ?? 0)}</span> entri
                    </p>

                    {/* Page Navigation Controls */}
                    <div className="flex items-center gap-1.5">
                        {/* Previous Button */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="h-9 px-3 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all"
                        >
                            Sebelumnya
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: Number(dataOrders?.meta?.last_page ?? 0) }, (_, i) => i + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${currentPage === pageNumber
                                    ? 'bg-[#009662] text-white border border-[#009662] shadow-xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Number(dataOrders?.meta?.last_page ?? 0)))}
                            disabled={currentPage === Number(dataOrders?.meta?.last_page ?? 0)}
                            className="h-9 px-3 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
            {showPaymentModal && activeVerifyOrder && (
                <ModalPayment
                    onClose={() => { setShowPaymentModal(false); setActiveVerifyOrder(null) }}
                    activeVerifyOrder={activeVerifyOrder}
                    handleAcceptPayment={() => handleUpdateStatus(activeVerifyOrder, 'paid', 'paid')} />
            )}
            {
                loading && <Loading />
            }

            {
                isOpenScan &&
                <ModalScan onClose={() => setIsOpenScan(false)} handleUpdateStatus={handleUpdateStatus} />
            }
            {
                openModalAdd && <ModalAddOrder onClose={() => setOpenModalAdd(false)} addToast={addToast} outlets={outlets} handleSubmit={(token: string) => { getOrder(), setQrToken(token), setOpenModalAdd(false) }} />
            }
            {
                toasts &&
                <div className="fixed bottom-6 right-1 sm:right-6 z-70 flex flex-col gap-2.5 max-w-sm w-full">
                    <div
                        className={`p-4 rounded-xl shadow-lg border text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-bottom duration-300 ${toasts.type === 'error'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : toasts.type === 'info'
                                ? 'bg-slate-800 text-white border-slate-700'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                    >
                        {toasts.type === 'error' ? <AlertTriangle className='text-rose-600' /> : '✓'}
                        <p className="flex-1">{toasts.message}</p>
                    </div>
                </div>
            }

            {
                qrToken && <ModalDetailOrder onClose={() => setQrToken(null)} token={qrToken} />
            }

        </div>
    )
}

export default OrdersComponent