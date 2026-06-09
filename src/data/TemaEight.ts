const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaEight = {
    header: {
        color: "#16A34A ",
        color_frame: "light",
        layout_header: 11,
        logo: `${baseUrl}/image/tema_delapan/logo.png`,
        mode: "light",
        span_one: "Warung",
        span_two: " Berkah",
        type_frame: "circle",
    },
    summary: {
        business_id: 13,
        color: "#16A34A",
        id: 1,
        layout_summary: 10,
        mode: "auto",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#16A34A ",
        cta: "Lihat Katalog",
        headline: "Kebutuhan Dapur Lengkap",
        image: baseUrl + '/image/tema_delapan/hero.png',
        layout_hero: 11,
        mode: "light",
        sub_headline: "Produk dapur pilihan dengan harga grosir setiap hari.",
        title: "",
    },
    category: {
        business_id: 13,
        color: "#16A34A",
        id: 1,
        layout_categories: 5,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Beras & Gandum",
            "icon": `${baseUrl}/image/tema_delapan/c_1.webp`,
            "color": "#16A34A",
            "count": 12,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Minyak & Lemak",
            "icon": `${baseUrl}/image/tema_delapan/c_2.jpg`,
            "color": "#16A34A",
            "count": 8,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Gula & Garam",
            "icon": `${baseUrl}/image/tema_delapan/c_3.webp`,
            "color": "#16A34A",
            "count": 15,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Telur & Susu",
            "icon": `${baseUrl}/image/tema_delapan/c_4.webp`,
            "color": "#16A34A",
            "count": 20,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Mie & Makanan Instan",
            "icon": `${baseUrl}/image/tema_delapan/c_5.jpg`,
            "color": "#16A34A",
            "count": 45,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Bumbu Dapur",
            "icon": `${baseUrl}/image/tema_delapan/c_6.webp`,
            "color": "#16A34A",
            "count": 32,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#16A34A",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 1,
        mode: "light",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Beras & Gandum ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Beras & Gandum",
            "name": "Beras Pandan Wangi 5kg",
            "price": 75000,
            "discount_price": 3000,
            "percent_discount": 4,
            "final_price": 72000,
            'image': `${baseUrl}/image/tema_delapan/p_1.jpg`,
            "description": "<ul><li>Beras kualitas super, pulen dan wangi alami.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Minyak & Lemak ---
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Minyak & Lemak",
            "name": "Minyak Goreng Sawit 2L",
            "price": 36000,
            "discount_price": 34500,
            "percent_discount": 4,
            "final_price": 34500,
            'image': `${baseUrl}/image/tema_delapan/p_2.webp`,
            "description": "<ul><li>Minyak goreng jernih, tahan panas.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 21, "name": "Pouch 2L", "price": 36000, "discount_price": 34500, "percent_discount": 4, "final_price": 34500 },
                { "id": 22, "name": "Botol 2L", "price": 38000, "discount_price": null, "percent_discount": null, "final_price": 38000 }
            ]
        },

        // --- KATEGORI 3: Gula & Garam ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Gula & Garam",
            "name": "Gula Pasir Putih 1kg",
            "price": 17500,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 17500,
            'image': `${baseUrl}/image/tema_delapan/p_3.jpg`,
            "description": "<ul><li>Gula tebu asli bersertifikat SNI.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Telur & Susu ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Telur & Susu",
            "name": "Telur Ayam Negeri (1kg)",
            "price": 28000,
            "discount_price": 26500,
            "percent_discount": 5,
            "final_price": 26500,
            'image': `${baseUrl}/image/tema_delapan/p_4.jpg`,
            "description": "<ul><li>Telur segar langsung dari peternak.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Telur & Susu",
            "name": "Susu Kental Manis Putih",
            "price": 12500,
            "discount_price": 11000,
            "percent_discount": 12,
            "final_price": 11000,
            'image': `${baseUrl}/image/tema_delapan/p_5.webp`,
            "description": "<ul><li>Susu kental manis kemasan pouch 545g.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Mie & Makanan Instan ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Mie & Makanan Instan",
            "name": "Mie Instan Goreng Spesial",
            "price": 3100,
            "discount_price": 2900,
            "percent_discount": 6,
            "final_price": 2900,
            'image': `${baseUrl}/image/tema_delapan/p_6.jpg`,
            "description": "<ul><li>Mie goreng favorit nomor 1.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 61, "name": "Satuan", "price": 3100, "discount_price": 2900, "percent_discount": 6, "final_price": 2900 },
                { "id": 62, "name": "Karton (40 pcs)", "price": 124000, "discount_price": 115000, "percent_discount": 7, "final_price": 115000 }
            ]
        },
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Mie & Makanan Instan",
            "name": "Sarden Saus Tomat 155g",
            "price": 10500,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 10500,
            'image': `${baseUrl}/image/tema_delapan/p_7.webp`,
            "description": "<ul><li>Ikan sarden segar dalam saus tomat lezat.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Bumbu Dapur ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Bumbu Dapur",
            "name": "Garam Beriodium 250g",
            "price": 3000,
            "discount_price": 2500,
            "percent_discount": 17,
            "final_price": 2500,
            'image': `${baseUrl}/image/tema_delapan/p_8.webp`,
            "description": "<ul><li>Garam meja halus beriodium tinggi.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Bumbu Dapur",
            "name": "Kecap Manis Botol 550ml",
            "price": 22000,
            "discount_price": 19800,
            "percent_discount": 10,
            "final_price": 19800,
            'image': `${baseUrl}/image/tema_delapan/p_9.webp`,
            "description": "<ul><li>Kecap kedelai hitam pilihan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Mie & Makanan Instan",
            "name": "Mie Kuah Rasa Ayam Bawang",
            "price": 3000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 3000,
            'image': `${baseUrl}/image/tema_delapan/p_10.jpg`,
            "description": "<ul><li>Mie kuah dengan kaldu ayam yang gurih.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
