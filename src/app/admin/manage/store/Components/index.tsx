"use client"
import React, { useEffect, useState } from "react";

import {
    MapPin, Save, Camera, Verified, Globe, Eye,
    Briefcase, Tag, ChevronRight, Clock, BanIcon, Store, Crown, Zap, Sparkles, CheckCircle2, AlertCircle, AlertTriangle, Ban,
    Wallet
} from "lucide-react";
import { motion } from "framer-motion";
import { Get } from "@/utils/Get";
import { Post } from "@/utils/Post";
import { BusinessType } from "@/types/Admin/BusinessType";
import Cropper from "react-easy-crop";
import { AlertType } from "@/types/Alert";
import SlugInput from "./SlugInput";
import { OutletsType } from "@/types/Admin/OutletType";
import Link from "next/link";
import Loading from "@/Components/Loading";
import MapPreview from "@/Components/Maps/MapPreview";
import { CardContent } from "@/Components/ui/Outlite";
import Alert from "@/Components/Alert";
import ModalSubscription from "@/Components/Layout/ModalSubscription";
import { useCorrectPath } from "@/utils/useCorrectPath";
import { formatImage } from "@/utils/formatImage";

export default function BusinessProfile() {
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        category: "Lainnya",
        verified: 1,
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<AlertType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isBusiness, setIsBusiness] = useState<boolean>(false);
    const [outlets, setOutlets] = useState<OutletsType[]>([]);

    // STATE DIPISAH SESUAI STRUKTUR DATABASE BARU
    const [planType, setPlanType] = useState<'trial' | 'premium'>('trial');
    const [planStatus, setPlanStatus] = useState<'active' | 'expired' | 'canceled'>('active');
    const [daysRemaining, setDaysRemaining] = useState<number>(0);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const { getCorrectPath } = useCorrectPath();
    const handleChange = (key: any, value: string) => setForm((s) => ({ ...s, [key]: value }));

    useEffect(() => {
        getBusiness()
    }, [])

    const onLogoChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setOpenCrop(true);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        try {
            setLoadingButton(true);
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("slug", form.slug);
            if (form.description != '' || form.description != null) {
                formData.append("description", form.description);
            }
            formData.append("category", form.category);
            if (logoFile) formData.append("logo", logoFile);

            const res = await Post("/business", formData);
            if (res) {
                if (!isBusiness) {
                    window.location.reload();
                }
                setLoadingButton(false)
                setShowAlert({
                    type: 'success',
                    message: 'Profil bisnis berhasil diperbarui!',
                    isOpen: true
                })
            }
        } catch (err: any) {
            setLoadingButton(false);
            setShowAlert({
                type: 'error',
                message: err.message,
                isOpen: true
            })
        }
    };

    const getBusiness = async () => {
        try {
            const data = await Get<{ success: boolean; data: any }>("/business/show");
            if (data?.success) {
                const business = {
                    name: data?.data?.name,
                    slug: data?.data?.slug,
                    description: data?.data?.description,
                    category: data?.data?.category,
                    verified: data?.data?.verified_status,
                }
                setOutlets(data?.data?.outlet)
                setForm(business)
                setIsBusiness(true)
                setLogoPreview(data?.data?.logo_url)
                if (data?.data?.end_time) {
                    const endDate = new Date(data?.data?.end_time);
                    const now = new Date();
                    const diffTime = endDate.getTime() - now.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    setDaysRemaining(diffDays > 0 ? diffDays : 0);
                }
                // MENGAMBIL DUA DATA TERPISAH DARI API
                setPlanType(data?.data?.plan || 'trial');
                setPlanStatus(data?.data?.subscription_status || 'active');
            }
        } catch (err: any) {
            console.log(err.message || "Gagal mengambil data");
        } finally {
            setLoading(false)
        }
    }

    const getCroppedImg = (imageSrc: string, crop: any) => {
        return new Promise<string>((resolve) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d")!;
                canvas.width = crop.width;
                canvas.height = crop.height;
                ctx.drawImage(
                    image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height
                );
                resolve(canvas.toDataURL("image/jpeg"));
            };
        });
    };

    if (loading) {
        return <Loading />
    }

    // Variabel Pembantu Logika Tampilan
    const isExpired = planStatus === 'expired' || planStatus === 'canceled';
    const isPremium = planStatus === 'active' && planType === 'premium';
    const isTrial = planStatus === 'active' && planType === 'trial';

    return (
        <div className="mt-8  mx-auto lg:px-8 bg-slate-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 pb-24 lg:pb-12"
            >
                {/* --- Header Profil Bisnis --- */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden mb-8 relative">
                    {/* Banner Latar Belakang - Berubah berdasarkan Status Paket */}
                    <div className={`h-36 md:h-48 w-full relative transition-colors duration-500 
                        ${isPremium ? 'bg-gradient-to-r from-slate-800 to-slate-900'
                            : isExpired ? 'bg-gradient-to-r from-red-900 to-slate-900 grayscale-[20%]'
                                : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        {/* Banner Badges */}
                        {isPremium && (
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg text-yellow-400">
                                <Crown size={16} className="fill-amber-100 " />
                                Premium Active
                            </div>
                        )}
                        {isExpired && (
                            <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur-md border border-red-500/40 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg">
                                <AlertTriangle size={16} className="text-red-200" />
                                {planType === 'premium' ? 'Premium Kedaluwarsa' : 'Trial Habis'}
                            </div>
                        )}
                        {isTrial && (
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg">
                                <Zap size={16} className="fill-amber-100" />
                                Masa Trial
                            </div>
                        )}
                    </div>

                    <div className="px-5 md:px-8 pb-6 md:pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">

                            {/* Avatar / Logo */}
                            <div className="relative group -mt-20 md:-mt-24 z-10">
                                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-white p-2 shadow-xl transition-transform duration-300 group-hover:scale-105 ${isExpired ? 'border-2 border-red-100' : 'border border-slate-100'}`}>
                                    <div className="w-full h-full rounded-[1.5rem] bg-slate-100 flex items-center justify-center overflow-hidden relative">
                                        {logoPreview ? (
                                            <img
                                                src={formatImage(logoPreview)}
                                                alt="Logo Toko"
                                                className={`w-full h-full object-cover ${isExpired ? 'grayscale-[40%]' : ''}`}
                                            />
                                        ) : (
                                            <Store size={48} className="text-slate-300" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white font-semibold text-sm">Ubah Logo</span>
                                        </div>
                                    </div>
                                </div>
                                <input id="logo" type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
                                <label htmlFor="logo" className="absolute bottom-1 right-1 p-3 bg-emerald-600 text-white rounded-2xl shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all active:scale-95 cursor-pointer ring-4 ring-white">
                                    <Camera size={18} />
                                </label>
                            </div>

                            {/* Info Dasar & Title */}
                            <div className="flex-1 text-center md:text-left space-y-2 mt-2 md:mt-0">
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                        {form.name || "Nama Bisnis Anda"}
                                    </h1>

                                    {/* Indikator Verifikasi */}
                                    {isBusiness && form.verified == 2 && planType == 'premium' ? <Verified size={24} className="text-blue-50 fill-blue-500" /> :
                                        isBusiness && form.verified == 1 ? <Clock size={22} className="text-amber-500" /> :
                                            isBusiness && form.verified == 0 ? <BanIcon size={22} className="text-red-500" /> : ''}

                                    {/* Badge Status Paket */}
                                    {isTrial ? (
                                        <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Zap size={14} className="fill-slate-400" /> Trial Mode
                                        </span>
                                    ) : isPremium ? (
                                        <span className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 text-amber-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                            <Crown size={14} className="fill-amber-500" /> Premium
                                        </span>
                                    ) : (
                                        <span className="bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                            <Ban size={14} className="text-red-500" /> Tidak Aktif
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-500 flex items-center justify-center md:justify-start gap-1.5 text-sm font-medium">
                                    <Globe size={16} className="text-slate-400" />
                                    <Link href={`/${form.slug}`} target="_blank" className="truncate max-w-[250px] md:max-w-none text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer transition-colors">
                                        usahaku.com/{form.slug || "slug"}
                                    </Link>
                                </p>
                            </div>

                            {/* Tombol Aksi Kanan (Desktop) */}
                            <div className="hidden lg:flex gap-3 mb-2">
                                <Link href={getCorrectPath('/catalog/preview')} className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
                                    <Eye size={18} />
                                    Pratinjau
                                </Link>
                                <button disabled={loadingButton} onClick={handleSave} className="disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95">
                                    <Save size={18} />
                                    {loadingButton ? "Menyimpan..." : "Simpan Profil"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* KOLOM KIRI (Form Profil) */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                                    <Briefcase size={22} />
                                </div>
                                <div>
                                    <h2 className="font-extrabold text-slate-900 text-xl">Informasi Dasar Bisnis</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Kelola identitas publik dan deskripsi utama bisnis Anda.</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {/* Input Nama Bisnis */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Nama Toko/Bisnis</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="namaBisnis"
                                                value={form.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                                className="w-full px-4 py-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm md:text-base font-semibold text-slate-800 placeholder:font-normal"
                                                placeholder="Contoh: Kedai Kopi Senja"
                                            />
                                        </div>
                                    </div>

                                    {/* Input Slug */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">URL / Tautan Khusus</label>
                                        <SlugInput form={form.slug} onChange={(e) => handleChange("slug", e)} />
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Deskripsi Singkat</label>
                                    <textarea
                                        rows={4}
                                        name="description"
                                        value={form.description ?? ''}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                        className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm md:text-base font-medium text-slate-700 resize-none leading-relaxed"
                                        placeholder="Tuliskan nilai jual, sejarah, atau produk utama yang ditawarkan bisnis Anda..."
                                    ></textarea>
                                </div>

                                {/* Kategori & Status */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Kategori Usaha</label>
                                        <div className="relative group">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                            <select
                                                name="category"
                                                value={form.category ?? 'Lainnya'}
                                                onChange={(e) => handleChange("category", e.target.value)}
                                                className="w-full pl-11 pr-10 py-3.5 bg-white rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none appearance-none cursor-pointer text-sm font-semibold text-slate-700 transition-all shadow-sm"
                                            >
                                                <option value="Lainnya">Lainnya</option>
                                                <option value="Fashion & Sepatu">Fashion & Sepatu</option>
                                                <option value="Produk Digital">Produk Digital</option>
                                                <option value="Makanan & Minuman">Makanan & Minuman</option>
                                                <option value="Minimarket">Minimarket</option>
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={18} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Status Verifikasi</label>
                                        {isBusiness && form.verified === 2 ? (
                                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
                                                <Verified size={20} className="fill-blue-500 text-white" />
                                                <span className="text-blue-800 font-bold text-sm">Terverifikasi Resmi</span>
                                            </div>
                                        ) : isBusiness && form.verified === 1 ? (
                                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-amber-50 border border-amber-100 shadow-sm">
                                                <Clock size={20} className="text-amber-500" />
                                                <span className="text-amber-800 font-bold text-sm">Menunggu Tinjauan</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-100 shadow-sm">
                                                <BanIcon size={20} className="text-red-500" />
                                                <span className="text-red-800 font-bold text-sm">Langganan Habis</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* KOLOM KANAN (Status Paket & Lokasi) */}
                    <div className="space-y-6">

                        {/* 1. Kartu Status Berlangganan (TRIAL / PREMIUM / EXPIRED) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`rounded-[2rem] border overflow-hidden relative shadow-lg ${isPremium ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'
                                : isExpired ? 'bg-white border-red-200'
                                    : 'bg-white border-slate-200'
                                }`}
                        >
                            {/* Dekorasi Khusus Premium */}
                            {isPremium && (
                                <div className="absolute -top-12 -right-12 opacity-20 rotate-12">
                                    <Crown size={150} className="text-amber-400" />
                                </div>
                            )}

                            <div className="p-6 relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    {isPremium ? (
                                        <>
                                            <Crown size={20} className="text-amber-400 fill-amber-400/20" />
                                            <h3 className="font-bold text-white text-lg tracking-wide">Premium Plan</h3>
                                        </>
                                    ) : isExpired ? (
                                        <>
                                            <AlertCircle size={20} className="text-red-500" />
                                            <h3 className="font-bold text-slate-800 text-lg">Perhatian</h3>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} className="text-emerald-500" />
                                            <h3 className="font-bold text-slate-800 text-lg">Status Paket</h3>
                                        </>
                                    )}
                                </div>

                                {/* KONDISI: EXPIRED (Habis Masa Aktif) */}
                                {isExpired ? (
                                    <div className="space-y-4">
                                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                                            <AlertTriangle size={24} className="text-red-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-red-800 mb-1">Paket Tidak Aktif</p>
                                                <p className="text-xs text-red-600 leading-relaxed">Masa berlangganan Anda telah habis. Beberapa fitur unggulan toko kini dibatasi.</p>
                                            </div>
                                        </div>
                                        {/* <ul className="space-y-2 text-sm text-slate-400 font-medium opacity-80 pl-1">
                                            <li className="flex items-center gap-2 line-through decoration-slate-300"><Ban size={14} className="text-slate-300" /> Etalase Produk Terkunci</li>
                                            <li className="flex items-center gap-2 line-through decoration-slate-300"><Ban size={14} className="text-slate-300" /> Pengaturan Multi-Cabang</li>
                                            <li className="flex items-center gap-2 line-through decoration-slate-300"><Ban size={14} className="text-slate-300" /> Analitik Penjualan Lanjut</li>
                                        </ul> */}
                                        <button onClick={() => setIsSubscriptionModalOpen(true)} className="w-full mt-4 bg-slate-900 text-white rounded-xl py-3.5 font-bold shadow-lg hover:shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                            <Zap size={18} className="fill-white" /> Perpanjang Paket Sekarang
                                        </button>
                                    </div>
                                ) : isTrial ? (
                                    // KONDISI: TRIAL
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                                            <p className="text-sm text-slate-600 mb-2">Masa aktif trial Anda tersisa:</p>
                                            <div className="flex items-end gap-1 text-emerald-600">
                                                <span className="text-3xl font-black leading-none">{daysRemaining}</span>
                                                <span className="font-bold text-sm mb-1">Hari Lagi</span>
                                            </div>
                                        </div>
                                        {/* <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
                                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Fitur Etalase Lengkap</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-300" /> Multi-Cabang / Outlet</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-300" /> Analitik Penjualan</li>
                                        </ul> */}
                                        <button onClick={() => setIsSubscriptionModalOpen(true)} className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                            <Crown size={18} className="fill-amber-200" /> Upgrade ke Premium
                                        </button>
                                    </div>
                                ) : (
                                    // KONDISI: PREMIUM
                                    <div className="space-y-4">
                                        <p className="text-slate-300 text-sm">Anda menikmati semua fitur terbaik kami tanpa batas.</p>
                                        {/* <ul className="space-y-2.5 text-sm text-amber-100/80 font-medium">
                                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Multi-Cabang / Outlet Terbuka</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Laporan Analitik Real-time</li>
                                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400" /> Lencana Verified (Prioritas)</li>
                                        </ul> */}
                                        <div className="bg-white/10 rounded-xl p-3 border border-white/10 mt-4 flex justify-between items-center backdrop-blur-sm">
                                            <span className="text-xs text-slate-300 font-medium">Masa Aktif:</span>
                                            <span className="text-xs font-bold text-white tracking-wider">Sisa {daysRemaining} hari </span>
                                        </div>
                                        {
                                            daysRemaining < 7 && (
                                                <button onClick={() => setIsSubscriptionModalOpen(true)} className="w-full  px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-sm font-bold rounded-xl shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                                                    <Wallet className="w-4 h-4 mr-2" /> Perpanjang
                                                </button>
                                            )
                                        }
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* 2. Kartu Lokasi & Outlet */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600">
                                            <MapPin size={20} />
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-lg">Lokasi Fisik / Outlet</h3>
                                    </div>
                                </div>

                                <div className={`relative rounded-2xl overflow-hidden border bg-slate-50 mb-5 shadow-inner ${isExpired ? 'border-red-100' : 'border-slate-200'}`}>
                                    {/* Overlay Blur jika Expired */}
                                    {isExpired && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                                            <div className="bg-white px-4 py-2 rounded-full shadow border border-slate-100 flex items-center gap-2 text-sm font-bold text-slate-600">
                                                <Ban size={16} className="text-red-500" /> Terkunci
                                            </div>
                                        </div>
                                    )}

                                    {outlets?.find((a) => a?.lat != 0 && a?.lng != 0) ? (
                                        <div className="h-48 w-full">
                                            <MapPreview addresses={outlets} />
                                        </div>
                                    ) : (
                                        <CardContent className="w-full h-40 flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
                                            <div className="p-4 bg-white rounded-full shadow-sm mb-1">
                                                <MapPin size={24} className="text-slate-300" />
                                            </div>
                                            <span>Belum ada pin lokasi yang diset.</span>
                                        </CardContent>
                                    )}
                                </div>

                                {outlets && outlets.length > 0 && (
                                    <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                                        {outlets.map((o, i) => (
                                            <div key={i} className={`p-4 rounded-2xl border transition-all ${isExpired ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:shadow-md'}`}>
                                                <p className="text-sm text-slate-800 mb-3"><span className="font-extrabold text-emerald-600">{o?.name}</span> • <span className="text-slate-500">{o?.address}</span></p>
                                                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                    <div className="w-1/2">
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Buka</p>
                                                        <p className="text-xs font-bold text-slate-700">{o?.day_open} <span className="text-slate-500 font-medium ml-1">({o?.time_open})</span></p>
                                                    </div>
                                                    <div className="w-px h-8 bg-slate-200"></div>
                                                    <div className="w-1/2">
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Tutup</p>
                                                        <p className="text-xs font-bold text-slate-700">{o?.day_close} <span className="text-slate-500 font-medium ml-1">({o?.time_close})</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    href={isExpired ? '#' : 'outlets'}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold border-2 rounded-xl transition-all group ${isExpired
                                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-emerald-600'
                                        }`}
                                >
                                    {isExpired ? 'Fitur Terkunci' : 'Kelola Lokasi Cabang'}
                                    {!isExpired && <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- Floating Bottom Bar (Khusus Mobile) --- */}
                <div className="fixed bottom-6 left-4 right-4 flex lg:hidden items-center justify-between gap-3 bg-white/80 backdrop-blur-xl p-3 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-200 z-50">
                    <button className="flex-1 flex justify-center items-center gap-2 py-3.5 bg-white text-slate-700 rounded-xl font-bold text-sm border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all">
                        <Eye size={18} />
                    </button>
                    <button disabled={loadingButton} onClick={handleSave} className="flex-[3] flex justify-center items-center gap-2 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-900/20 active:scale-95 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-500">
                        <Save size={18} />
                        {loadingButton ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </motion.div>

            {/* Modal Crop */}
            {openCrop && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-100 p-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-6 md:p-8 rounded-[2.5rem] w-full max-w-md space-y-6 shadow-2xl"
                    >
                        <div className="text-center">
                            <h3 className="font-extrabold text-slate-900 text-xl">Sesuaikan Logo</h3>
                            <p className="text-sm text-slate-500 mt-1">Geser dan zoom gambar untuk mendapatkan komposisi pas.</p>
                        </div>

                        <div className="relative w-full h-72 rounded-3xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200">
                            <Cropper
                                image={imageSrc!}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(_, croppedAreaPixels) =>
                                    setCroppedAreaPixels(croppedAreaPixels)
                                }
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => setOpenCrop(false)}>
                                Batal
                            </button>
                            <button
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                                onClick={async () => {
                                    const croppedImage = await getCroppedImg(
                                        imageSrc!,
                                        croppedAreaPixels
                                    );
                                    setLogoPreview(croppedImage);
                                    const blob = await fetch(croppedImage).then(r => r.blob());
                                    const file = new File([blob], "logo.jpg", {
                                        type: "image/jpeg",
                                    });
                                    setLogoFile(file);
                                    setOpenCrop(false);
                                }}
                            >
                                Terapkan Gambar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Alert */}
            {showAlert?.isOpen && (
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            )}

            {
                isSubscriptionModalOpen &&
                <ModalSubscription onClose={() => setIsSubscriptionModalOpen(false)} />
            }
        </div>
    );
}