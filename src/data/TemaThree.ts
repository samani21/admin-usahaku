const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaThree = {
    header: {
        color: "#451A03 ",
        color_frame: "dark",
        layout_header: 8,
        // logo: "https://usahaku-kappa.vercel.app/image/tema_satu/market-logo_848918-4791.avif",
        mode: "light",
        span_one: "Mama ",
        span_two: "Resol",
        type_frame: "square",
    },
    summary: {
        business_id: 13,
        color: "#451A03",
        id: 1,
        layout_summary: 6,
        mode: "auto",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#451A03",
        cta: "Pesan Sekarang",
        headline: "Camilan Gurih & Renyah",
        image: baseUrl + '/image/tema_dua/16.jpg',
        layout_hero: 10,
        mode: "light",
        sub_headline: "Dibuat dengan bahan premium tanpa pengawet, cocok untuk teman santai.",
        title: "",
    },
    category: {
        business_id: 13,
        color: "#451A03",
        id: 1,
        layout_categories: 1,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Risoles Signature",
            "icon": baseUrl + '/image/tema_tiga/c_1.jpg',
            "color": "#451A03",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Gorengan Gurih",
            "icon": baseUrl + '/image/tema_tiga/c_2.webp',
            "color": "#451A03",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Kue Basah & Manis",
            "icon": baseUrl + '/image/tema_tiga/c_3.jpeg',
            "color": "#451A03",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Snack Box / Paket",
            "icon": baseUrl + '/image/tema_tiga/c_4.jpg',
            "color": "#451A03",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Frozen Snack",
            "icon": baseUrl + '/image/tema_tiga/c_5.png',
            "color": "#451A03",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Minuman Pendamping",
            "icon": baseUrl + '/image/tema_tiga/c_6.webp',
            "color": "#451A03",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#451A03",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 13,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Risoles Signature ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Risoles Signature",
            "name": "Risoles Mayo Premium",
            "price": 10000,
            "discount_price": 8000,
            "percent_discount": 20,
            "final_price": 8000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_1.jpg',
            "description": "<ul><li>Isi smoked beef, telur, dan mayo spesial.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Risoles Signature",
            "name": "Risoles Ragout Ayam",
            "price": 7500,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 7500,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_2.jpg',
            "description": "<ul><li>Isian sayur dan ayam creamy.</li></ul>",
            "has_variant": 1,
            "variants": [
                {
                    "id": 101,
                    "name": "Original",
                    "price": 7500,
                    "discount_price": null,
                    "percent_discount": null,
                    "final_price": 7500
                },
                {
                    "id": 102,
                    "name": "Pedas Mozzarella",
                    "price": 12000,
                    "discount_price": 10000,
                    "percent_discount": 17,
                    "final_price": 10000
                }
            ]
        },

        // --- KATEGORI 2: Gorengan Gurih ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Gorengan Gurih",
            "name": "Bakwan Jagung Manis",
            "price": 3000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 3000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_3.jpg',
            "description": "<ul><li>Garing di luar, lembut di dalam.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Gorengan Gurih",
            "name": "Tahu Bakso Goreng",
            "price": 5000,
            "discount_price": 4000,
            "percent_discount": 20,
            "final_price": 4000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_4.jpg',
            "description": "<ul><li>Tahu dengan isian daging sapi murni.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Kue Basah & Manis ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Kue Basah & Manis",
            "name": "Kue Lumpur Kentang",
            "price": 4500,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 4500,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_5.jpg',
            "description": "<ul><li>Lembut dengan topping kismis.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Kue Basah & Manis",
            "name": "Dadung Gulung Pandan",
            "price": 4000,
            "discount_price": 3500,
            "percent_discount": 12,
            "final_price": 3500,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_6.jpg',
            "description": "<ul><li>Isian unti kelapa manis.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Snack Box / Paket ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Snack Box / Paket",
            "name": "Paket Rapat Hemat",
            "price": 25000,
            "discount_price": 20000,
            "percent_discount": 20,
            "final_price": 20000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_7.png',
            "description": "<ul><li>Isi: 3 Kue + 1 Minum.</li></ul>",
            "has_variant": 1,
            "variants": [
                {
                    "id": 201,
                    "name": "Box Standar",
                    "price": 25000,
                    "discount_price": 20000,
                    "percent_discount": 20,
                    "final_price": 20000
                },
                {
                    "id": 202,
                    "name": "Box Exclusive (Hardbox)",
                    "price": 35000,
                    "discount_price": null,
                    "percent_discount": null,
                    "final_price": 35000
                }
            ]
        },

        // --- KATEGORI 5: Frozen Snack ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Frozen Snack",
            "name": "Risoles Mayo (Frozen)",
            "price": 50000,
            "discount_price": 45000,
            "percent_discount": 10,
            "final_price": 45000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_8.jpeg',
            "description": "<ul><li>Isi 10 pcs siap goreng.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Minuman Pendamping ---
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Minuman Pendamping",
            "name": "Es Teh Manis Solo",
            "price": 5000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 5000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_9.jpg',
            "description": "<ul><li>Segar dan legit.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Minuman Pendamping",
            "name": "Kopi Susu Gula Aren",
            "price": 15000,
            "discount_price": 12000,
            "percent_discount": 20,
            "final_price": 12000,
            "is_qty": true,
            "image": baseUrl + '/image/tema_tiga/p_10.webp',
            "description": "<ul><li>Kopi Arabika dengan gula aren asli.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
