"use client";
import React from 'react'
import { DollarSign, ShoppingBag, Users, Package, PlusCircle, Tag, Printer } from 'lucide-react'
import dynamic from 'next/dynamic'
import StatCard from './StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import InfoRow from './InfoRow';
import { Button } from '@/Components/ui/button';

const LineChartClient = dynamic(
    () => import("./Chart/LineChartClient"),
    { ssr: false }
);
export default function Dashboard() {
    const chartData = [
        { name: 'Mon', income: 4000 },
        { name: 'Tue', income: 3000 },
        { name: 'Wed', income: 5000 },
        { name: 'Thu', income: 4500 },
        { name: 'Fri', income: 6000 },
        { name: 'Sat', income: 7000 },
        { name: 'Sun', income: 6500 },
    ]

    const latestOrders = [
        { id: '#1234', cashier: 'Rani', total: 'Rp 450.000', status: 'Diproses' },
        { id: '#1235', cashier: 'Budi', total: 'Rp 300.000', status: 'Selesai' },
        { id: '#1236', cashier: 'Sinta', total: 'Rp 150.000', status: 'Dikirim' },
    ]

    const featuredProducts = [
        { name: 'Kemeja Pria Premium', sales: 120 },
        { name: 'Sneakers Putih', sales: 98 },
        { name: 'Tas Selempang Kulit', sales: 85 },
    ]

    const getStatusColor = (status: any) => {
        switch (status) {
            case 'Selesai':
                return 'text-green-600 bg-green-100';
            case 'Diproses':
                return 'text-yellow-600 bg-yellow-100';
            case 'Dikirim':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }

    return (
        <div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <StatCard icon={<DollarSign className="text-green-600" />} title="Pendapatan Hari Ini" value="Rp 5.200.000" />
                <StatCard icon={<ShoppingBag className="text-blue-600" />} title="Pesanan Baru" value="42" />
                <StatCard icon={<Users className="text-purple-600" />} title="Stok Hampir Habis" value="27" />
                <StatCard icon={<Package className="text-orange-600" />} title="Produk Tersedia" value="312" />
            </div>

            {/* Middle Section */}
            <div className=" md:grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Chart */}
                <Card className="col-span-2 shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle>Grafik Pendapatan Mingguan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChartClient chartData={chartData} />
                    </CardContent>
                </Card>

                {/* Quick Info */}
                <Card className="mt-6 md:mt-0 shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle>Info Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <InfoRow label="Total Transaksi Bulan Ini" value="Rp 85.400.000" />
                        <InfoRow label="Total Produk Terjual" value="2.312" />
                        <InfoRow label="Rata-rata Pesanan" value="Rp 362.000" />
                        <InfoRow label="Stok Baru Masuk" value="154" />
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="md:grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Latest Orders */}
                <Card className="col-span-2 shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle>Pesanan Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-sm text-gray-700">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500">
                                    <th className="py-2 text-left">ID Pesanan</th>
                                    <th className="py-2 text-left">Kasir</th>
                                    <th className="py-2 text-left">Total</th>
                                    <th className="py-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestOrders.map((order, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-2">{order.id}</td>
                                        <td className="py-2">{order.cashier}</td>
                                        <td className="py-2">{order.total}</td>
                                        <td className="py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Featured Products */}
                <Card className="mt-6 md:mt-0 shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardTitle>Produk Unggulan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {featuredProducts.map((p, idx) => (
                                <li key={idx} className="flex justify-between items-center p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100 transition">
                                    <span className="text-gray-800 font-medium">{p.name}</span>
                                    <span className="font-semibold text-gray-700">{p.sales} terjual</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions Combined */}
            <div className="mt-6">
                <Card className="shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4 justify-center">
                        <Button variant="outline" className="flex items-center"><PlusCircle className="mr-2" />Tambah Produk</Button>
                        <Button variant="outline" className="flex items-center"><Tag className="mr-2" />Buat Promo</Button>
                        <Button variant="outline" className="flex items-center"><Printer className="mr-2" />Cetak Laporan</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

