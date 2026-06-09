'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { AlertCircle, CalendarIcon, Check, CheckCircle2, CheckIcon, ClockIcon, Play, ShoppingBagIcon, Signature, TimerOff, TruckIcon, XCircle, XIcon } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Get } from '@/utils/Get';
import { OrderType } from '@/types/Admin/Catalog/Order';
import { Meta } from '@/types/Public';

type Props = {
    onClose: () => void;
    handleUpdateStatus: (order: OrderType, status: string, paymentStatus?: string) => void;
}
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
    meta: Meta;
}


const statusMeta: any = {
    pending: {
        bg: 'bg-amber-50 text-amber-700 border-amber-200/60',
        icon: <ClockIcon />,
        label: 'Menunggu'
    },
    unpaid: {
        bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
        icon: <ClockIcon />,
        label: 'Belum dibayar'
    },
    processing: {
        bg: 'bg-blue-50 text-blue-700 border-blue-200/60',
        icon: <TruckIcon />,
        label: 'Diproses'
    },
    completed: {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        icon: <CheckIcon />,
        label: 'Selesai'
    },
    paid: {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        icon: <Signature />,
        label: 'Dibayar'
    },
    cancelled: {
        bg: 'bg-rose-50 text-rose-700 border-rose-200/60',
        icon: <XIcon />,
        label: 'Batal'
    },
    expired: {
        bg: 'bg-gray-50 text-gray-700 border-gray-200/60',
        icon: <TimerOff />,
        label: 'Expired'
    }
};
const ModalScan = ({ onClose, handleUpdateStatus }: Props) => {
    const [scanError, setScanError] = useState<string | null>(null);
    const [stringScan, setStrigScan] = useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
    const [dataOrder, setDataOrder] = useState<OrderType | null>(null);
    // Gunakan useRef agar instance html5Qrcode tidak terbuat ulang saat re-render
    const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        // 1. Buat instance baru menggunakan ID elemen target
        const html5Qrcode = new Html5Qrcode("reader", {
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            verbose: false
        });
        html5QrcodeRef.current = html5Qrcode;

        // 2. Callback ketika QR Code sukses terbaca
        const onSuccess = (decodedText: string) => {
            // Mainkan bunyi beep kasir secara sintetis
            try {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1300, ctx.currentTime);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } catch (e) {
                console.log("Audio contexts blocked or unsupported");
            }

            // Hentikan pelacakan kamera sebelum mengirim data keluar
            if (html5Qrcode.isScanning) {
                html5Qrcode.stop()
                    .then(() => {
                        setStrigScan(decodedText);
                    })
                    .catch((err) => console.error("Gagal menghentikan kamera:", err));
            } else {
                setStrigScan(decodedText);
            }
        };

        const onError = (errorMessage: string) => {
            // Dipanggil setiap frame jika tidak mendeteksi QR Code, biarkan kosong agar tidak membebani log
        };

        // 3. Langsung jalankan kamera belakang otomatis saat komponen di-mount
        html5Qrcode.start(
            { facingMode: "environment" }, // Memaksa kamera belakang gadget / smartphone
            {
                fps: 10,                 // Frame per second pemindaian
                qrbox: { width: 250, height: 250 } // Area kotak fokus tengah
            },
            onSuccess,
            onError
        )
            .then(() => {
                setIsCameraReady(true);
                setScanError(null);
            })
            .catch((err) => {
                console.error("Gagal menginisialisasi kamera:", err);
                setScanError("Tidak dapat mengakses kamera belakang. Pastikan izin kamera diberikan.");
            });

        // 4. Cleanup fungsi ketika modal ditutup (Unmount)
        return () => {
            if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
                html5QrcodeRef.current.stop().catch((err) => console.error("Gagal mematikan kamera saat unmount:", err));
            }
        };
    }, []);

    // Fungsi tutup manual yang memastikan kamera dimatikan terlebih dahulu
    const handleClose = async () => {
        if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
            try {
                await html5QrcodeRef.current.stop();
            } catch (err) {
                console.error("Gagal mematikan kamera:", err);
            }
        }
        onClose();
    };

    useEffect(() => {
        getOrder();
    }, [stringScan])
    const getOrder = async () => {
        try {
            const res = await Get<{ success: Boolean, data: dataType }>(`orders?qr_order=${stringScan}`);
            if (res?.success) {
                setDataOrder(res?.data?.data?.find((e) => e?.qr_order === stringScan) ?? null);
            }
        } catch (e: any) {

        } finally {
        }
    }

    const status = statusMeta;

    // Color mapping sesuai status
    const formatDate = useMemo(() => {
        if (!dataOrder) return null;
        const date = new Date(dataOrder?.created_at);

        const formattedDate = date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        const formattedTime = date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate} ${formattedTime}`
    }, [dataOrder])

    const payment_status = dataOrder?.payment_proof === 'cash' ? 'unpaid' : undefined
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-black text-slate-900">QR Code Scanner</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Arahkan kamera ke QR Code invoice pelanggan.</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                {
                    dataOrder ? <div
                        className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
                    >
                        {/* Card Header */}
                        <div className="p-5 border-b border-slate-50 bg-slate-50/20">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                                        {dataOrder?.order_number}
                                    </span>
                                    <h3 className="text-base font-bold text-slate-800 mt-0.5">
                                        {dataOrder?.customer_name}
                                    </h3>
                                </div>
                                {/* Pill Status */}
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status?.[dataOrder?.payment_status === 'unpaid' ? dataOrder?.payment_status : dataOrder?.status]?.bg}`}>
                                    {status?.[dataOrder?.payment_status === 'unpaid' ? dataOrder?.payment_status : dataOrder?.status]?.icon}
                                    <span>{status?.[dataOrder?.payment_status === 'unpaid' ? dataOrder?.payment_status : dataOrder?.status]?.label}</span>
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                                <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md border border-slate-200/40">
                                    {dataOrder?.outlet?.name}
                                </span>
                                <div className="flex items-center gap-1">
                                    <CalendarIcon />
                                    <span>{formatDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Body - Products List */}
                        <div className="p-5 flex-1 space-y-3.5">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <ShoppingBagIcon />
                                <span>Rincian Produk ({dataOrder?.items.length})</span>
                            </div>

                            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                {dataOrder?.items.map((item, idx) => (
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
                                        {dataOrder?.payment_method}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Pembayaran</p>
                                    <p className="text-base font-black text-[#009662] mt-0.5">
                                        Rp {Number(dataOrder?.grand_total ?? 0).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            {/* Interactive Actions */}
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                {/* STATUS: PENDING */}
                                {dataOrder.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStatus(dataOrder, 'processing', 'paid')}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-blue-500/10"
                                        >
                                            <Play size={14} fill="currentColor" />
                                            {dataOrder.payment_method === 'cash' ? 'Proses Pesanan' : 'Verifikasi & Proses'}
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(dataOrder, 'cancelled', 'cancelled')}
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-rose-500 hover:bg-rose-50 border border-rose-200/60 text-xs font-bold rounded-lg transition-all"
                                            title="Batalkan Pesanan"
                                        >
                                            <XCircle size={14} />
                                            Batal
                                        </button>
                                    </>
                                )}

                                {/* STATUS: PAID */}
                                {dataOrder.status === 'paid' && (
                                    <button
                                        onClick={() => handleUpdateStatus(dataOrder, 'processing')}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-blue-500/10"
                                    >
                                        <Play size={14} fill="currentColor" />
                                        Proses Pesanan
                                    </button>
                                )}

                                {/* STATUS: PROCESSING */}
                                {dataOrder.status === 'processing' && (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStatus(dataOrder, 'completed')}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#009662] hover:bg-[#007d51] text-white text-xs font-bold rounded-lg transition-colors shadow-xs shadow-[#009662]/10"
                                        >
                                            <Check size={14} strokeWidth={3} />
                                            Selesaikan Pesanan
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(dataOrder, dataOrder?.payment_method === 'cash' ? 'pending' : 'paid')}
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-rose-500 hover:bg-rose-50 border border-rose-200/60 text-xs font-bold rounded-lg transition-all"
                                        >
                                            <XCircle size={14} />
                                            Batal
                                        </button>
                                    </>
                                )}

                                {/* STATUS: COMPLETED / CANCELLED (READ ONLY BADGE) */}
                                {(dataOrder?.status === 'completed' || dataOrder?.status === 'cancelled') && (
                                    <div className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg">
                                        {dataOrder?.status === 'completed' ? (
                                            <>
                                                <CheckCircle2 size={13} className="text-emerald-500" />
                                                Transaksi Telah Selesai
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
                    </div> :
                        <div className="p-6 flex flex-col items-center space-y-4">
                            <div className="relative w-full aspect-square max-w-[340px] overflow-hidden bg-slate-950 rounded-2xl border-4 border-slate-900 shadow-inner flex items-center justify-center">
                                <div id="reader" className="w-full h-full overflow-hidden [&_video]:w-full [&_video]:h-full [&_video]:object-cover"></div>
                                {!isCameraReady && !scanError && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 text-xs gap-2">
                                        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Membuka Kamera Belakang...</span>
                                    </div>
                                )}
                                {scanError && (
                                    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center bg-slate-950 text-center text-rose-400 text-xs gap-2">
                                        <span>⚠️</span>
                                        <p className="font-semibold">{scanError}</p>
                                    </div>
                                )}
                                {isCameraReady && (
                                    <div className="absolute w-full h-[2px] bg-emerald-500 shadow-[0_0_8px_#10b981] animate-[bounce_2.5s_infinite] left-0 top-0 pointer-events-none z-10" />
                                )}
                            </div>
                            {isCameraReady && (
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                    <span>KAMERA BELAKANG AKTIF</span>
                                </div>
                            )}
                        </div>
                }
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors"
                    >
                        Tutup Scanner
                    </button>
                </div>
            </div>
            {/* Pembersihan UI Tambahan dari Elemen Bawaan Library yang Tidak Sengaja Muncul */}
            <style jsx global>{`
                #reader {
                    border: none !important;
                }
                #reader video {
                    transform: scaleX(1); /* Kamera belakang tidak perlu di-mirror */
                }
            `}</style>
        </div>
    );
};

export default ModalScan;