import { StoresType } from '@/types/StoresType';
import { ChevronRight, MapPin, Clock } from 'lucide-react';
import React from 'react';

type Props = {
    data: StoresType & {
        day_open?: string;
        day_close?: string;
        is_open?: boolean;
        time_open?: string;
        time_close?: string;
    };
};

// Helper untuk memetakan nama hari Indonesia ke index (0 = Minggu, 1 = Senin, dst)
const dayToNumber = (dayName: string): number => {
    const days: { [key: string]: number } = {
        'minggu': 0, 'senin': 1, 'selasa': 2, 'rabu': 3,
        'kamis': 4, 'jumat': 5, 'sabtu': 6
    };
    return days[dayName.toLowerCase()] ?? -1;
};

// Fungsi pengecekan status buka/tutup
const getOperationalStatus = (data: Props['data']) => {
    const { day_open, day_close, time_open, time_close } = data;

    if (!day_open || !day_close || !time_open || !time_close) {
        return { isOpen: false, text: 'Jam Operasional N/A' };
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0 = Minggu, 1 = Senin, dst

    // Parsing string waktu "HH:MM:SS" ke object menit untuk perbandingan mudah
    const [openH, openM] = time_open.split(':').map(Number);
    const [closeH, closeM] = time_close.split(':').map(Number);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    const startDay = dayToNumber(day_open);
    const endDay = dayToNumber(day_close);

    // Cek apakah hari ini masuk dalam range hari operasional
    let isCorrectDay = false;
    if (startDay <= endDay) {
        isCorrectDay = currentDay >= startDay && currentDay <= endDay;
    } else {
        // Kasus jika melewati akhir pekan, misal: Sabtu (6) sampai Selasa (2)
        isCorrectDay = currentDay >= startDay || currentDay <= endDay;
    }

    // Cek apakah jam sekarang masuk dalam range jam operasional
    let isCorrectTime = false;
    if (openMinutes <= closeMinutes) {
        isCorrectTime = currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    } else {
        // Kasus jika buka sampai lewat tengah malam, misal: 10:00 s/d 02:00
        isCorrectTime = currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
    }

    if (isCorrectDay && isCorrectTime && data?.is_open) {
        return { isOpen: true, text: 'Buka' };
    }

    return { isOpen: false, text: 'Tutup' };
};

const CardOutlet = ({ data }: Props) => {
    const status = getOperationalStatus(data);

    // Format tampilan jam agar lebih bersih (misal: 10:00:00 -> 10:00)
    const formatTime = (timeStr?: string) => {
        if (!timeStr) return '';
        const parts = timeStr.split(':');
        return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : timeStr;
    };

    return (
        <div className="bg-white border border-zinc-100 rounded-3xl p-5 hover:border-emerald-500/30 hover:bg-emerald-50/5 hover:shadow-xl hover:shadow-zinc-100/50 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
                {/* Bagian Atas: Logo, Kategori, dan Jarak */}
                <div className="flex items-start justify-between gap-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 p-1 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <img
                            src={data?.business?.logo}
                            alt={data?.name || 'Toko UMKM'}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0 text-right">
                        <div className="flex flex-wrap gap-1 justify-end">
                            {data?.business?.name && (
                                <span className="text-[9px] bg-zinc-100 text-zinc-600 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    {data.business.name}
                                </span>
                            )}
                            {data?.business?.category && (
                                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    {data.business.category}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-black flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <MapPin size={10} className="fill-emerald-600/10" />
                            {typeof data?.distance === 'number' ? `${data.distance.toFixed(2)} km` : '0.00 km'}
                        </span>
                    </div>
                </div>

                {/* Bagian Tengah: Nama dan Alamat */}
                <div className="space-y-1">
                    <h3 className="text-sm font-black text-zinc-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {data?.name || 'Nama Outlet Tidak Tersedia'}
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium line-clamp-2 leading-relaxed">
                        {data?.address || 'Alamat tidak dicantumkan.'}
                    </p>
                </div>

                {/* Bagian Informasi Jam Operasional Baru */}
                {data.day_open && (
                    <div className="pt-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-semibold">
                            <Clock size={12} className="text-zinc-400" />
                            <span>
                                {data.day_open} - {data.day_close} • {formatTime(data.time_open)} - {formatTime(data.time_close)}
                            </span>
                        </div>

                        <div>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide ${status.isOpen
                                ? 'bg-emerald-500 text-white animate-pulse'
                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                                }`}>
                                {status.text}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bagian Bawah: Aksi */}
            <div className="pt-4 mt-4 border-t border-zinc-50 flex items-center justify-end">
                <button
                    onClick={() => window.location.href = `/${data?.business?.slug}/${data?.name}`}
                    className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group/btn"
                >
                    Kunjungi Outlet
                    <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                </button>
            </div>
        </div>
    );
};

export default CardOutlet;