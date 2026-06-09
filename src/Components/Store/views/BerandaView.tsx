"use client"
import React, { useEffect, useState } from 'react';
import { CardProduct } from '../components/CardProduct';
import { Store, ShoppingBag, MapPin, Loader2 } from 'lucide-react';
import CardOutlet from '../components/CardOutlet';
import { StoresType } from '@/types/StoresType';
import { UserLocationType } from '../StoresType';
import { Get } from '@/utils/Get';
import { ProductsType } from '@/types/Admin/ProductsType';
import { BusinessType } from '@/types/Admin/BusinessType';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

type BerandaViewProps = {
    outlets: any[];
};
interface ProductType extends ProductsType {
    business: BusinessType;
}
export const BerandaView = ({ outlets }: BerandaViewProps) => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'outlet' | 'produk'>('produk');
    const [stores, setStores] = useState<StoresType[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocationType | null>(null);
    const [address, setAddress] = useState<string>("Mencari lokasi GPS...");
    const [addressLoading, setAddressLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductType[]>();
    // Fungsi untuk mendapatkan nama kota/kecamatan dari koordinat GPS menggunakan Nominatim
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
            console.log("Geolocation tidak didukung");
            setAddress("GPS Tidak Didukung");
            setAddressLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation({ lat, lng });
                getReadableAddress(lat, lng);
            },
            (error) => {
                setUserLocation({
                    lat: 0,
                    lng: 0,
                });
                setAddress("Akses GPS Ditolak / Gagal");
                setAddressLoading(false);
                console.log("Gagal ambil lokasi:", error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    }, []);

    useEffect(() => {
        if (userLocation != null) {
            fetchStore();
        }
    }, [userLocation]);

    const fetchStore = async () => {
        setLoading(true);
        try {
            const res = await Get<{ success: boolean, data: { outlets: StoresType[], products: ProductType[] } }>(
                `/customer/stores?lat=${userLocation?.lat !== 0 ? userLocation?.lat : ''}&lng=${userLocation?.lng !== 0 ? userLocation?.lng : ""}${searchQuery ? `&searchQuery=${searchQuery}` : ''}`
            );
            if (res?.success) {
                setStores(res?.data?.outlets);
                setProducts(res?.data?.products);
            }
        } catch (e: any) {
            console.error("Gagal mengambil data toko:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header Lokasi & Tab Switcher */}
            <div className="bg-white border border-zinc-200/60 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 font-black tracking-widest px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 w-fit">
                        {addressLoading && <Loader2 size={10} className="animate-spin" />}
                        Lokasi Anda
                    </span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <MapPin size={18} className="text-emerald-500 flex-shrink-0" />
                        <h2 className="text-base font-black text-zinc-900 line-clamp-1">
                            {address}
                        </h2>
                        <span className="text-[10px] text-zinc-400 font-bold ml-1 flex-shrink-0 cursor-pointer hover:text-emerald-600 transition-colors">
                            (Atur Lokasi)
                        </span>
                    </div>
                </div>
                {/* Tab Menu */}
                <div className="flex bg-zinc-100 p-1 rounded-xl w-fit self-stretch md:self-auto">
                    <button
                        onClick={() => setActiveTab('outlet')}
                        className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'outlet' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                    >
                        <Store className="w-4 h-4" />
                        <span>Outlet Terdekat</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('produk')}
                        className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'produk' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Produk Terdekat</span>
                    </button>
                </div>
            </div>

            {/* Konten Aktif */}
            {activeTab === 'outlet' ? (
                loading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
                        <p className="text-xs font-semibold">Mencari outlet terdekat dari lokasimu...</p>
                    </div>
                ) : stores.length === 0 ? (
                    <div className="text-center py-16 text-zinc-400 border border-dashed border-zinc-200 rounded-3xl bg-white">
                        <Store className="w-10 h-10 mx-auto mb-2 text-zinc-300" />
                        <p className="text-xs font-semibold">Tidak ada outlet terdekat di daerahmu saat ini</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stores.map((outlet) => (
                            <CardOutlet key={outlet.id} data={outlet} />
                        ))}
                    </div>
                )
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products?.map((product) => (
                        <CardProduct
                            key={product.id}
                            data={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};