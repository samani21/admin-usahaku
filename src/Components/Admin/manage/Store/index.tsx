"use client"
import React, { ReactElement, useEffect, useState } from "react";
import {
    Avatar,
    AvatarImage,
    Button,
    Card,
    CardContent,
    Input,
    Label,
    Textarea,
} from "@/Components/ui/Outlite";

import { Upload, MapPin, Save, Camera, Verified, Globe, Eye, Info, Briefcase, Tag, ChevronRight, Navigation, Clock, BanIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Get } from "@/utils/Get";
import { Post } from "@/utils/Post";
import MapPreview from "@/Components/Component/Maps/MapPreview";
import ModalMaps from "@/Components/Component/Maps/ModalMaps";
import { BusinessType } from "@/types/Admin/BusinessType";
import Cropper from "react-easy-crop";
import Alert from "@/Components/Component/Alert";
import { AlertType } from "@/types/Alert";
import SlugInput from "./SlugInput";
import Loading from "@/Components/Component/Loading";
import { OutletsType } from "@/types/Admin/OutletType";
import Link from "next/link";
type LocationItem = {
    id: number;
    lat: number;
    lng: number;
    name: string;
    address: string;
};
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
        category: "produk",
        verified: 1,
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<AlertType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isBusiness, setIsBusiness] = useState<boolean>(false);
    const [outlets, setOutlets] = useState<OutletsType[]>([])
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
                    message: 'Berhasil update data',
                    isOpen: true
                })
            }
        } catch (err: any) {
            setLoadingButton(false);

            console.log(err.message || "Gagal mengambil data");
        }
    };

    const getBusiness = async () => {
        try {
            const data = await Get<{ success: boolean; data: BusinessType }>("/business/show");
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
                    image,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

                resolve(canvas.toDataURL("image/jpeg"));
            };
        });
    };

    if (loading) {
        return <Loading />
    }
    return (
        <div className="mt-12">
            <div className="space-y-6">
                <div className=" bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-5 md:p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">

                        {/* Foto Profil & Tombol Kamera */}
                        <div className="relative group -mt-16 md:-mt-20">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-white p-1 shadow-2xl border border-slate-100">
                                <div className="w-full h-full rounded-[1.7rem] bg-slate-50 flex items-center justify-center overflow-hidden">
                                    {
                                        logoPreview &&
                                        <img
                                            src={logoPreview}
                                            alt="Logo Toko"
                                            className="w-full h-full object-cover"
                                        />
                                    }
                                </div>
                            </div>
                            <input id="logo" type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
                            <label htmlFor="logo" className="absolute bottom-1 right-1 p-2 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-all active:scale-90">
                                <Camera size={16} />
                            </label>
                        </div>

                        {/* Teks Header */}
                        <div className="flex-1 text-center md:text-left space-y-1">
                            <div className="flex items-center justify-center md:justify-start gap-1.5">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{form.name}</h1>
                                {isBusiness && form.verified == 2 ? <Verified size={18} className="text-blue-500 fill-blue-50" /> :
                                    isBusiness && form.verified == 1 ? <Clock size={18} className="text-yellow-500" /> :
                                        isBusiness && <BanIcon size={18} className="text-red-500" />}
                            </div>
                            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-1.5 text-sm font-medium">
                                <Globe size={14} />
                                <span className="truncate max-w-[200px] md:max-w-none">usahaku.com/{form.slug}</span>
                            </p>
                        </div>

                        {/* Tombol Aksi - Desktop: Samping, Mobile: Sembunyi ke Floating Button atau Tetap di Atas */}
                        <div className="hidden lg:flex gap-3">
                            <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                                <Eye size={18} />
                                Pratinjau
                            </button>
                            <button disabled={loadingButton} onClick={handleSave} className="disabled:bg-gray-400 flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-2xl font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                                <Save size={18} />
                                {loadingButton ? "...loading" : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 pb-16 lg:pb-0">

                    <div className="lg:col-span-2 space-y-6">
                        {/* Informasi Dasar Card */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-1 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3 px-6 py-4">
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-indigo-600">
                                    <Info size={18} />
                                </div>
                                <h2 className="font-bold text-slate-800 text-sm md:text-base">Informasi Dasar</h2>
                            </div>

                            <div className="p-5 md:p-8 space-y-5 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                                    {/* Nama Bisnis */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest px-1">Nama Bisnis</label>
                                        <div className="relative group">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                            <input
                                                type="text"
                                                name="namaBisnis"
                                                value={form.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm md:text-base"
                                            />
                                        </div>
                                    </div>

                                    {/* Slug */}
                                    <SlugInput form={form.slug} onChange={(e) => handleChange("slug", e)} />
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <label className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest px-1">Deskripsi Bisnis</label>
                                    <textarea
                                        rows={4}
                                        name="description"
                                        value={form.description ?? ''}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                        className="w-full p-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm md:text-base resize-none"
                                        placeholder="Ceritakan tentang toko Anda..."
                                    ></textarea>
                                </div>

                                {/* Kategori & Status */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest px-1">Kategori</label>
                                        <div className="relative">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                            <select
                                                name="category"
                                                value={form.category}
                                                onChange={(e) => handleChange("category", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none appearance-none bg-white cursor-pointer text-sm md:text-base"
                                            >
                                                <option value="Lainnya">Lainnya</option>
                                                <option value="Fashion & Sepatu">Fashion & Sepatu</option>
                                                <option value="Produk Digital">Produk Digital</option>
                                                <option value="Makanan & Minuman">Makanan & Minuman</option>
                                                <option value="Minimarket">Minimarket</option>
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest px-1">Status Akun</label>
                                        {
                                            isBusiness && form.verified === 2 ? <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                                                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                                                    <Verified size={16} className="fill-emerald-500 text-white" />
                                                    Terverifikasi
                                                </div>
                                            </div> : isBusiness && form.verified === 1 ? <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-yellow-50 border border-emerald-100">
                                                <div className="flex items-center gap-2 text-yellow-700 font-bold text-sm">
                                                    <Verified size={16} className="text-yellow-500" />
                                                    Sedang Verifikasi
                                                </div>
                                            </div> : isBusiness && <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-emerald-50 border border-red-100">
                                                <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                                                    <Verified size={16} className="text-red-500" />
                                                    Ditolak
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Lokasi & Tips */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                                        <MapPin size={18} />
                                    </div>
                                    <h3 className="font-bold text-slate-800">Lokasi Fisik</h3>
                                </div>

                                <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 h-100  mb-4">
                                    {/* <div className="absolute inset-0  bg-cover bg-center opacity-40"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-rose-500 p-2.5 rounded-full text-white shadow-xl animate-pulse">
                                            <Navigation size={16} fill="white" />
                                        </div>
                                    </div> */}
                                    {outlets?.find((a) => a?.lat != 0 && a?.lng != 0) ?
                                        <MapPreview addresses={outlets} /> : <CardContent className="w-full h-40 bg-zinc-300 rounded-md flex items-center justify-center text-zinc-600 text-sm">
                                            (Map Preview)
                                        </CardContent>}
                                </div>

                                <div className="space-y-3">
                                    {
                                        outlets?.map((o, i) => (
                                            <div key={i} className="text-xs md:text-sm font-medium text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                                <p><b>{o?.name}</b>: {o?.address}</p>
                                                <div className="flex items-center w-1/2">
                                                    <div className="w-1/2 space-y-1">
                                                        <p>Buka:</p>
                                                        <p>{o?.day_open}</p>
                                                        <p>{o?.time_open}</p>
                                                    </div>
                                                    <div className="w-1/2 space-y-1">
                                                        <p>Tutup:</p>
                                                        <p>{o?.day_close}</p>
                                                        <p>{o?.time_close}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <Link href={'outlets'} className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all">
                                        Ubah Lokasi
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Tips Card yang Menarik di Mobile */}
                        <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl">
                            <div className="flex items-center gap-2 mb-3 opacity-70">
                                <Info size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Tips Bisnis</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                                Bisnis dengan foto profil yang jelas mendapatkan <span className="text-indigo-400 font-bold">2x lipat</span> klik dari pelanggan potensial.
                            </p>
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] text-slate-500 font-bold uppercase">Skor Profil</span>
                                <span className="text-xs font-bold">85%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-6  left-1/2 -translate-x-1/2 flex lg:hidden items-center gap-2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white z-50">
                    <button className="flex justify-center items-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm">
                        <Eye size={18} />
                        Cek
                    </button>
                    <button className="flex justify-center items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
                        <Save size={18} />
                        Simpan
                    </button>
                </div>
            </div>

            {/* <ModalMaps openMapId={openMapId} setOpenMapId={setOpenMapId} updateAddress={updateAddress} addresses={addresses} dataAddress={dataAddress} /> */}
            {openCrop && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-110">
                    <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
                        <div className="relative w-full h-64">
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

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setOpenCrop(false)}>
                                Batal
                            </Button>

                            <Button
                                onClick={async () => {
                                    const croppedImage = await getCroppedImg(
                                        imageSrc!,
                                        croppedAreaPixels
                                    );

                                    setLogoPreview(croppedImage);

                                    // convert base64 ke file
                                    const blob = await fetch(croppedImage).then(r => r.blob());
                                    const file = new File([blob], "logo.jpg", {
                                        type: "image/jpeg",
                                    });

                                    setLogoFile(file);
                                    setOpenCrop(false);
                                }}
                            >
                                Gunakan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {
                showAlert?.isOpen &&
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            }
        </div>
    );
}
