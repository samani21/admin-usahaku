import { Award, Compass, Gift, Home, Map, Settings, ShoppingBag, User, Video } from "lucide-react";

export const Menus = [
    { id: 'Beranda', label: 'Beranda', icon: Home, herf: '/' },
    { id: 'Postingan', label: 'Postingan', icon: Compass, herf: '/' },
    { id: 'Maps', label: 'Peta', icon: Map, herf: '/maps' },
    { id: 'Reels', label: 'Reels', icon: Video, herf: '/' },
    { id: 'Profile', label: 'Profil', icon: User, herf: '/customer/profile' }
]

export const menuItems = [
    { id: 'affiliasi', label: 'Affiliasi', icon: Award },
    { id: 'history', label: 'Riwayat', icon: ShoppingBag },
    { id: 'profil', label: 'Benefit', icon: Gift },
    { id: 'pengaturan', label: 'Sistem', icon: Settings }
];