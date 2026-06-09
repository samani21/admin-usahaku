'use client';

import React, { useEffect, useState, useRef } from 'react';
import { XIcon } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

type Props = {
    onClose: () => void;
}

const ModalScanProduct = ({ onClose }: Props) => {
    const [scanError, setScanError] = useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

    const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
    const isStoppingRef = useRef<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        // Delay 300ms memastikan elemen DOM #reader siap di dalam modal
        const initTimeout = setTimeout(() => {
            if (!isMounted) return;

            try {
                const html5Qrcode = new Html5Qrcode("reader", {
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                    verbose: false
                });
                html5QrcodeRef.current = html5Qrcode;

                const onSuccess = async (decodedText: string) => {
                    if (isStoppingRef.current) return;

                    // Efek suara beep kasir
                    try {
                        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(1300, ctx.currentTime);
                        gain.gain.setValueAtTime(0.05, ctx.currentTime);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.08);
                    } catch (e) {
                        console.log("Audio contexts blocked or unsupported");
                    }

                    // Kunci status & matikan kamera terlebih dahulu agar tidak crash/stuck
                    if (html5Qrcode.isScanning) {
                        isStoppingRef.current = true;
                        try {
                            await html5Qrcode.stop();

                            // ALIHKAN HALAMAN:
                            // Jika isi QR Code berupa URL valid (misal: https://google.com), buka URL tersebut.
                            // Jika isi QR Code hanya teks biasa, lempar ke pencarian Google.
                            if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
                                window.location.href = decodedText;
                            } else {
                                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(decodedText)}`;
                            }
                        } catch (err) {
                            console.error("Gagal menghentikan kamera:", err);
                        } finally {
                            isStoppingRef.current = false;
                        }
                    } else {
                        if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
                            window.location.href = decodedText;
                        } else {
                            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(decodedText)}`;
                        }
                    }
                };

                const onError = (errorMessage: string) => {
                    // Dibiarkan kosong demi performa
                };

                html5Qrcode.start(
                    { facingMode: "environment" },
                    {
                        fps: 15,
                        qrbox: (width, height) => {
                            const size = Math.min(width, height) * 0.7;
                            return { width: size, height: size };
                        }
                    },
                    onSuccess,
                    onError
                )
                    .then(() => {
                        if (isMounted) {
                            setIsCameraReady(true);
                            setScanError(null);
                        }
                    })
                    .catch((err) => {
                        console.error("Gagal inisialisasi kamera:", err);
                        if (isMounted) {
                            setScanError("Tidak dapat mengakses kamera belakang. Pastikan izin kamera diberikan.");
                        }
                    });

            } catch (error) {
                console.error("Gagal instansiasi Html5Qrcode:", error);
                if (isMounted) {
                    setScanError("Gagal memuat sistem pemindai.");
                }
            }
        }, 300);

        return () => {
            isMounted = false;
            clearTimeout(initTimeout);
            if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
                html5QrcodeRef.current.stop().catch((err) => console.error("Gagal mematikan kamera saat unmount:", err));
            }
        };
    }, []);

    const handleClose = async () => {
        if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
            try {
                await html5QrcodeRef.current.stop();
            } catch (err) {
                console.error("Gagal mematikan kamera manual:", err);
            }
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-black text-slate-900">QR Code Scanner</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Arahkan kamera ke QR Code untuk dialihkan ke halaman detail produk.</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 flex flex-col items-center space-y-4">
                    <div className="relative w-full aspect-square max-w-[340px] overflow-hidden bg-slate-950 rounded-2xl border-4 border-slate-900 shadow-inner flex items-center justify-center">
                        <div id="reader" className="w-full h-full overflow-hidden [&_video]:w-full [&_video]:h-full [&_video]:object-cover"></div>

                        {!isCameraReady && !scanError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 text-xs gap-2">
                                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                <span>Membuka Kamera Belakang...</span>
                            </div>
                        )}

                        {scanError && (
                            <div className="absolute inset-0 p-4 flex flex-col items-center justify-center bg-slate-950 text-center text-rose-400 text-xs gap-2">
                                <span>⚠️</span>
                                <p className="font-semibold">{scanError}</p>
                            </div>
                        )}

                        {isCameraReady && (
                            <div className="absolute w-full h-[2px] bg-emerald-500 shadow-[0_0_8px_#10b981] animate-[bounce_2.5s_infinite] left-0 top-0 pointer-events-none z-10" />
                        )}
                    </div>

                    {isCameraReady && (
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>KAMERA BELAKANG AKTIF</span>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors"
                    >
                        Tutup Scanner
                    </button>
                </div>
            </div>

            <style jsx global>{`
                #reader {
                    border: none !important;
                }
                #reader video {
                    transform: scaleX(1) !important;
                }
            `}</style>
        </div>
    );
};

export default ModalScanProduct;