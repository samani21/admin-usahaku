"use client";

import React, { useEffect, useState } from "react";
import { Get } from "@/utils/Get";
import { BanksType } from "@/types/Admin/Banks";
import ButtonSubmit from "@/Components/CRUD/FormInput/ButtonSubmit";
import FormInput from "@/Components/CRUD/FormInput/FormInput";

// --- TYPES ---
type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: BanksType | null;
    onCancel?: () => void;
};

interface OptionsType {
    label: string;
    value: number;
}

interface FormState {
    account_name: string;
    account_number: string;
    master_bank_id: string | number;
}

interface FormErrors {
    account_name?: string | null;
    account_number?: string | null;
    master_bank_id?: string | null;
}

// ==========================================
// CUSTOM HOOK: Mengambil Data Master Bank
// ==========================================
const useMasterBanks = () => {
    const [banks, setBanks] = useState<OptionsType[]>([]);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await Get<{ success: boolean; data: any[] }>('master-banks?limit=10000');
                if (res?.success && res.data) {
                    const formattedBanks = res.data.map((item) => ({
                        label: item.name,
                        value: item.id,
                    }));
                    setBanks(formattedBanks);
                }
            } catch (error) {
                console.error("Gagal mengambil data bank:", error);
            }
        };

        fetchBanks();
    }, []);

    return { banks };
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const CreateOrUpdateBanks = ({ handleFormSubmit, data, onCancel }: Props) => {
    // Inisialisasi State langsung dari props (jika mode Update)
    const [form, setForm] = useState<FormState>({
        account_name: data?.account_name || "",
        account_number: data?.account_number || "",
        master_bank_id: data?.master_bank_id || "",
    });

    const [error, setError] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    // Ambil data options dari Custom Hook
    const { banks } = useMasterBanks();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        const files = (e.target as HTMLInputElement).files;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "file" && files ? files[0] : value,
        }));

        // Hapus error spesifik saat user mulai mengetik ulang
        if (error[name as keyof FormErrors]) {
            setError((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validasi Input
        const newErrors: FormErrors = {};
        let hasError = false;

        if (!form.account_name) {
            newErrors.account_name = "Nama Akun harus diisi";
            hasError = true;
        }
        if (!form.account_number) {
            newErrors.account_number = "Nomor Akun harus diisi";
            hasError = true;
        }
        if (!form.master_bank_id) {
            newErrors.master_bank_id = "Bank harus dipilih";
            hasError = true;
        }

        if (hasError) {
            setError(newErrors);
            return;
        }

        // 2. Proses Submit
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => {
                if (val !== null && val !== undefined && val !== "") {
                    formData.append(key, String(val));
                }
            });

            await handleFormSubmit(formData, data?.id ?? null);
        } catch (err) {
            console.error("Terjadi kesalahan saat menyimpan data bank:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
                type="text"
                label="Nama Akun"
                name="account_name"
                value={form.account_name}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                error={error.account_name ?? ''}
            />

            <FormInput
                type="number"
                label="Nomor Rekening"
                name="account_number"
                value={form.account_number}
                onChange={handleChange}
                placeholder="Contoh: 1234567890"
                error={error.account_number ?? ''}
            />

            <FormInput
                type="select"
                label="Bank"
                name="master_bank_id"
                value={form.master_bank_id}
                onChange={handleChange}
                options={banks}
                error={error.master_bank_id ?? ''}
            />

            <ButtonSubmit onClose={onCancel} isSubmitting={loading} />
        </form>
    );
};

export default CreateOrUpdateBanks;