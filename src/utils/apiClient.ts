import { getToken } from "@/store/authStore";
import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const getTenantAndOutlet = () => {
    if (typeof window === "undefined") return { tenant: null, outlet: null };

    const host = window.location.hostname;
    const path = window.location.pathname;

    let tenant: string | null = null;
    let outlet: string | null = null;

    // 👉 ambil semua segment path
    const segments = path.split("/").filter(Boolean);

    // 👉 CASE 1: subdomain (toko-sepatu.localhost)
    if (host.includes(".localhost")) {
        tenant = host.split(".")[0];

        // outlet ada di segment pertama
        if (segments.length > 0) {
            outlet = decodeURIComponent(segments[0]);
        }
    }
    // 👉 CASE 2: path (localhost/toko-sepatu/Outlet%201)
    else {
        if (segments.length > 0) {
            tenant = segments[0];
        }

        if (segments.length > 1) {
            outlet = decodeURIComponent(segments[1]);
        }
    }

    return { tenant, outlet };
};
// helper ambil device
const getDevice = () => {
    return {
        device_id: localStorage.getItem("device_id"),
        device_token: localStorage.getItem("customer_token"),
    };
};


// axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
    headers: {
        'Content-Type': undefined,
    },
});

// 🔥 REQUEST INTERCEPTOR
apiClient.interceptors.request.use(async (config) => {
    const token = getToken();

    // ✅ AUTH USER
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ DEVICE
    let { device_id, device_token } = getDevice();

    config.headers["X-Device-Id"] = device_id;
    config.headers["X-Device-Token"] = device_token;

    // ✅ TENANT
    const { tenant, outlet } = getTenantAndOutlet();

    if (tenant) {
        config.headers["X-Tenant"] = tenant;
    }

    if (outlet) {
        config.headers["X-Outlet"] = outlet;
    }

    return config;
});