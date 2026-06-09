"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Globe, Sun, Moon, AlertTriangle, X, ShoppingBag, History, FileText } from 'lucide-react';
import { Catalog } from '@/types/Admin/Catalog/Catalog';
import { Get } from '@/utils/Get';
import { useAuthStore } from '@/store/authStore';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { CatalogHeaderType } from '@/types/Admin/Catalog/Header';
import { BusinessType } from '@/types/Admin/BusinessType';
import Loading from '@/Components/Component/Loading';
import ModalOrder from './ModalOrder';
import FormAuth from './FormAuth';
import { OrderType } from '@/types/Admin/Catalog/Order';
import { Post } from '@/utils/Post';

const getContrastColor = (hex: string | undefined) => {
    if (!hex) return '#1e293b';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
};

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

interface dataType {
    header: CatalogHeaderType;
    business: BusinessType;
    order: OrderType[];
}


const AuthComponent = ({ tenant }: { tenant: string }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const params = useParams();
    const route = useRouter();
    const pathname = usePathname();
    const [headerData, setHeaderData] = useState<CatalogHeaderType>();
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
    const [order, setOrder] = useState<OrderType[]>([]);
    // State Tambahan untuk Fitur Bind Orderan
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [bindOrdersChecked, setBindOrdersChecked] = useState(true);
    const segments = pathname.split("/").filter(Boolean);
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.startsWith("0")) {
            value = value.substring(1);
        }
        setForm({ ...form, whatsapp: value });
    };

    useEffect(() => {
        fetchCatalog();
        setIsVisible(true);

        // Deteksi tema perangkat awal
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const initialTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(initialTheme);

        const handleChange = (e: any) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const updateCssVariables = useCallback((type: 'header', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);

    const fetchCatalog = async () => {
        try {
            setIsLoading(true);
            const res = await Get<{ success: boolean; data: dataType }>(`/customer/auth/show`);
            if (res?.success && res.data) {
                setHeaderData(res?.data?.header);
                setTheme(res.data.header?.mode);
                setOrder(res.data?.order);
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
            }
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin && form.password !== form.confirmPassword) {
            setError("Kata sandi tidak cocok. Silakan periksa kembali.");
            return;
        }

        // Kirim payload tambahan `bind_orders: true` ke backend jika user mencentang opsi sinkronisasi
        const payload = {
            ...form,
            bind_guest_orders: order?.length > 0 ? bindOrdersChecked : false,
            device_orders_tokens: order?.map(o => o.id) // mengirimkan track id orderan lama ke API
        };

        setIsLoading(true)
        try {
            let url;
            if (isLogin) {
                url = '/customer/auth/login';
            } else {
                url = '/customer/auth/register';
            }
            const success = await Post<any, any>(url, payload);
            if (success) {
                const token = success?.token;
                const device_id = success?.device_id;
                const user = success?.user;
                if (success?.user?.role === 'customer') {
                    localStorage.setItem("customer_token", token);
                } else {
                    localStorage.setItem("token", token);
                }
                localStorage.setItem("device_id", device_id);
                localStorage.setItem("customer", JSON.stringify(user));
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
                if (params?.tenant === segments[0]) {
                    route?.push(`/${params?.tenant}`);
                } else {
                    route?.push(`/`);
                }
            }
        } catch (e: any) {
            setError(e?.message)
        } finally {
            setIsLoading(false)

        }
    };

    const themeStyles = {
        bg: theme === 'dark' ? 'bg-[#050505]' : 'bg-slate-50',
        card: theme === 'dark' ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-slate-200',
        textMain: theme === 'dark' ? 'text-white' : 'text-slate-900',
        textSub: theme === 'dark' ? 'text-slate-400' : 'text-slate-500',
        inputBg: theme === 'dark' ? 'bg-white/[0.03]' : 'bg-slate-100/50',
        inputBorder: theme === 'dark' ? 'border-white/10' : 'border-slate-200',
        socialBtn: theme === 'dark' ? 'bg-white/[0.03] hover:bg-white/[0.08]' : 'bg-slate-100 hover:bg-slate-200',
        accent: headerData ? 'bg-[var(--header-primary-color)]' : 'bg-gray-800'
    };

    if (isLoading) return <Loading />;

    return (
        <div className={`min-h-screen ${themeStyles.bg} flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative transition-colors duration-700`}>
            <div className={`absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] animate-pulse transition-colors duration-700 ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-400/10'}`}></div>
            <div className={`absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] animate-pulse transition-colors duration-700 ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/10'}`} style={{ animationDelay: '2s' }}></div>
            <div className={`max-w-5xl w-full grid md:grid-cols-2 backdrop-blur-2xl rounded-[24px] md:rounded-[32px] border ${themeStyles.card} shadow-2xl overflow-hidden transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {
                    headerData ?
                        <div className={`hidden md:flex flex-col justify-between p-8 md:p-12 ${themeStyles.accent} relative overflow-hidden`}>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-8 md:mb-12">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                                        <img src={headerData?.logo} className='w-12 h-12' alt="Logo" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-white tracking-tight">{headerData?.span_one} {headerData?.span_two}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 md:mb-6">
                                    <span className="text-[var(--header-secondary-color)]">Selamat Datang di {headerData?.span_one} {headerData?.span_two}</span>
                                </h1>
                                <p className="text-[var(--header-secondary-color)] text-sm md:text-lg opacity-80 leading-relaxed">
                                    Masuk untuk mulai menggunakan layanan dan menikmati semua fasilitas yang tersedia.
                                </p>
                            </div>
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
                        </div> :
                        <div className={`hidden md:flex flex-col justify-between p-8 md:p-12 ${themeStyles.accent} relative overflow-hidden`}>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-8 md:mb-12">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                                        <img src={'/logo_usahaku.png'} className='w-12 h-12' alt="Logo" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-emerald-500 tracking-tight">UsahaKu</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 md:mb-6">
                                    <span className="text-emerald-500">Selamat Datang di UsahaKu</span>
                                </h1>
                                <p className="text-white text-sm md:text-lg opacity-80 leading-relaxed italic">
                                    Masuk untuk mulai menggunakan layanan dan menikmati semua fasilitas yang tersedia.
                                </p>
                            </div>
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
                }

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
                        <button
                            type="button"
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
                    <FormAuth
                        handleSubmit={(e) => handleSubmit(e)}
                        error={error}
                        clearError={() => setError('')}
                        isLogin={isLogin}
                        themeStyles={themeStyles}
                        setForm={setForm}
                        form={form}
                        handleWhatsappChange={(e) => handleWhatsappChange(e)}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        isLoading={isLoading}
                        theme={theme}
                        order={order}
                        setShowOrderModal={setShowOrderModal}
                        bindOrdersChecked={bindOrdersChecked}
                        setBindOrdersChecked={setBindOrdersChecked} />
                    <div className="mt-6 md:mt-10 text-center">
                        <p className={`${themeStyles.textSub} text-xs md:text-sm`}>
                            {isLogin ? "Belum punya akses tenant?" : "Sudah memiliki akun?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold hover:text-[var(--header-primary-color)] transition-all underline underline-offset-4 decoration-indigo-500/50`}
                            >
                                {isLogin ? 'Buat Akun Baru' : 'Masuk'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* MODAL BARU: Detail Riwayat Orderan Guest (Glassmorphism Premium) */}
            {/* MODAL: Detail Riwayat Orderan Guest (Glassmorphic Netral) */}
            {showOrderModal && (
                <ModalOrder onClose={() => setShowOrderModal(false)} theme={theme} order={order} themeStyles={themeStyles} />
            )}
            {/* Footer System Info */}
            <div className="fixed bottom-4 md:bottom-6 left-0 right-0 md:left-auto md:right-6 flex justify-center md:justify-end px-4">
                <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-2 px-3 py-1.5 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-200 border-slate-300'} border rounded-full backdrop-blur-md hover:scale-105 transition-all`}
                >
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-green-500' : 'bg-blue-600'}`}></div>
                    <span className={`text-[9px] md:text-[10px] ${themeStyles.textSub} font-mono tracking-widest uppercase`}>
                        {theme?.toUpperCase()} MODE ACTIVE
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default AuthComponent;