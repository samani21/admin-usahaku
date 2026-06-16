"use client"
import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Package,
    Building2,
    Store,
    LayoutGrid,
    PackageOpen,
    BarChart3,
    ScrollText,
    ReceiptText,
    Wallet,
    User,
    LogOut,
    ChevronDown,
    ChevronUp,
    Bell,
    Search,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    XCircle,
    Crown,
    Zap,
    CreditCard,
    Sparkles,
    AlertCircle
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import MainLayout from '@/Components/Layout/MainLayout';
import { Get } from '@/utils/Get'; // Pastikan import ini ada
import ModalSubscription from '@/Components/Layout/ModalSubscription';

// Simulasi data untuk sidebar
const navigation = [
    { name: 'Dashboard', href: '#', icon: LayoutDashboard, current: true },
    {
        name: 'Manage',
        icon: Package,
        current: false,
        children: [
            { name: 'Info Toko', href: '#', icon: Store },
            { name: 'Banks', href: '#', icon: Building2 },
            { name: 'Outlet', href: '#', icon: Store },
            { name: 'Kategori', href: '#', icon: LayoutGrid },
            { name: 'Produk', href: '#', icon: PackageOpen },
            { name: 'Stok', href: '#', icon: BarChart3 },
            { name: 'Riwayat Promo', href: '#', icon: ScrollText },
        ],
    },
    {
        name: 'Transaksi',
        icon: ReceiptText,
        current: false,
        children: [
            { name: 'Orderan', href: '#', icon: ScrollText },
            { name: 'Pembayaran', href: '#', icon: Wallet },
        ],
    },
    { name: 'Langganan', href: '#', icon: Crown, current: false },
];


// Komponen Dashboard (Konten Utama)
const Dashboard = ({ setIsSubscriptionModalOpen }: any) => {
    // --- STATE SUBSCRIPTION ---
    const [isLoading, setIsLoading] = useState(true);
    const [planType, setPlanType] = useState<'trial' | 'premium'>('trial');
    const [planStatus, setPlanStatus] = useState<'active' | 'expired' | 'canceled'>('active');
    const [endTime, setEndTime] = useState<string | null>(null);
    const [daysRemaining, setDaysRemaining] = useState<number>(0);
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await Get<any>('business/profile');
                if (res?.data?.business) {
                    const businessData = res.data.business;
                    setPlanType(businessData.plan || 'trial');
                    setPlanStatus(businessData.subscription_status || 'active');
                    setEndTime(businessData.end_time);

                    // Kalkulasi sisa hari jika status belum habis
                    if (businessData.end_time) {
                        const endDate = new Date(businessData.end_time);
                        const now = new Date();
                        const diffTime = endDate.getTime() - now.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        setDaysRemaining(diffDays > 0 ? diffDays : 0);
                    }
                }
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Format tanggal untuk tampilan (contoh: 12 Jun 2026, 14:30)
    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const stats = [
        { name: 'Total Penjualan', value: 'Rp 15.000.000', icon: Wallet, trend: '+12.5%', isUp: true },
        { name: 'Total Order', value: '150', icon: ScrollText, trend: '+5.2%', isUp: true },
        { name: 'Produk Terjual', value: '320', icon: PackageOpen, trend: '-2.4%', isUp: false },
        { name: 'Pelanggan Baru', value: '45', icon: User, trend: '+18.1%', isUp: true },
    ];

    // Data simulasi untuk grafik penjualan (dalam jutaan Rupiah)
    const salesData = [
        { name: 'Jan', sales: 4.5 },
        { name: 'Feb', sales: 3.8 },
        { name: 'Mar', sales: 5.2 },
        { name: 'Apr', sales: 4.8 },
        { name: 'Mei', sales: 7.0 },
        { name: 'Jun', sales: 8.5 },
    ];

    const recentOrders = [
        { id: 'ORD-2039', date: '10 menit lalu', amount: 'Rp 250.000', status: 'Selesai', customer: 'Budi Santoso' },
        { id: 'ORD-2038', date: '45 menit lalu', amount: 'Rp 1.100.000', status: 'Proses', customer: 'Siti Aminah' },
        { id: 'ORD-2037', date: '2 jam lalu', amount: 'Rp 75.000', status: 'Selesai', customer: 'Rudi Hermawan' },
        { id: 'ORD-2036', date: '3 jam lalu', amount: 'Rp 450.000', status: 'Batal', customer: 'Agus Pratama' },
        { id: 'ORD-2035', date: '5 jam lalu', amount: 'Rp 890.000', status: 'Selesai', customer: 'Dewi Lestari' },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Selesai': return <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-1" />;
            case 'Proses': return <Clock className="h-4 w-4 text-amber-500 mr-1" />;
            case 'Batal': return <XCircle className="h-4 w-4 text-red-500 mr-1" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Selesai': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Proses': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Batal': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // --- RENDER BANNER ---
    const renderSubscriptionBanner = () => {
        if (isLoading) {
            return <div className="w-full xl:w-96 h-24 bg-white/50 animate-pulse rounded-3xl"></div>;
        }

        // KONDISI 1: HABIS (EXPIRED/CANCELED)
        if (planStatus === 'expired' || planStatus === 'canceled') {
            return (
                <div className="relative flex flex-col sm:flex-row items-center gap-5 p-4 sm:pr-5 bg-white/60 backdrop-blur-xl border border-rose-200 rounded-3xl shadow-sm">
                    <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30">
                        <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h3 className="font-extrabold text-gray-800 flex items-center justify-center sm:justify-start text-lg tracking-tight">
                            {planType === 'premium' ? 'Premium Habis' : 'Trial Habis'}
                        </h3>
                        <p className="text-xs text-rose-600 font-bold mt-0.5">
                            Telah berakhir pada {formatDateTime(endTime)}
                        </p>
                    </div>
                    <button onClick={() => setIsSubscriptionModalOpen(true)} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-700 hover:to-red-600 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 mr-2" /> Perpanjang
                    </button>
                </div>
            );
        }

        // KONDISI 2: PREMIUM AKTIF (Tema Gelap Mewah)
        if (planType === 'premium') {
            return (
                <div className="relative group">
                    <div className="absolute inset-0 rounded-3xl blur-lg bg-gradient-to-r from-amber-400 to-amber-600 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative flex flex-col sm:flex-row items-center gap-5 p-4 sm:pr-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/60 rounded-3xl shadow-xl">
                        <div className="p-3 rounded-2xl bg-slate-800/50 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <Crown className="w-7 h-7 text-amber-400" />
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h3 className="font-extrabold text-white flex items-center justify-center sm:justify-start text-lg tracking-tight">
                                Paket Premium <CheckCircle2 className="w-5 h-5 ml-1.5 text-amber-400" />
                            </h3>
                            <p className="text-xs text-slate-300 font-medium mt-0.5 flex items-center justify-center sm:justify-start">
                                <Clock className="w-3 h-3 mr-1 text-slate-400" />
                                Sisa {daysRemaining} hari (Habis: {formatDateTime(endTime)})
                            </p>
                        </div>
                        {
                            daysRemaining < 8 &&
                            <button onClick={() => setIsSubscriptionModalOpen(true)} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-sm font-bold rounded-xl shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                                <Wallet className="w-4 h-4 mr-2" /> Perpanjang
                            </button>
                        }
                    </div>
                </div>
            );
        }

        // KONDISI 3: TRIAL AKTIF (Tema Amber Standard)
        return (
            <div className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-lg bg-gradient-to-r from-amber-400 to-orange-500 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative flex flex-col sm:flex-row items-center gap-5 p-4 sm:pr-5 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-sm hover:bg-white/80 transition-all duration-300">
                    <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30">
                        <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h3 className="font-extrabold text-gray-800 flex items-center justify-center sm:justify-start text-lg tracking-tight">
                            Masa Trial <Sparkles className="w-4 h-4 ml-1.5 text-amber-500" />
                        </h3>
                        <p className="text-xs text-gray-600 font-medium mt-0.5 flex items-center justify-center sm:justify-start">
                            <Clock className="w-3 h-3 mr-1 text-gray-400" />
                            Sisa {daysRemaining} hari (Habis: {formatDateTime(endTime)})
                        </p>
                    </div>
                    <button onClick={() => setIsSubscriptionModalOpen(true)} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center border border-gray-700">
                        <CreditCard className="w-4 h-4 mr-2" /> Upgrade
                    </button>
                </div>
            </div>
        );
    };

    return (
        <MainLayout>
            <main className="p-2 sm:p-6 animate-fade-in">
                {/* Section Welcome & Subscription Banner */}
                <div className="mb-8 flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 tracking-tight flex items-center">
                            Selamat Datang, Admin! <span className="ml-2 origin-bottom-right hover:animate-wave inline-block cursor-default">👋</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Berikut adalah ringkasan performa toko Anda hari ini.</p>
                    </div>

                    {/* Subscription Banner Ditarik dari Render Function */}
                    <div className="w-full xl:w-auto">
                        {renderSubscriptionBanner()}
                    </div>
                </div>

                {/* Kartu Statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.name}
                            className="group p-6 bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${stat.isUp ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                    {stat.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">{stat.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grafik dan Tabel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <div className="lg:col-span-2 p-6 bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/40">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Grafik Penjualan
                            </h2>
                            <select className="bg-white/50 border-none text-sm font-medium text-gray-600 rounded-xl py-2 pl-3 pr-8 focus:ring-2 focus:ring-emerald-500 cursor-pointer outline-none">
                                <option>6 Bulan Terakhir</option>
                                <option>Tahun Ini</option>
                            </select>
                        </div>
                        <div className="h-72 w-full bg-white/50 rounded-2xl p-4 shadow-inner border border-white/60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.8)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#6b7280"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                                        tickFormatter={(value) => `${value}M`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(12px)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.5)',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                        }}
                                        itemStyle={{ color: '#059669', fontWeight: 'bold' }}
                                        formatter={(value) => [`Rp ${value} Juta`, 'Penjualan']}
                                        labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: '4px' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#10b981"
                                        strokeWidth={4}
                                        dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Orders List */}
                    <div className="p-6 bg-white/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Order Terbaru
                            </h2>
                            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                                Lihat Semua
                            </button>
                        </div>
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="group flex flex-col p-4 bg-white/50 rounded-2xl border border-white/60 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/70 hover:border-emerald-100"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                                            {order.id}
                                        </span>
                                        <span className={`flex items-center px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-gray-600 font-medium">{order.customer}</span>
                                            <span className="text-xs text-gray-400 mt-0.5 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" /> {order.date}
                                            </span>
                                        </div>
                                        <span className="font-bold text-gray-800">{order.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .hover\\:animate-wave:hover {
          animation: wave 2.5s infinite;
        }
      `}</style>
            </main>
        </MainLayout>
    );
};

// Komponen Utama App
export default function App() {
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#e0f2f1] via-[#e0f7fa] to-[#f3e5f5] font-sans selection:bg-emerald-200 selection:text-emerald-900">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent relative z-10">
                <Dashboard setIsSubscriptionModalOpen={setIsSubscriptionModalOpen} />
            </main>
            {
                isSubscriptionModalOpen &&
                <ModalSubscription onClose={() => setIsSubscriptionModalOpen(false)} />
            }
        </div>
    );
}