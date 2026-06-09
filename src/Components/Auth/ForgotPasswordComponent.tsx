"use client"
import { useAuthStore } from '@/store/authStore';
import { AlertTriangle, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import Loading from '../Component/Loading';

const ForgotPasswordComponent = () => {
    const { forgotPassword, loading, clearError } = useAuthStore();

    const [form, setForm] = useState({
        identifier: "", // email atau whatsapp
    });

    const [error, setError] = useState<string>("");

    const isEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.identifier) {
            setError("Email atau nomor WhatsApp wajib diisi.");
            return;
        }

        let payload: any = {};

        if (isEmail(form.identifier)) {
            payload.email = form.identifier;
        } else if (/^\d+$/.test(form.identifier)) {
            payload.whatsapp = form.identifier;
        } else {
            setError("Format email atau nomor WhatsApp tidak valid.");
            return;
        }

        setError("");
        const formData = new FormData();
        formData.append('contact', form?.identifier);
        await forgotPassword(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Jika dia angka semua → anggap WA dan bersihkan non-digit
        if (/^\d*$/.test(value)) {
            value = value.replace(/\D/g, "");
        }

        setForm({ identifier: value });
    };

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center bg-white p-6 sm:p-12">
            <div className="w-full max-w-lg">

                <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-gray-900">
                    Lupa Password
                </h1>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium flex justify-between">
                        <div className='flex items-center gap-2'>
                            <AlertTriangle className='text-red-600 w-5' />
                            {error}
                        </div>
                        <button
                            className="text-red-600"
                            onClick={() => {
                                clearError();
                                setError("");
                            }}
                        >
                            <X />
                        </button>
                    </div>
                )}

                <form className="space-y-6 mt-6" onSubmit={handleSubmit}>

                    {/* Email / Whatsapp */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email atau Nomor WhatsApp
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-[var(--primary-color)] focus-within:border-[var(--primary-color)] transition duration-150">

                            {/* Prefix hanya muncul jika angka */}
                            {form.identifier && /^\d+$/.test(form.identifier) && (
                                <span className="pl-4 pr-2 text-gray-500">+62</span>
                            )}

                            <input
                                type="text"
                                required
                                placeholder="nama@email.com atau 81234567890"
                                value={form.identifier}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 rounded-xl text-lg font-bold text-white bg-[var(--primary-color)] hover:bg-green-800 transition duration-300"
                    >
                        Kirim Link Reset
                    </button>
                </form>
                <div className="text-center mt-2">
                    <Link
                        href="login"
                        className="text-sm font-medium text-[var(--primary-color)] hover:underline transition flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={12} /> Kembali ke Halaman Login
                    </Link>
                </div>

                {loading && <Loading title='Memverifikasi Akun' />}
            </div>
        </div>
    )
}

export default ForgotPasswordComponent
