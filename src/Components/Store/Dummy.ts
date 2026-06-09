import { Scissors, Shirt, Sparkles, Utensils } from "lucide-react";

export const storiesData = [
    { id: 1, name: 'Kopi Senja', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', active: true },
    { id: 2, name: 'Batik Kencana', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', active: true },
    { id: 3, name: 'Kue Ayu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', active: false },
    { id: 4, name: 'Rotan Berkah', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100', active: true },
    { id: 5, name: 'Keripik Renyah', avatar: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=100', active: false },
    { id: 6, name: 'Tenun Mandiri', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100', active: true },
];

export const feedPosts = [
    {
        id: 101,
        shopName: 'Kopi Senja',
        shopAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        location: 'Coblong, Bandung',
        category: 'Kuliner',
        time: '2 jam yang lalu',
        caption: 'Espresso blend kami yang baru matang sempurna! Racikan Arabica 70% dan Robusta 30% menciptakan aroma karamel panggang yang bikin pagimu makin produktif. Dapatkan promo beli 1 gratis 1 khusus hari ini melalui UsahaKu! ☕️✨',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
        likes: 142,
        comments: 24,
        product: {
            id: 'p1',
            name: 'Signature Cold Brew 250ml',
            price: 28000,
            originalPrice: 35000,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=150',
            rating: 4.9
        }
    },
    {
        id: 102,
        shopName: 'Batik Kencana',
        shopAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        location: 'Danurejan, Yogyakarta',
        category: 'Fashion',
        time: '5 jam yang lalu',
        caption: 'Koleksi kemeja batik pria slim-fit modern bermotif Sekar Jagad kontemporer. Dibuat dengan katun primissima super adem, tidak luntur, dan jahitan rapi kualitas butik. Cocok untuk ngantor maupun kondangan formal! 🤵',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600',
        likes: 389,
        comments: 41,
        product: {
            id: 'p2',
            name: 'Batik Sekar Jagad Slimfit',
            price: 185000,
            originalPrice: 220000,
            image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=150',
            rating: 4.8
        }
    },
    {
        id: 103,
        shopName: 'Rotan Berkah Cirebon',
        shopAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
        location: 'Weru, Cirebon',
        category: 'Kerajinan',
        time: '1 hari yang lalu',
        caption: 'Bikin ruang tamu makin aesthetic dengan Kursi Anyaman Rotan alami buatan pengrajin lokal kami. Konstruksi kuat dengan rangka bambu tebal pilihan. Ramah lingkungan dan bernilai seni tinggi! 🌿🛋️',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
        likes: 95,
        comments: 12,
        product: {
            id: 'p3',
            name: 'Kursi Rotan Scandinavian',
            price: 420000,
            originalPrice: 490000,
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=150',
            rating: 4.7
        }
    }
];

export const nearbyOutlets = [
    {
        id: 'out1',
        name: 'Kopi Senja - Coblong',
        category: 'Kuliner',
        distance: '200m',
        time: '5 mnt',
        rating: 4.9,
        address: 'Jl. Dipati Ukur No. 42, Bandung',
        isOpen: true,
        promo: 'Beli 1 Gratis 1',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'out2',
        name: 'Batik Kencana Galeri',
        category: 'Fashion',
        distance: '800m',
        time: '12 mnt',
        rating: 4.8,
        address: 'Jl. Dago No. 108, Bandung',
        isOpen: true,
        promo: 'Kupon Rp 20.000',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'out3',
        name: 'Kue Ayu Tradisional',
        category: 'Kuliner',
        distance: '650m',
        time: '9 mnt',
        rating: 4.9,
        address: 'Jl. Ganesha No. 10, Bandung',
        isOpen: true,
        promo: 'Diskon 10%',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'out4',
        name: 'Rotan Berkah Workshop',
        category: 'Kerajinan',
        distance: '2.5km',
        time: '20 mnt',
        rating: 4.7,
        address: 'Jl. Cikutra Barat No. 85, Bandung',
        isOpen: false,
        promo: 'Ongkir Flat Rp 5k',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'out5',
        name: 'Tenun Mandiri Bandung',
        category: 'Fashion',
        distance: '1.2km',
        time: '15 mnt',
        rating: 4.8,
        address: 'Jl. Diponegoro No. 15, Bandung',
        isOpen: true,
        promo: 'Voucher Toko 15%',
        image: 'https://images.unsplash.com/photo-1524295988897-b118163457d4?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'out6',
        name: 'Keripik Renyah Ibu Ira',
        category: 'Kuliner',
        distance: '1.5km',
        time: '17 mnt',
        rating: 4.7,
        address: 'Jl. Sadang Serang No. 34, Bandung',
        isOpen: true,
        promo: 'Cashback Rp 5.000',
        image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=300'
    }
];

export const nearbyProducts = [
    {
        id: 'np1',
        name: 'Signature Cold Brew 250ml',
        shopName: 'Kopi Senja',
        price: 28000,
        originalPrice: 35000,
        rating: 4.9,
        distance: '200m',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=250',
        category: 'Kuliner'
    },
    {
        id: 'np2',
        name: 'Batik Sekar Jagad Slimfit',
        shopName: 'Batik Kencana',
        price: 185000,
        originalPrice: 220000,
        rating: 4.8,
        distance: '800m',
        image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=250',
        category: 'Fashion'
    },
    {
        id: 'np3',
        name: 'Kursi Rotan Scandinavian',
        shopName: 'Rotan Berkah Cirebon',
        price: 420000,
        originalPrice: 490000,
        rating: 4.7,
        distance: '2.5km',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=250',
        category: 'Kerajinan'
    },
    {
        id: 'np4',
        name: 'Nastar Wisman Keju 500gr',
        shopName: 'Kue Ayu Tradisional',
        price: 85000,
        originalPrice: 95000,
        rating: 4.9,
        distance: '650m',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=250',
        category: 'Kuliner'
    },
    {
        id: 'np5',
        name: 'Tenun Etnik Nusantara Premium',
        shopName: 'Tenun Mandiri',
        price: 250000,
        originalPrice: 300000,
        rating: 4.8,
        distance: '1.2km',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
        category: 'Fashion'
    },
    {
        id: 'np6',
        name: 'Keripik Singkong Pedas Jeruk',
        shopName: 'Keripik Renyah Ibu Ira',
        price: 15000,
        originalPrice: 18000,
        rating: 4.7,
        distance: '1.5km',
        image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=250',
        category: 'Kuliner'
    }
];

export const categoryTabs = [
    { label: 'Semua', icon: Sparkles },
    { label: 'Kuliner', icon: Utensils },
    { label: 'Fashion', icon: Shirt },
    { label: 'Kerajinan', icon: Scissors }
];