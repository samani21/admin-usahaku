const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaTen = {
    header: {
        color: "#EA580C",
        color_frame: "light",
        layout_header: 7,
        logo: `${baseUrl}/image/tema_sepuluh/logo.png`,
        mode: "light",
        span_one: "Seleraku ",
        span_two: "Hot",
        type_frame: "circle",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#EA580C ",
        cta: "Pesan Makan",
        headline: "Menu Pedas Menggoda",
        image: baseUrl + '/image/tema_sepuluh/hero.jpg',
        layout_hero: 7,
        mode: "light",
        sub_headline: "Cita rasa otentik bumbu rempah nusantara yang bikin ketagihan.",
        title: "",
    },
    summary: {
        business_id: 13,
        color: "#EA580C",
        id: 1,
        layout_summary: 7,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#EA580C",
        id: 1,
        layout_categories: 1,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Spesialis Ayam & Bebek",
            "icon": `${baseUrl}/image/tema_sepuluh/c_1.jpeg`,
            "color": "#EA580C",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Aneka Sambal Hot",
            "icon": `${baseUrl}/image/tema_sepuluh/c_2.png`,
            "color": "#991B1B",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Nasi & Lauk Pauk",
            "icon": `${baseUrl}/image/tema_sepuluh/c_3.jpeg`,
            "color": "#EA580C",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Sayuran & Tumisan",
            "icon": `${baseUrl}/image/tema_sepuluh/c_4.webp`,
            "color": "#EA580C",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Paket Hemat / Bento",
            "icon": `${baseUrl}/image/tema_sepuluh/c_5.jpg`,
            "color": "#991B1B",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Minuman Segar",
            "icon": `${baseUrl}/image/tema_sepuluh/c_6.jpg`,
            "color": "#EA580C",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#EA580C",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 11,
        mode: "light",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Spesialis Ayam & Bebek ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Spesialis Ayam & Bebek",
            "name": "Ayam Goreng Serundeng",
            "price": 22000,
            "discount_price": 18000,
            "percent_discount": 18,
            "final_price": 18000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_1.jpg`,
            "description": "<ul><li>Ayam goreng empuk dengan taburan serundeng lengkuas gurih.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Spesialis Ayam & Bebek",
            "name": "Bebek Goreng Madura",
            "price": 35000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 35000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_2.jpg`,
            "description": "<ul><li>Bebek goreng dengan bumbu hitam khas Madura yang kaya rempah.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Aneka Sambal Hot ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Aneka Sambal Hot",
            "name": "Sambal Korek Extra Pedas",
            "price": 5000,
            "discount_price": 4000,
            "percent_discount": 20,
            "final_price": 4000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_3.jpg`,
            "description": "<ul><li>Sambal ulek bawang putih segar dengan level pedas maksimal.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Nasi & Lauk Pauk ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Nasi & Lauk Pauk",
            "name": "Nasi Putih Pulen",
            "price": 6000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 6000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_4.jpeg`,
            "description": "<ul><li>Nasi hangat dari beras pilihan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Nasi & Lauk Pauk",
            "name": "Tahu & Tempe Goreng",
            "price": 10000,
            "discount_price": 8000,
            "percent_discount": 20,
            "final_price": 8000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_5.jpg`,
            "description": "<ul><li>Satu porsi isi 2 tahu dan 2 tempe goreng bumbu kuning.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Sayuran & Tumisan ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Sayuran & Tumisan",
            "name": "Cah Kangkung Belacan",
            "price": 15000,
            "discount_price": 12500,
            "percent_discount": 17,
            "final_price": 12500,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_6.avif`,
            "description": "<ul><li>Tumis kangkung segar dengan terasi udang pilihan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Paket Hemat / Bento ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Paket Hemat / Bento",
            "name": "Paket Ayam Geprek + Es Teh",
            "price": 28000,
            "discount_price": 5000,
            "percent_discount": null,
            "final_price": 24000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_7.jpeg`,
            "description": "<ul><li>Nasi, Ayam Geprek Level 1-5, dan Es Teh Manis.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 71, "name": "Level 1-3", "price": 24000, "discount_price": 5000, "percent_discount": null, "final_price": 19000 },
                { "id": 72, "name": "Level 4-5", "price": 26000, "discount_price": 5000, "percent_discount": null, "final_price": 21000 }
            ]
        },

        // --- KATEGORI 6: Minuman Segar ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Minuman Segar",
            "name": "Es Jeruk Peras Murni",
            "price": 12000,
            "discount_price": 10000,
            "percent_discount": 17,
            "final_price": 10000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_8.jpg`,
            "description": "<ul><li>Jeruk peras asli tanpa pemanis buatan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Minuman Segar",
            "name": "Es Kelapa Muda Batok",
            "price": 18000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 18000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_9.jpg`,
            "description": "<ul><li>Kelapa muda segar utuh dengan es batu.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Spesialis Ayam & Bebek",
            "name": "Bebek Bakar Madu",
            "price": 38000,
            "discount_price": 34000,
            "percent_discount": 11,
            "final_price": 34000,
            "is_qty": true,
            "image": `${baseUrl}/image/tema_sepuluh/p_10.jpeg`,
            "description": "<ul><li>Bebek bakar empuk dengan olesan madu dan bumbu kecap pedas manis.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
