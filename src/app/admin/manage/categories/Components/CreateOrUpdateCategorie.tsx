"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import IconAutocomplete from "./IconAutocomplete";
import { AlertTriangle, Check, ImageIcon, Scissors } from "lucide-react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { CategoriesType } from "@/types/Admin/CategoriesType";
import FormInput from "@/Components/CRUD/FormInput/FormInput";
import ImagePreview from "@/Components/CRUD/FormInput/ImagePreview";
import { AlertComponent } from "@/Components/Alert";
import ButtonSubmit from "@/Components/CRUD/FormInput/ButtonSubmit";

type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: CategoriesType | null;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    onCancel: () => void;
}

interface AlertType {
    isOpen: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

interface OptionsType {
    label: string;
    value: number;
}


const CreateOrUpdateCategorie = ({ handleFormSubmit, data, loading, setLoading, onCancel }: Props) => {
    const [form, setForm] = useState<any>({
        name: "",
    });
    const [error, setError] = useState<any>({
        name: null
    })
    const [icon, setIcon] = useState<string>('')

    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('')
    const [fileImage, setFileImage] = useState<any>();
    const [alert, setAlert] = useState<AlertType | null>(null)
    useEffect(() => {
        setForm({
            name: ''
        })
        if (data) {
            setForm({
                name: data?.name,
                color: data?.color
            });
            if (data?.icon?.startsWith("http")) {
                setPreviewImage(data?.icon)
            } else {
                setIcon(data?.icon ?? '')
            }
        }
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

        if (icon && (fileImage || previewImage)) {
            setAlert({
                type: "error",
                message: "Icon pilih satu aja",
                isOpen: true,
            })
            setLoading(false);
            return;
        }
        if (icon && form.color == '') {
            setError({
                color: "Warna icon harus dipilih"
            })
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', form?.name);
        if (fileImage) {
            formData.append('icon', fileImage);
        } else {
            if (icon) {
                formData.append('icon', icon);
            }
            if (form.color) {
                formData.append('color', form.color);
            }
        }
        handleFormSubmit(formData, data?.id ?? null)
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result as string);
                setIsCropping(true); // Buka UI cropper
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((_area: any, areaPixels: any) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleApplyCrop = async () => {
        try {
            if (imageToCrop && croppedAreaPixels) {
                const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
                const croppedFile = new File([croppedBlob], "category_image.jpg", { type: 'image/jpeg' });
                const newPreviewUrl = URL.createObjectURL(croppedBlob);
                setPreviewImage(newPreviewUrl);
                setFileImage(croppedFile);
                setIsCropping(false);
                setImageToCrop(null);
            }
        } catch (e) {
            // console.error(e);
        }
    };
    return (
        <>
            {isCropping && imageToCrop && (
                <div className="absolute inset-0 z-[100] bg-zinc-900 flex flex-col">
                    <div className="p-4 bg-zinc-800 text-white flex justify-between items-center">
                        <span className="flex items-center gap-2"><Scissors size={18} /> Potong Gambar</span>
                        <div className="flex gap-2">
                            <button onClick={() => setIsCropping(false)} className="px-3 py-1 bg-gray-600 rounded">Batal</button>
                            <button onClick={handleApplyCrop} className="px-3 py-1 bg-blue-600 rounded flex items-center gap-1">
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
            )}
            <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-gray-50">
                <FormInput
                    type="text"
                    label="Nama"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Type text"
                    required
                    error={error?.name}
                />
                <div>
                    <IconAutocomplete
                        value={icon}
                        onChange={(val) => setIcon(val)}
                        handleDelete={() => setIcon('')}
                    />
                    <p className="text-xs text-gray-500">
                        Pilih icon (opsional). Bisa pilih icon atau upload gambar.
                    </p>
                    {
                        icon &&
                        <FormInput
                            type="color"
                            label="Warna"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            placeholder="Type text"
                            required
                            error={error?.color}
                        />
                    }
                </div>
                <div className="flex items-center text-gray-500 gap-4">
                    <div className="border border-gray-400 w-full" />
                    <p>Atau</p>
                    <div className="border border-gray-400 w-full" />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-800 flex items-center">
                        <ImageIcon size={16} className="mr-1 text-zinc-500" /> Gambar Kategori
                    </label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        className={`w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150`}
                        accept="image/*"
                    />
                    <ImagePreview imageUrl={previewImage} fileName="" handleDeleteImage={() => {
                        setPreviewImage('')
                        setFileImage(null)
                    }} />
                    {/* {errors.imagePreviewUrl && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertTriangle size={14} className="mr-1" /> {errors.imagePreviewUrl}
                        </p>
                    )} */}
                    <p className="text-xs text-gray-500">
                        Upload gambar (opsional). Boleh hanya icon, hanya gambar, atau kosong keduanya.
                    </p>
                </div>
                {
                    alert?.isOpen &&
                    <div className=" w-full max-w-xl">
                        <AlertComponent
                            type={alert?.type}
                            message={alert?.message}
                            onClose={() => setAlert(null)}
                        />
                    </div>
                }
                <ButtonSubmit onClose={onCancel} isSubmitting={loading} />
            </form>

        </>
    );
};

export default CreateOrUpdateCategorie;
