"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    ArrowLeft,
    Camera,
    MapPin,
    Calendar,
    User,
    Mail,
    Phone,
    CheckCircle2,
    AlertCircle,
    Hash,
    X,
    RotateCw,
    ZoomIn
} from 'lucide-react';

// Sesuai dengan tabel customer_profiles di database Anda
export type CustomerProfileForm = {
    avatar: string;
    gender: 'male' | 'female' | '';
    birth_date: string;
    address_line: string;
    city: string;
    postal_code: string;
    // Field tambahan dari relasi tabel users untuk kelengkapan UX
    name: string;
    email: string;
    phone: string;
};

type EditProfileViewProps = {
    initialData?: Partial<CustomerProfileForm>;
    onSave?: (updatedData: CustomerProfileForm) => void;
    onCancel?: () => void;
};

export const EditProfileView = ({ initialData, onSave, onCancel }: EditProfileViewProps) => {
    // Mock data awal berdasarkan skema database jika tidak disediakan props
    const [formData, setFormData] = useState<CustomerProfileForm>({
        avatar: initialData?.avatar || '/avatar.jpeg',
        gender: initialData?.gender || 'female',
        birth_date: initialData?.birth_date || '1998-05-18',
        address_line: initialData?.address_line || 'Jl. Coblong Raya No. 45, RT 03/RW 05',
        city: initialData?.city || 'Kota Bandung',
        postal_code: initialData?.postal_code || '40135',
        name: initialData?.name || 'Ayu Sukma',
        email: initialData?.email || 'ayu.sukma@usahaku.com',
        phone: initialData?.phone || '081234567890'
    });

    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State untuk unggahan & fitur Crop Gambar
    const [showCropModal, setShowCropModal] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderSelect = (gender: 'male' | 'female') => {
        setFormData(prev => ({
            ...prev,
            gender
        }));
    };

    // Memicu klik pada input file tersembunyi
    const triggerFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Menangani pemilihan file foto kustom dari perangkat user
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setSelectedImageSrc(reader.result);
                    setZoomLevel(1);
                    setDragOffset({ x: 0, y: 0 });
                    setShowCropModal(true);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Event handler untuk navigasi seret & letak foto (Drag & Pan)
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        setDragOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Dukungan sentuhan layar HP (Touch Events untuk Crop)
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStart({
                x: e.touches[0].clientX - dragOffset.x,
                y: e.touches[0].clientY - dragOffset.y
            });
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || e.touches.length !== 1) return;
        setDragOffset({
            x: e.touches[0].clientX - dragStart.x,
            y: e.touches[0].clientY - dragStart.y
        });
    };

    // Melakukan pemotongan gambar secara melingkar menggunakan Canvas HTML5
    const executeCrop = () => {
        if (!canvasRef.current || !selectedImageSrc) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = selectedImageSrc;
        img.onload = () => {
            // Ukuran target hasil crop (persegi beresolusi 400x400 untuk efisiensi database)
            const targetSize = 400;
            canvas.width = targetSize;
            canvas.height = targetSize;

            ctx.clearRect(0, 0, targetSize, targetSize);

            // Membuat bidang lingkaran pada canvas
            ctx.beginPath();
            ctx.arc(targetSize / 2, targetSize / 2, targetSize / 2, 0, Math.PI * 2);
            ctx.clip();

            // Hitung skala rasio gambar asli
            const scale = (img.width > img.height ? targetSize / img.height : targetSize / img.width) * zoomLevel;
            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;

            // Hitung koordinat tengah berdasarkan offset seret dari pengguna
            const posX = (targetSize - drawWidth) / 2 + (dragOffset.x * (targetSize / 260));
            const posY = (targetSize - drawHeight) / 2 + (dragOffset.y * (targetSize / 260));

            // Gambar ke dalam canvas lingkaran
            ctx.drawImage(img, posX, posY, drawWidth, drawHeight);

            // Konversi hasil gambar canvas ke Base64 URL data
            const croppedBase64 = canvas.toDataURL('image/jpeg', 0.9);

            setFormData(prev => ({
                ...prev,
                avatar: croppedBase64
            }));

            setShowCropModal(false);
            setNotification({
                type: 'success',
                message: 'Foto berhasil dipotong dan disesuaikan!'
            });
            setTimeout(() => setNotification(null), 3000);
        };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulasi pengiriman data ke backend db_usahaku.customer_profiles
        setTimeout(() => {
            setIsSubmitting(false);
            setNotification({
                type: 'success',
                message: 'Profil Anda berhasil disimpan ke database UsahaKu!'
            });

            if (onSave) {
                onSave(formData);
            }
        }, 1200);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">

            {/* Input File Unggah Tersembunyi */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Header Navigasi Kembali */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 px-3 py-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-xl transition duration-150 text-xs font-bold"
                >
                    <ArrowLeft size={16} /> Kembali ke Profil
                </button>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Pengaturan customer_profiles
                </span>
            </div>

            {/* Box Notifikasi Kustom */}
            {notification && (
                <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-slideIn ${notification.type === 'success'
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    : 'bg-rose-50 border-rose-100 text-rose-800'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={20} /> : <AlertCircle className="text-rose-500" size={20} />}
                    <span className="text-xs font-bold">{notification.message}</span>
                </div>
            )}

            {/* Form Utama */}
            <form onSubmit={handleSubmit} className="bg-white border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-8">

                {/* EDIT AVATAR SECTION */}
                <div className="flex flex-col items-center justify-center space-y-3 pb-6 border-b border-zinc-100">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-emerald-500/20 shadow-md">
                            <img
                                src={formData.avatar}
                                alt="Avatar Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={triggerFileSelect}
                            className="absolute -bottom-2 -right-2 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl shadow-lg border-2 border-white transition-transform active:scale-90"
                            title="Unggah & Potong Foto"
                        >
                            <Camera size={14} />
                        </button>
                    </div>
                    <div className="text-center">
                        <h4 className="text-xs font-black text-zinc-700">Foto Profil</h4>
                        <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Klik ikon kamera untuk unggah & potong foto kustom</p>
                    </div>
                </div>

                {/* DATA UTAMA USER (Relasi Tabel Users) */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
                        Informasi Akun Utama
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Nama Lengkap</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                                    <User size={14} />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                                    placeholder="Nama lengkap Anda"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 text-left">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Email Aktif</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                                    <Mail size={14} />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                                    placeholder="name@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 text-left md:col-span-2">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Nomor Telepon / WhatsApp</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                                    <Phone size={14} />
                                </span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                                    placeholder="Contoh: 081234567890"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* INFORMASI DATA PROFIL (customer_profiles Schema) */}
                <div className="space-y-4 pt-4 border-t border-zinc-50">
                    <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
                        Data Demografis & Pengiriman
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Field: gender (ENUM) */}
                        <div className="space-y-2 text-left md:col-span-2">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Jenis Kelamin</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleGenderSelect('male')}
                                    className={`py-3 px-4 border rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${formData.gender === 'male'
                                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-600 font-extrabold'
                                        : 'border-zinc-100 bg-zinc-50/50 text-zinc-500 hover:bg-zinc-50'
                                        }`}
                                >
                                    ♂️ Laki-Laki
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleGenderSelect('female')}
                                    className={`py-3 px-4 border rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${formData.gender === 'female'
                                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-600 font-extrabold'
                                        : 'border-zinc-100 bg-zinc-50/50 text-zinc-500 hover:bg-zinc-50'
                                        }`}
                                >
                                    ♀️ Perempuan
                                </button>
                            </div>
                        </div>

                        {/* Field: birth_date (DATE) */}
                        <div className="space-y-1 text-left">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Tanggal Lahir</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                                    <Calendar size={14} />
                                </span>
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Field: city (VARCHAR) */}
                        <div className="space-y-1 text-left">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Kota Domisili</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                                    <MapPin size={14} />
                                </span>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                                    placeholder="Contoh: Kota Bandung"
                                    required
                                />
                            </div>
                        </div>

                        {/* Field: postal_code (VARCHAR 10) */}
                        <div className="space-y-1 text-left">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Kode Pos</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                                    <Hash size={14} />
                                </span>
                                <input
                                    type="text"
                                    name="postal_code"
                                    maxLength={10}
                                    value={formData.postal_code}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                                    placeholder="Maksimal 10 angka/karakter"
                                />
                            </div>
                        </div>

                        {/* Field: address_line (TEXT) */}
                        <div className="space-y-1 text-left md:col-span-2">
                            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-wider block">Alamat Lengkap Pengiriman</label>
                            <textarea
                                name="address_line"
                                rows={3}
                                value={formData.address_line}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-zinc-50/50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition resize-none leading-relaxed"
                                placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kelurahan, dan kecamatan..."
                                required
                            />
                        </div>

                    </div>
                </div>

                {/* BUTTON ACTION GROUP */}
                <div className="pt-6 border-t border-zinc-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2.5 border border-zinc-100 hover:bg-zinc-50 text-zinc-500 text-xs font-black rounded-xl transition duration-150"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white text-xs font-black rounded-xl transition shadow-md shadow-emerald-500/10 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Menyimpan...
                            </>
                        ) : (
                            'Simpan Perubahan'
                        )}
                    </button>
                </div>

            </form>

            {/* MODAL EDIT & POTONG FOTO (CROPPER MODAL) */}
            {showCropModal && selectedImageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 flex flex-col">

                        {/* Header Modal */}
                        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                            <div className="text-left">
                                <h3 className="text-sm font-black text-zinc-800">Sesuaikan Foto</h3>
                                <p className="text-[10px] text-zinc-400 font-semibold">Geser dan perbesar untuk memposisikan foto terbaik Anda</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCropModal(false)}
                                className="p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 rounded-xl transition"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Area Editor Potong Foto (Viewport) */}
                        <div className="p-6 flex flex-col items-center justify-center bg-zinc-50 relative">

                            <div
                                className="w-64 h-64 rounded-full border-2 border-dashed border-emerald-500 bg-zinc-200 relative overflow-hidden cursor-move select-none"
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleMouseUp}
                            >
                                {/* Gambar Editor Manipulasi */}
                                <img
                                    ref={imageRef}
                                    src={selectedImageSrc}
                                    alt="Source"
                                    draggable={false}
                                    style={{
                                        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${zoomLevel})`,
                                        transformOrigin: 'center center',
                                        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                                    }}
                                    className="w-full h-full object-cover pointer-events-none select-none"
                                />

                                {/* Lingkaran Batas Grid Penunjuk (Overlay) */}
                                <div className="absolute inset-0 border-[4px] border-emerald-500/10 rounded-full pointer-events-none" />
                            </div>

                            <span className="text-[10px] text-zinc-400 font-bold mt-3">
                                💡 Tip: Tarik/Seret langsung pada gambar untuk menggeser posisi
                            </span>
                        </div>

                        {/* Slider Zooming Kontrol */}
                        <div className="p-6 space-y-4 border-t border-zinc-100">
                            <div className="flex items-center gap-3">
                                <span className="text-zinc-400"><ZoomIn size={14} /></span>
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.05"
                                    value={zoomLevel}
                                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                                <span className="text-[10px] font-black text-zinc-600 w-10 text-right">
                                    {Math.round(zoomLevel * 100)}%
                                </span>
                            </div>

                            {/* Tombol Simpan/Batal Modal */}
                            <div className="flex gap-3 justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCropModal(false)}
                                    className="px-4 py-2 border border-zinc-100 hover:bg-zinc-50 text-zinc-500 text-xs font-black rounded-xl transition"
                                >
                                    Kembali
                                </button>
                                <button
                                    type="button"
                                    onClick={executeCrop}
                                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl transition shadow-md shadow-emerald-500/10"
                                >
                                    Potong & Terapkan
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Kanvas Tersembunyi untuk Operasi Crop */}
            <canvas ref={canvasRef} className="hidden" />

        </div>
    );
};

export default EditProfileView;