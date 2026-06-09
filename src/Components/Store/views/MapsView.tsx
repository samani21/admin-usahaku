"use client"
import { StoresType } from '@/types/StoresType';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { UserLocationType } from '../StoresType';
import MapComponent from '../components/MapComponent';
import { Get } from '@/utils/Get';
import Loading from '@/Components/Component/Loading';
import { Loader2, MapPin, X } from 'lucide-react';

type Props = {
    PRIMARY_COLOR: string;
}

function MapsView({ PRIMARY_COLOR }: Props) {
    const [selectedStore, setSelectedStore] = useState<StoresType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [stores, setStores] = useState<StoresType[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocationType | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>("Menginisialisasi peta...");
    const [address, setAddress] = useState<string>("Mencari lokasi GPS...");
    const [addressLoading, setAddressLoading] = useState<boolean>(true);
    const [gpsError, setGpsError] = useState<boolean>(false);
    const getReadableAddress = async (lat: number, lng: number) => {
        setAddressLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=id`
            );
            const data = await response.json();

            if (data && data.address) {
                const addr = data.address;
                // Mengambil nama kecamatan/kelurahan/kota terdekat
                const district = addr.suburb || addr.village || addr.city_district || addr.municipality || "";
                const city = addr.city || addr.town || addr.regency || addr.county || "";

                if (district && city) {
                    setAddress(`${district}, ${city}`);
                } else if (city) {
                    setAddress(city);
                } else {
                    // Fallback jika tidak menemukan info detail
                    const cleanName = data.display_name.split(',').slice(0, 2).join(', ');
                    setAddress(cleanName || "Lokasi Terdeteksi");
                }
            } else {
                setAddress("Lokasi tidak dikenal");
            }
        } catch (error) {
            console.error("Gagal mendapatkan alamat:", error);
            setAddress("Gagal memuat nama lokasi");
        } finally {
            setAddressLoading(false);
        }
    };
    useEffect(() => {

        if (!navigator.geolocation) {
            setStatusMessage("Geolocation tidak didukung oleh browser Anda.");
            // Tetap set default lokasi agar fetchStore terpanggil
            setUserLocation({ lat: 0, lng: 0 });
            return;
        }

        setStatusMessage("Sedang mencari titik lokasimu...");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation({ lat, lng });
                getReadableAddress(lat, lng);
                setGpsError(false);
                setStatusMessage("Lokasi ditemukan, memuat daftar toko...");
                console.log("Lokasi user:", lat, lng);
            },
            (error) => {
                setUserLocation({
                    lat: 0,
                    lng: 0,
                });
                setGpsError(true);
                setStatusMessage("Gagal mengambil lokasi. Silakan aktifkan GPS atau izinkan akses lokasi.");
                console.log("Gagal ambil lokasi:", error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000 // Batasi pencarian gps maksimal 10 detik
            }
        );
    }, []);

    useEffect(() => {
        if (userLocation != null) {
            fetchStore()
        }
    }, [userLocation])

    const fetchStore = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean, data: { outlets: StoresType[] } }>(`/customer/stores?lat=${userLocation?.lat != 0 ? userLocation?.lat : ''}&lng=${userLocation?.lng != 0 ? userLocation?.lng : ""}`);
            if (res?.success) {
                setStores(res?.data?.outlets)
                if (res?.data?.outlets.length === 0) {
                    setStatusMessage("Tidak ada toko yang ditemukan di sekitar lokasimu.");
                }
            }
        } catch (e: any) {
            setLoading(true)
            setStatusMessage("Gagal memuat data toko dari server.");
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] gap-4 p-4 text-center">
                <p className="text-sm font-medium text-gray-600 animate-pulse">
                    {statusMessage}
                </p>
                {gpsError && (
                    <button
                        onClick={fetchStore}
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="mt-2 px-4 py-2 text-white text-xs rounded-lg shadow-sm hover:opacity-90 transition"
                    >
                        Lanjutkan Tanpa GPS
                    </button>
                )}
            </div>
        )
    }
    return (
        <div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <div className='space-y-4'>
                <div>
                    <h2 className="text-2xl font-black text-zinc-900">Temukan UMKM di Sekitarmu</h2>
                    <p className="text-xs mt-1 text-zinc-500 font-bold">
                        Melihat peta langsung jangkauan toko terdekat.
                    </p>
                </div>
                <div className='md:flex gap-4'>
                    <motion.div
                        key="map"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[calc(100vh-250px)] pb-10 relative w-full"
                    >

                        <div className="absolute top-4 left-4 bg-zinc-900/90 backdrop-blur-md text-white text-[10px] px-3.5 py-2 rounded-xl font-bold shadow-md uppercase tracking-wider flex items-center gap-1.5 z-1001">
                            {addressLoading ? <Loader2 size={10} className="animate-spin" /> : <MapPin size={12} className="text-emerald-400" />} Lokasi Anda: {address}
                        </div>
                        {stores?.length > 0 ? (
                            <MapComponent
                                stores={stores}
                                PRIMARY_COLOR={PRIMARY_COLOR}
                                userLocation={userLocation}
                                selectedStore={selectedStore}
                                setSelectedStore={setSelectedStore}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium mb-2">Tidak Ada Toko Tersedia</p>
                                <p className="text-xs text-gray-400 max-w-xs">{statusMessage}</p>
                            </div>
                        )}
                        {selectedStore && (
                            <div className="fixed sm:absolute bottom-0 sm:bottom-6 left-0 right-0 sm:left-4 sm:right-4 p-5 sm:p-4 rounded-t-[2rem] sm:rounded-2xl border-t sm:border border-zinc-200/80 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] sm:shadow-xl bg-white text-zinc-800 z-[1001] transition-all duration-300 transform translate-y-0 animate-slideUp">

                                {/* Notch Indicator: Garis kecil pemanis khusus di tampilan mobile ala Bottom Sheet */}
                                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-4 sm:hidden" />

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                                    {/* Bagian Informasi Toko */}
                                    <div className="space-y-1 flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            <span className="text-[9px] font-black tracking-wider bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded uppercase border border-emerald-100">
                                                {selectedStore?.business?.category || "Toko"}
                                            </span>
                                            <span className="text-[11px] text-zinc-400 font-bold flex items-center gap-1">
                                                • {selectedStore.distance?.toFixed(2)} KM dari Anda
                                            </span>
                                        </div>

                                        <h4 className="font-black text-base sm:text-sm text-zinc-900 mt-1 truncate">
                                            {selectedStore.name}
                                        </h4>

                                       
                                    </div>

                                    {/* Bagian Tombol Aksi */}
                                    <div className="flex items-center gap-2 w-full sm:w-auto border-t border-zinc-100 sm:border-none pt-3 sm:pt-0 shrink-0">
                                        {/* Tombol Kunjungi - Lebar penuh di mobile, auto di desktop */}
                                        <button
                                            className="flex-1 sm:flex-initial text-center justify-center px-5 py-3 sm:py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-xs font-black rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm shadow-emerald-500/20"
                                        >
                                            Kunjungi Toko
                                        </button>

                                        {/* Tombol Close */}
                                        <button
                                            onClick={() => setSelectedStore(null)}
                                            className="p-3 sm:p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 rounded-xl transition-all duration-200 active:scale-[0.95]"
                                            aria-label="Tutup detail toko"
                                        >
                                            <X size={16} className="sm:w-[14px] sm:h-[14px]" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </motion.div>

                    <div className="space-y-4">
                        {/* Judul dengan style micro-typography yang bersih */}
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                            <h3 className="font-black text-xs text-zinc-400 uppercase tracking-widest">
                                Daftar Toko Terdekat
                            </h3>
                            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                                {stores?.length || 0} Lokasi
                            </span>
                        </div>

                        {/* Container List dengan limit tinggi agar scrollable secara independen */}
                        <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1 no-scrollbar scroll-smooth">
                            {stores?.map((loc, idx) => {
                                // Cek apakah item ini merupakan toko yang sedang aktif/dipilih
                                // Sesuaikan '.id' dengan unique key dari data Anda (misal: ._id atau .name)
                                const isSelected = selectedStore?.id === loc.id;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedStore(loc)}
                                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start justify-between gap-3 group relative overflow-hidden
                        ${isSelected
                                                ? 'border-emerald-500 bg-emerald-50/40 shadow-sm shadow-emerald-500/10'
                                                : 'border-zinc-100 bg-white hover:border-zinc-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-100'
                                            }`}
                                    >
                                        {/* Garis Indikator Aktif di Sisi Kiri */}
                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-md" />
                                        )}

                                        {/* Informasi Toko */}
                                        <div className="space-y-1.5 flex-1 min-w-0 pl-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black tracking-wider uppercase bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md border border-zinc-200/40 truncate max-w-[120px]">
                                                    {loc.business?.category || "Toko"}
                                                </span>
                                            </div>

                                            <h4 className={`font-extrabold text-sm tracking-tight truncate transition-colors duration-200
                            ${isSelected ? 'text-emerald-600' : 'text-zinc-800 group-hover:text-emerald-500'}`}
                                            >
                                                {loc.name}
                                            </h4>

                                            {loc.business?.description && (
                                                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed line-clamp-2">
                                                    {loc.business.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Badge Jarak (Distance) */}
                                        <div className="text-right shrink-0 flex flex-col items-end justify-between h-full self-stretch pt-0.5">
                                            <div className={`text-xs font-black px-2.5 py-1 rounded-xl tracking-tight transition-all
                            ${isSelected
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white'
                                                }`}
                                            >
                                                {loc?.distance?.toFixed(2)} KM
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MapsView;