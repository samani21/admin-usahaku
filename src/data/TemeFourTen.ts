const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const TemeFourTen = {
    header: {
        color: "#1D4ED8 ",
        color_frame: "light",
        layout_header: 14,
        logo: `${baseUrl}/image/tema_empat_belas/logo.png`,
        mode: "light",
        span_one: "Pintar ",
        span_two: "Jago",
        type_frame: "circle",
    },
    hero: {
        id: 1,
        business_id: 1,
        color: "#1D4ED8",
        cta: "Daftar Sekarang",
        headline: "Kuasai Skill Masa Depan",
        image: baseUrl + '/image/tema_empat_belas/hero.png',
        layout_hero: 14,
        mode: "light",
        sub_headline: "Belajar langsung dari praktisi ahli dengan kurikulum terarah dan materi yang mudah dipahami.",
        title: "",
    },
    summary: {
        business_id: 13,
        color: "#1D4ED8",
        id: 1,
        layout_summary: 14,
        mode: "auto",
    },
    category: {
        business_id: 13,
        color: "#1D4ED8",
        id: 1,
        layout_categories: 7,
        mode: "auto",
    },
    categories: [
        {
            "id": 1,
            "business_id": 13,
            "name": "Matematika & Sains",
            "icon": "mdi:calculator-variant-outline",
            "color": "#1D4ED8",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 2,
            "business_id": 13,
            "name": "Bahasa Inggris Pro",
            "icon": "mdi:translate",
            "color": "#1D4ED8",
            "count": 3,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 3,
            "business_id": 13,
            "name": "Programming & IT",
            "icon": "mdi:code-tags",
            "color": "#1D4ED8",
            "count": 2,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 4,
            "business_id": 13,
            "name": "Persiapan Ujian / UN",
            "icon": "mdi:file-certificate-outline",
            "color": "#1D4ED8",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 5,
            "business_id": 13,
            "name": "Seni & Desain Grafis",
            "icon": "mdi:palette-outline",
            "color": "#1D4ED8",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        },
        {
            "id": 6,
            "business_id": 13,
            "name": "Bimbingan Konseling",
            "icon": "mdi:account-group-outline",
            "color": "#1D4ED8",
            "count": 1,
            "created_at": "2026-03-15T22:03:19.000000Z",
            "updated_at": "2026-03-15T22:03:19.000000Z"
        }
    ],
    product: {
        business_id: 13,
        color: "#1D4ED8",
        created_at: "2026-03-20T07:33:24.000000Z",
        id: 1,
        layout_products: 12,
        mode: "auto",
        updated_at: "2026-03-24T03:33:49.000000Z",
    },
    products: [
        // --- KATEGORI 1: Matematika & Sains ---
        {
            "id": 1,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Matematika & Sains",
            "name": "Matematika SD/SMP (8 Sesi)",
            "price": 450000,
            "discount_price": 400000,
            "percent_discount": 11,
            "final_price": 400000,
            "image": `${baseUrl}/image/tema_empat_belas/p_1.svg`,
            "description": "<ul><li>Privat 1 on 1, durasi 90 menit/sesi, modul lengkap.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 2,
            "business_id": 13,
            "product_category_id": 1,
            "category": "Matematika & Sains",
            "name": "Fisika & Kimia Intensif SMA",
            "price": 600000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 600000,
            "image": `${baseUrl}/image/tema_empat_belas/p_2.svg`,
            "description": "<ul><li>Bedah rumus dan praktikum sederhana, persiapan ujian sekolah.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 2: Bahasa Inggris Pro ---
        {
            "id": 3,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Bahasa Inggris Pro",
            "name": "General English Speaking",
            "price": 350000,
            "discount_price": 299000,
            "percent_discount": 15,
            "final_price": 299000,
            "image": `${baseUrl}/image/tema_empat_belas/p_3.svg`,
            "description": "<ul><li>Fokus pada percakapan sehari-hari, level Beginner - Intermediate.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 4,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Bahasa Inggris Pro",
            "name": "TOEFL / IELTS Preparation",
            "price": 1200000,
            "discount_price": 950000,
            "percent_discount": 21,
            "final_price": 950000,
            "image": `${baseUrl}/image/tema_empat_belas/p_4.svg`,
            "description": "<ul><li>Inklusif 2x simulasi test dan materi strategi pengerjaan soal.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 3: Programming & IT ---
        {
            "id": 5,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Programming & IT",
            "name": "Web Development (React & NextJS)",
            "price": 2500000,
            "discount_price": 1900000,
            "percent_discount": 24,
            "final_price": 1900000,
            "image": `${baseUrl}/image/tema_empat_belas/p_5.svg`,
            "description": "<ul><li>Belajar dari dasar hingga deploy, free konsultasi selamanya.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 4: Persiapan Ujian / UN ---
        {
            "id": 6,
            "business_id": 13,
            "product_category_id": 4,
            "category": "Persiapan Ujian / UN",
            "name": "Tryout Akbar UTBK-SNBT",
            "price": 50000,
            "discount_price": 25000,
            "percent_discount": 50,
            "final_price": 25000,
            "image": `${baseUrl}/image/tema_empat_belas/p_6.svg`,
            "description": "<ul><li>Simulasi ujian berbasis komputer dan pembahasan PDF.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        // --- KATEGORI 5: Seni & Desain Grafis ---
        {
            "id": 7,
            "business_id": 13,
            "product_category_id": 5,
            "category": "Seni & Desain Grafis",
            "name": "Kursus Desain Canva & Figma",
            "price": 300000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 300000,
            "image": `${baseUrl}/image/tema_empat_belas/p_7.svg`,
            "description": "<ul><li>Membuat aset konten sosial media yang menjual.</li></ul>",
            "has_variant": 1,
            "variants": [
                { "id": 71, "name": "Basic Class", "price": 300000, "discount_price": null, "percent_discount": null, "final_price": 300000 },
                { "id": 72, "name": "Advanced Class", "price": 550000, "discount_price": 450000, "percent_discount": 18, "final_price": 450000 }
            ]
        },

        // --- KATEGORI 6: Bimbingan Konseling ---
        {
            "id": 8,
            "business_id": 13,
            "product_category_id": 6,
            "category": "Bimbingan Konseling",
            "name": "Konsultasi Minat & Bakat",
            "price": 200000,
            "discount_price": 150000,
            "percent_discount": 25,
            "final_price": 150000,
            "image": `${baseUrl}/image/tema_empat_belas/p_8.svg`,
            "description": "<ul><li>Tes psikologi dasar dan sesi tanya jawab karir 60 menit.</li></ul>",
            "has_variant": 0,
            "variants": []
        },

        {
            "id": 9,
            "business_id": 13,
            "product_category_id": 3,
            "category": "Programming & IT",
            "name": "Python for Data Science",
            "price": 1500000,
            "discount_price": null,
            "percent_discount": null,
            "final_price": 1500000,
            "image": `${baseUrl}/image/tema_empat_belas/p_9.svg`,
            "description": "<ul><li>Analisis data menggunakan Pandas, Numpy, dan Matplotlib.</li></ul>",
            "has_variant": 0,
            "variants": []
        },
        {
            "id": 10,
            "business_id": 13,
            "product_category_id": 2,
            "category": "Bahasa Inggris Pro",
            "name": "English for Kids (4 Sesi)",
            "price": 250000,
            "discount_price": 200000,
            "percent_discount": 20,
            "final_price": 200000,
            "image": `${baseUrl}/image/tema_empat_belas/p_10.svg`,
            "description": "<ul><li>Belajar sambil bermain untuk anak usia 5-10 tahun.</li></ul>",
            "has_variant": 0,
            "variants": []
        }
    ]
}
