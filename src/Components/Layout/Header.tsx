"use client";
import { getUserInfo } from '@/store/authStore';
import { Bell, ChevronDown, LogOut, Menu, MoreVertical, Search, Settings, User } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { menuSidebar } from '../lib/MenuSidebar';
import GlassCard from './GlassCard';
import { usePathname } from 'next/navigation';

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

    // cek child
    if (menu.child) {
      for (const child of menu.child) {
        if (pathname.includes(menu.href + child.href)) {
          return child.label;
        }
      }
    }

    // cek parent
    if (pathname.includes(menu.href)) {
      return menu.label;
    }
  }

  return null;
}

const Header = ({ setIsSidebarOpen, isSidebarOpen, setIsMobileActionMenuOpen, handleNotificationClick, handleProfileClick, isMobileActionMenuOpen, closeMobileActionMenu, title, handleLogout }: Props) => {
  const label = getMenuLabel(title);
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
  return (
    <div className='fixed lg:absolute w-full lg:pr-4 lg:top-4 z-50'>
      <GlassCard className="py-2 px-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl lg:hidden hover:bg-emerald-100 transition-all"
        >
          <Menu size={20} />
        </button>
        <nav className="hidden lg:block text-sm pb-4">
          <ol className="flex items-center text-gray-600 mt-2">
            {breadcrumb.map((p, i) => (
              <li key={i} className="flex items-center">
                <a href="#" className={`${i === breadcrumb.length - 1 ? 'font-semibold text-emerald-600' : 'font-reguler text-[#6B7280]'}`}>{p}</a>
                {i < breadcrumb.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={() => setNotifOpen(notifOpen ? false : true)} className="p-2.5 bg-white rounded-xl text-slate-500 hover:text-emerald-600 shadow-sm relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          {notifOpen && (
            <div id="notif-menu" className="absolute top-16 right-24 bg-white border border-gray-200 rounded-xl shadow-lg w-64 sm:w-72 z-40">
              <div className="p-3 border-b border-gray-200 font-semibold text-gray-800">Notifikasi</div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-200 last:border-none">
                    <p className="text-sm text-gray-800">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium rounded-b-xl">Lihat Semua</button>
            </div>
          )}

          <div className="h-10 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
          <div className="flex items-center gap-3 pl-2 cursor-pointer" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Admin</p>
              <p className="text-[10px] text-slate-400 font-medium">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
              AG
            </div>
          </div>
          {profileOpen && (
            <div id="profile-menu" className="absolute top-16 right-6 bg-white border border-gray-200 rounded-xl shadow-lg w-56 z-100">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50">
                <User className="w-4 h-4 mr-3" /> Profil Saya
              </button>
              <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-3" /> Pengaturan
              </button>
              <button className="flex items-center w-full p-3 text-red-500 hover:bg-red-50" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-3" /> Keluar
              </button>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

export default Header