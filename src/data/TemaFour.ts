const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaFour = {
    header: {
        color: "#9CA3AF",
        color_frame: "dark",
        layout_header: 3,
        // logo: "https://usahaku-kappa.vercel.app/image/tema_satu/market-logo_848918-4791.avif",
        mode: "auto",
        span_one: "Gaya ",
        span_two: "Modis",
        type_frame: "square",
    },
    summary: {
        business_id: 13,
        color: "#9CA3AF",
        id: 1,
        layout_summary: 4,
        mode: "auto",
    },

    category: {
        business_id: 13,
        color: "#9CA3AF",
        id: 1,
        layout_categories: 10,
        mode: "auto",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Pakaian Pria",
            "icon": "mdi:tshirt-crew",
            "color": "#451A03",
            "count": 124,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Pakaian Wanita",
            "icon": "hugeicons:dress-03",
            "color": "#451A03",
            "count": 186,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Koleksi Hijab",
            "icon": "mdi:head-snowflake-outline",
            "color": "#451A03",
            "count": 52,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Tas & Aksesoris",
            "icon": "fluent-emoji-high-contrast:handbag",
            "color": "#451A03",
            "count": 89,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Alas Kaki",
            "icon": "mdi:shoe-heel",
            "color": "#451A03",
            "count": 64,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Promo Musim Ini",
            "icon": "mdi:label-percent-outline",
            "color": "#451A03",
            "count": 21,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#9CA3AF",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 5,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Pakaian Pria ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Pakaian Pria",
            "name": "Kemeja Flanel Slim Fit",
            "price": 250000,
            "discount_price": 195000,
            "percent_discount": 22,
            "final_price": 195000,
            "image": baseUrl + '/image/tema_empat/p_1.jpg',
            "is_qty": true,
            "description": "<ul><li>Bahan katun premium, motif kotak-kotak modern.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 11, "name": "Size M", "price": 250000, "discount_price": 195000, "percent_discount": 22, "final_price": 195000 },
                { "id": 12, "name": "Size XL", "price": 270000, "discount_price": 210000, "percent_discount": 22, "final_price": 210000 }
            ]
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Pakaian Pria",
            "name": "Kaos Polos Cotton Combed 30s",
            "price": 85000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 85000,
            "image": baseUrl + '/image/tema_empat/p_2.jpeg',
            "is_qty": true,
            "description": "<ul><li>Bahan adem dan menyerap keringat.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Pakaian Wanita ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Pakaian Wanita",
            "name": "Midi Dress Floral",
            "price": 320000,
            "discount_price": 256000,
            "percent_discount": 20,
            "final_price": 256000,
            "image": baseUrl + '/image/tema_empat/p_3.webp',
            "is_qty": true,
            "description": "<ul><li>Dress cantik dengan motif bunga musim panas.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Pakaian Wanita",
            "name": "Blouse Kantor Silk",
            "price": 175000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 175000,
            "image": baseUrl + '/image/tema_empat/p_4.jpg',
            "is_qty": true,
            "description": "<ul><li>Bahan silk lembut, tidak mudah kusut.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Koleksi Hijab ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Koleksi Hijab",
            "name": "Pashmina Ceruty Baby Doll",
            "price": 65000,
            "discount_price": 52000,
            "percent_discount": 20,
            "final_price": 52000,
            "image": baseUrl + '/image/tema_empat/p_5.jpg',
            "is_qty": true,
            "description": "<ul><li>Mudah dibentuk dan jatuh (flowy).</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Tas & Aksesoris ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Tas & Aksesoris",
            "name": "Sling Bag Leather Minimalist",
            "price": 450000,
            "discount_price": 315000,
            "percent_discount": 30,
            "final_price": 315000,
            "image": baseUrl + '/image/tema_empat/p_6.webp',
            "is_qty": true,
            "description": "<ul><li>Tas selempang kulit sintetis kualitas tinggi.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Tas & Aksesoris",
            "name": "Kacamata Hitam Aviator",
            "price": 120000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 120000,
            "image": baseUrl + '/image/tema_empat/p_7.jpg',
            "is_qty": true,
            "description": "<ul><li>UV Protection 400.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Alas Kaki ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Alas Kaki",
            "name": "Sneakers Canvas White",
            "price": 350000,
            "discount_price": 280000,
            "percent_discount": 20,
            "final_price": 280000,
            "image": baseUrl + '/image/tema_empat/p_8.webp',
            "is_qty": true,
            "description": "<ul><li>Cocok untuk gaya kasual sehari-hari.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 81, "name": "Size 40", "price": 350000, "discount_price": 280000, "percent_discount": 20, "final_price": 280000 },
                { "id": 82, "name": "Size 42", "price": 350000, "discount_price": 280000, "percent_discount": 20, "final_price": 280000 }
            ]
        },

        // --- KATEGORI 6: Promo Musim Ini ---
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Promo Musim Ini",
            "name": "Hoodie Oversize Unisex",
            "price": 299000,
            "discount_price": 149500,
            "percent_discount": 50,
            "final_price": 149500,
            "image": baseUrl + '/image/tema_empat/p_9.webp',
            "is_qty": true,
            "description": "<ul><li>Promo cuci gudang akhir musim.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Promo Musim Ini",
            "name": "Jam Tangan Quartz Classic",
            "price": 550000,
            "discount_price": 330000,
            "percent_discount": 40,
            "final_price": 330000,
            "image": baseUrl + '/image/tema_empat/p_10.webp',
            "is_qty": true,
            "description": "<ul><li>Water resistant up to 30m.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
