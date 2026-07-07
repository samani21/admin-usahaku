"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Image as ImageIcon, Video, Type, Trash2, Clock, CheckCircle2, X, UploadCloud, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import MainLayout from '@/Components/Layout/MainLayout';
import { Post } from '@/utils/Post';
import { AlertType } from '@/types/Alert';
import Alert from '@/Components/Alert';
import { Get } from '@/utils/Get';
import { Delete } from '@/utils/Delete';
import { formatImage } from '@/utils/formatImage';

// --- Tipe Data ---
export interface Meta {
    last_page: number;
    limit: number;
    page: number;
    total: number;
}

type Story = {
    id: number;
    business_id: number;
    media_type: 'image' | 'video' | 'text';
    media_path: string | null;
    caption: string | null;
    background_color: string | null;
    expires_at: string;
    created_at: string;
};

const StoryManagementViews = () => {
    // --- State ---
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination State
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [showAlert, setShowAlert] = useState<AlertType | null>(null)

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'text'>('image');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [bgColor, setBgColor] = useState('#10b981'); // Default emerald-500
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Warna preset untuk Story Teks
    const presetColors = ['#10b981', '#3b82f6', '#f43f5e', '#8b5cf6', '#f59e0b', '#0f172a'];

    // --- Fetch Data ---
    const loadStories = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const res = await Get<{ success: boolean, data: any, meta: Meta }>(`stories?page=${pageNumber}`);
            if (res.success) {
                setStories(res.data);
                setMeta(res.meta);
            }
        } catch (error) {
            // console.error(error);
            setShowAlert({
                type: 'error',
                message: 'Gagal memuat data story',
                isOpen: true
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (showAlert?.isOpen) {
            timeout = setTimeout(() => {
                setShowAlert(null);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [showAlert]);

    useEffect(() => {
        loadStories(page);
    }, [page]);

    // --- Handler Form ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                alert("Maksimal ukuran file 10MB");
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('business_id', '1'); // Ambil dari state auth
            formData.append('media_type', mediaType);
            if (caption) formData.append('caption', caption);

            if (mediaType === 'text') {
                formData.append('background_color', bgColor);
            } else if (file) {
                formData.append('file', file);
            } else {
                alert('Pilih file terlebih dahulu!');
                setIsSubmitting(false);
                return;
            }

            await Post('stories', formData);

            setIsModalOpen(false);
            setShowAlert({
                type: 'success',
                message: 'Berhasil membuat story',
                isOpen: true
            });
            resetForm();
            // Reset ke halaman 1 setelah berhasil submit
            setPage(1);
            loadStories(1);
        } catch (error) {
            // console.error(error);
            setShowAlert({
                type: 'error',
                message: 'Gagal membuat story',
                isOpen: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus story ini dari arsip?')) return;
        try {
            await Delete(`stories/${id}`);

            // Refresh halaman saat ini atau mundur satu halaman jika kosong
            if (stories.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                loadStories(page);
            }

            setShowAlert({
                type: 'success',
                message: 'Story berhasil dihapus',
                isOpen: true
            });
        } catch (error) {
            // console.error(error);
        }
    };

    const resetForm = () => {
        setFile(null);
        setPreviewUrl(null);
        setCaption('');
        setMediaType('image');
        setBgColor('#10b981');
    };

    const isStoryActive = (expiresAt: string) => new Date(expiresAt) > new Date();

    return (
        <MainLayout>
            <div className="w-full space-y-6 animate-in fade-in duration-300">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Manajemen Story</h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Kelola cerita harian untuk pelanggan Anda (aktif 24 jam).</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:-translate-y-1 whitespace-nowrap"
                    >
                        <Plus size={18} strokeWidth={2.5} /> Buat Story Baru
                    </button>
                </div>

                {/* Grid Arsip Story */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm min-h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-emerald-500" />
                            <h3 className="font-black text-slate-800 text-lg">Arsip Story</h3>
                        </div>
                        {meta && (
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                                Total: {meta.total} Story
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                            <p className="font-bold text-sm">Memuat Arsip...</p>
                        </div>
                    ) : stories.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <ImageIcon size={28} className="text-slate-300" />
                            </div>
                            <h4 className="font-bold text-slate-700 mb-1">Belum Ada Story</h4>
                            <p className="text-xs text-slate-500">Story yang Anda buat akan muncul di sini.</p>
                        </div>
                    ) : (
                        <div className="flex-1">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                {stories.map((story) => {
                                    const active = isStoryActive(story.expires_at);
                                    return (
                                        <div key={story.id} className="group flex flex-col bg-slate-50 rounded-3xl p-3 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden">
                                            {/* Nested Radius: Area Visual */}
                                            <div
                                                className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-slate-200 relative mb-3 flex items-center justify-center shadow-inner"
                                                style={story.media_type === 'text' ? { backgroundColor: story.background_color || '#10b981' } : {}}
                                            >
                                                {story.media_type === 'text' ? (
                                                    <p className="text-white text-center font-black p-4 text-sm sm:text-base leading-snug drop-shadow-md">
                                                        {story.caption}
                                                    </p>
                                                ) : story.media_type === 'image' ? (
                                                    <img src={formatImage(story.media_path ?? '')} alt="Story" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                        <video
                                                            src={`${formatImage(story.media_path ?? '')}#t=0.001`}
                                                            className="w-full h-full object-cover rounded-2xl bg-black"
                                                            controls
                                                            preload="metadata"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                )}

                                                {/* Badge Status Mengambang (Floating) */}
                                                <div className="absolute top-2 left-2">
                                                    {active ? (
                                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 shadow-sm">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-[9px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                                                            Arsip
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Detail Bawah */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-3 px-1 leading-relaxed">
                                                    {story.caption || 'Tanpa Keterangan'}
                                                </p>
                                                <button
                                                    onClick={() => handleDelete(story.id)}
                                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-white transition-colors active:scale-95"
                                                >
                                                    <Trash2 size={14} /> Hapus
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Pagination UI */}
                            {meta && meta.last_page > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-700">
                                            Halaman {page} dari {meta.last_page}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                                        disabled={page === meta.last_page}
                                        className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal Tambah Story */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 overflow-hidden">
                            {/* Header Modal */}
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
                                <h3 className="font-black text-slate-800 text-lg sm:text-xl">Buat Story Baru</h3>
                                <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all active:scale-95">
                                    <X size={20} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Konten Scrollable */}
                            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                                <form id="storyForm" onSubmit={handleSubmit} className="space-y-6">
                                    {/* Segmented Control Tipe Media */}
                                    <div className="flex p-1 bg-slate-50 rounded-full border border-slate-100">
                                        {(['image', 'video', 'text'] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => {
                                                    setMediaType(type);
                                                    setFile(null);
                                                    setPreviewUrl(null);
                                                }}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold capitalize transition-all duration-300 ${mediaType === type ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                {type === 'image' && <ImageIcon size={14} />}
                                                {type === 'video' && <Video size={14} />}
                                                {type === 'text' && <Type size={14} />}
                                                {type === 'image' ? 'Gambar' : type === 'video' ? 'Video' : 'Teks'}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Area Input File (Khusus Image / Video) */}
                                    {mediaType !== 'text' && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500 pl-2">Media File</label>
                                            <div
                                                onClick={() => {
                                                    if (!file || mediaType === 'image') {
                                                        fileInputRef.current?.click();
                                                    }
                                                }}
                                                className={`w-full aspect-video sm:aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden group ${file ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-emerald-300 cursor-pointer'}`}
                                            >
                                                {previewUrl ? (
                                                    mediaType === 'image' ? (
                                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="relative w-full h-full">
                                                            <video
                                                                src={`${previewUrl}#t=0.001`}
                                                                className="w-full h-full object-cover rounded-2xl bg-black"
                                                                controls
                                                                preload="metadata"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    fileInputRef.current?.click();
                                                                }}
                                                                className="absolute top-2 right-2 p-2 bg-slate-900/70 hover:bg-rose-500 text-white rounded-full backdrop-blur-sm transition-colors shadow-sm"
                                                                title="Ganti Video"
                                                            >
                                                                <UploadCloud size={16} />
                                                            </button>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="text-center p-6 flex flex-col items-center cursor-pointer w-full h-full justify-center">
                                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-emerald-500 group-hover:-translate-y-1 transition-transform">
                                                            <UploadCloud size={24} />
                                                        </div>
                                                        <p className="text-sm font-bold text-slate-700">Pilih atau letakkan file di sini</p>
                                                        <p className="text-[11px] font-medium text-slate-400 mt-1">Maksimal 10MB ({mediaType === 'image' ? 'JPG, PNG' : 'MP4'})</p>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept={mediaType === 'image' ? 'image/jpeg, image/png, image/jpg' : 'video/mp4, video/webm'}
                                                className="hidden"
                                            />
                                        </div>
                                    )}

                                    {/* Area Input Warna (Khusus Text) */}
                                    {mediaType === 'text' && (
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500 pl-2">Warna Latar</label>
                                            <div className="flex flex-wrap gap-3 pl-1">
                                                {presetColors.map(color => (
                                                    <button
                                                        key={color}
                                                        type="button"
                                                        onClick={() => setBgColor(color)}
                                                        className={`w-10 h-10 rounded-full border-[3px] transition-all active:scale-90 flex items-center justify-center ${bgColor === color ? 'border-slate-800 shadow-md scale-110' : 'border-white shadow-sm hover:scale-105'}`}
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        {bgColor === color && <CheckCircle2 size={16} className="text-white drop-shadow-md" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Caption Area */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-extrabold text-slate-500 pl-2">
                                            {mediaType === 'text' ? 'Tulis Cerita Anda' : 'Keterangan (Opsional)'}
                                        </label>
                                        <textarea
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            rows={mediaType === 'text' ? 5 : 3}
                                            placeholder={mediaType === 'text' ? "Ketik sesuatu yang menarik..." : "Tambahkan deskripsi singkat..."}
                                            className={`w-full bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all ${mediaType === 'text' ? 'text-xl sm:text-2xl font-black text-white p-6 rounded-3xl text-center placeholder:text-white/60' : 'text-sm font-bold text-slate-800 p-4 rounded-2xl focus:border-emerald-500'}`}
                                            style={mediaType === 'text' ? { backgroundColor: bgColor, borderColor: bgColor } : {}}
                                            required={mediaType === 'text'}
                                        />
                                        <div className="flex justify-between items-center px-2">
                                            <p className="text-[10px] font-bold text-slate-400">Terlihat oleh pelanggan selama 24 jam</p>
                                            <p className={`text-[10px] font-bold ${caption.length > 255 ? 'text-rose-500' : 'text-slate-400'}`}>
                                                {caption.length}/255
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Footer Modal */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                                <button
                                    type="submit"
                                    form="storyForm"
                                    disabled={isSubmitting || (mediaType !== 'text' && !file) || caption.length > 255}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:border disabled:border-slate-200 bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={16} className="animate-spin" /> Mengunggah...</>
                                    ) : (
                                        <>Unggah Story</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {
                showAlert?.isOpen &&
                <Alert type={showAlert.type} message={showAlert.message} onClose={() => setShowAlert(null)} />
            }
        </MainLayout>
    );
};

export default StoryManagementViews;