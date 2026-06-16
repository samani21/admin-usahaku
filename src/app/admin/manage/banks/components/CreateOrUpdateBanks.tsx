"use client";
import React, { useEffect, useState } from "react";
import { Get } from "@/utils/Get";
import { BanksType } from "@/types/Admin/Banks";
import ButtonSubmit from "@/Components/CRUD/FormInput/ButtonSubmit";
import FormInput from "@/Components/CRUD/FormInput/FormInput";

type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: BanksType | null;
    onCancel?: () => void; // Tambahkan props untuk aksi batal
}

interface OptionsType {
    label: string;
    value: number;
}
const CreateOrUpdateBanks = ({ handleFormSubmit, data, onCancel }: Props) => {
    const [form, setForm] = useState<any>({
        account_name: "",
        account_number: "",
        master_bank_id: "",
    });

    const [error, setError] = useState<any>({
        account_name: null,
        account_number: null,
        master_bank_id: null,
    });
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState<OptionsType[]>()

    useEffect(() => {
        setForm({
            account_name: '',
            account_number: '',
            master_bank_id: '',
        })
        if (data) {
            setForm({
                account_name: data?.account_name,
                account_number: data?.account_number,
                master_bank_id: data?.master_bank_id,
            });
        }
        getBanks()
    }, [])
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const files = (e.target as HTMLInputElement).files;
        const checked = (e.target as HTMLInputElement).checked;

        setForm((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" || type === "checkbox" ? checked : files ? files[0] : value,
        }));
    };

    const getBanks = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('master-banks?limit=10000');
            if (res?.success) {
                console.log('res', res)
                const banks = res?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];

                setBanks(banks);
            }
        } catch (e) {

        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi Sederhana
        if (form?.account_name == '') {
            setError({
                account_name: "Nama harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.account_number == '') {
            setError({
                account_number: "Nomor Akun harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.master_bank_id == '') {
            setError({
                master_bank_id: "Bank Harus dipilih"
            })
            setLoading(false);
            return;
        }
        setLoading(true); // Mulai loading (mencegah klik ganda)

        try {
            const formData = new FormData();
            // Append semua data yang diperlukan ke FormData
            Object.keys(form).forEach((key) => {
                if (form[key] !== null && form[key] !== undefined) {
                    formData.append(key, form[key]);
                }
            });

            // Jalankan fungsi submit dari props
            await handleFormSubmit(formData, data?.id ?? null);
        } catch (err) {
            console.error(err);
        } finally {
            // Loading dihentikan setelah proses selesai (baik sukses/gagal)
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
                placeholder="Contoh: Budi"
                error={error?.account_name}
            />


            {/* NUMBER */}
            <FormInput
                type="number"
                label="Nomor Akun"
                name="account_number"
                value={form.account_number}
                onChange={handleChange}
                placeholder="Type number"
                error={error?.account_number}
            />


            {/* SELECT */}
            <FormInput
                type="select"
                label="Bank"
                name="master_bank_id"
                value={form.master_bank_id}
                onChange={handleChange}
                options={banks}
                error={error.master_bank_id}
            />

            <ButtonSubmit onClose={onCancel} isSubmitting={loading} />
        </form>
    );
};

export default CreateOrUpdateBanks;