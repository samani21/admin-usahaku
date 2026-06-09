"use client";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AlertTriangle, Check, ImageIcon, Scissors } from "lucide-react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import ImagePreview from "@/Components/Component/CRUD/FormInput/ImagePreview";
import { CategoriesType } from "@/types/Admin/CategoriesType";
import Alert, { AlertComponent } from "@/Components/Component/Alert";
import { Get } from "@/utils/Get";

type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: CategoriesType | null;
}

interface OptionsType {
    label: string;
    value: number;
}
const selectOptions: OptionsType[] = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
];

const CreateOrUpdate = ({ handleFormSubmit, data }: Props) => {
    const [form, setForm] = useState<any>({
        name: "",
    });
    const [error, setError] = useState<any>({
        name: null
    })
    const [icon, setIcon] = useState<string>('')
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState<OptionsType[]>()


    useEffect(() => {
        setForm({
            name: ''
        })
        if (data) {
            setForm({
                name: data?.name
            });
        }
        getCategories()
    }, [])
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        console.log('name', name, value);
        if (files) {
            setForm((prev: any) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setForm((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const getCategories = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('categorie?limit=10000');
            if (res?.success) {
                console.log('res', res)
                const categories = res?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];

                setCategories(categories);
            }
        } catch (e) {

        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (form?.name == '') {
            setError({
                name: "Nama Kategori harus diisi"
            })
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', form?.name);
        handleFormSubmit(formData, data?.id ?? null)
        setLoading(false);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* TEXT */}
            <FormInput
                type="text"
                label="TEXT"
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Type text"
            />


            {/* NUMBER */}
            <FormInput
                type="number"
                label="NUMBER"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="Type number"
            />

            {/* TEXTAREA */}
            <FormInput
                type="textarea"
                label="TEXTAREA"
                name="textarea"
                value={form.textarea}
                onChange={handleChange}
                placeholder="Type textarea"
            />

            {/* SELECT */}
            <FormInput
                type="select"
                label="SELECT"
                name="select"
                value={form.select}
                onChange={handleChange}
                options={selectOptions}
            />

            {/* AUTOCOMPLETE */}
            <FormInput
                type="autocomplete"
                label="AUTOCOMPLETE"
                name="autocomplete"
                value={form.autocomplete}
                onChange={handleChange}
                options={selectOptions}
            />

            {/* PRICE */}
            <FormInput
                type="price"
                label="PRICE (RUPIAH)"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="100000"
            />

            {/* FILE */}
            <FormInput
                type="file"
                label="FILE"
                name="file"
                onChange={handleChange}
            />

            <FormInput
                type="checkbox"
                label="Checkbox"
                name="is_featured"
                value={form.is_featured}
                onChange={handleChange}
            />

            <FormInput
                type="switch"
                label="Switch"
                name="is_active"
                value={form.is_active}
                onChange={handleChange}
            />

            <FormInput
                type="image"
                label="Image Upload"
                name="thumbnail"
                onChange={handleChange}
            />

            <FormInput
                type="password"
                label="PASSWORD"
                name="password"
                value={form.password ?? ''}
                onChange={handleChange}
                placeholder="Masukkan password"
            />


            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                    }`}
            >
                {loading ? "Loading..." : "SUBMIT"}
            </button>
        </form>
    );
};

export default CreateOrUpdate;
