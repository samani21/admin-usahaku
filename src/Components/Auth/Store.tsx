"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Globe, Sun, Moon, AlertTriangle, X } from 'lucide-react';
import { Catalog } from '@/types/Admin/Catalog/Catalog';
import { Get } from '@/utils/Get';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
const Store = () => {
    const { register, loading, clearError, login } = useAuthStore();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const route = useRouter();
    const [theme, setTheme] = useState('dark');
    const [form, setForm] = useState({
        name: "",
        email: "",
        whatsapp: "",
        role: "customer",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string>("");
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // hapus semua non-angka

        // Jika diawali 0, hapus 0 pertama
        if (value.startsWith("0")) {
            value = value.substring(1);
        }

        setForm({ ...form, whatsapp: value });
    };
    useEffect(() => {
        setIsVisible(true);

        // Deteksi tema perangkat awal
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const initialTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(initialTheme);

        // Listener untuk perubahan tema perangkat secara real-time
        const handleChange = (e: any) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Fungsi untuk toggle tema secara manual
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     setTimeout(() => setIsLoading(false), 2000);
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin && form.password !== form.confirmPassword) {
            setError("Kata sandi tidak cocok. Silakan periksa kembali.");
            return;
        }
        if (isLogin) {
            const success = await login(form);
            if (success) {
                route?.push('/')
            }
        } else {
            const success = await register(form);
            if (success) {
                // setIsOtp(true)
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 2000);
            }
        }
        setError("");
    };

    // Dinamis Class based on theme
    const themeStyles = {
        bg: theme === 'dark' ? 'bg-[#050505]' : 'bg-slate-50',
        card: theme === 'dark' ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-slate-200',
        textMain: theme === 'dark' ? 'text-white' : 'text-slate-900',
        textSub: theme === 'dark' ? 'text-slate-400' : 'text-slate-500',
        inputBg: theme === 'dark' ? 'bg-white/[0.03]' : 'bg-slate-100/50',
        inputBorder: theme === 'dark' ? 'border-white/10' : 'border-slate-200',
        socialBtn: theme === 'dark' ? 'bg-white/[0.03] hover:bg-white/[0.08]' : 'bg-slate-100 hover:bg-slate-200',
        accent: 'from-[var(--primary-color)] to-emerald-700'
    };

    return (
        <div className={`min-h-screen ${themeStyles.bg} flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative transition-colors duration-700`}>

            {/* Background Ornaments */}
            <div className={`absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] animate-pulse transition-colors duration-700 ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-400/10'}`}></div>
            <div className={`absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] animate-pulse transition-colors duration-700 ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/10'}`} style={{ animationDelay: '2s' }}></div>

            <div className={`max-w-5xl w-full grid md:grid-cols-2 backdrop-blur-2xl rounded-[24px] md:rounded-[32px] border ${themeStyles.card} shadow-2xl overflow-hidden transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                {/* Left Side: Branding & Info */}
                <div className={`hidden md:flex flex-col justify-between p-8 md:p-12 bg-gradient-to-br ${themeStyles.accent} relative overflow-hidden`}>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-8 md:mb-12">
                            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                                <img src={'/logo.png'} className='w-12 h-8 ' />
                            </div>
                            <span className="text-lg md:text-xl font-bold text-white tracking-tight">UsahaKu</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 md:mb-6">
                            Semua Toko dalam Satu Portal
                        </h1>
                        <p className="text-emerald-100 text-sm md:text-lg opacity-80 leading-relaxed">
                            Jelajahi berbagai toko dan temukan produk terbaik tanpa perlu daftar berulang.
                        </p>
                    </div>


                    {/* Grid Pattern Overlay */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none text-white">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                </div>


                {/* Right Side: Form */}
                <div className={`p-6 md:p-12 flex flex-col justify-center transition-colors duration-700 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/40'}`}>
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div>
                            <h2 className={`text-2xl md:text-3xl font-bold ${themeStyles.textMain} mb-1 md:mb-2`}>
                                {isLogin ? 'Selamat Datang' : 'Pendaftaran Tenant'}
                            </h2>
                            <p className={`text-xs md:text-sm ${themeStyles.textSub}`}>
                                {isLogin ? 'Silakan masuk ke akun Anda' : 'Lengkapi data untuk membuat portal'}
                            </p>
                        </div>

                        {/* Theme Toggle Button (Interactive) */}
                        <button
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
                            className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 active:scale-95 ${theme === 'dark'
                                ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10'
                                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {theme === 'dark' ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} />}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
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
                        {!isLogin && (
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div className="space-y-1 md:space-y-2">
                                    <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Nama Lengkap</label>
                                    <input
                                        type="text"
                                        className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 px-4 ${themeStyles.textMain} outline-none focus:border-[var(--primary-color)] transition-all text-sm`}
                                        placeholder="Contoh: Budi"
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1 md:space-y-2">
                                    <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Bisnis</label>
                                    <div className={`flex items-center w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl  px-4 ${themeStyles.textMain} outline-none focus:border-[var(--primary-color)] transition-all text-sm`}>
                                        <span className="pl-4 pr-2 text-gray-500">+62</span>
                                        <input
                                            type="text"
                                            value={form.whatsapp}
                                            onChange={handleWhatsappChange}
                                            className={`w-full px-2 py-3 rounded-r-xl outline-none`}
                                            placeholder="81234567890"

                                        />
                                    </div>

                                </div>
                            </div>
                        )}

                        <div className="space-y-1 md:space-y-2">
                            <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Email Perusahaan</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-[var(--primary-color)] transition-colors" />
                                <input
                                    type="email"
                                    className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 pl-10 md:pl-12 pr-4 ${themeStyles.textMain} outline-none focus:border-[var(--primary-color)] transition-all text-sm`}
                                    placeholder="example@mail.com"
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:space-y-2">
                            <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Kata Sandi</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-[var(--primary-color)] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 pl-10 md:pl-12 pr-12 ${themeStyles.textMain} outline-none focus:border-[var(--primary-color)] transition-all text-sm`}
                                    placeholder="••••••••"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[var(--primary-color)] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {
                            !isLogin && (
                                <div className="space-y-1 md:space-y-2">
                                    <label className={`text-[10px] md:text-xs font-semibold ${themeStyles.textSub} uppercase tracking-wider ml-1`}>Kata Sandi</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-[var(--primary-color)] transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl md:rounded-2xl py-2.5 md:py-3 pl-10 md:pl-12 pr-12 ${themeStyles.textMain} outline-none focus:border-[var(--primary-color)] transition-all text-sm`}
                                            placeholder="••••••••"
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[var(--primary-color)] transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-[10px] md:text-xs font-bold text-[var(--primary-color)] transition-colors">
                                    Lupa Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full relative group overflow-hidden ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 mt-2`}
                        >
                            <div className="absolute inset-0 bg-[var(--primary-color)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

                    <div className="mt-6 md:mt-10 text-center">
                        <p className={`${themeStyles.textSub} text-xs md:text-sm`}>
                            {isLogin ? "Belum punya akses tenant?" : "Sudah memiliki akun?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold hover:text-[var(--primary-color)] transition-all underline underline-offset-4 decoration-emerald-500/50`}
                            >
                                {isLogin ? 'Buat Akun Baru' : 'Masuk'}
                            </button>
                        </p>
                    </div>


                </div>
            </div>

            {/* Footer System Info */}
            <div className="fixed bottom-4 md:bottom-6 left-0 right-0 md:left-auto md:right-6 flex justify-center md:justify-end px-4">
                <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-2 px-3 py-1.5 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-200 border-slate-300'} border rounded-full backdrop-blur-md hover:scale-105 transition-all`}
                >
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-green-500' : 'bg-blue-600'}`}></div>
                    <span className={`text-[9px] md:text-[10px] ${themeStyles.textSub} font-mono tracking-widest uppercase`}>
                        {theme.toUpperCase()} MODE ACTIVE
                    </span>
                </button>
            </div>

            <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Store;