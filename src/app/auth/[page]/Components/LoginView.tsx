"use client"
import Loading from '@/Components/Loading';
import { Post } from '@/utils/Post';
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    themeStyles: any;
    showToast: (v: string, type: string) => void;
    activeScheme: any;
    theme: string
}

function LoginView({ themeStyles, showToast, activeScheme, theme }: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const formData = {
                email: form?.email,
                password: form?.password
            };
            const res = await Post<any, any>('auth/login', formData)
            localStorage.setItem("token", res?.token);
            window.location.href = '/'; // Redirect setelah sukses
        } catch (e: any) {
            showToast(e?.message, 'error')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='h-full flex flex-col justify-center'>
            <div className="mb-6">
                <h3 className="text-xl font-bold tracking-tight mb-1.5">
                    Masuk ke Workstation
                </h3>
                <p className={`text-xs ${themeStyles.textMuted} leading-relaxed`}>
                    Gunakan akun yang telah terverifikasi untuk masuk ke dashboard utama
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Alamat Email</label>
                    <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${themeStyles.input} transition-all`}>
                        <Mail size={15} className="text-slate-400" />
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="bg-transparent w-full border-none outline-none text-xs font-semibold focus:ring-0 placeholder:text-slate-500"
                            value={form.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Kata Sandi</label>
                        <a href="forgot" onClick={() => setIsLoading(true)} className="text-[10px] font-bold text-blue-500 hover:underline">Lupa Sandi?</a>
                    </div>
                    <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${themeStyles.input} transition-all`}>
                        <Lock size={15} className="text-slate-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Masukkan kata sandi"
                            className="bg-transparent w-full border-none outline-none text-xs font-semibold focus:ring-0 placeholder:text-slate-500"
                            value={form.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-slate-200"
                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${activeScheme.primary} shadow-lg active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin w-4 h-4" />
                            <span>Mengotentikasi...</span>
                        </>
                    ) : (
                        <>
                            <span>Masuk ke Workstation</span>
                            <ArrowRight size={14} />
                        </>
                    )}
                </button>
            </form >
            <div className="mt-6 text-center">
                <p className="text-xs text-slate-400 font-semibold">
                    Belum memiliki lisensi tenant?
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoading(true);
                            window.location.href = '/auth/register'
                        }}
                        className={`font-black underline underline-offset-4 decoration-2 ${activeScheme.text}`}
                    >
                        Daftar Outlet Baru
                    </button>
                </p>
            </div>
            {
                isLoading && <Loading />
            }
        </div >
    )
}

export default LoginView