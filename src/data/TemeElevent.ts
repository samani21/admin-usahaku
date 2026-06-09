const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaElevent = {
    header: {
        color: "#ffffff ",
        color_frame: "dark",
        layout_header: 7,
        logo: `${baseUrl}/image/tema_sebelas/logo.png`,
        mode: "dark",
        span_one: "Studio ",
        span_two: "Foto",
        type_frame: "circle",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#6366F1 ",
        cta: "Booking Jadwal",
        headline: "Abadikan Momen Berharga Anda",
        image: baseUrl + '/image/tema_sebelas/hero.png',
        layout_hero: 13,
        mode: "light",
        sub_headline: "Fotografi profesional untuk wisuda, pernikahan, dan portofolio dengan kualitas studio terbaik..",
        title: "",
    },
    summary: {
        business_id: 13,
        color: "#6366F1",
        id: 1,
        layout_summary: 13,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#6366F1",
        id: 1,
        layout_categories: 12,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Sesi Foto Wedding",
            "icon": "hugeicons:wedding",
            "color": "#6366F1",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Foto Wisuda",
            "icon": "mdi:school-outline",
            "color": "#6366F1",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Produk & Katalog",
            "icon": "mdi:lightbulb-outline",
            "color": "#6366F1",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Personal Portrait",
            "icon": "mdi:account-star-outline",
            "color": "#6366F1",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Foto Keluarga",
            "icon": "mdi:account-group-outline",
            "color": "#6366F1",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Video Cinematic",
            "icon": "icon-park-twotone:video-two",
            "color": "#6366F1",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#6366F1",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 13,
        mode: "dark",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Sesi Foto Wedding ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Sesi Foto Wedding",
            "name": "Wedding Cinematic Gold",
            "price": 5500000,
            "discount_price": 4950000,
            "percent_discount": 10,
            "final_price": 4950000,
            "image": `${baseUrl}/image/tema_sebelas/p_1.avif`,
            "description": "<ul><li>Full day coverage, 2 Photographers, 100 Edited photos, Wedding Album Premium.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Sesi Foto Wedding",
            "name": "Pre-Wedding Outdoor",
            "price": 2500000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 2500000,
            "image": `${baseUrl}/image/tema_sebelas/p_2.jpeg`,
            "description": "<ul><li>4 jam sesi foto, 2 lokasi, 20 edited photos.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Foto Wisuda ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Foto Wisuda",
            "name": "Graduation Group Package",
            "price": 750000,
            "discount_price": 600000,
            "percent_discount": 20,
            "final_price": 600000,
            "image": `${baseUrl}/image/tema_sebelas/p_3.jpg`,
            "description": "<ul><li>Sesi foto grup maksimal 10 orang, inklusif cetak 12R.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Produk & Katalog ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Produk & Katalog",
            "name": "Katalog Fashion (10 Produk)",
            "price": 1200000,
            "discount_price": 1000000,
            "percent_discount": 17,
            "final_price": 1000000,
            "image": `${baseUrl}/image/tema_sebelas/p_4.jpg`,
            "description": "<ul><li>Foto produk dengan model (indoor/outdoor), high-end retouching.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Personal Portrait ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Personal Portrait",
            "name": "Headshot Professional",
            "price": 350000,
            "discount_price": 250000,
            "percent_discount": 28,
            "final_price": 250000,
            "image": `${baseUrl}/image/tema_sebelas/p_5.jpg`,
            "description": "<ul><li>Cocok untuk profil LinkedIn atau CV. Inklusif 3 edited photos.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Foto Keluarga ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Foto Keluarga",
            "name": "Family Portrait Studio",
            "price": 850000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 850000,
            "image": `${baseUrl}/image/tema_sebelas/p_6.jpg`,
            "description": "<ul><li>Sesi studio 1 jam, inklusif cetak kanvas 40x60.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 601, "name": "Standard (Max 5 Orang)", "price": 850000, "discount_price": null, "percent_discount": null, "final_price": 850000 },
                { "id": 602, "name": "Extended (Max 15 Orang)", "price": 1500000, "discount_price": 1350000, "percent_discount": 10, "final_price": 1350000 }
            ]
        },

        // --- KATEGORI 6: Video Cinematic ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Video Cinematic",
            "name": "Company Profile Video",
            "price": 4500000,
            "discount_price": 3825000,
            "percent_discount": 15,
            "final_price": 3825000,
            "image": `${baseUrl}/image/tema_sebelas/p_7.png`,
            "description": "<ul><li>Durasi 2-3 menit, 4K resolution, inklusif voice over.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Video Cinematic",
            "name": "Social Media Reels Ads",
            "price": 1500000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 1500000,
            "image": `${baseUrl}/image/tema_sebelas/p_8.png`,
            "description": "<ul><li>3 Video durasi 30-60 detik untuk Instagram/TikTok.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Produk & Katalog",
            "name": "Food Photography (5 Menu)",
            "price": 950000,
            "discount_price": 800000,
            "percent_discount": 16,
            "final_price": 800000,
            "image": `${baseUrl}/image/tema_sebelas/p_9.webp`,
            "description": "<ul><li>Inklusif properti foto & food styling sederhana.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Personal Portrait",
            "name": "Maternity Session",
            "price": 1200000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 1200000,
            "image": `${baseUrl}/image/tema_sebelas/p_10.jpg`,
            "description": "<ul><li>Indoor session, inklusif pinjam 2 gaun pilihan.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
