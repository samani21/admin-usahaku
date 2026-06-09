import { OrderType } from '@/types/Admin/Catalog/Order';
import { AlertTriangle, ArrowRight, Eye, EyeOff, Lock, Mail, ShoppingBag, X } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    handleSubmit: (v: any) => void;
    error: string
    clearError: () => void;
    isLogin: boolean
    themeStyles: any
    setForm: Dispatch<SetStateAction<any>>;
    form: any;
    handleWhatsappChange: (e: any) => void;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    theme: string;
    order: OrderType[];
    setShowOrderModal: Dispatch<SetStateAction<boolean>>;
    bindOrdersChecked: boolean;
    setBindOrdersChecked: Dispatch<SetStateAction<boolean>>;
}

const FormAuth = ({ handleSubmit, error, clearError, isLogin, themeStyles, setForm, form, handleWhatsappChange, showPassword, setShowPassword, isLoading, theme, order, setShowOrderModal, bindOrdersChecked, setBindOrdersChecked }: Props) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium flex items-center justify-between" role="alert">
                    <div className='flex items-center gap-4'>
                        <AlertTriangle className='text-red-600 w-5' />
                        {error}
                    </div>
                    <button className="text-red-600 cursor-pointer" onClick={() => clearError()}>
                        <X />
                    </button>
                </div>
            )}

            {/* FITUR BARU: Floating Notification untuk Bind Orderan Terdeteksi */}
            {/* Floating Notification untuk Bind Orderan Terdeteksi (Warna Netral) */}
            {/* Floating Notification untuk Bind Orderan Terdeteksi (Warna Netral + Warning Edukatif) */}
            {order?.length > 0 && (
                <div className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-2 ${theme === 'dark'
                    ? 'bg-white/[0.02] border-white/10 text-neutral-300'
                    : 'bg-neutral-100/70 border-neutral-200 text-neutral-800'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium">
                            <ShoppingBag size={14} className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} />
                            <span>Terdeteksi {order?.length} transaksi di perangkat ini</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowOrderModal(true)}
                            className={`text-[10px] font-bold underline underline-offset-2 ${theme === 'dark' ? 'text-white hover:text-neutral-300' : 'text-neutral-900 hover:text-neutral-600'
                                }`}
                        >
                            Lihat Detail
                        </button>
                    </div>

                    <div className="flex flex-col gap-1 mt-1 border-t border-neutral-500/10 pt-2">
                        <label className="flex items-start gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={bindOrdersChecked}
                                onChange={(e) => setBindOrdersChecked(e.target.checked)}
                                className={`rounded accent-neutral-900 border-neutral-300 mt-0.5 ${theme === 'dark' ? 'bg-neutral-800 border-white/10' : ''
                                    }`}
                            />
                            <span className="opacity-90 text-[11px] leading-tight">Tautkan otomatis ke akun saya setelah masuk</span>
                        </label>

                        {/* Teks Peringatan Halus */}
                        {!bindOrdersChecked && (
                            <p className="text-[10px] text-orange-500/90 font-medium pl-5 animate-fadeIn">
                                * Perhatian: Riwayat transaksi pada perangkat ini dapat hilang permanen jika Anda membersihkan cache browser atau masuk tanpa menautkan data.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {!isLogin && (
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1 md:space-y-2">
                        <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Nama Lengkap</label>
                        <input
                            type="text"
                            className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 px-4 ${themeStyles.textMain} outline-none focus:border-[var(--header-primary-color)] transition-all text-sm`}
                            placeholder="Contoh: Budi"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                        <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>No. Whatsapp</label>
                        <div className={`flex items-center w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl px-4 ${themeStyles.textMain} outline-none focus-within:border-[var(--header-primary-color)] transition-all text-sm`}>
                            <span className="text-gray-500 pr-2 border-r border-white/10">+62</span>
                            <input
                                type="text"
                                value={form.whatsapp}
                                onChange={handleWhatsappChange}
                                className="w-full bg-transparent px-2 py-3 outline-none"
                                placeholder="81234567890"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-1 md:space-y-2">
                <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-[var(--header-primary-color)] transition-colors" />
                    <input
                        type="email"
                        className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 pl-10 md:pl-12 pr-4 ${themeStyles.textMain} outline-none focus:border-[var(--header-primary-color)] transition-all text-sm`}
                        placeholder="example@mail.com"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-1 md:space-y-2">
                <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Kata Sandi</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-[var(--header-primary-color)] transition-colors" />
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 pl-10 md:pl-12 pr-12 ${themeStyles.textMain} outline-none focus:border-[var(--header-primary-color)] transition-all text-sm`}
                        placeholder="••••••••"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[var(--header-primary-color)] transition-colors"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            {!isLogin && (
                <div className="space-y-1 md:space-y-2">
                    <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Konfirmasi Kata Sandi</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-[var(--header-primary-color)] transition-colors" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 pl-10 md:pl-12 pr-12 ${themeStyles.textMain} outline-none focus:border-[var(--header-primary-color)] transition-all text-sm`}
                            placeholder="••••••••"
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>
            )}

            {isLogin && (
                <div className="flex justify-end">
                    <button type="button" className="text-[10px] md:text-xs font-bold text-[var(--header-primary-color)] transition-colors">
                        Lupa Password?
                    </button>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full relative group overflow-hidden ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 mt-2`}
            >
                <div className="absolute inset-0 bg-[var(--header-primary-color)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-[11px] md:text-sm">
                    {isLoading ? (
                        <div className={`w-4 h-4 md:w-5 md:h-5 border-2 ${theme === 'dark' ? 'border-black/20 border-t-black' : 'border-white/20 border-t-white'} rounded-full animate-spin`}></div>
                    ) : (
                        <>
                            {isLogin ? 'Masuk Sekarang' : 'Daftar Akun'}
                            <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                        </>
                    )}
                </span>
            </button>
        </form>
    )
}

export default FormAuth