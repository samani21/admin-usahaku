import { OutletsType } from '@/types/Admin/OutletType';
import { Get } from '@/utils/Get';
import { Search, X, MapPin, ChevronDown, Loader2, Store, Check, Clock } from 'lucide-react' // Tambah import
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
    onClose: () => void;
    tenant: string;
    selectedOutlet: OutletsType | null
}

const ModalOutlet = ({ onClose, tenant, selectedOutlet }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [outlets, setOutlets] = useState<OutletsType[]>([]);
    const [search, setSearch] = useState<string>('');
    const pathname = usePathname();
    const route = useRouter();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Jika user kasih izin, ambil data dengan koordinat
                    getOutlet(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    // Jika user tolak/error, ambil data tanpa koordinat (default)
                    getOutlet();
                }
            );
        } else {
            getOutlet();
        }
    }, [])
    useEffect(() => {
        // disable scroll saat modal terbuka
        document.body.style.overflow = 'hidden';

        return () => {
            // balikin lagi saat modal ditutup / unmount
            document.body.style.overflow = 'auto';
        };
    }, []);
    const getOutlet = async (lat?: number, lng?: number) => {
        setLoading(true);
        try {
            // Bangun URL dengan query params jika ada lokasi
            let url = '/customer/list-outlet';
            if (lat && lng) {
                url += `?latitude=${lat}&longitude=${lng}`;
            }

            const res = await Get<{ success: boolean, data: OutletsType[] }>(url);
            if (res.success) {
                setOutlets(res.data);
            }
        } catch (e: any) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    // Filter berdasarkan search bar (client-side search)
    const filteredOutlets = outlets.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">

                {/* Header Modal */}
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                    <div>
                        <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2">
                            <Store className="w-5 h-5 text-zinc-850" />
                            Daftar Outlet
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            Pilih salah satu lokasi di bawah untuk melihat informasi terperinci.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600 transition-colors"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-4 bg-zinc-50 border-b border-zinc-200 space-y-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Cari nama atau alamat outlet..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-800 transition-all placeholder:text-zinc-400"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 font-bold bg-zinc-100 px-2.5 py-1 rounded"
                            >
                                Hapus
                            </button>
                        )}
                    </div>

                    {/* Kota Filter Pills */}
                    {/* <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCity === city
                                    ? 'bg-zinc-900 text-white shadow-sm'
                                    : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div> */}
                </div>

                {/* List Outlets */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[45vh] bg-zinc-50/20">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                            <Loader2 className="animate-spin mb-2" size={32} />
                            <p>Mencari outlet terdekat...</p>
                        </div>
                    ) : filteredOutlets.length > 0 ? (
                        filteredOutlets.map((outlet) => {
                            // const isStoreOpenNow = checkStoreStatus(outlet.time_open, outlet.time_close);
                            const isCurrentlyActive = selectedOutlet && selectedOutlet.id === outlet.id;
                            const url = pathname === `/` ? outlet?.name : `/${tenant}/${outlet?.name}`
                            return (
                                <div
                                    key={outlet.id}
                                    onClick={() => route.push(url)}
                                    className={`group p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white ${isCurrentlyActive
                                        ? 'border-zinc-900 ring-2 ring-zinc-900/10 bg-zinc-50/50'
                                        : 'border-zinc-200 hover:border-zinc-300 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex gap-3.5 items-start w-full sm:w-auto">
                                        {/* Mini Custom Badge */}
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 text-white flex items-center justify-center flex-shrink-0 hidden sm:flex shadow-sm">
                                            <MapPin className="w-4.5 h-4.5 text-zinc-200" />
                                        </div>
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors text-sm sm:text-base truncate">
                                                    {outlet.name}
                                                </h4>
                                                {isCurrentlyActive && (
                                                    <span className="bg-zinc-900 text-white text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                        <Check className="w-2.5 h-2.5" /> Aktif
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-xs text-zinc-500 flex items-center gap-1 max-w-sm">
                                                <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                                                <span className="truncate">{outlet.address}</span>
                                            </p>

                                            <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Operasional: {outlet.time_open} - {outlet.time_close}  {outlet.is_currently_open ? (
                                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full text-[10px] font-bold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Buka
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-full text-[10px] font-bold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Tutup
                                                    </span>
                                                )}
                                            </p>
                                            {(outlet as any).distance && (
                                                <span className="text-[10px] bg-green-100 text-emerald-600 px-2 py-0.5 rounded-full inline-block">
                                                    {parseFloat((outlet as any).distance).toFixed(1)} km dari lokasimu
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 px-4">
                            <div className="bg-zinc-100 text-zinc-400 p-4 rounded-full inline-block mb-3">
                                <Search className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-zinc-850">Outlet Tidak Ditemukan</h4>
                            <p className="text-xs text-zinc-450 mt-1 max-w-xs mx-auto">
                                Coba ketik kata kunci lain atau pilih kota yang berbeda.
                            </p>
                            <button
                                onClick={() => setSearch("")}
                                className="mt-4 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold text-xs py-2 px-4 rounded-xl transition-all"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Modal */}
                <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-xs text-zinc-400">
                    <span>Menampilkan {filteredOutlets.length} dari {filteredOutlets.length} outlet</span>
                    <button
                        onClick={onClose}
                        className="bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 font-bold px-4 py-2 rounded-xl transition-all"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalOutlet