const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaSix = {
    header: {
        color: "#E11D48",
        color_frame: "dark",
        layout_header: 2,
        logo: ``,
        mode: "dark",
        span_one: "Garasi ",
        span_two: "Sport",
        type_frame: "square",
    },
    summary: {
        business_id: 13,
        color: "#E11D48",
        id: 1,
        layout_summary: 1,
        mode: "dark",
    },

    category: {
        business_id: 13,
        color: "#E11D48",
        id: 1,
        layout_categories: 12,
        mode: "dark",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Service Rutin",
            "icon": "mdi:engine-outline",
            "color": "#E11D48",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Tune Up & ECU",
            "icon": "mdi:chip",
            "color": "#E11D48",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Kaki-Kaki & Ban",
            "icon": "mdi:tire",
            "color": "#E11D48",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Sistem Pengereman",
            "icon": "icon-park-solid:brake-pads",
            "color": "#E11D48",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Ganti Oli Racing",
            "icon": "mdi:oil",
            "color": "#E11D48",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Modifikasi Body",
            "icon": "mdi:car-side",
            "color": "#E11D48",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#E11D48",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 3,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Service Rutin ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Service Rutin",
            "name": "General Check Up Sport",
            "price": 350000,
            "discount_price": 51000,
            "percent_discount": 15,
            "final_price": 299000,
            "image": `${baseUrl}/image/tema_enam/p_1.svg`,
            "description": "<ul><li>Pengecekan menyeluruh 50 titik komponen mesin dan kelistrikan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Tune Up & ECU ---
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Tune Up & ECU",
            "name": "Remapping ECU Stage 1",
            "price": 2500000,
            "discount_price": 250000,
            "percent_discount": 10,
            "final_price": 2250000,
            "image": `${baseUrl}/image/tema_enam/p_2.svg`,
            "description": "<ul><li>Peningkatan Horsepower dan Torsi secara optimal.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Tune Up & ECU",
            "name": "Throttle Body Cleaning",
            "price": 450000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 450000,
            "image": `${baseUrl}/image/tema_enam/p_3.svg`,
            "description": "<ul><li>Membersihkan kerak karbon pada sistem asupan udara.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Kaki-Kaki & Ban ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Kaki-Kaki & Ban",
            "name": "Spooring & Balancing Pro",
            "price": 500000,
            "discount_price": 400000,
            "percent_discount": 20,
            "final_price": 400000,
            "image": `${baseUrl}/image/tema_enam/p_4.svg`,
            "description": "<ul><li>Penyelarasan roda menggunakan teknologi laser 3D.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Sistem Pengereman ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Sistem Pengereman",
            "name": "Kampas Rem Racing Brembo",
            "price": 1200000,
            "discount_price": 960000,
            "percent_discount": 20,
            "final_price": 960000,
            "image": `${baseUrl}/image/tema_enam/p_5.svg`,
            "description": "<ul><li>Daya cengkeram maksimal untuk suhu tinggi.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 501, "name": "Front Pair", "price": 1200000, "discount_price": 960000, "percent_discount": 20, "final_price": 960000 },
                { "id": 502, "name": "Full Set (F+R)", "price": 2200000, "discount_price": 1870000, "percent_discount": 15, "final_price": 1870000 }
            ]
        },

        // --- KATEGORI 5: Ganti Oli Racing ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Ganti Oli Racing",
            "name": "Motul 300V Ester Core",
            "price": 450000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 450000,
            "image": `${baseUrl}/image/tema_enam/p_6.svg`,
            "description": "<ul><li>Oli full synthetic khusus mesin performa tinggi (per Liter).</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Ganti Oli Racing",
            "name": "Shell Helix Ultra Racing",
            "price": 250000,
            "discount_price": 212500,
            "percent_discount": 15,
            "final_price": 212500,
            "image": `${baseUrl}/image/tema_enam/p_7.svg`,
            "description": "<ul><li>Proteksi maksimal untuk putaran mesin tinggi.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Modifikasi Body ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Modifikasi Body",
            "name": "Carbon Fiber Hood",
            "price": 8500000,
            "discount_price": 7650000,
            "percent_discount": 10,
            "final_price": 7650000,
            "image": `${baseUrl}/image/tema_enam/p_8.svg`,
            "description": "<ul><li>Bahan real carbon fiber, mengurangi bobot kendaraan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Modifikasi Body",
            "name": "Body Kit Custom Stage 1",
            "price": 15000000,
            "discount_price": 13500000,
            "percent_discount": 10,
            "final_price": 13500000,
            "image": `${baseUrl}/image/tema_enam/p_8.svg`,
            "description": "<ul><li>Front Lips, Side Skirt, dan Rear Diffuser.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Modifikasi Body",
            "name": "Pemasangan Spoiler GT",
            "price": 3500000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 3500000,
            "image": `${baseUrl}/image/tema_enam/p_8.svg`,
            "description": "<ul><li>Spoiler model GT Wing untuk downforce maksimal.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
