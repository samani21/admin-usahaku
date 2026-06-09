"use client";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Get } from "@/utils/Get";
import { ProductStockType } from "@/types/Admin/ProductStockType";
import { ProductsType } from "@/types/Admin/ProductsType";
import ButtonSubmit from "@/Components/Component/CRUD/FormInput/ButtonSubmit";

type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: ProductStockType | null;
    loading: boolean;
    onCancel: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

interface OptionsType {
    label: string;
    value: string;
}
const selectOptions: OptionsType[] = [
    { label: "Tambah Stock", value: 'restock' },
    { label: "Penyesuaian", value: 'adjustment' },
];

const CreateOrUpdateProductStock = ({ handleFormSubmit, data, loading, setLoading, onCancel }: Props) => {
    const [form, setForm] = useState<any>({
        outlet_id: "",
        product_id: "",
        date: "",
        product_varian_id: "",
        stock: "",
        reference_type: "",
        note: "",
    });
    const [error, setError] = useState<any>({
        product_id: null,
        outlet_id: null,
        date: null,
        product_varian_id: null,
        stock: null,
        reference_type: null,
        note: null,
    })

    const [productOption, setProductOptions] = useState<OptionsType[]>()
    const [outletOption, setOutletOption] = useState<OptionsType[]>()
    const [products, setProducts] = useState<ProductsType[]>()

    useEffect(() => {
        setForm({
            product_id: '',
            outlet_id: '',
            product_variant_id: '',
            stock: '',
            reference_type: '',
            note: '',
            date: '',
        })
        if (data) {
            setForm({
                product_id: data?.product_id,
                product_variant_id: data?.product_variant_id,
                stock: data?.stock,
                reference_type: data?.reference_type,
                note: data?.note,
                date: data?.date
            });
        }
        getProduct()
        getOutlet()
    }, [])
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
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
    const getProduct = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('products?limit=10000');
            if (res?.success) {
                const productStock = res?.data?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];
                setProducts(res?.data?.data);
                setProductOptions(productStock);
            }
        } catch (e) {

        }
    }

    const getOutlet = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('outlet?limit=10000');
            if (res?.success) {
                const outlets = res?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];
                setOutletOption(outlets);
                if (outlets?.length === 1) {
                    setForm((prev: any) => ({
                        ...prev,
                        outlet_id: outlets[0]?.v,
                    }));
                }
            }
        } catch (e) {

        }
    }

    const variantOptions = useMemo(() => {
        const product = products?.find((p) => p?.id === form?.product_id)?.variants
        return product?.map((item: any) => ({
            label: item.name,   // sesuaikan dengan field API
            value: item.id,
        })) ?? [];
    }, [form.product_id])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (form?.product_id == "") {
            setError({
                product_id: "Product harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.outlet_id == "" || form?.outlet_id === 'undefined') {
            setError({
                outlet_id: "Outlet harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.date == "") {
            setError({
                date: "Tanggal harus diisi"
            })
            setLoading(false);
            return;
        }
        if (variantOptions?.length > 0 && form?.product_variant_id == "") {
            setError({
                product_variant_id: "Variant harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.stock == "") {
            setError({
                stock: "stock harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.reference_type == "") {
            setError({
                reference_type: "Reference harus diisi"
            })
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('product_id', form?.product_id);
        formData.append('product_variant_id', form?.product_variant_id ?? null);
        formData.append('stock', form?.stock);
        formData.append('outlet_id', form?.outlet_id);
        formData.append('date', form?.date);
        formData.append('reference_type', form?.reference_type);
        formData.append('note', form?.note);
        handleFormSubmit(formData, data?.id ?? null)
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
                type="autocomplete"
                label="Product"
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                options={productOption}
                error={error?.product_id}
            />
            {
                variantOptions?.length > 0 &&
                <FormInput
                    type="autocomplete"
                    label="Produk Variant"
                    name="product_variant_id"
                    value={form.product_variant_id}
                    onChange={handleChange}
                    options={variantOptions}
                    error={error?.product_variant_id}
                />

            }
            <FormInput
                type="autocomplete"
                label="Outlet"
                name="outlet_id"
                value={form.outlet_id}
                onChange={handleChange}
                options={outletOption}
                error={error?.outlet_id}
            />
            {/* NUMBER */}
            <FormInput
                type="number"
                label="Stock"
                name="stock"
                value={form.stock ?? 0}
                onChange={handleChange}
                placeholder="Type number"
                error={error?.stock}
            />
            <FormInput
                type="date"
                label="Tanggal"
                name="date"
                value={form.date ?? 0}
                onChange={handleChange}
                error={error?.date}
            />
            <FormInput
                type="select"
                label="Reference"
                name="reference_type"
                value={form.reference_type}
                onChange={handleChange}
                options={selectOptions}
                error={error?.reference_type}
            />
            {
                form.reference_type === 'adjustment' &&
                <FormInput
                    type="textarea"
                    label="Catatan"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    error={error?.note}
                />
            }
            <ButtonSubmit onClose={onCancel} isSubmitting={loading} />
        </form>
    );
};

export default CreateOrUpdateProductStock;
