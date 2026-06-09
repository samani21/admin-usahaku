'use client'
import { Camera, ChevronDown, Edit3, UploadCloud, X } from 'lucide-react'
import React, { useRef, useState } from 'react'

type Props = {
    onClose: () => void;
    showToast: (v: string) => void;
}

const ModalEditProfile = ({ onClose, showToast }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [profile, setProfile] = useState<any>({
        name: 'Ayu Sukma',
        bio: 'Pecinta Kuliner & Fashion Lokal',
        avatar: '/avatar.jpeg',
        gender: 'female',
        birth_date: '1998-05-15',
        address_line: 'Jl. Brigjen Hasan Basri No. 12',
        city: 'Banjarmasin',
        postal_code: '70123',
        joinDate: 'Maret 2025',
        tier: 'Gold Elite',
        points: 1240
    });

    const [editForm, setEditForm] = useState({ ...profile });
    const handleSaveProfile = async () => {

    }
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        const reader = new FileReader();
        reader.onload = (event: any) => {
            // Membuat objek gambar baru untuk membaca dimensi
            const img = new Image() as any;
            img.onload = () => {
                // Membuat canvas virtual untuk proses cropping
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Ukuran target foto profil (misal: 400x400 px)
                const targetSize = 400;
                canvas.width = targetSize;
                canvas.height = targetSize;

                // Logika untuk Center Crop 1:1 otomatis
                const size = Math.min(img.width, img.height); // Ambil sisi terpendek
                const startX = (img.width - size) / 2; // Titik mulai X (tengah)
                const startY = (img.height - size) / 2; // Titik mulai Y (tengah)

                // Menggambar dan memotong gambar ke dalam canvas
                ctx?.drawImage(
                    img,
                    startX, startY, size, size, // Bagian asli yang mau diambil (Crop)
                    0, 0, targetSize, targetSize // Digambar ulang di canvas dengan ukuran target
                );

                // Menghasilkan base64 gambar yang SUDAH di-crop (format JPEG, kualitas 90%)
                const croppedImageBase64 = canvas.toDataURL('image/jpeg', 0.9);

                // Update state dengan gambar yang sudah terpotong
                setEditForm((prev: any) => ({ ...prev, avatar: croppedImageBase64 }));
                setIsUploading(false);
                showToast('Foto berhasil di-crop otomatis (1:1).');
            };

            // Memicu proses onload gambar
            img.src = event.target.result;
        };

        // Membaca file sebagai Data URL
        reader.readAsDataURL(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]">

                <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-black text-slate-900">Profil Personal</h3>
                        <p className="text-xs text-slate-500 mt-1">Perbarui identitas kartu premium Anda.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 h-[80vh] overflow-auto space-y-6 bg-[#F8FAFC]">
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                            <div className={`w-24 h-24 rounded-full p-1 border-2 border-dashed ${isUploading ? 'border-amber-400 animate-pulse' : 'border-emerald-500'} transition-colors relative z-10`}>
                                <img
                                    src={editForm.avatar}
                                    alt="Preview"
                                    className={`w-full h-full rounded-full object-cover transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-1 rounded-full bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                    <Camera size={24} className="text-white" />
                                </div>

                                {/* Uploading Indicator */}
                                {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <UploadCloud size={24} className="text-slate-900 animate-bounce" />
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm z-20">
                                <Edit3 size={12} />
                            </div>
                        </div>

                        <div className="text-center">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block cursor-pointer hover:text-emerald-700" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                Ganti Foto (Klik disini)
                            </span>
                            <span className="text-[9px] text-slate-400">Rasio otomatis 1:1 (Square)</span>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Nama Tampilan</label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm((prev: any) => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm font-bold text-slate-900 transition-all shadow-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Jenis Kelamin</label>
                                <div className="relative">
                                    <select
                                        value={editForm.gender}
                                        onChange={(e) => setEditForm((prev: any) => ({ ...prev, gender: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm text-slate-600 transition-all shadow-sm appearance-none cursor-pointer"
                                    >
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    value={editForm.birth_date}
                                    onChange={(e) => setEditForm((prev: any) => ({ ...prev, birth_date: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm text-slate-600 transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Alamat Lengkap</label>
                            <textarea
                                value={editForm.address_line}
                                onChange={(e) => setEditForm((prev: any) => ({ ...prev, address_line: e.target.value }))}
                                rows={2}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm text-slate-600 transition-all shadow-sm resize-none"
                                required
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Kota / Kabupaten</label>
                                <input
                                    type="text"
                                    value={editForm.city}
                                    onChange={(e) => setEditForm((prev: any) => ({ ...prev, city: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm text-slate-600 transition-all shadow-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Kode Pos</label>
                                <input
                                    type="text"
                                    value={editForm.postal_code}
                                    onChange={(e) => setEditForm((prev: any) => ({ ...prev, postal_code: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm text-slate-600 transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3.5 px-4 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                        >
                            Simpan Perubahan
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ModalEditProfile