import { Check } from 'lucide-react';
import React from 'react'

interface paket {
    name: string;
    price: string;
    features: string[];
    recomended: boolean;
    desc: string;
}
const PricingSection = () => {
    const listPrice: paket[] = [
        {
            name: 'Gratis',
            price: 'Rp0',
            desc: 'Cocok untuk memulai digitalisasi bisnismu dengan fitur dasar.',
            features: [
                "Pilihan 3 tema (produk, jasa, campuran)",
                "1 akun admin + 2 akun karyawan",
                "Tambah produk maksimal 5 item",
                "Sistem antrian & pesanan dasar",
                "Pelanggan bisa pesan tanpa login",
                "Dashboard keuangan sederhana (transaksi masuk/keluar)",
                "Watermark & banner promosi “Dibuat oleh UsahaKu”",
                "Tampilan 100% responsive mobile",
                "Pembayaran Cash & Saldo UsahaKu",
                "Fitur Affiliate 20% aktif otomatis",
                "Ditampilkan di Peta UsahaKu (publik)",
                "QR katalog untuk akses cepat",
                "Rekap pendapatan harian dasar"
            ],
            recomended: false
        },
        {
            name: 'Pro',
            price: 'Rp50.000',
            desc: 'Untuk UMKM yang ingin tampilan profesional dan fitur lengkap.',
            features: [
                "Termasuk semua fitur gratis",
                "Hapus watermark & banner promosi",
                "Tambah produk tanpa batas",
                "Tambah akun karyawan lebih dari 2",
                "Cetak laporan & struk otomatis",
                "Pembayaran otomatis via saldo UsahaKu",
                "Notifikasi pesanan via WhatsApp & email",
                "Balas ulasan pelanggan (review premium)",
                "Rekap harian otomatis (bisa diunduh)",
                "Statistik pengunjung katalog",
                "QR Khusus Antrian (langsung ke nomor antrian pelanggan)"
            ],
            recomended: true
        },
        {
            name: 'Elit',
            price: 'Rp80.000',
            desc: 'Paket premium dengan dukungan penuh dan promosi prioritas.',
            features: [
                "Semua Fitur Pro + Tambahan Eksklusif:",
                "Promosi di Peta UsahaKu (Prioritas Tampilan)",
                "Paket Digital Branding Premium (banner promosi, link bio usaha, statistik detail pengunjung)",
                "Point Reward & Loyalty System untuk pelanggan tetap",
                "Rekap Harian & Mingguan Otomatis via Email",
                "Prioritas Support & Konsultasi Setup UsahaKu",
                "Badge “UMKM Terverifikasi” di katalog publik",
                "Akses Awal ke Fitur Baru (Beta Tester)"
            ],
            recomended: false
        },
    ]
    return (
        <section id="pricing" className="py-24 bg-[var(--primary-color)]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-[var(--secondary-color)] text-3xl font-semibold uppercase tracking-widest">Paket & Harga</h2>
                    <p className="text-xl text-center text-gray-500 mb-16 max-w-2xl mx-auto">Mulai dari gratis sampai fitur lengkap — sesuaikan dengan kebutuhan bisnismu.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {
                        listPrice?.map((lp, i) => (
                            lp?.recomended ?
                                <div key={i} className="flex flex-col p-10 bg-gray-900 rounded-3xl shadow-2xl transition duration-500 transform scale-[1.05] border-t-4 border-[var(--secondary-color)]">
                                    <div className="text-center mb-4">
                                        <span className="inline-block px-4 py-1 text-xs font-bold uppercase rounded-full bg-[var(--secondary-color)] text-white">Paling Laris</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2 text-white">{lp?.name}</h3>
                                    <p className="text-gray-300 mb-6">{lp?.desc}</p>
                                    <div className="text-4xl font-extrabold mb-8 text-white">
                                        {lp?.price}<span className="text-xl font-medium text-gray-400">/bulan</span>
                                    </div>
                                    <ul className="flex-grow space-y-3 mb-10 text-gray-300">
                                        {
                                            lp?.features?.map((fitur, index) => (
                                                <li className="flex items-center" key={index}>
                                                    <div className='w-6'>
                                                        <Check className='w-5 h-5 mr-2 text-[var(--primary-color)]' />
                                                    </div>
                                                    {fitur}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <a href="#" className="block text-center mt-auto w-full px-8 py-3 font-bold rounded-lg text-white bg-[var(--secondary-color)] hover:bg-opacity-80 transition duration-300 shadow-xl shadow-[var(--secondary-color)]/50">
                                        Pilih {lp?.name}
                                    </a>
                                </div> :
                                <div key={i} className="flex flex-col p-8 bg-white rounded-2xl shadow-2xl transition duration-300 hover:shadow-[var(--primary-color)]/30 border-t-4 border-[var(--primary-color)]">
                                    <h3 className="text-2xl font-bold mb-2 text-[var(--primary-color)]">{lp?.name}</h3>
                                    <p className="text-gray-500 mb-6">{lp?.desc}</p>
                                    <div className="text-4xl font-extrabold mb-8">
                                        {lp?.price}<span className="text-xl font-medium text-gray-500">/bulan</span>
                                    </div>
                                    <ul className="flex-grow space-y-3 mb-10 text-gray-600">
                                        {
                                            lp?.features?.map((fitur, index) => (
                                                <li className="flex items-center" key={index}>
                                                    <div className='w-6'>
                                                        <Check className='w-5 h-5 mr-2 text-[var(--secondary-color)]' />
                                                    </div>
                                                    {fitur}
                                                </li>
                                            ))
                                        }

                                    </ul>
                                    <a href="#" className="block text-center mt-auto w-full px-8 py-3 font-semibold rounded-lg text-[var(--primary-color)] border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition duration-300">
                                        Pilih {lp?.name}
                                    </a>
                                </div>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}

export default PricingSection