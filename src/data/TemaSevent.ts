const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaSevent = {
    header: {
        color: "#1E293B",
        color_frame: "light",
        layout_header: 9,
        logo: `${baseUrl}/image/tema_sevent/logo.png`,
        mode: "light",
        span_one: "Jahit Rapi",
        span_two: "",
        type_frame: "circle",
    },
    summary: {
        business_id: 13,
        color: "#A8A29E",
        id: 1,
        layout_summary: 9,
        mode: "auto",
    },

    category: {
        business_id: 13,
        color: "#7C3AED",
        id: 1,
        layout_categories: 7,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Jahit Pakaian Baru",
            "icon": "mdi:tshirt-crew-outline",
            "color": "#7C3AED",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Permak & Resize",
            "icon": "mdi:content-cut",
            "color": "#7C3AED",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Kebaya & Gaun",
            "icon": "mdi:star-face",
            "color": "#7C3AED",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Seragam Kantor",
            "icon": "mdi:tie",
            "color": "#7C3AED",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Custom Bordir",
            "icon": "mdi:fountain-pen-tip",
            "color": "#7C3AED",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Gorden & Home Decor",
            "icon": "mdi:curtains",
            "color": "#7C3AED",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#7C3AED",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 12,
        mode: "light",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Jahit Pakaian Baru ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Jahit Pakaian Baru",
            "name": "Jahit Kemeja Pria Custom",
            "price": 150000,
            "discount_price": 135000,
            "percent_discount": 10,
            "final_price": 135000,
            "image": `${baseUrl}/image/tema_sevent/p_1.avif`,
            "description": "<ul><li>Jasa jahit kemeja sesuai ukuran badan (Bahan dari konsumen).</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Jahit Pakaian Baru",
            "name": "Jahit Celana Chino/Formal",
            "price": 125000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 125000,
            "image": `${baseUrl}/image/tema_sevent/p_2.jpg`,
            "description": "<ul><li>Jahit celana panjang dengan fiting presisi.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Permak & Resize ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Permak & Resize",
            "name": "Potong & Sambung Jeans",
            "price": 35000,
            "discount_price": 30000,
            "percent_discount": 14,
            "final_price": 30000,
            "image": `${baseUrl}/image/tema_sevent/p_3.jpg`,
            "description": "<ul><li>Potong panjang celana jeans dengan jahitan original.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Permak & Resize",
            "name": "Resize Jas (M ke S)",
            "price": 250000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 250000,
            "image": `${baseUrl}/image/tema_sevent/p_4.jpeg`,
            "description": "<ul><li>Pengecilan ukuran jas tanpa merusak pola asli.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Kebaya & Gaun ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Kebaya & Gaun",
            "name": "Jahit Kebaya Kutubaru",
            "price": 450000,
            "discount_price": 399000,
            "percent_discount": 11,
            "final_price": 399000,
            "image": `${baseUrl}/image/tema_sevent/p_5.jpg`,
            "description": "<ul><li>Jasa jahit kebaya klasik inklusif furing.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Seragam Kantor ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Seragam Kantor",
            "name": "Paket Seragam (Min 12 Pcs)",
            "price": 110000,
            "discount_price": 95000,
            "percent_discount": 14,
            "final_price": 95000,
            "image": `${baseUrl}/image/tema_sevent/p_6.jpg`,
            "description": "<ul><li>Harga per pcs untuk pemesanan partai besar.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Custom Bordir ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Custom Bordir",
            "name": "Bordir Nama & Logo Nama",
            "price": 15000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 15000,
            "image": `${baseUrl}/image/tema_sevent/p_7.jpg`,
            "description": "<ul><li>Bordir komputer presisi tinggi.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 701, "name": "Bordir Nama", "price": 15000, "discount_price": null, "percent_discount": null, "final_price": 15000 },
                { "id": 702, "name": "Bordir Logo Rumit", "price": 45000, "discount_price": 35000, "percent_discount": 22, "final_price": 35000 }
            ]
        },

        // --- KATEGORI 6: Gorden & Home Decor ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Gorden & Home Decor",
            "name": "Jahit Gorden Blackout",
            "price": 75000,
            "discount_price": 60000,
            "percent_discount": 20,
            "final_price": 60000,
            "image": `${baseUrl}/image/tema_sevent/p_8.webp`,
            "description": "<ul><li>Harga jasa per meter lari.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Gorden & Home Decor",
            "name": "Sarung Bantal Custom",
            "price": 25000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 25000,
            "image": `${baseUrl}/image/tema_sevent/p_9.jpg`,
            "description": "<ul><li>Jasa jahit sarung bantal sofa minimalis.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Kebaya & Gaun",
            "name": "Gaun Pesta Simpel",
            "price": 850000,
            "discount_price": 750000,
            "percent_discount": 12,
            "final_price": 750000,
            "image": `${baseUrl}/image/tema_sevent/p_10.jpg`,
            "description": "<ul><li>Jasa jahit gaun malam dengan fitting 2x.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
