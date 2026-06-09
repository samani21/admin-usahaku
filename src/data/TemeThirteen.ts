const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemeThirteen = {
    header: {
        color: "#EF4444",
        color_frame: "dark",
        layout_header: 5,
        logo: `${baseUrl}/image/tema_tiga_belas/logo.png`,
        mode: "auto",
        span_one: "Dunia ",
        span_two: "Anak",
        type_frame: "circle",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#EF4444",
        cta: "Lihat Koleksi",
        headline: "Wujudkan Imajinasi Si Kecil",
        image: baseUrl + '/image/tema_tiga_belas/hero.png',
        layout_hero: 5,
        mode: "auto",
        sub_headline: "Temukan koleksi mainan edukatif dan seru yang aman untuk menemani keceriaan buah hati Anda.",
        title: "",
    },
    summary: {
        business_id: 13,
        color: "#EF4444",
        id: 1,
        layout_summary: 5,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#EF4444",
        id: 1,
        layout_categories: 2,
        mode: "auto",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Action Figures",
            "icon": "mdi:robot",
            "color": "#EF4444",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Boneka & Plushies",
            "icon": "mdi:teddy-bear",
            "color": "#3B82F6",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Edukasi & Puzzle",
            "icon": "mdi:puzzle-outline",
            "color": "#EF4444",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Mobil & Remote",
            "icon": "mdi:car-sports",
            "color": "#3B82F6",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Lego & Balok",
            "icon": "mdi:toy-brick-outline",
            "color": "#EF4444",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Mainan Outdoor",
            "icon": "mdi:bicycle",
            "color": "#3B82F6",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#EF4444",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 15,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Action Figures ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Action Figures",
            "name": "Super Hero Series - Iron Man",
            "price": 450000,
            "discount_price": 399000,
            "percent_discount": 11,
            "final_price": 399000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_1.jpg`,
            "description": "<ul><li>Detail artikulasi tinggi, tinggi 15cm, termasuk aksesori tangan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Boneka & Plushies ---
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Boneka & Plushies",
            "name": "Giant Teddy Bear 100cm",
            "price": 250000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 250000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_2.jpg`,
            "description": "<ul><li>Bahan bulu halus kualitas import, tidak mudah rontok.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 201, "name": "Cokelat Tua", "price": 250000, "discount_price": null, "percent_discount": null, "final_price": 250000 },
                { "id": 202, "name": "Cream White", "price": 250000, "discount_price": null, "percent_discount": null, "final_price": 250000 }
            ]
        },

        // --- KATEGORI 3: Edukasi & Puzzle ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Edukasi & Puzzle",
            "name": "Solar System 3D Puzzle",
            "price": 125000,
            "discount_price": 95000,
            "percent_discount": 24,
            "final_price": 95000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_3.webp`,
            "description": "<ul><li>Puzzle 500 keping bertema tata surya dengan efek glow in the dark.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Mobil & Remote ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Mobil & Remote",
            "name": "RC Drift Monster 1:16",
            "price": 550000,
            "discount_price": 495000,
            "percent_discount": 10,
            "final_price": 495000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_4.avif`,
            "description": "<ul><li>Kecepatan hingga 20km/jam, baterai dapat diisi ulang.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Lego & Balok ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Lego & Balok",
            "name": "Castle Medieval Building Set",
            "price": 850000,
            "discount_price": 750000,
            "percent_discount": 12,
            "final_price": 750000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_5.jpg`,
            "description": "<ul><li>1200+ keping balok, termasuk 5 karakter prajurit.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Lego & Balok",
            "name": "Baseplate Creative Green",
            "price": 45000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 45000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_6.jpg`,
            "description": "<ul><li>Papan dasar ukuran 32x32 titik untuk fondasi rakitan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Mainan Outdoor ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Mainan Outdoor",
            "name": "Scooter LED 3 Wheels",
            "price": 320000,
            "discount_price": 285000,
            "percent_discount": 11,
            "final_price": 285000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_7.webp`,
            "description": "<ul><li>Roda menyala saat berputar, ketinggian stang bisa diatur.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Action Figures",
            "name": "Anime Statuete - Tanjiro",
            "price": 185000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 185000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_8.webp`,
            "description": "<ul><li>Kualitas detail PVC premium, tinggi 12cm.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Mobil & Remote",
            "name": "Diecast Sport Car 1:24",
            "price": 150000,
            "discount_price": 120000,
            "percent_discount": 20,
            "final_price": 120000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_9.jpg`,
            "description": "<ul><li>Bahan besi (metal), pintu dan kap mesin bisa dibuka.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Edukasi & Puzzle",
            "name": "Magnetic Drawing Board",
            "price": 65000,
            "discount_price": 55000,
            "percent_discount": 15,
            "final_price": 55000,
            "image": `${baseUrl}/image/tema_tiga_belas/p_10.jpg`,
            "description": "<ul><li>Papan tulis magnet warna-warni, aman untuk anak balita.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
