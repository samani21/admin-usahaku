"use client"
import ButtonSubmit from '@/Components/CRUD/FormInput/ButtonSubmit';
import FormInput from '@/Components/CRUD/FormInput/FormInput';
import ImagePreview from '@/Components/CRUD/FormInput/ImagePreview';
import ToggleSwitch from '@/Components/ui/ToggleSwitch';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Errors, initialErrors, initialProductState, ProductForm, ProductsType, Variant, VariantErrors } from '@/types/Admin/ProductsType';
import { getCroppedImg } from '@/utils/cropImage';
import { Get } from '@/utils/Get';
import { Check, ImageIcon, NotebookPen, Plus, PlusCircle, Save, Scissors, Trash2, XCircle } from 'lucide-react';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop';
import { json } from 'stream/consumers';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData, id: number | null) => void;
    dataUpdate?: ProductsType | null;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}
interface OptionsType {
    label: string;
    value: number;
}
const ProductFormModalContent = ({ isOpen, onClose, onSubmit, dataUpdate, loading }: Props) => {
    const [productData, setProductData] = useState<ProductForm>(initialProductState);
    const [errors, setErrors] = useState<Errors>(initialErrors);
    const [deleteVariants, setDeleteVariants] = useState<number[]>([]);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [idVariant, setIdVariant] = useState<number | null>(null);
    const [categories, setCategories] = useState<OptionsType[]>();
    console.log('productData', productData)
    const resetForm = useCallback(() => {
        // Membersihkan URL pratinjau utama
        if (productData.imagePreviewUrl) URL.revokeObjectURL(productData.imagePreviewUrl);
        // Membersihkan URL pratinjau varian
        productData.variants.forEach(v => {
            if (v.imagePreviewUrl) URL.revokeObjectURL(v.imagePreviewUrl);
        });

        setProductData(initialProductState);
        setErrors(initialErrors);
        setImageToCrop(null);
        setIsCropping(false);
    }, [productData.imagePreviewUrl, productData.variants]);

    // Efek untuk membersihkan URL saat modal ditutup
    useEffect(() => {
        getCategories()
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen, resetForm]);

    useEffect(() => {
        if (dataUpdate) {
            const mappedVariants: Variant[] = dataUpdate?.variants?.map((v) => ({
                name: v?.name || "",
                price: v?.price ?? "",
                id: v?.id ?? 0,
                image: null, // saat edit, file belum di-upload ulang
                imagePreviewUrl: v?.image || null,
            })) || [];
            setProductData({
                name: dataUpdate?.name,
                description: dataUpdate?.description,
                price: dataUpdate?.price,
                category: dataUpdate?.product_category_id ?? null,
                image: null,
                imagePreviewUrl: dataUpdate?.image,
                has_variant: dataUpdate?.has_variant ? 1 : 0,
                variants: mappedVariants,
                is_qty: dataUpdate?.is_qty ?? false
            })
        }
    }, [dataUpdate])
    const onCropComplete = useCallback((_area: any, areaPixels: any) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleApplyCrop = async (idVariant: number | null) => {
        try {
            if (imageToCrop && croppedAreaPixels) {
                const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
                const croppedFile = new File([croppedBlob], "product_image.jpg", { type: 'image/jpeg' });
                const newPreviewUrl = URL.createObjectURL(croppedBlob);
                if (idVariant) {
                    console.log('idVariant', idVariant - 1, newPreviewUrl)
                    setProductData(prev => {
                        const newVariants = [...prev.variants];
                        const currentVariant = newVariants[idVariant - 1];

                        newVariants[idVariant - 1] = {
                            ...currentVariant,
                            image: croppedFile,
                            imagePreviewUrl: newPreviewUrl
                        } as Variant;

                        return { ...prev, variants: newVariants };
                    });

                    setIdVariant(null)
                } else {
                    setProductData(prev => {
                        // Hapus URL pratinjau lama jika ada
                        if (prev.imagePreviewUrl) URL.revokeObjectURL(prev.imagePreviewUrl);

                        const newState: ProductForm = {
                            ...prev,
                            image: croppedFile,
                            imagePreviewUrl: newPreviewUrl,
                        };
                        return newState;
                    });
                }
                setIsCropping(false);
                setImageToCrop(null);
            }
        } catch (e) {
            console.error(e);
        }
    };
    if (!isOpen) return null;

    // Penanganan Input Dasar (text/number/textarea)
    const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let newValue: string | number = value;
        if (type === 'number') {
            // Simpan sebagai string kosong jika input kosong
            newValue = value === '' ? '' : value;
        }

        setProductData(prev => ({
            ...prev,
            [name]: newValue,
        }));

        // HANYA hapus error untuk bidang ini
        setErrors(prev => ({
            ...prev,
            [name as keyof Errors]: '',
        }));
    };

    // Penanganan Toggle Switch
    const handleVariantToggle = (isChecked: boolean) => {
        const newValue = isChecked ? 1 : 0;
        setProductData(prev => ({
            ...prev,
            has_variant: newValue,
            // Jika diaktifkan, tambahkan varian pertama
            variants: newValue === 1 ? [{ name: '', price: '', image: null, imagePreviewUrl: null }] : []
        }));

        // Reset semua error karena struktur form berubah
        setErrors(initialErrors);
    };

    // Penanganan Input File Utama
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, idVariant: number | null) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result as string);
                setIsCropping(true); // Buka UI cropper
                if (idVariant) {
                    setIdVariant(idVariant)
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Penanganan Input Varian (termasuk file varian)
    const handleVariantChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setProductData(prev => {
            const newVariants = [...prev.variants];
            const currentVariant = newVariants[index];

            let newPreviewUrl: string | null = currentVariant.imagePreviewUrl;

            if (type === 'file') {
                const file = (e.target as HTMLInputElement).files?.[0] || null;

                // Hapus URL pratinjau lama jika ada
                if (newPreviewUrl) URL.revokeObjectURL(newPreviewUrl);
                newPreviewUrl = file ? URL.createObjectURL(file) : null;

                newVariants[index] = {
                    ...currentVariant,
                    [name]: file,
                    imagePreviewUrl: newPreviewUrl
                } as Variant;

            } else if (type === 'number') {
                const numericValue = value === '' ? '' : value;
                newVariants[index] = { ...currentVariant, [name]: numericValue } as Variant;
            } else {
                newVariants[index] = { ...currentVariant, [name]: value } as Variant;
            }

            return { ...prev, variants: newVariants };
        });

        // HANYA hapus error untuk bidang varian ini
        setErrors(prev => {
            const newVariantErrors = [...prev.variants];
            if (!newVariantErrors[index]) {
                newVariantErrors[index] = { name: '', price: '', stock: '' };
            }
            (newVariantErrors[index] as VariantErrors)[name as keyof VariantErrors] = '';
            return { ...prev, variants: newVariantErrors };
        });
    };

    // Penambahan/Penghapusan Varian
    const addVariant = () => {
        setProductData(prev => ({
            ...prev,
            variants: [...prev.variants, { name: '', price: '', stock: '', image: null, imagePreviewUrl: null }],
        }));
    };

    const removeVariant = (index: number) => {
        setProductData(prev => {
            const variantToRemove = prev.variants[index];
            // Hapus URL pratinjau untuk varian yang dihapus
            if (variantToRemove.imagePreviewUrl) URL.revokeObjectURL(variantToRemove.imagePreviewUrl);

            const newVariants = prev.variants.filter((_, i) => i !== index);
            return { ...prev, variants: newVariants };
        });

        // Perbarui array error varian
        setErrors(prev => {
            const newVariantErrors = prev.variants.filter((_, i) => i !== index);
            return { ...prev, variants: newVariantErrors };
        });
    };

    // Penanganan Submit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validasi Penuh HANYA dijalankan saat submit
        // const { isValid, errors: validationErrors } = validateForm(productData);
        // setErrors(validationErrors);

        // if (!isValid) {
        //     console.error("Validasi gagal. Periksa pesan kesalahan pada formulir.");
        //     return;
        // }

        // Lanjutkan jika valid: Konversi ke FormData
        const formData = new FormData();

        // Tambahkan field produk dasar
        formData.append('name', productData.name);
        formData.append('description', productData.description ?? '');
        if (productData.category) {
            formData.append('product_category_id', String(productData.category));
        }
        formData.append('price', (productData.price === '' ? 0 : productData.price).toString());
        formData.append('has_variant', productData.has_variant.toString());
        formData.append('is_qty', productData.is_qty ? "1" : "0");

        // Tambahkan gambar utama (jika ada)
        if (productData.image) {
            formData.append('image', productData.image, productData.image.name);
        }

        // Tambahkan data varian
        if (productData.has_variant === 1) {
            for (let i = 0; i < productData?.variants?.length; i++) {
                if (productData?.variants[i]?.id) {
                    formData.append(`variants[${i}][id]`, String(productData?.variants[i]?.id));
                }
                formData.append(`variants[${i}][name]`, productData?.variants[i]?.name);
                formData.append(`variants[${i}][price]`, String(productData?.variants[i]?.price));
                if (productData?.variants[i]?.image) {
                    // formData.append(`image`, productData?.variants[i]?.image, productData?.variants[i]?.image.name);
                    formData.append(`variants[${i}][image]`, productData?.variants[i]?.image as File);
                }
            }
            for (let d = 0; d < deleteVariants?.length; d++) {
                formData.append(`delete_variants[${d}]`, String(deleteVariants[d]));

            }
        }

        onSubmit(formData, dataUpdate?.id ?? null);
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

    const hasVariants = productData.has_variant === 1;
    const isSaveDisabled = hasVariants && productData.variants.length === 0;


    return (
        <>
            {isCropping && imageToCrop ? (
                <div className="inset-0 z-[100] h-[80vh] bg-zinc-900 flex flex-col">
                    <div className="p-4 bg-zinc-800 text-white flex justify-between items-center">
                        <span className="flex items-center gap-2"><Scissors size={18} /> Potong Gambar</span>
                        <div className="flex gap-2">
                            <button onClick={() => setIsCropping(false)} className="px-3 py-1 bg-gray-600 rounded">Batal</button>
                            <button onClick={() => handleApplyCrop(idVariant)} className="px-3 py-1 bg-blue-600 rounded flex items-center gap-1">
                                <Check size={16} /> Gunakan
                            </button>
                        </div>
                    </div>
                    <div className="relative flex-1 bg-zinc-900">
                        <Cropper
                            image={imageToCrop}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1} // Atur aspek ratio (1:1 untuk kotak)
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="p-6 bg-zinc-800">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-center text-white text-xs mt-2">Geser untuk Zoom</p>
                    </div>
                </div>
            ) :
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Bagian Informasi Produk Dasar */}
                    <section className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 rounded-xl">
                            <FormInput
                                label="Nama Produk"
                                type="text"
                                name="name"
                                value={productData.name ?? ''}
                                onChange={handleProductChange}
                                error={errors.name}
                                required
                            />
                            <FormInput
                                label="Harga Utama (Rp)"
                                type="price"
                                name="price"
                                value={productData.price ?? 0}
                                onChange={handleProductChange}
                                error={errors.price}
                                min={0}
                                required
                            />
                            <FormInput
                                type="autocomplete"
                                label="Kategori"
                                name="category"
                                value={productData.category ?? null}
                                onChange={handleProductChange}
                                options={categories}
                            />

                            {/* Input Gambar Utama + Pratinjau */}
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="image" className="text-sm font-medium text-gray-800 flex items-center">
                                    <ImageIcon size={16} className="mr-1 text-zinc-500" /> Gambar Utama (Opsional)
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, null)}
                                    className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150"
                                    accept="image/*"
                                />
                                <ImagePreview imageUrl={productData.imagePreviewUrl} fileName={productData.image?.name} />
                            </div>

                            <div className="col-span-1">
                                <FormInput
                                    label="Deskripsi"
                                    type="wysiwyg"
                                    name="description"
                                    value={productData.description ?? ''}
                                    onChange={handleProductChange}
                                />
                            </div>
                            <FormInput
                                type="switch"
                                label="Aktifkan Fitur Quantity"
                                name="is_qty"
                                value={productData.is_qty}
                                onChange={handleProductChange}
                            />
                        </div>
                    </section>

                    {/* Pemilih Varian - TOGGLE SWITCH */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-700 border-b-2 border-zinc-300 pb-2">
                            Opsi Varian
                        </h3>
                        <div className="p-4 bg-zinc-100 rounded-xl border border-zinc-300">
                            <ToggleSwitch
                                label="Produk ini memiliki varian?"
                                checked={productData.has_variant === 1}
                                onChange={handleVariantToggle}
                            />
                        </div>
                    </section>

                    {/* Bagian Varian (Hanya Tampil Jika has_variant = 1) */}
                    {productData.has_variant === 1 && (
                        <section className="space-y-4">
                            <div className="md:flex justify-between items-center">
                                <h3 className="text-xl font-bold text-zinc-700">Detail Varian Produk ({productData.variants.length})</h3>
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="flex items-center space-x-2 px-4 py-2 bg-zinc-700 text-white font-semibold rounded-full shadow-md hover:bg-zinc-800 transition duration-200 disabled:opacity-50"
                                    disabled={productData.variants.length >= 10} // Batasan varian
                                >
                                    <PlusCircle size={18} />
                                    <span>Tambah Varian</span>
                                </button>
                            </div>

                            {productData.variants.map((variant, index) => (
                                <div
                                    key={index}
                                    className="p-5 border border-zinc-400 rounded-xl bg-zinc-100 relative transition duration-200 ease-in-out hover:shadow-lg hover:shadow-zinc-200"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-extrabold text-lg text-zinc-800">Varian: {variant.name || `Varian #${index + 1}`}</h4>

                                        {/* Tombol Hapus Varian */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeVariant(index)
                                                const id = variant?.id;
                                                if (!id) return;
                                                setDeleteVariants((prev) => [...prev, id]);

                                            }}
                                            className="p-2 text-red-500 bg-red-100 rounded-full hover:bg-red-200 hover:text-red-700 transition"
                                            aria-label={`Hapus Varian ${index + 1}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Input Nama Varian */}
                                        <FormInput
                                            label="Nama Varian"
                                            type="text"
                                            name="name"
                                            value={variant.name}
                                            onChange={(e) => handleVariantChange(index, e)}
                                            error={errors.variants[index]?.name}
                                            required
                                        />
                                        {/* Input Harga Varian */}
                                        <FormInput
                                            label="Harga (Rp)"
                                            type="price"
                                            name="price"
                                            value={variant.price}
                                            onChange={(e) => handleVariantChange(index, e)}
                                            error={errors.variants[index]?.price}
                                            min={0}
                                            required
                                        />

                                        {/* Input Gambar Varian (File) + Pratinjau */}
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor={`variant-image-${index}`} className="text-sm font-medium text-gray-800 flex items-center">
                                                <ImageIcon size={16} className="mr-1 text-zinc-500" /> Gambar Varian (Opsional)
                                            </label>

                                            <input
                                                id={`variant-image-${index}`}
                                                type="file"
                                                name="image"
                                                onChange={(e) => handleFileChange(e, index + 1)}
                                                className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150"
                                                accept="image/*"
                                            />
                                            <ImagePreview imageUrl={variant.imagePreviewUrl} fileName={variant.image?.name} />
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </section>
                    )}

                    {/* Footer Form / Tombol Submit */}
                    <ButtonSubmit onClose={onClose} isSubmitting={loading} />

                    {isSaveDisabled && (
                        <p className="text-sm text-red-500 text-right mt-2 font-semibold">
                            *Harap tambahkan minimal satu varian jika fitur varian diaktifkan.
                        </p>
                    )}
                </form>}
        </>
    );
};

export default ProductFormModalContent