"use client"
import Loading from '@/Components/Loading';
import { Post } from '@/utils/Post';
import { ArrowLeft, ArrowRight, Building, Eye, EyeOff, KeyRound, Loader2, Lock, Mail, Phone, Tag, User } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    themeStyles: any;
    showToast: (v: string, type: string) => void;
    activeScheme: any;
    theme: string
}

function ForgotView({ themeStyles, showToast, activeScheme, theme }: Props) {
    const [recoveryMethod, setRecoveryMethod] = useState('email');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState({
        recoveryEmail: '',
        recoveryWhatsapp: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };


    const handleWhatsappChange = (e: any, field = 'whatsapp') => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        handleInputChange(field, val);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const formData = {
                contact: form?.recoveryEmail ?? form?.recoveryWhatsapp
            }
            const res = await Post('auth/forgot-password', formData);
            showToast('Link reset password telah dikirim', 'success')
        } catch (e: any) {
            showToast(e?.message, 'error');
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='h-full flex flex-col justify-center'>
            <div className="animate-fadeIn">
                {/* Back Button */}
                <button
                    onClick={() => {
                        setIsLoading(true)
                        window.location.href = 'login'
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-100 mb-6 transition-colors"
                >
                    <ArrowLeft size={14} />
                    <span>Kembali ke Login</span>
                </button>

                <div className="mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${activeScheme.primary} flex items-center justify-center text-white mb-3 shadow-lg`}>
                        <KeyRound size={20} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-1.5">Lupa Kata Sandi?</h3>
                    <p className={`text-xs ${themeStyles.textMuted} leading-relaxed`}>
                        Masukkan kredensial terdaftar untuk menerima tautan instruksi pemulihan keamanan akun Anda.
                    </p>
                </div>

                {/* Tab selector for recovery method */}
                <div className="flex p-1 bg-slate-500/10 rounded-xl mb-5 border border-slate-500/5">
                    <button
                        type="button"
                        onClick={() => setRecoveryMethod('email')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${recoveryMethod === 'email'
                            ? `bg-gradient-to-r ${activeScheme.primary} text-white shadow-md`
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Email Instan
                    </button>
                    <button
                        type="button"
                        onClick={() => setRecoveryMethod('whatsapp')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${recoveryMethod === 'whatsapp'
                            ? `bg-gradient-to-r ${activeScheme.primary} text-white shadow-md`
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        WhatsApp OTP
                    </button>
                </div>

                {/* Forgot Password Recovery Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {recoveryMethod === 'email' ? (
                        <div className="space-y-1 animate-fadeIn">
                            <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Alamat Email Terdaftar</label>
                            <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${themeStyles.input} transition-all`}>
                                <Mail size={15} className="text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="bg-transparent w-full border-none outline-none text-xs font-semibold focus:ring-0 placeholder:text-slate-500"
                                    value={form.recoveryEmail}
                                    onChange={(e) => handleInputChange('recoveryEmail', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1 animate-fadeIn">
                            <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">No. WhatsApp Terdaftar</label>
                            <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${themeStyles.input} transition-all`}>
                                <Phone size={15} className="text-slate-400" />
                                <input
                                    type="tel"
                                    placeholder="08XXXXXXXXXX"
                                    className="bg-transparent w-full border-none outline-none text-xs font-semibold focus:ring-0 placeholder:text-slate-500"
                                    value={form.recoveryWhatsapp}
                                    onChange={(e) => handleWhatsappChange(e, 'recoveryWhatsapp')}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full mt-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${activeScheme.primary} shadow-lg active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4" />
                                <span>Mengirimkan Pemulihan...</span>
                            </>
                        ) : (
                            <>
                                <span>{recoveryMethod === 'email' ? 'Kirim Link & Proses Reset' : 'Kirim OTP & Proses Reset'}</span>
                                <ArrowRight size={14} />
                            </>
                        )}
                    </button>
                </form>

            </div>
            {isLoading && <Loading />}
        </div>
    )
}

export default ForgotView