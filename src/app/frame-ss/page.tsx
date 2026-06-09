"use client"
import React, { useState, useRef } from 'react';
import { Upload, Monitor, Smartphone, Download, Trash2, Layout, Palette } from 'lucide-react';

const App = () => {
    const [desktopImage, setDesktopImage] = useState<string | ArrayBuffer | null>(null);
    const [mobileImage, setMobileImage] = useState<string | ArrayBuffer | null>(null);
    const [bgColor, setBgColor] = useState('#2d2d30');
    const [accentColor, setAccentColor] = useState('#1a1a1c');
    const [isGradient, setIsGradient] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Fungsi untuk menangani unggahan gambar
    const handleImageUpload = (e: any, type: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'desktop') setDesktopImage(reader.result);
                if (type === 'mobile') setMobileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetImage = (type: any) => {
        if (type === 'desktop') setDesktopImage(null);
        if (type === 'mobile') setMobileImage(null);
    };

    // Ekspor sebagai Gambar menggunakan Native Canvas
    const exportMockup = async () => {
        if (!desktopImage && !mobileImage) return;
        setIsProcessing(true);

        try {
            const canvas = document.createElement('canvas') as any;
            const ctx = canvas.getContext('2d') as any;
            // Ukuran lebih optimal untuk komposisi rapat
            canvas.width = 1600;
            canvas.height = 900;

            // 1. Gambar Latar Belakang
            if (isGradient) {
                const gradient = ctx?.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient?.addColorStop(0, bgColor);
                gradient?.addColorStop(1, accentColor);
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = bgColor;
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const loadImage = (src: any) => new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.src = src;
            });

            // 2. Gambar Mockup Desktop (Posisi Lebih Sentral)
            if (desktopImage) {
                const dImg: any = await loadImage(desktopImage);
                ctx.save();

                const dw = 1200;
                const dh = 680;
                const dx = 80;
                const dy = 110;
                const radius = 24;

                // Bayangan Desktop
                ctx.shadowColor = 'rgba(0,0,0,0.4)';
                ctx.shadowBlur = 60;
                ctx.shadowOffsetY = 30;

                ctx.beginPath();
                ctx.roundRect(dx, dy, dw, dh, radius);
                ctx.clip();

                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(dx, dy, dw, dh);

                // Bar Browser
                ctx.fillStyle = '#f1f5f9';
                ctx.fillRect(dx, dy, dw, 40);

                // Titik Kontrol Browser
                const dotY = dy + 20;
                const startX = dx + 25;
                const colors = ['#ff5f56', '#ffbd2e', '#27c93f'];
                colors.forEach((color, i) => {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(startX + (i * 18), dotY, 5, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Konten Desktop (Fit Aspect Ratio)
                const dRatio = dImg.width / dImg.height;
                const dTargetW = dw;
                const dTargetH = dh - 40;
                const dTargetRatio = dTargetW / dTargetH;

                let dRenderW, dRenderH, dOffsetX = 0, dOffsetY = 0;
                if (dRatio > dTargetRatio) {
                    dRenderH = dTargetH;
                    dRenderW = dRenderH * dRatio;
                    dOffsetX = (dTargetW - dRenderW) / 2;
                } else {
                    dRenderW = dTargetW;
                    dRenderH = dRenderW / dRatio;
                }

                ctx.drawImage(dImg, dx + dOffsetX, dy + 40 + dOffsetY, dRenderW, dRenderH);
                ctx.restore();
            }

            // 3. Gambar Mockup Mobile (Overlap di Samping Kanan)
            if (mobileImage) {
                const mImg: any = await loadImage(mobileImage);
                ctx.save();

                const mw = 310;
                const mh = 640;
                const mx = 1200; // Posisi tumpang tindih
                const my = 200;
                const mRadius = 50;

                // Bayangan Mobile
                // ctx.shadowColor = 'rgba(0,0,0,0.5)';
                // ctx.shadowBlur = 80;
                // ctx.shadowOffsetX = -20;
                // ctx.shadowOffsetY = 40;

                // Frame clipping
                ctx.beginPath();
                ctx.roundRect(mx, my, mw, mh, mRadius);
                ctx.clip();

                // Bodi Ponsel
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(mx, my, mw, mh);

                // Area Layar
                ctx.save();
                ctx.beginPath();
                ctx.roundRect(mx + 10, my + 10, mw - 20, mh - 20, mRadius - 10);
                ctx.clip();

                const mRatio = mImg.width / mImg.height;
                const mTargetW = mw - 20;
                const mTargetH = mh - 20;
                const mTargetRatio = mTargetW / mTargetH;

                let mRenderW, mRenderH, mOffsetX = 0, mOffsetY = 0;
                if (mRatio > mTargetRatio) {
                    mRenderH = mTargetH;
                    mRenderW = mRenderH * mRatio;
                    mOffsetX = (mTargetW - mRenderW) / 2;
                } else {
                    mRenderW = mTargetW;
                    mRenderH = mRenderW / mRatio;
                }

                ctx.drawImage(mImg, mx + 10 + mOffsetX, my + 10 + mOffsetY, mRenderW, mRenderH);
                ctx.restore();

                // Notch Detail
                ctx.fillStyle = '#0f172a';
                ctx.beginPath();
                ctx.roundRect(mx + (mw / 2) - 50, my, 100, 28, [0, 0, 15, 15]);
                ctx.fill();

                ctx.restore();
            }

            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.download = `mockup-compact-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Gagal mengekspor:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121214] p-4 md:p-8 font-sans text-slate-100">
            <div className="max-w-7xl mx-auto">

                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-[#1e1e21] p-6 rounded-[2rem] shadow-xl border border-white/5">
                    <div>
                        <h1 className="text-xl font-black flex items-center gap-2 tracking-tight">
                            <Layout className="text-indigo-500" /> STUDIO MOCKUP
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Versi Kompak 2.0</p>
                    </div>

                    <button
                        onClick={exportMockup}
                        disabled={(!desktopImage && !mobileImage) || isProcessing}
                        className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black transition-all shadow-lg
              ${(!desktopImage && !mobileImage) || isProcessing
                                ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95'}`}
                    >
                        {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={18} />}
                        {isProcessing ? 'MEMPROSES...' : 'UNDUH HASIL'}
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Kontrol */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-[#1e1e21] p-6 rounded-[2rem] border border-white/5 shadow-xl">
                            <h2 className="text-[10px] font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-500">
                                <Palette size={14} /> Pengaturan Latar
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                                    <span className="text-xs font-bold text-slate-400">Gradasi</span>
                                    <input type="checkbox" checked={isGradient} onChange={(e) => setIsGradient(e.target.checked)} className="w-5 h-5 accent-indigo-500 cursor-pointer" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Warna 1</label>
                                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer border-none p-1 bg-black/20" />
                                    </div>
                                    {isGradient && (
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Warna 2</label>
                                            <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer border-none p-1 bg-black/20" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1e1e21] p-6 rounded-[2rem] border border-white/5 shadow-xl space-y-6">
                            <div>
                                <h2 className="text-[10px] font-black mb-3 flex items-center gap-2 text-slate-500 uppercase tracking-widest"><Monitor size={14} /> Gambar Desktop</h2>
                                <div className="relative">
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'desktop')} className="hidden" id="desktop-input" />
                                    <label htmlFor="desktop-input" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/5 rounded-2xl cursor-pointer hover:bg-white/5 group transition-colors">
                                        <Upload className="text-slate-700 group-hover:text-indigo-400 mb-1" size={20} />
                                        <span className="text-[10px] font-black text-slate-600 uppercase">Pilih Gambar</span>
                                    </label>
                                    {desktopImage && (
                                        <button onClick={() => resetImage('desktop')} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"><Trash2 size={12} /></button>
                                    )}
                                </div>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <h2 className="text-[10px] font-black mb-3 flex items-center gap-2 text-slate-500 uppercase tracking-widest"><Smartphone size={14} /> Gambar Mobile</h2>
                                <div className="relative">
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobile')} className="hidden" id="mobile-input" />
                                    <label htmlFor="mobile-input" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/5 rounded-2xl cursor-pointer hover:bg-white/5 group transition-colors">
                                        <Upload className="text-slate-700 group-hover:text-indigo-400 mb-1" size={20} />
                                        <span className="text-[10px] font-black text-slate-600 uppercase">Pilih Gambar</span>
                                    </label>
                                    {mobileImage && (
                                        <button onClick={() => resetImage('mobile')} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"><Trash2 size={12} /></button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pratinjau Kanvas */}
                    <div className="lg:col-span-9">
                        <div
                            style={{ background: isGradient ? `linear-gradient(135deg, ${bgColor}, ${accentColor})` : bgColor }}
                            className="relative w-full rounded-[3rem] p-6 md:p-12 flex flex-col md:flex-row items-center justify-center shadow-2xl overflow-hidden min-h-[600px] border border-white/10"
                        >
                            {/* Pratinjau Desktop */}
                            <div className="relative z-10 w-full max-w-[850px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] rounded-[1.5rem] overflow-hidden border border-white/10 bg-white">
                                <div className="bg-[#f8fafc] p-3 flex items-center gap-2 px-5 border-b border-slate-100">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="aspect-video w-full overflow-hidden flex items-center justify-center bg-white">
                                    {desktopImage ? (
                                        <img src={String(desktopImage)} alt="Desktop" className="w-full h-full object-cover object-top" />
                                    ) : (
                                        <Monitor size={60} className="text-slate-100" strokeWidth={1} />
                                    )}
                                </div>
                            </div>

                            {/* Pratinjau Mobile (Overlap) */}
                            <div className="relative z-20 w-48 md:w-60 -mt-24 md:mt-40 md:-ml-32 transform hover:scale-105 transition-all duration-500">
                                <div className="relative border-[8px] border-[#0f172a] rounded-[2.8rem] bg-[#0f172a] shadow-[-20px_30px_60px_-15px_rgba(0,0,0,0.6)] h-[400px] md:h-[520px] overflow-hidden">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0f172a] rounded-b-2xl z-30 flex items-center justify-center">
                                        <div className="w-10 h-1 bg-slate-800 rounded-full" />
                                    </div>
                                    <div className="w-full h-full bg-white overflow-hidden rounded-[2.2rem]">
                                        {mobileImage ? (
                                            <img src={String(mobileImage)} alt="Mobile" className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                                <Smartphone size={40} className="text-slate-200" strokeWidth={1} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Efek Cahaya Halus */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-black/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;