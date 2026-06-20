"use client"
import { OrderType } from '@/types/Admin/Catalog/Order';
import { CheckIcon, XIcon, Wallet } from 'lucide-react';
import React, { useState } from 'react'

const CheckBadgeIcon = () => <svg className="w-12 h-12 text-[#009662] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

type Props = {
    onClose: () => void;
    activeVerifyOrder: OrderType | null;
    handleAcceptPayment: (uangDiterima?: number) => void; // Tambahkan opsional parameter jika backend butuh catat nominal
}

const ModalPayment = ({ onClose, activeVerifyOrder, handleAcceptPayment }: Props) => {
    // Kalkulasi Data
    const isCash = activeVerifyOrder?.payment_method?.toLowerCase() === 'cash';
    const totalAmount = Number(activeVerifyOrder?.grand_total || 0);

    // State untuk Kalkulator Uang Cash
    const [uangDiterima, setUangDiterima] = useState<number>(0);
    const [uangDiterimaDisplay, setUangDiterimaDisplay] = useState<string>('');

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

    // Validasi untuk menonaktifkan tombol submit
    const isSubmitDisabled = isCash && (uangDiterima < totalAmount);

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Verifikasi Pembayaran</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Periksa bukti atau input nominal uang yang diterima.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon size={20} />
                    </button>
                </div>

                {/* Konten Modal / Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6">

                    {/* Ringkasan Pesanan Singkat */}
                    <div className="bg-[#F8FAFC] border border-slate-100 p-4 rounded-2xl grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Pelanggan</p>
                            <p className="font-bold text-slate-800 text-sm mt-0.5">{activeVerifyOrder?.customer_name || 'Tanpa Nama'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Invoice</p>
                            <p className="font-bold text-slate-800 mt-0.5">{activeVerifyOrder?.order_number}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Metode Bayar</p>
                            <p className="font-bold text-[#009662] text-sm mt-0.5 uppercase">{activeVerifyOrder?.payment_method}</p>
                        </div>
                        <div className="text-right pt-2 border-t border-slate-100">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Tagihan</p>
                            <p className="font-black text-slate-900 text-sm mt-0.5">Rp {totalAmount.toLocaleString('id-ID')}</p>
                        </div>
                    </div>

                    {/* KONDISI: Jika Pembayaran CASH -> Tampilkan Kalkulator */}
                    {isCash ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Wallet size={16} className="text-[#009662]" />
                                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Kalkulator Kasir</h4>
                            </div>

                            <div className={`p-4 rounded-xl border shadow-sm transition-colors ${(uangDiterima - totalAmount) >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                                <span className="block text-[10px] font-bold uppercase tracking-wide opacity-70">Kembalian</span>
                                <span className={`text-2xl font-black ${(uangDiterima - totalAmount) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {(uangDiterima - totalAmount) >= 0
                                        ? `Rp ${(uangDiterima - totalAmount).toLocaleString('id-ID')}`
                                        : `- Rp ${Math.abs(uangDiterima - totalAmount).toLocaleString('id-ID')} (Kurang)`
                                    }
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Nominal Uang Diterima</label>
                                <div className="relative mb-3">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <span className="text-sm font-bold text-slate-400">Rp</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        value={uangDiterimaDisplay}
                                        onChange={handleUangDiterimaChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#009662] focus:ring-2 focus:ring-[#009662]/20 font-bold text-slate-700 text-lg transition-all"
                                    />
                                </div>

                                {/* Quick Nominal Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    <button type="button" onClick={() => setUangPas(totalAmount)} className="px-3 py-2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors">
                                        Uang Pas
                                    </button>
                                    {[50000, 100000].map((nominal) => (
                                        <button key={nominal} type="button" onClick={() => setUangPas(nominal)} className="px-3 py-2 text-xs font-bold bg-white border border-slate-200 hover:border-[#009662] hover:text-[#009662] text-slate-600 rounded-lg transition-colors shadow-sm">
                                            {nominal.toLocaleString('id-ID')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* KONDISI: Jika BUKAN CASH (Transfer/QRIS) -> Tampilkan Foto Bukti */
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Foto / Bukti Transfer
                            </label>
                            {activeVerifyOrder?.payment_proof ? (
                                <div className='flex items-center justify-center w-full bg-slate-50 border border-slate-200 rounded-2xl p-2'>
                                    <img src={activeVerifyOrder?.payment_proof} alt="Bukti Pembayaran" className='max-h-80 w-auto rounded-xl object-contain' />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                                    <p className="text-sm font-medium text-slate-400 text-center">Bukti transfer belum diunggah</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* Footer Modal dengan Tombol Verifikasi */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-2 shrink-0">

                    {/* Tombol Terima Pembayaran */}
                    <button
                        type="button"
                        onClick={() => handleAcceptPayment(uangDiterima)}
                        disabled={isSubmitDisabled}
                        className="w-full sm:flex-1 py-3 px-4 bg-[#009662] hover:bg-[#007d51] disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none text-white text-sm font-bold rounded-xl transition-all shadow-sm shadow-[#009662]/20 flex items-center justify-center gap-2"
                    >
                        <CheckIcon size={18} />
                        <span>Terima Pembayaran</span>
                    </button>

                    {/* Tombol Batal */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto py-3 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-sm font-bold rounded-xl transition-colors text-center"
                    >
                        Batal
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ModalPayment