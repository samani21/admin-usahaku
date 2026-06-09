"use client"
import { useAuthStore } from '@/store/authStore';
import { AlertTriangle, Eye, EyeOff, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Loading from '../Component/Loading';

type Props = {
    setIsOtp: (val: boolean) => void;

}

const RegisterComponent = ({ setIsOtp }: Props) => {
    const { register, loading, clearError } = useAuthStore();
    const route = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        whatsapp: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Kata sandi tidak cocok. Silakan periksa kembali.");
            return;
        }
        const success = await register(form);
        if (success) {
            setIsOtp(true)
        }
        setError("");
    };
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // hapus semua non-angka

        // Jika diawali 0, hapus 0 pertama
        if (value.startsWith("0")) {
            value = value.substring(1);
        }

        setForm({ ...form, whatsapp: value });
    };

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center bg-white p-6 sm:p-12">
            <div className="w-full max-w-lg">

                <div className="text-center lg:text-left mb-8 lg:hidden">
                    <a href="#" className="text-3xl font-extrabold flex items-center justify-center">
                        <span className="text-[var(--primary-color)]">Usaha</span><span className="text-[var(--secondary-color)]">Ku</span>
                    </a>
                </div>
                <h1 id="form-title" className="text-2xl sm:text-3xl sm:text-4xl font-bold mb-8 text-gray-900 text-center lg:text-left">
                    Buat Akun UsahaKu Baru
                </h1>
                <div className="flex space-x-2 mb-8 p-1 bg-gray-100 rounded-full w-full max-w-xs mx-auto lg:mx-0">
                    <Link href={'login'} id="tab-login"
                        className={`flex-1 py-2 rounded-full text-base text-center font-semibold transition duration-300 text-base bg-transparent text-gray-600 hover:text-gray-900`}>
                        Masuk
                    </Link>
                    <button id="tab-signup"
                        className={`flex-1 py-2 rounded-full text-base font-semibold transition duration-300 bg-[var(--primary-color)] text-white shadow-md`}>
                        Daftar
                    </button>
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
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                        <input
                            type="text"
                            required
                            placeholder="Masukkan nama"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition duration-150"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                        <input
                            type="email"
                            required
                            placeholder="nama@perusahaan.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition duration-150"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    {/* Whatsapp */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Whatsapp</label>
                        <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-[var(--primary-color)] focus-within:border-[var(--primary-color)] transition duration-150">
                            <span className="pl-4 pr-2 text-gray-500">+62</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                required
                                placeholder="81234567890"
                                value={form.whatsapp}
                                onChange={handleWhatsappChange}
                                className="w-full px-2 py-3 rounded-r-xl outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buat Kata Sandi</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Minimal 8 karakter"
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition duration-150"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Konfirmasi Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            required
                            placeholder="Ulangi kata sandi Anda"
                            className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 outline-none transition duration-150 ${error
                                ? "border-red-500 focus:ring-red-400 focus:border-red-400"
                                : "border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                                }`}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    {/* Terms */}
                    <div className="flex items-start">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            Saya setuju dengan{" "}
                            <a href="#" className="font-medium text-[var(--primary-color)] hover:text-sky-600">
                                Syarat & Ketentuan
                            </a>
                        </label>
                    </div>

                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[var(--primary-color)] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition duration-300 transform hover:scale-[1.01]"
                    >
                        Daftar Akun Baru
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

export default RegisterComponent