"use client"
import React, { useEffect, useState } from 'react';
import { BerandaView } from './views/BerandaView';
import { nearbyOutlets, nearbyProducts } from './Dummy';
import { TopbarItem } from './layouts/Topbar';
import Bottombar from './layouts/Bottombar';
import MapsView from './views/MapsView';
import { Get } from '@/utils/Get';
import ProfileView from './views/ProfileView';
const PRIMARY_COLOR = "#10B981"; // Emerald-500

type Props = {
    page: string;
}

export default function StorePageComponent({ page }: Props) {
    const [activeNav, setActiveNav] = useState(page);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [retryEffect, setRetreyEffect] = useState<boolean>(false);
    const getInitToken = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('/customer/init')
            if (res?.success) {
                localStorage.setItem("device_id", res?.data.device_id)
                localStorage.setItem("customer_token", res?.data.token)
                setRetreyEffect(true);
            }
        } catch (e: any) {
            // console.error(e)
        }
    }

    useEffect(() => {
        const device_id = localStorage.getItem('device_id');
        const token = localStorage.getItem('customer_token');
        if (!device_id || !token) {
            getInitToken();
        }
    }, [retryEffect]);

    // Render halaman dinamis berdasarkan menu aktif
    const renderView = () => {
        switch (activeNav) {
            case 'Beranda':
                return <BerandaView outlets={nearbyOutlets} />;
            // case 'Postingan':
            //     return <PostinganView onAddToCart={handleAddToCart} />;
            case 'Maps':
                return <MapsView PRIMARY_COLOR={PRIMARY_COLOR} />;
            case 'Profile':
                return <ProfileView />;
            // case 'Reels':
            //     return <ReelsView onAddToCart={handleAddToCart} />;
            // case 'Profile':
            //     return <ProfileView />;
            default:
                return <BerandaView outlets={nearbyOutlets} />;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-800 font-sans flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
            <TopbarItem
                PRIMARY_COLOR={PRIMARY_COLOR}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
                setActiveCategory={setActiveCategory} />
            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-24 pb-28 md:pb-12">
                {renderView()}
            </main>

            {/* Layout Bawah untuk Mobile */}
            <Bottombar activeNav={activeNav} setActiveNav={setActiveNav} setActiveCategory={setActiveCategory} />
        </div>
    );
}