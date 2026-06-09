import { OrderType } from '@/types/Admin/Catalog/Order';
import { AlertTriangle, History, X } from 'lucide-react'
import React from 'react'

type Props = {
    theme: string
    onClose: () => void;
    order: OrderType[];
    themeStyles: any;
}

const ModalOrder = ({ theme, onClose, order, themeStyles }: Props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 transition-all duration-300 animate-fadeIn">
            <div className={`w-full max-w-md rounded-2xl border p-6 backdrop-blur-2xl shadow-2xl transition-all ${theme === 'dark' ? 'bg-[#0a0a0a]/90 border-white/10 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
                }`}>
                <div className="flex justify-between items-center mb-4 border-b border-neutral-500/10 pb-3">
                    <div className="flex items-center gap-2">
                        <History className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'} size={18} />
                        <h3 className="font-bold text-base tracking-tight">Riwayat Transaksi Perangkat</h3>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-neutral-500/10 rounded-lg transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {order?.map((order) => {
                        const date = new Date(order?.created_at);

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
                            <div key={order?.id} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-neutral-50 border-neutral-100'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className={`text-xs font-mono font-semibold ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                            {order?.order_number}
                                        </p>
                                        <p className={`text-[10px] ${themeStyles.textSub}`}>{formattedDate} {formattedTime}</p>
                                    </div>
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${theme === 'dark'
                                        ? 'bg-neutral-900 border-white/5 text-neutral-400'
                                        : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                                        }`}>
                                        Belum Tertaut
                                    </span>
                                </div>

                                <div className="space-y-1.5 my-3 border-t border-b border-dashed border-neutral-500/15 py-2.5">
                                    {order?.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-xs opacity-90">
                                            <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
                                                {item.product_name} <span className={`text-[10px] ${themeStyles.textSub}`}>x{item.qty}</span>
                                            </span>
                                            <span className="font-mono font-medium">Rp {Number(item.price * item.qty).toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center font-bold text-xs pt-0.5 tracking-tight">
                                    <span>Total Pembayaran</span>
                                    <span className="font-mono text-sm">Rp {Number(order?.total_price).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* Kotak Edukasi Informasi Resiko di bagian bawah modal */}
                <div className={`mt-4 p-3 rounded-xl border text-[11px] leading-relaxed ${theme === 'dark'
                    ? 'bg-orange-500/[0.03] border-orange-500/20 text-orange-400/90'
                    : 'bg-orange-50 border-orange-100 text-orange-800'
                    }`}>
                    <div className="flex gap-2 items-start">
                        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                        <span>
                            Data di atas saat ini hanya tersimpan di browser internal perangkat Anda. Demi keamanan riwayat pesanan dan kemudahan pelacakan status pengiriman, sangat disarankan untuk mencentang opsi **Tautkan otomatis** sebelum masuk ke akun.
                        </span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className={`w-full mt-5 font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] ${theme === 'dark'
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                        }`}
                >
                    Selesai & Tutup
                </button>
            </div>
        </div>
    )
}

export default ModalOrder