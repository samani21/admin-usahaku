const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemeSixTen = {
    header: {
        color: "#8B5CF6",
        color_frame: "light",
        layout_header: 11,
        logo: `${baseUrl}/image/tema_enam_belas/logo.png`,
        mode: "light",
        span_one: "Paw ",
        span_two: "Happy",
        type_frame: "square",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#F97316",
        cta: "Belanja Sekarang",
        headline: "Sahabat Setia, Nutrisi Terbaik",
        image: baseUrl + '/image/tema_enam_belas/hero.png',
        layout_hero: 11,
        mode: "light",
        sub_headline: "Temukan berbagai perlengkapan, makanan bernutrisi, dan mainan seru untuk anabul kesayangan Anda.",
        title: "Kebun Cantik",
    },
    summary: {
        business_id: 13,
        color: "#F97316",
        id: 1,
        layout_summary: 11,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#8B5CF6",
        id: 1,
        layout_categories: 8,
        mode: "auto",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Makanan Kucing",
            "icon": "mdi:cat",
            "color": "#8B5CF6",
            "count": 45,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Makanan Anjing",
            "icon": "mdi:dog",
            "color": "#F97316",
            "count": 38,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Kesehatan & Vitamin",
            "icon": "mdi:medical-bag",
            "color": "#8B5CF6",
            "count": 22,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Mainan & Aksesoris",
            "icon": "mdi:toy-brick-outline",
            "color": "#F97316",
            "count": 56,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Grooming & Spa",
            "icon": "mdi:content-cut",
            "color": "#8B5CF6",
            "count": 12,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Kandang & Kasur",
            "icon": "streamline-sharp:pet-friendly-hotel",
            "color": "#F97316",
            "count": 18,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#8B5CF6",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 9,
        mode: "light",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Makanan Kucing ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Makanan Kucing",
            "name": "Premium Salmon Dry Food 2kg",
            "price": 185000,
            "discount_price": 165000,
            "percent_discount": 11,
            "final_price": 165000,
            "image": `${baseUrl}/image/tema_enam_belas/p_1.webp`,
            "description": "<ul><li>Kaya akan Omega 3 & 6 untuk kesehatan bulu dan kulit kucing.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Makanan Kucing",
            "name": "Creamy Cat Treats (Isi 4)",
            "price": 25000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 25000,
            "image": `${baseUrl}/image/tema_enam_belas/p_2.jpg`,
            "description": "<ul><li>Camilan cair lezat dengan varian rasa Tuna dan Ayam.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Makanan Anjing ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Makanan Anjing",
            "name": "High Protein Beef Adult Dog",
            "price": 320000,
            "discount_price": 288000,
            "percent_discount": 10,
            "final_price": 288000,
            "image": `${baseUrl}/image/tema_enam_belas/p_3.png`,
            "description": "<ul><li>Diformulasikan khusus untuk anjing dewasa aktif, bebas biji-bijian.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Kesehatan & Vitamin ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Kesehatan & Vitamin",
            "name": "Multivitamin & Immune Booster",
            "price": 120000,
            "discount_price": 99000,
            "percent_discount": 18,
            "final_price": 99000,
            "image": `${baseUrl}/image/tema_enam_belas/p_4.jpeg`,
            "description": "<ul><li>Meningkatkan nafsu makan dan daya tahan tubuh peliharaan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Mainan & Aksesoris ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Mainan & Aksesoris",
            "name": "Interactive Laser Toy",
            "price": 45000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 45000,
            "image": `${baseUrl}/image/tema_enam_belas/p_5.webp`,
            "description": "<ul><li>Mainan laser untuk melatih ketangkasan dan insting berburu.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Mainan & Aksesoris",
            "name": "Leather Dog Collar Custom",
            "price": 85000,
            "discount_price": 75000,
            "percent_discount": 12,
            "final_price": 75000,
            "image": `${baseUrl}/image/tema_enam_belas/p_6.webp`,
            "description": "<ul><li>Kalung kulit asli tahan lama, tersedia berbagai ukuran.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 61, "name": "Size S", "price": 75000, "discount_price": null, "percent_discount": null, "final_price": 75000 },
                { "id": 62, "name": "Size M", "price": 95000, "discount_price": null, "percent_discount": null, "final_price": 95000 }
            ]
        },

        // --- KATEGORI 5: Grooming & Spa ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Grooming & Spa",
            "name": "Full Grooming Package",
            "price": 150000,
            "discount_price": 135000,
            "percent_discount": 10,
            "final_price": 135000,
            "image": `${baseUrl}/image/tema_enam_belas/p_7.webp`,
            "description": "<ul><li>Mandi, potong kuku, pembersihan telinga, dan potong bulu.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Kandang & Kasur ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Kandang & Kasur",
            "name": "Orthopedic Pet Bed L Size",
            "price": 275000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 275000,
            "image": `${baseUrl}/image/tema_enam_belas/p_8.jpg`,
            "description": "<ul><li>Kasur empuk dengan busa memori, kain dapat dicuci.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Makanan Kucing",
            "name": "Wet Food Grain-Free Tuna",
            "price": 18000,
            "discount_price": 15000,
            "percent_discount": 17,
            "final_price": 15000,
            "image": `${baseUrl}/image/tema_enam_belas/p_9.webp`,
            "description": "<ul><li>Makanan basah kaleng tanpa pengawet buatan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Mainan & Aksesoris",
            "name": "Automatic Pet Feeder",
            "price": 850000,
            "discount_price": 765000,
            "percent_discount": 10,
            "final_price": 765000,
            "image": `${baseUrl}/image/tema_enam_belas/p_10.jpeg`,
            "description": "<ul><li>Pemberi makan otomatis dengan jadwal dan porsi yang dapat diatur via Apps.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
