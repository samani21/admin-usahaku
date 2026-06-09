import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 overflow-hidden">
            <div className="flex flex-col items-center space-y-6 px-4 text-center z-10">

                {/* Ikon dengan Animasi Mengambang (Bounce) */}
                <div className="relative">
                    <Compass
                        size={120}
                        strokeWidth={1.5}
                        className="text-[#10B981] animate-bounce"
                    />
                    {/* Bayangan Ikon untuk memberi efek 3D */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-200 rounded-[100%] blur-sm animate-pulse"></div>
                </div>

                {/* Teks 404 & Pesan */}
                <div className="space-y-2">
                    <h1 className="text-7xl font-extrabold text-[#10B981] tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Ups! Tersesat ya?
                    </h2>
                    <p className="max-w-md text-gray-500 mx-auto">
                        Halaman yang Anda cari sepertinya tidak ada, telah dihapus, atau namanya diubah. Mari kita kembali ke jalan yang benar.
                    </p>
                </div>

                {/* Tombol Kembali dengan Animasi Hover */}
                <Link
                    href="/"
                    className="group flex items-center gap-2 mt-8 px-8 py-3 bg-[#10B981] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#0e9f6e] hover:scale-105 hover:shadow-lg hover:shadow-[#10B981]/40"
                >
                    Kembali ke Beranda
                    <ArrowRight
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>

            </div>

            {/* Elemen Latar Belakang Dekoratif (Opsional) */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#10B981] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#10B981] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
    );
}