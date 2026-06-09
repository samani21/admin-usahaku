"use client"
import { useAuthStore } from '@/store/authStore';
import { AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from '../Component/Loading';


const LoginComponent = () => {
    const { loading, error, clearError, login } = useAuthStore();
    const route = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        clearError()
    }, [])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login(form);
        if (success) {
            route?.push('/')
        }
    };
    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center bg-white p-6 sm:p-12">
            <div className="w-full max-w-lg">

                <div className="text-center lg:text-left mb-8 lg:hidden">
                    <a href="#" className="text-3xl font-extrabold flex items-center justify-center">
                        <span className="text-[var(--primary-color)]">Usaha</span><span className="text-[var(--secondary-color)]">Ku</span>
                    </a>
                </div>

                <h1 id="form-title" className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 text-center lg:text-left">
                    Masuk ke UsahaKu
                </h1>
                <div className="flex space-x-2 mb-8 p-1 bg-gray-100 rounded-full w-full max-w-xs mx-auto lg:mx-0">
                    <button id="tab-login"
                        className={`flex-1 py-2 rounded-full text-base font-semibold transition duration-300 text-base bg-[var(--primary-color)] text-white shadow-md`}>
                        Masuk
                    </button>
                    <Link href={'register'} id="tab-signup"
                        className={`flex-1 py-2 rounded-full text-base text-center font-semibold transition duration-300 bg-transparent text-gray-600 hover:text-gray-900`}>
                        Daftar
                    </Link>
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium space-y-1 flex item-center justify-between" role="alert">
                        <div className='flex items-center gap-4'>
                            <AlertTriangle className='text-red-600 w-5' />
                            {error}
                        </div>
                        <button
                            className="text-red-600 cursor-pointer"
                            onClick={() => clearError()}
                        >
                            <X />
                        </button>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                        <input type="email" id="login-email" name="email" required
                            placeholder="nama@perusahaan.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-color)] focus:border-[var(--primary-color)] outline-none transition duration-150" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
                        <input type="password" id="login-password" name="password" required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition duration-150" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]" />
                            <label className="ml-2 text-gray-600">Ingat Saya</label>
                        </div>
                        <p onClick={() => route?.push('/auth/forgot-password')} className="cursor-pointer font-medium text-[var(--primary-color)] hover:text-green-600 transition duration-150">Lupa Kata Sandi?</p>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[var(--primary-color)] hover:bg-color-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition duration-300 transform hover:scale-[1.01]">
                        Masuk ke UsahaKu
                    </button>
                </form>
                <div className="relative mt-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Atau masuk/daftar dengan</span>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <button className="w-full flex items-center gap-4 justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
                        <img src={'/icon/google.svg'} />
                        Lanjutkan dengan Google
                    </button>
                </div>
            </div>
            {
                loading && <Loading title='Memverifikasi Akun' />
            }
        </div>
    )
}

export default LoginComponent