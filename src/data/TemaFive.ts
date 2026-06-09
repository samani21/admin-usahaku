const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemaFive = {
    header: {
        color: "#A8A29E ",
        color_frame: "dark",
        layout_header: 4,
        logo: `${baseUrl}/image/tema_lima/logo.png`,
        mode: "dark",
        span_one: "Kopi Senja",
        span_two: "",
        type_frame: "square",
    },
    summary: {
        business_id: 13,
        color: "#A8A29E",
        id: 1,
        layout_summary: 3,
        mode: "auto",
    },

    category: {
        business_id: 13,
        color: "#A8A29E",
        id: 1,
        layout_categories: 6,
        mode: "dark",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Espresso Based",
            "icon": `${baseUrl}/image/tema_lima/c_1.jpg`,
            "color": "#A8A29E",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Manual Brew",
            "icon": `${baseUrl}/image/tema_lima/c_2.webp`,
            "color": "#A8A29E",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Signature Senja",
            "icon": `${baseUrl}/image/tema_lima/c_3.jpg`,
            "color": "#A8A29E",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Non-Coffee",
            "icon": `${baseUrl}/image/tema_lima/c_4.jpg`,
            "color": "#A8A29E",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Pastry & Croissant",
            "icon": `${baseUrl}/image/tema_lima/c_5.jpg`,
            "color": "#A8A29E",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Light Meals",
            "icon": `${baseUrl}/image/tema_lima/c_6.jpg`,
            "color": "#A8A29E",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#9CA3AF",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 15,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Espresso Based ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Espresso Based",
            "name": "Caffe Latte",
            "price": 35000,
            "discount_price": 28000,
            "percent_discount": 20,
            "final_price": 28000,
            "image": `${baseUrl}/image/tema_lima/p_1.webp`,
            "description": "<ul><li>Double shot espresso dengan susu evaporasi lembut.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 101, "name": "Hot", "price": 35000, "discount_price": 28000, "percent_discount": 20, "final_price": 28000 },
                { "id": 102, "name": "Iced", "price": 38000, "discount_price": 32000, "percent_discount": 15, "final_price": 32000 }
            ]
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Espresso Based",
            "name": "Cappuccino",
            "price": 32000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 32000,
            "image": `${baseUrl}/image/tema_lima/p_2.webp`,
            "description": "<ul><li>Keseimbangan sempurna espresso, susu, dan foam tebal.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Manual Brew ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Manual Brew",
            "name": "V60 Gayo Aceh",
            "price": 40000,
            "discount_price": 36000,
            "percent_discount": 10,
            "final_price": 36000,
            "image": `${baseUrl}/image/tema_lima/c_3.JPG`,
            "description": "<ul><li>Single origin dengan notes fruity dan clean aftertaste.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Signature Senja ---
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Signature Senja",
            "name": "Es Kopi Susu Senja",
            "price": 25000,
            "discount_price": 20000,
            "percent_discount": 20,
            "final_price": 20000,
            "image": `${baseUrl}/image/tema_lima/c_4.jpg`,
            "description": "<ul><li>Kopi susu gula aren rahasia dengan sentuhan rasa kelapa.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Non-Coffee ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Non-Coffee",
            "name": "Matcha Latte",
            "price": 38000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 38000,
            "image": `${baseUrl}/image/tema_lima/c_5.jpg`,
            "description": "<ul><li>Pure Japanese Matcha dengan susu segar.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Non-Coffee",
            "name": "Artisan Tea: Earl Grey",
            "price": 30000,
            "discount_price": 25000,
            "percent_discount": 16,
            "final_price": 25000,
            "image": `${baseUrl}/image/tema_lima/p_6.webp`,
            "description": "<ul><li>Teh premium dengan aroma bergamot yang menenangkan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Pastry & Croissant ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Pastry & Croissant",
            "name": "Butter Croissant",
            "price": 28000,
            "discount_price": 22000,
            "percent_discount": 21,
            "final_price": 22000,
            "image": `${baseUrl}/image/tema_lima/p_7.webp`,
            "description": "<ul><li>Pastry berlapis yang renyah dan buttery.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Pastry & Croissant",
            "name": "Pain Au Chocolat",
            "price": 32000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 32000,
            "image": `${baseUrl}/image/tema_lima/p_8.jpg`,
            "description": "<ul><li>Croissant dengan isian cokelat batang belgian.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 6: Light Meals ---
        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Light Meals",
            "name": "Truffle Fries",
            "price": 45000,
            "discount_price": 38000,
            "percent_discount": 15,
            "final_price": 38000,
            "image": `${baseUrl}/image/tema_lima/p_9.jpg`,
            "description": "<ul><li>Kentang goreng dengan minyak truffle dan keju parmesan.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Light Meals",
            "name": "Chicken Wings Honey BBQ",
            "price": 52000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 52000,
            "image": `${baseUrl}/image/tema_lima/p_10.webp`,
            "description": "<ul><li>Sayap ayam goreng bumbu madu BBQ (isi 6 pcs).</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 201, "name": "Medium Spicy", "price": 52000, "discount_price": null, "percent_discount": null, "final_price": 52000 },
                { "id": 202, "name": "Extra Hot", "price": 55000, "discount_price": null, "percent_discount": null, "final_price": 55000 }
            ]
        }
    ]
}
