const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaTwo = {
    header: {
        color: "#64748B",
        color_frame: "dark",
        layout_header: 10,
        // logo: "https://usahaku-kappa.vercel.app/image/tema_satu/market-logo_848918-4791.avif",
        mode: "auto",
        span_one: "Laundry",
        span_two: "& Cuci Sepatu",
        type_frame: "square",
    },
    summary: {
        business_id: 13,
        color: "#64748B",
        id: 1,
        layout_summary: 8,
        mode: "auto",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#64748B",
        cta: "Ambil Laundry",
        headline: "Cuci Bersih & Wangi",
        image: baseUrl + '/image/tema_dua/16.jpg',
        layout_hero: 10,
        mode: "auto",
        sub_headline: "Layanan ekspres 1 hari selesai dengan jaminan kebersihan maksimal.",
        title: "",
    },
    category: {
        business_id: 13,
        color: "#64748B",
        id: 1,
        layout_categories: 3,
        mode: "auto",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Cuci Kering",
            "icon": "mdi:washing-machine",
            "color": "#3498DB",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Cuci Setrika",
            "icon": "mdi:iron-outline",
            "color": "#1ABC9C",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Setrika Saja",
            "icon": "mdi:tshirt-crew-outline",
            "color": "#9B59B6",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Laundry Sepatu",
            "icon": "mdi:shoe-cleat",
            "color": "#E67E22",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Bedcover & Selimut",
            "icon": "mdi:bed-double-outline",
            "color": "#E74C3C",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Express (Kilat)",
            "icon": "mdi:lightning-bolt-outline",
            "color": "#F1C40F",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#64748B",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 9,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [{
        "business_id": 13,
        "product_category_id": 1,
        "category": "Cuci Kering",
        "name": "Cuci Kering Kiloan",
        'is_qty': true,
        "price": 7000,
        "final_price": 7000,
        "image": baseUrl + '/image/tema_dua/1.jpg',
        "description": "<ul><li>Cuci bersih dan kering tanpa setrika (per kg).</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 2,
        "category": "Cuci Setrika",
        "name": "Cuci Setrika Gaun/Dress",
        "price": 50000,
        'discount_price': 10000,
        'percent_discount': 20,
        "final_price": 40000,
        "image": baseUrl + '/image/tema_dua/6.webp',
        "description": "<ul><li>Penanganan khusus untuk bahan gaun yang sensitif.</li></ul>",
        "has_variant": 1,
        "variants": [
            { "id": 50, "name": "Gaun Pendek", "price": 40000, "percent_discount": 20, 'final_price': 32000 },
            { "id": 51, "name": "Gaun Panjang/Pesta", "price": 50000, "percent_discount": 20, "final_price": 40000 }
        ]
    },

    {
        "business_id": 13,
        "product_category_id": 1,
        "category": "Cuci Kering",
        "name": "Cuci Kering Jaket Parasut",
        "price": 15000,
        "final_price": 15000,
        "image": baseUrl + '/image/tema_dua/2.avif',
        "description": "<ul><li>Pencucian khusus bahan parasut agar tidak rusak.</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 1,
        "category": "Cuci Kering",
        "name": "Cuci Kering Jas/Blazer",
        "price": 25000,
        "final_price": 25000,
        "image": baseUrl + '/image/tema_dua/3.webp',
        "description": "<ul><li>Perawatan jas profesional (per pcs).</li></ul>",
        "has_variant": 0,
        "variants": []
    },

    // --- KATEGORI 2: Cuci Setrika ---
    {
        "business_id": 13,
        "product_category_id": 2,
        "category": "Cuci Setrika",
        "name": "Cuci Setrika Reguler",
        "price": 9000,
        "final_price": 9000,
        "image": baseUrl + '/image/tema_dua/4.jpg',
        "description": "<ul><li>Layanan lengkap cuci, kering, dan setrika rapi (per kg).</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 2,
        "category": "Cuci Setrika",
        "name": "Cuci Setrika Seragam",
        "price": 12000,
        "final_price": 12000,
        "image": baseUrl + '/image/tema_dua/5.jpg',
        "description": "<ul><li>Seragam sekolah/kantor, rapi dan harum.</li></ul>",
        "has_variant": 0,
        "variants": []
    },

    // --- KATEGORI 3: Setrika Saja ---
    {
        "business_id": 13,
        "product_category_id": 3,
        "category": "Setrika Saja",
        "name": "Setrika Wangi Kiloan",
        "price": 5000,
        "final_price": 5000,
        "image": baseUrl + '/image/tema_dua/7.webp',
        "description": "<ul><li>Hanya jasa setrika dan pelicin pakaian (per kg).</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 3,
        "category": "Setrika Saja",
        "name": "Setrika Kemeja",
        "price": 4000,
        "final_price": 4000,
        "image": baseUrl + '/image/tema_dua/8.jpg',
        "description": "<ul><li>Setrika kemeja satuan agar tetap tajam dan rapi.</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 3,
        "category": "Setrika Saja",
        "name": "Setrika Celana Jeans",
        "price": 4500,
        "final_price": 4500,
        "image": baseUrl + '/image/tema_dua/9.jpg',
        "description": "<ul><li>Setrika jeans satuan.</li></ul>",
        "has_variant": 0,
        "variants": []
    },

    // --- KATEGORI 4: Laundry Sepatu ---
    {
        "business_id": 13,
        "product_category_id": 4,
        "category": "Laundry Sepatu",
        "name": "Deep Clean Sneakers",
        "price": 45000,
        "final_price": 45000,
        "image": baseUrl + '/image/tema_dua/10.jpg',
        "description": "<ul><li>Pembersihan menyeluruh luar dan dalam sepatu.</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 4,
        "category": "Laundry Sepatu",
        "name": "Unyellowing Treatment",
        "price": 60000,
        "final_price": 60000,
        "image": baseUrl + '/image/tema_dua/11.jpg',
        "description": "<ul><li>Menghilangkan noda kuning pada sol sepatu.</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 4,
        "category": "Laundry Sepatu",
        "name": "Leather Shoe Care",
        "price": 75000,
        "final_price": 75000,
        "image": baseUrl + '/image/tema_dua/12.webp',
        "description": "<ul><li>Perawatan khusus sepatu kulit dan semir.</li></ul>",
        "has_variant": 0,
        "variants": []
    },

    // --- KATEGORI 5: Bedcover & Selimut ---
    {
        "business_id": 13,
        "product_category_id": 5,
        "category": "Bedcover & Selimut",
        "name": "Bedcover Size Small",
        "price": 25000,
        "final_price": 25000,
        "image": baseUrl + '/image/tema_dua/13.jpg',
        "description": "<ul><li>Bedcover ukuran single/anak.</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 5,
        "category": "Bedcover & Selimut",
        "name": "Bedcover Size King",
        "price": 45000,
        "final_price": 45000,
        "image": baseUrl + '/image/tema_dua/14.avif',
        "description": "<ul><li>Bedcover ukuran besar (King/Queen).</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 5,
        "category": "Bedcover & Selimut",
        "name": "Selimut Tebal/Wool",
        "price": 20000,
        "final_price": 20000,
        "image": baseUrl + '/image/tema_dua/15.jpeg',
        "description": "<ul><li>Pencucian selimut tebal berbahan wool.</li></ul>",
        "has_variant": 0,
        "variants": []
    },

    // --- KATEGORI 6: Express (Kilat) ---
    {
        "business_id": 13,
        "product_category_id": 6,
        "category": "Express (Kilat)",
        "name": "Express 6 Jam",
        "price": 20000,
        "final_price": 20000,
        "image": baseUrl + '/image/tema_dua/16.jpg',
        "description": "<ul><li>Cuci Setrika selesai dalam 6 jam saja (per kg).</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 6,
        "category": "Express (Kilat)",
        "name": "Next Day Service",
        "price": 12000,
        "final_price": 12000,
        "image": baseUrl + '/image/tema_dua/16.jpg',
        "description": "<ul><li>Selesai dalam 24 jam (per kg).</li></ul>",
        "has_variant": 0,
        "variants": []
    },
    {
        "business_id": 13,
        "product_category_id": 6,
        "category": "Express (Kilat)",
        "name": "Express Satuan",
        "price": 15000,
        "final_price": 15000,
        "image": baseUrl + '/image/tema_dua/16.jpg',
        "description": "<ul><li>Layanan kilat untuk pakaian satuan.</li></ul>",
        "has_variant": 0,
        "variants": []
    }]
}
