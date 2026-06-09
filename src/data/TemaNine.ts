const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaNine = {
    header: {
        color: "#DB2777 ",
        color_frame: "light",
        layout_header: 6,
        logo: `${baseUrl}/image/tema_sembilan/logo.png`,
        mode: "light",
        span_one: "Sweet ",
        span_two: "Bites",
        type_frame: "circle",
    },
    summary: {
        business_id: 13,
        color: "#DB2777",
        id: 1,
        layout_summary: 5,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#DB2777",
        id: 1,
        layout_categories: 3,
        mode: "light",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Roti Manis",
            "icon": "mdi:bread-slice",
            "color": "#DB2777",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Kue Ulang Tahun",
            "icon": "mdi:cake-variant",
            "color": "#DB2777",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Pastry & Croissant",
            "icon": "mynaui:croissant",
            "color": "#DB2777",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Donut & Toppings",
            "icon": "solar:donut-bold",
            "color": "#DB2777",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Cookies & Hampers",
            "icon": "mdi:cookie",
            "color": "#DB2777",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Dessert Box",
            "icon": "mdi:food-apple-outline",
            "color": "#DB2777",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#DB2777",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 9,
        mode: "light",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Roti Manis ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Roti Manis",
            "name": "Roti Sobek Cokelat Lumer",
            "price": 25000,
            "discount_price": 20000,
            "percent_discount": 20,
            "final_price": 20000,
            "image": `${baseUrl}/image/tema_sembilan/p_1.jpg`,
            "description": "<ul><li>Roti super lembut dengan isian pasta cokelat Belgia.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Roti Manis",
            "name": "Roti Sisir Mentega",
            "price": 15000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 15000,
            "image": `${baseUrl}/image/tema_sembilan/p_2.jpg`,
            "description": "<ul><li>Roti klasik dengan olesan mentega premium yang melimpah.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Kue Ulang Tahun ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Kue Ulang Tahun",
            "name": "Korean Bento Cake 10cm",
            "price": 85000,
            "discount_price": 75000,
            "percent_discount": 12,
            "final_price": 75000,
            "image": `${baseUrl}/image/tema_sembilan/p_3.webp`,
            "description": "<ul><li>Kue mini estetik, bisa custom tulisan singkat.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Pastry & Croissant ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Pastry & Croissant",
            "name": "Almond Croissant Pro",
            "price": 35000,
            "discount_price": 31500,
            "percent_discount": 10,
            "final_price": 31500,
            "image": `${baseUrl}/image/tema_sembilan/p_4.jpg`,
            "description": "<ul><li>Croissant renyah dengan topping krim almond dan kacang iris.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Donut & Toppings ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Donut & Toppings",
            "name": "Assorted Donuts (Box of 6)",
            "price": 60000,
            "discount_price": 54000,
            "percent_discount": 10,
            "final_price": 54000,
            "image": `${baseUrl}/image/tema_sembilan/p_5.webp`,
            "description": "<ul><li>Pilih 6 varian rasa favoritmu.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 51, "name": "Classic Glazed", "price": 60000, "discount_price": 54000, "percent_discount": 10, "final_price": 54000 },
                { "id": 52, "name": "Premium Toppings", "price": 72000, "discount_price": 65000, "percent_discount": 10, "final_price": 65000 }
            ]
        },
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Donut & Toppings",
            "name": "Donat Paha Ayam",
            "price": 8000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 8000,
            "image": `${baseUrl}/image/tema_sembilan/p_6.jpg`,
            "description": "<ul><li>Donat jadul dengan meses cokelat melimpah.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Cookies & Hampers ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Cookies & Hampers",
            "name": "Soft Cookies Choco Chip",
            "price": 18000,
            "discount_price": 15000,
            "percent_discount": 17,
            "final_price": 15000,
            "image": `${baseUrl}/image/tema_sembilan/p_7.jpg`,
            "description": "<ul><li>Cookies renyah di luar dan lumer di dalam.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Cookies & Hampers",
            "name": "Hampers Hari Raya",
            "price": 250000,
            "discount_price": 225000,
            "percent_discount": 10,
            "final_price": 225000,
            "image": `${baseUrl}/image/tema_sembilan/p_8.webp`,
            "description": "<ul><li>Isi 3 toples kue kering premium dan kartu ucapan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Dessert Box ---
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Dessert Box",
            "name": "Tiramisu Dessert Box",
            "price": 45000,
            "discount_price": 38000,
            "percent_discount": 15,
            "final_price": 38000,
            "image": `${baseUrl}/image/tema_sembilan/p_9.jpg`,
            "description": "<ul><li>Lapisan biskuit kopi dengan krim keju lembut.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Dessert Box",
            "name": "Red Velvet Dream Box",
            "price": 42000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 42000,
            "image": `${baseUrl}/image/tema_sembilan/p_10.jpg`,
            "description": "<ul><li>Kue red velvet dengan lapisan cream cheese frosting.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
