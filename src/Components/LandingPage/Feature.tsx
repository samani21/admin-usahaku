import { BadgeDollarSign, GitBranch, Globe, LocateFixed, Lock, Rocket, Smartphone, TrendingUp, Users, Zap } from 'lucide-react'
import { JSX } from 'react'
interface fitur {
    title: string;
    desc: string;
    icon: JSX.Element;
}

const Feature = () => {
    const listFitur: fitur[] = [
        {
            title: 'Website katalog dengan logo sendiri',
            desc: 'Usaha bisa memiliki tampilan layaknya e-commerce profesional, lengkap dengan logo dan identitas brand-nya sendiri.',
            icon: <Globe />
        },
        {
            title: 'Kelola pesanan & antrian digital',
            desc: 'Memudahkan pemilik usaha dan karyawan untuk mencatat pesanan, mengatur giliran pelanggan, dan melihat siapa yang melayani setiap transaksi.',
            icon: <Users />
        },
        {
            title: 'Catatan keuangan otomatis',
            desc: 'Semua transaksi masuk dan keluar akan tercatat otomatis, membantu pemilik usaha memantau pendapatan, pengeluaran, dan keuntungan dengan mudah.',
            icon: <TrendingUp />
        },
        {
            title: 'Sistem pembayaran cash & saldo UsahaKu',
            desc: 'Memberikan fleksibilitas bagi pelanggan: bisa membayar langsung (cash) atau lewat saldo UsahaKu yang tersimpan di sistem..',
            icon: <BadgeDollarSign />
        },
        {
            title: 'Affiliate 20% untuk pengguna aktif',
            desc: 'engguna yang mengajak orang lain bergabung akan mendapat komisi 20% dari transaksi mereka — jadi bisa sambil promosi dan menghasilkan.',
            icon: <Rocket />
        },
        {
            title: 'Promosi di Peta UsahaKu',
            desc: 'Fitur peta interaktif yang menampilkan lokasi dan promosi UMKM di seluruh Indonesia, sehingga usaha bisa ditemukan oleh lebih banyak calon pelanggan di sekitar wilayahnya.',
            icon: <LocateFixed />
        },
    ]
    return (
        <section id="features" className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-[var(--secondary-color)] text-3xl font-semibold uppercase tracking-widest">Fitur Unggulan</h2>
                    <p className="text-xl text-center text-gray-500 mb-16 max-w-2xl mx-auto">Semua kebutuhan UMKM dalam satu ekosistem digital.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        listFitur?.map((lf, i) => (
                            <div key={i} className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 ${i % 2 === 0 ? 'hover:border-[var(--primary-color)]/50' : 'hover:border-[var(--secondary-color)]/50'} transform hover:-translate-y-1 group`}>
                                <div className={`p-3 inline-flex rounded-xl ${i % 2 === 0 ? ' bg-[var(--primary-color)]/10 text-[var(--primary-color)]' : ' bg-[var(--secondary-color)]/10 text-[var(--secondary-color)]'} mb-4`}>
                                    {lf?.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{lf?.title}</h3>
                                <p className="text-gray-600">{lf?.desc}</p>
                            </div>

                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Feature