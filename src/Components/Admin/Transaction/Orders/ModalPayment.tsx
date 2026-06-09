import { OrderType } from '@/types/Admin/Catalog/Order';
import { CheckIcon, XIcon } from 'lucide-react';
import React from 'react'
const CheckBadgeIcon = () => <svg className="w-12 h-12 text-[#009662] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
type Props = {
    onClose: () => void;
    activeVerifyOrder: OrderType | null;
    handleAcceptPayment: () => void;
}

const ModalPayment = ({ onClose, activeVerifyOrder, handleAcceptPayment }: Props) => {
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Verifikasi Pembayaran</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Periksa bukti transfer di bawah ini sebelum memproses pesanan.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon />
                    </button>
                </div>

                {/* Konten Modal / Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6">

                    {/* Ringkasan Pesanan Singkat */}
                    <div className="bg-[#F8FAFC] border border-slate-100 p-4 rounded-2xl grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Pelanggan</p>
                            <p className="font-bold text-slate-800 text-sm mt-0.5">{activeVerifyOrder?.customer_name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Invoice</p>
                            <p className="font-bold text-slate-800 mt-0.5">{activeVerifyOrder?.order_number}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Metode Pembayaran</p>
                            <p className="font-bold text-[#009662] text-sm mt-0.5">{activeVerifyOrder?.payment_method}</p>
                        </div>
                        <div className="text-right pt-2 border-t border-slate-100">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Tagihan</p>
                            <p className="font-black text-slate-900 text-sm mt-0.5">Rp {Number(activeVerifyOrder?.grand_total).toLocaleString('id-ID')}</p>
                        </div>
                    </div>

                    {/* Box Bukti Pembayaran (Simulasi Foto/Bukti Transfer) */}
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Foto / Bukti Transfer
                        </label>

                        {/* Visual Mock-up Bukti Pembayaran Digital */}
                        <div className='flex items-center justify-center w-full'> 
                            <img src={activeVerifyOrder?.payment_proof} className='max-h-100 max-w-100' />
                        </div>
                    </div>

                </div>

                {/* Footer Modal dengan Tombol Verifikasi */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-2">

                    {/* Tombol Terima Pembayaran */}
                    <button
                        type="button"
                        onClick={handleAcceptPayment}
                        className="w-full sm:flex-1 py-3 px-4 bg-[#009662] hover:bg-[#007d51] text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-[#009662]/20 flex items-center justify-center gap-1.5"
                    >
                        <CheckIcon />
                        <span>Terima Pembayaran</span>
                    </button>

                    {/* Tombol Batal */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto py-3 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-sm font-bold rounded-xl transition-colors text-center"
                    >
                        Batal
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ModalPayment