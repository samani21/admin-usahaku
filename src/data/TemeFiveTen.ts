const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemeFiveTen = {
    header: {
        color: "#15803D",
        color_frame: "light",
        layout_header: 8,
        logo: `${baseUrl}/image/tema_lima_belas/logo.png`,
        mode: "light",
        span_one: "Kebun ",
        span_two: "Cantik",
        type_frame: "square",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#15803D",
        cta: "Pesan Buket",
        headline: "Ungkapkan Perasaan dengan Bunga",
        image: baseUrl + '/image/tema_lima_belas/hero.png',
        layout_hero: 9,
        mode: "light",
        sub_headline: "Rangkaian bunga segar pilihan untuk momen spesial seperti pernikahan, ulang tahun, dan ucapan selamat.",
        title: "Kebun Cantik",
    },
    summary: {
        business_id: 13,
        color: "#15803D",
        id: 1,
        layout_summary: 14,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#15803D",
        id: 1,
        layout_categories: 12,
        mode: "auto",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Buket Mawar",
            "icon": "mdi:flower-tulip-outline",
            "color": "#15803D",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Bunga Meja & Vas",
            "icon": "game-icons:flower-pot",
            "color": "#15803D",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Papan Bunga Ucapan",
            "icon": "mdi:fleur-de-lis",
            "color": "#15803D",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Tanaman Hias Indoor",
            "icon": "mdi:flower-poppy",
            "color": "#15803D",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Hampers & Kado",
            "icon": "mdi:gift-outline",
            "color": "#15803D",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Dekorasi Wedding",
            "icon": "mdi:sparkles-outline",
            "color": "#15803D",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#15803D",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 12,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Buket Mawar ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Buket Mawar",
            "name": "Classic Red Rose Bouquet",
            "price": 350000,
            "discount_price": 299000,
            "percent_discount": 15,
            "final_price": 299000,
            "image": `${baseUrl}/image/tema_lima_belas/p_1.jpg`,
            "description": "<ul><li>12 tangkai mawar merah segar dengan pembungkus premium.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Buket Mawar",
            "name": "White Lily & Rose Mix",
            "price": 450000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 450000,
            "image": `${baseUrl}/image/tema_lima_belas/p_2.jpg`,
            "description": "<ul><li>Kombinasi mawar putih dan bunga lily yang harum menawan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Bunga Meja & Vas ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Bunga Meja & Vas",
            "name": "Orchid Table Arrangement",
            "price": 550000,
            "discount_price": 495000,
            "percent_discount": 10,
            "final_price": 495000,
            "image": `${baseUrl}/image/tema_lima_belas/p_3.jpg`,
            "description": "<ul><li>Anggrek bulan dalam pot keramik eksklusif untuk dekorasi ruangan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Papan Bunga Ucapan ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Papan Bunga Ucapan",
            "name": "Papan Bunga Congratulation",
            "price": 600000,
            "discount_price": 550000,
            "percent_discount": 8,
            "final_price": 550000,
            "image": `${baseUrl}/image/tema_lima_belas/p_4.jpg`,
            "description": "<ul><li>Ukuran 2x1.25m, bunga segar di sudut atas dan bawah.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Tanaman Hias Indoor ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Tanaman Hias Indoor",
            "name": "Monstera Adansonii Pot",
            "price": 85000,
            "discount_price": 75000,
            "percent_discount": 12,
            "final_price": 75000,
            "image": `${baseUrl}/image/tema_lima_belas/p_5.webp`,
            "description": "<ul><li>Tanaman sehat, sudah termasuk pot minimalis dan media tanam.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Hampers & Kado ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Hampers & Kado",
            "name": "Flower & Chocolate Box",
            "price": 275000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 275000,
            "image": `${baseUrl}/image/tema_lima_belas/p_6.webp`,
            "description": "<ul><li>Kotak estetik berisi bunga mawar dan cokelat Ferrero Rocher.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Dekorasi Wedding ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Dekorasi Wedding",
            "name": "Minimalist Akad Decoration",
            "price": 2500000,
            "discount_price": 2200000,
            "percent_discount": 12,
            "final_price": 2200000,
            "image": `${baseUrl}/image/tema_lima_belas/p_7.webp`,
            "description": "<ul><li>Backdrop bunga, meja akad, dan kursi tiffany.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Bunga Meja & Vas",
            "name": "Dried Flower in Vase",
            "price": 125000,
            "discount_price": 110000,
            "percent_discount": 12,
            "final_price": 110000,
            "image": `${baseUrl}/image/tema_lima_belas/p_8.webp`,
            "description": "<ul><li>Bunga kering estetik, tahan lama hingga hitungan tahun.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Tanaman Hias Indoor",
            "name": "Snake Plant (Lidah Mertua)",
            "price": 65000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 65000,
            "image": `${baseUrl}/image/tema_lima_belas/p_9.jpg`,
            "description": "<ul><li>Tanaman pembersih udara, sangat mudah dirawat.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Hampers & Kado",
            "name": "Custom Baby Born Hampers",
            "price": 350000,
            "discount_price": 315000,
            "percent_discount": 10,
            "final_price": 315000,
            "image": `${baseUrl}/image/tema_lima_belas/p_10.jpg`,
            "description": "<ul><li>Baju bayi premium, bunga mungil, dan kartu ucapan custom.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
