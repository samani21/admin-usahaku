const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaTwelve = {
    header: {
        color: "#F1F5F9 ",
        color_frame: "dark",
        layout_header: 7,
        logo: `${baseUrl}/image/tema_dua_belas/logo.png`,
        mode: "dark",
        span_one: "Gentle ",
        span_two: "Cut",
        type_frame: "circle",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#CA8A04",
        cta: "Pesan Kursi",
        headline: "Tampil Lebih Percaya Diri",
        image: baseUrl + '/image/tema_dua_belas/hero.png',
        layout_hero: 13,
        mode: "dark",
        sub_headline: "Layanan potong rambut pria profesional dengan teknik modern dan perawatan handuk hangat.",
        title: "",
    },
    summary: {
        business_id: 13,
        color: "#CA8A04",
        id: 1,
        layout_summary: 12,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#CA8A04",
        id: 1,
        layout_categories: 13,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Gentleman Cut",
            "icon": `${baseUrl}/image/tema_dua_belas/c_1.jpg`,
            "color": "#CA8A04",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Beard Trim & Shave",
            "icon": `${baseUrl}/image/tema_dua_belas/c_2.jpg`,
            "color": "#CA8A04",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Hair Coloring",
            "icon": `${baseUrl}/image/tema_dua_belas/c_3.avif`,
            "color": "#CA8A04",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Massage & Spa",
            "icon": `${baseUrl}/image/tema_dua_belas/c_4.webp`,
            "color": "#CA8A04",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Junior Cut",
            "icon": `${baseUrl}/image/tema_dua_belas/c_5.webp`,
            "color": "#CA8A04",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Hair Care Products",
            "icon": `${baseUrl}/image/tema_dua_belas/c_6.avif`,
            "color": "#CA8A04",
            "count": 0,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#CA8A04",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 10,
        mode: "dark",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Gentleman Cut ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Gentleman Cut",
            "name": "Signature Haircut & Wash",
            "price": 75000,
            "discount_price": 60000,
            "percent_discount": 20,
            "final_price": 60000,
            "image": `${baseUrl}/image/tema_dua_belas/p_1.jpg`,
            "description": "<ul><li>Potong rambut, cuci rambut, pijat relaksasi, dan styling pomade.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Gentleman Cut",
            "name": "Buzz Cut / Clipper Cut",
            "price": 45000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 45000,
            "image": `${baseUrl}/image/tema_dua_belas/p_2.webp`,
            "description": "<ul><li>Potongan pendek rapi menggunakan clipper full.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Beard Trim & Shave ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Beard Trim & Shave",
            "name": "Hot Towel Shave",
            "price": 50000,
            "discount_price": 45000,
            "percent_discount": 10,
            "final_price": 45000,
            "image": `${baseUrl}/image/tema_dua_belas/p_3.webp`,
            "description": "<ul><li>Cukur jenggot tradisional dengan handuk hangat dan krim premium.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Hair Coloring ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Hair Coloring",
            "name": "Basic Black Hair Dye",
            "price": 120000,
            "discount_price": 100000,
            "percent_discount": 17,
            "final_price": 100000,
            "image": `${baseUrl}/image/tema_dua_belas/p_4.jpg`,
            "description": "<ul><li>Pewarnaan hitam natural untuk menutupi uban atau kesegaran warna.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Hair Coloring",
            "name": "Fashion Color / Bleaching",
            "price": 350000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 350000,
            "image": `${baseUrl}/image/tema_dua_belas/p_5.jpeg`,
            "description": "<ul><li>Pilihan warna trendi (Ash Grey, Blue, dll) termasuk bleaching.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Massage & Spa ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Massage & Spa",
            "name": "Head & Shoulder Massage",
            "price": 40000,
            "discount_price": 35000,
            "percent_discount": 12,
            "final_price": 35000,
            "image": `${baseUrl}/image/tema_dua_belas/p_6.webp`,
            "description": "<ul><li>Pijat fokus area kepala dan bahu selama 20 menit.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Junior Cut ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Junior Cut",
            "name": "Kids Haircut (Under 12)",
            "price": 50000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 50000,
            "image": `${baseUrl}/image/tema_dua_belas/p_7.png`,
            "description": "<ul><li>Potong rambut anak dengan pelayanan ramah dan sabar.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Hair Care Products ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Hair Care Products",
            "name": "Matte Clay Pomade",
            "price": 115000,
            "discount_price": 99000,
            "percent_discount": 14,
            "final_price": 99000,
            "image": `${baseUrl}/image/tema_dua_belas/p_8.webp`,
            "description": "<ul><li>Hold kuat dengan hasil akhir natural matte (tidak kilap).</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Hair Care Products",
            "name": "Beard Oil Sandalwood",
            "price": 85000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 85000,
            "image": `${baseUrl}/image/tema_dua_belas/p_9.webp`,
            "description": "<ul><li>Menutrisi dan melembutkan jenggot dengan aroma kayu cendana.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Massage & Spa",
            "name": "Ear Candle Therapy",
            "price": 30000,
            "discount_price": 25000,
            "percent_discount": 16,
            "final_price": 25000,
            "image": `${baseUrl}/image/tema_dua_belas/p_10.jpg`,
            "description": "<ul><li>Terapi pembersihan telinga untuk relaksasi maksimal.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
