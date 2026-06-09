import { ChevronRight, Copy, Info, Sparkles, TrendingUp, Users } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    handleCopyReferral: () => void;
}

const AffiliateView = ({ handleCopyReferral }: Props) => {
    const [clientCount, setClientCount] = useState(10);
    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-10 bg-gradient-to-br from-slate-50 to-white border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <TrendingUp size={16} strokeWidth={2.5} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Estimasi Pendapatan</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-400">Rp</span>
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">1.425.000</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            Saldo dapat dicairkan pada akhir bulan
                        </p>

                        <button
                            className="mt-8 w-fit flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-900/20"
                        >
                            Tarik Dana <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Referral Section */}
                    <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 block">Kode Undangan Eksklusif</span>

                        <div className="bg-[#F8FAFC] p-2 rounded-2xl border border-slate-200 flex items-center shadow-inner">
                            <div className="flex-1 px-4 text-center sm:text-left">
                                <span className="text-xl font-black text-emerald-600 tracking-wider font-mono">AYUSUKMA55</span>
                            </div>
                            <button
                                onClick={handleCopyReferral}
                                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20`}
                            >
                                <Copy size={16} />
                                <span className="hidden sm:inline">Salin Kode</span>
                            </button>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-500 block mb-1">KLIEN AKTIF</span>
                                <div className="text-xl font-black text-slate-900">18 <span className="text-sm text-emerald-500 font-bold ml-1">↑2</span></div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-500 block mb-1">TOTAL DAFTAR</span>
                                <div className="text-xl font-black text-slate-900">42 <span className="text-sm font-bold text-slate-400 ml-1">Orang</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            { }
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <Info size={24} strokeWidth={2} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Skema Komisi Kemitraan</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Bagi hasil untuk setiap klien yang berlangganan senilai Rp 45.000/bulan.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Step 1: Activation */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-[1.5rem] relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 text-slate-200 group-hover:scale-110 transition-transform duration-500">
                            <Users size={100} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3">Bulan Pertama (Aktivasi)</span>
                            <h4 className="text-2xl font-black text-slate-900 mb-2">Rp 15.000 <span className="text-xs font-bold text-slate-400">/klien</span></h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Komisi instan diberikan saat klien mendaftar menggunakan kode referral Anda dan membayar biaya langganan pertama <span className="font-bold text-slate-700">Rp 45.000</span>.
                            </p>
                        </div>
                    </div>

                    {/* Step 2: Recurring */}
                    <div className="bg-emerald-950 border border-emerald-900 p-6 rounded-[1.5rem] relative overflow-hidden group text-white shadow-lg shadow-emerald-900/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-emerald-950 opacity-50"></div>
                        <div className="absolute -right-4 -bottom-4 text-emerald-800 group-hover:scale-110 transition-transform duration-500">
                            <Sparkles size={100} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 border border-emerald-500/30">Bulan Ke-2 & Seterusnya</span>
                            <h4 className="text-2xl font-black text-white mb-2">Rp 10.000 <span className="text-xs font-bold text-emerald-400/60">/bulan</span></h4>
                            <p className="text-xs text-emerald-100/70 font-medium leading-relaxed">
                                Nikmati penghasilan pasif (royalti) yang otomatis cair setiap kali klien Anda <span className="font-bold text-emerald-100">memperpanjang langganan</span> mereka.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Commission Simulator */}
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
                    <div>
                        <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                            Simulator Penghasilan Pasif
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">Geser slider untuk melihat potensi komisi bulanan Anda.</p>
                    </div>
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 font-mono text-xl font-black text-emerald-400">
                        Rp {((clientCount * 15000) + (clientCount * 10000)).toLocaleString('id-ID')}
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold tracking-wide text-slate-300 uppercase">Target Klien Berlangganan</span>
                        <span className="text-2xl font-black text-white">{clientCount} Orang</span>
                    </div>

                    {/* Custom Styled Slider */}
                    <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                            style={{ width: `${(clientCount / 100) * 100}%` }}
                        ></div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={clientCount}
                            onChange={(e) => setClientCount(parseInt(e.target.value))}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                        <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Aktivasi (Bulan 1)</span>
                            <div className="text-lg font-black text-slate-300">Rp {(clientCount * 15000).toLocaleString('id-ID')}</div>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest block mb-1">Royalti (Bulan ke-2+)</span>
                            <div className="text-lg font-black text-emerald-400">Rp {(clientCount * 10000).toLocaleString('id-ID')} <span className="text-xs text-slate-500 font-medium">/bln</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AffiliateView