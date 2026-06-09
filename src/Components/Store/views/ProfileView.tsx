"use client"

import React, { useState, useEffect } from 'react';
import {
    User, Edit3, Calendar, Check, X, Sparkles, ShieldCheck,
    Heart, Compass, Grid, Award, ShoppingBag, Settings,
    Share2, Copy, ChevronRight, Clock, Bell, Lock, Eye,
    Info, Gift, Coins, Users, TrendingUp, LogOut, ChevronDown,
    CreditCard, MapPin
} from 'lucide-react';
import { getCustomerInfo } from '@/store/authStore';
import Loading from '@/Components/Component/Loading';
import CardAlertLogin from '../components/CardAlertLogin';
import CardProfile from '../components/CardProfile';
import SubMenuProfile from '../components/SubMenuProfile';
import AffiliateView from './AffiliateView';
import ModalEditProfile from '../components/ModalEditProfile';

export default function App() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeMenu, setActiveMenu] = useState('affiliasi');
    const [copied, setCopied] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataCustomer, setDataCustomer] = useState<any>(null);
    console.log('dataCustomer', dataCustomer)
    useEffect(() => {
        setLoading(true)
        const customer = getCustomerInfo();
        if (customer) {
            setDataCustomer(customer)
            setIsLoggedIn(true);
            setLoading(false);
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage('');
        }, 3000);
    };

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleSaveProfile = (e: any) => {
        e.preventDefault();
        setShowEditModal(false);
        showToast('Profil premium Anda berhasil diperbarui.');
    };

    const handleCopyReferral = () => {
        setCopied(true);
        showToast('Kode Spesial AYUSUKMA55 disalin ke papan klip.');
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <Loading />
        );
    }
    if (!isLoggedIn) {
        return (
            <CardAlertLogin />
        );
    }

    const viewPage = () => {
        switch (activeMenu) {
            case 'affiliasi':
                return <AffiliateView handleCopyReferral={handleCopyReferral} />;
            default:
                return "";
        }
    }
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased selection:bg-amber-200 selection:text-amber-900 pb-24">
            <main className="max-w-7xl mx-auto  sm:px-6 space-y-8">

                {/* Toast Notification */}
                {toastMessage && (
                    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-2xl shadow-slate-900/20 flex items-center gap-3 border border-slate-700/50 text-sm transition-all duration-300 animate-[slideInDown_0.3s_ease-out]">
                        <Check className="text-emerald-400 bg-emerald-400/10 p-0.5 rounded-full" size={18} />
                        <span className="font-medium tracking-wide">{toastMessage}</span>
                    </div>
                )}
                <CardProfile dataCustomer={dataCustomer} handleOpenEditModal={handleOpenEditModal} />

                <SubMenuProfile setActiveMenu={setActiveMenu} activeMenu={activeMenu} />

                <div className="transition-all duration-500 ease-in-out">
                    {viewPage()}
                </div>
            </main>

            {
                showEditModal && <ModalEditProfile onClose={() => setShowEditModal(false)} showToast={showToast} />
            }

            {/* Global Inline Styles for Custom Keyframes (since we don't have access to tailwind.config.js) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </div>
    );
}