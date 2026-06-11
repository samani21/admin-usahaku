"use client";
import { Bell, ChevronDown, LogOut, Menu, Settings, User, X, Check, Crown, Sparkles, Zap, ShieldCheck } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import GlassCard from './GlassCard';
import { usePathname } from 'next/navigation';
import { menuSidebar } from '@/lib/MenuSidebar';
import { getUserInfo } from '@/utils/loclstorange';
import { Get } from '@/utils/Get';

type Props = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setIsMobileActionMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMobileActionMenuOpen: boolean;
  closeMobileActionMenu: () => void;
  handleNotificationClick: () => void;
  handleProfileClick: () => void;
  title: string;
  handleLogout: () => void;
}

function getMenuLabel(pathname: string) {
  for (const menu of menuSidebar) {
    if (menu.child) {
      for (const child of menu.child) {
        if (pathname.includes(menu.href + child.href)) {
          return child.label;
        }
      }
    }
    if (pathname.includes(menu.href)) {
      return menu.label;
    }
  }
  return null;
}

const Header = ({ setIsSidebarOpen, isSidebarOpen, setIsMobileActionMenuOpen, handleNotificationClick, handleProfileClick, isMobileActionMenuOpen, closeMobileActionMenu, title, handleLogout }: Props) => {
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // State Loading & Subscription
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'trial' | 'premium'>('trial');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const notifications = [
    { id: 1, message: 'Pembayaran sebesar $250 berhasil dikirim.', time: '2 menit lalu' },
    { id: 2, message: 'Tagihan listrik jatuh tempo hari ini.', time: '1 jam lalu' },
    { id: 3, message: 'Top-up dompet berhasil.', time: 'Kemarin' }
  ];

  const pathname = usePathname();
  const user = getUserInfo();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((seg, index) => {
    if (index === 0) return "Home";
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  });
  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async () => {
    setIsLoading(true)
    try {
      // const res = await Get<any>('auth/profile');
      // if (res?.user) {
      //   setSubscriptionStatus(res?.user?.is_active ? "premium" : 'trial')
      // }
    } catch (e: any) {

    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={`fixed lg:absolute w-full lg:pr-4 lg:top-4 ${isSubscriptionModalOpen ? "z-61" : "z-50"}`}>
      <GlassCard className="py-2.5 px-5 flex items-center justify-between gap-4 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl lg:hidden hover:bg-emerald-100 transition-all active:scale-95"
        >
          <Menu size={20} />
        </button>

        <nav className="hidden lg:block text-sm">
          <ol className="flex items-center text-gray-600">
            {breadcrumb.map((p, i) => (
              <li key={i} className="flex items-center">
                <a href="#" className={`${i === breadcrumb.length - 1 ? 'font-semibold text-emerald-600 drop-shadow-sm' : 'font-medium text-slate-400'} hover:text-emerald-500 transition-colors`}>{p}</a>
                {i < breadcrumb.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mx-2.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button onClick={() => setNotifOpen(!notifOpen)} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-100 transition-all active:scale-95 shadow-sm relative group">
            <Bell size={19} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>
          <div className="mt-1 md:hidden">
            {subscriptionStatus === 'trial' ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubscriptionModalOpen(true);
                }}
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 hover:shadow-[0_2px_10px_rgba(245,158,11,0.2)] flex items-center gap-1 active:scale-95"
              >
                <Zap size={10} className="fill-current animate-bounce" />
                <span>Trial Mode</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-amber-400 border border-slate-800 shadow-md ring-1 ring-amber-500/20">
                <Crown size={10} className="fill-current text-amber-400 animate-pulse" />
                <span className="tracking-wide uppercase text-[8px]">Premium</span>
              </span>
            )}
          </div>
          {notifOpen && (
            <div id="notif-menu" className="absolute top-16 right-24 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-72 z-40 overflow-hidden transform origin-top-right transition-all">
              <div className="p-4 border-b border-slate-50 font-bold text-slate-800 flex justify-between items-center bg-slate-50/50">
                <span>Notifikasi</span>
                <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">3 Baru</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3.5 hover:bg-slate-50/80 border-b border-slate-100/70 last:border-none transition-colors">
                    <p className="text-xs text-slate-700 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{n.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 text-xs text-emerald-600 hover:bg-emerald-50/50 font-semibold border-t border-slate-100 transition-colors">Lihat Semua Notifikasi</button>
            </div>
          )}

          <div className="h-8 w-[1px] bg-slate-200/80 mx-1 hidden sm:block"></div>

          {/* USER & SUBSCRIPTION SECTION */}
          {isLoading ? (
            /* Premium Shiny Shimmer Loader */
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:flex flex-col items-end gap-2">
                <div className="h-3 w-14 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
                <div className="h-4 w-20 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          ) : (
            /* Ultra-Premium Interactive Menu Layout */
            <div
              className="flex items-center gap-3 pl-1 group cursor-pointer select-none relative"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors flex items-center justify-end gap-1">
                  Admin <ChevronDown size={12} className={`text-slate-400 group-hover:text-emerald-500 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                </p>
                <div className="mt-1">
                  {subscriptionStatus === 'trial' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSubscriptionModalOpen(true);
                      }}
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 hover:shadow-[0_2px_10px_rgba(245,158,11,0.2)] flex items-center gap-1 active:scale-95"
                    >
                      <Zap size={10} className="fill-current animate-bounce" />
                      <span>Trial Mode</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-amber-400 border border-slate-800 shadow-md ring-1 ring-amber-500/20">
                      <Crown size={10} className="fill-current text-amber-400 animate-pulse" />
                      <span className="tracking-wide uppercase text-[8px]">Premium</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Avatar Frame Box */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 relative ${subscriptionStatus === 'premium'
                ? 'bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-amber-400 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-700/60'
                : 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.15)] group-hover:shadow-[0_4px_16px_rgba(16,185,129,0.3)]'
                }`}>
                <span className="relative z-10 text-xs tracking-wider">AG</span>
                {subscriptionStatus === 'premium' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center text-[7px] text-slate-950 border border-slate-900 font-black shadow-sm">★</span>
                )}
              </div>
            </div>
          )}

          {profileOpen && (
            <div id="profile-menu" className="absolute top-16 right-6 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-60 z-100 overflow-hidden transform origin-top-right transition-all">
              <div className="px-4 py-3.5 border-b border-slate-50 bg-slate-50/40">
                <p className="font-bold text-xs text-slate-800">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">{user?.email || 'admin@dashboard.com'}</p>
              </div>
              <div className="p-1">
                <button className="flex items-center w-full px-3 py-2 text-xs text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/40 rounded-xl transition-all">
                  <User className="w-4 h-4 mr-2.5 text-slate-400" /> Profil Saya
                </button>
                <button className="flex items-center w-full px-3 py-2 text-xs text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/40 rounded-xl transition-all">
                  <Settings className="w-4 h-4 mr-2.5 text-slate-400" /> Pengaturan Sistem
                </button>
                <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
                <button className="flex items-center w-full px-3 py-2 text-xs text-rose-500 hover:bg-rose-50/60 rounded-xl transition-all font-medium" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2.5 text-rose-400" /> Keluar Aplikasi
                </button>
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      {/* ULTRA LUXURY SUBSCRIPTION MODAL (DARK CINEMATIC DESIGN) */}
      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl flex items-center justify-center z-[100] p-4 transition-all duration-500">
          <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-200 rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] w-full max-w-md overflow-hidden transform transition-all border border-slate-800/80 relative">

            {/* Ambient Aurora Glow in Background */}
            <div className="absolute top-[-20%] left-[20%] w-[60%] h-[40%] bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            {/* Modal Header */}
            <div className="relative p-6 pt-10 pb-2 text-center">
              <button
                onClick={() => setIsSubscriptionModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/60 transition-all active:scale-95"
              >
                <X size={15} />
              </button>

              {/* Crown Badge */}
              <div className="mx-auto w-14 h-14 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] group">
                <Crown className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Akses Eksklusif Pro Premium
              </h3>
              <p className="text-xs text-slate-400 mt-2 max-w-[85%] mx-auto leading-relaxed">
                Tinggalkan batasan dasar. Rasakan fleksibilitas penuh sistem cerdas analitik finansial kami.
              </p>
            </div>

            {/* Modal Body / Feature List */}
            <div className="p-6 space-y-4 relative z-10">
              <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/50 space-y-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-slate-300">Akses Visualisasi Grafik & Khazanah Data Real-Time</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-slate-300">Ekspor Otomatis Laporan Mutasi (PDF / XLSX Spreadsheet)</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-slate-300">Prioritas Jaringan Server Dedicated (Respon 2x Lebih Cepat)</span>
                </div>
              </div>

              {/* Float Metallic Pricing Box */}
              <div className="relative p-5 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 rounded-2xl border border-slate-700/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden group">
                <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
                  <Sparkles size={8} className="fill-current" /> Rekomendasi
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-white text-sm">Paket Profesional</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Jaminan enkripsi aman
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl font-black text-amber-400 tracking-tight drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">Rp 99.000</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Siklus tagihan bulanan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-2 pb-8 bg-slate-950/80 border-t border-slate-900/60 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setSubscriptionStatus('premium');
                  setIsSubscriptionModalOpen(false);
                }}
                className="w-full px-5 py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 rounded-xl shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.5)] active:scale-[0.99] active:brightness-95 transition-all duration-300 text-center tracking-wide uppercase"
              >
                Mulai Berlangganan Sekarang 🚀
              </button>

              <button
                onClick={() => setIsSubscriptionModalOpen(false)}
                className="w-full px-4 py-2 text-[11px] font-semibold text-slate-500 hover:text-slate-300 bg-transparent transition-colors text-center"
              >
                Kembali ke Dashboard Dasar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header