"use client"
import DataTable from "@/Components/Component/CRUD/DataTable";
import FilterComponent from "@/Components/Component/CRUD/FilterComponent";
import ModalDelete from "@/Components/Component/CRUD/ModalDelete";
import { ProductsType } from "@/types/Admin/ProductsType";
import { Meta } from "@/types/Public";
import { Delete } from "@/utils/Delete";
import { Get } from "@/utils/Get";
import { Post } from "@/utils/Post";
import React, { useState, useMemo, useEffect, useCallback, ReactElement } from "react";
import ProductFormModalContent from "./ProductFormModalContent";
import BusinessDataModal from "@/Components/Component/BusinessDataModal";
import ModalCrud from "@/Components/Component/CRUD/ModalCrud";
import Alert from "@/Components/Component/Alert";
import { AlertType } from "@/types/Alert";
import { Column } from "@/types/Admin/CRUD";
import { Edit, Trash2Icon } from "lucide-react";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import ModalConfirmPromo from "./ModalConfirmPromo";
import ConfirmPromo from "./ConfirmPromo";
import Loading from "@/Components/Component/Loading";
import { QRCodeCanvas } from "qrcode.react";
import { OutletsType } from "@/types/Admin/OutletType";
import GlassCard from "@/Components/Layout/GlassCard";
import ModalDetailQRCode from "./ModalDetailQRCode";

interface datatype {
    data: ProductsType[];
    outlets: OutletsType[];
}
export default function ListProductPage() {
    const [search, setSearch] = useState("");
    const [dateRangeText, setDateRangeText] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [dataUpdate, setDataUpdate] = useState<ProductsType | null>(null)
    const [deleteData, setDeleteData] = useState<ProductsType | null>(null)
    const [products, setProducts] = useState<ProductsType[]>([]);
    const [outlets, setOutlets] = useState<OutletsType[]>([]);
    const [selectOutlet, setSelectOutlet] = useState<string>('Semua');
    const [error, setError] = useState<string>('');
    const [openModalConfirm, setOpenModalConfirm] = useState<ProductsType | null>(null);
    const [stepsPromo, setStepsPromo] = useState<number | null>(null);
    const [openModalQRCode, setOpenModalQRCode] = useState<ProductsType | null>(null)
    const [meta, setMeta] = useState<Meta>({
        last_page: 1,
        limit: 10,
        page: 1,
        total: 0,
    });
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [showAlert, setShowAlert] = useState<AlertType | null>(null)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(handler);

    }, [search]);

    const parsedDate = useMemo(() => {
        if (!dateRangeText.includes(" - ")) {
            return { start_date: "", end_date: "" };
        }

        const monthMap: Record<string, string> = {
            Januari: "01",
            Februari: "02",
            Maret: "03",
            April: "04",
            Mei: "05",
            Juni: "06",
            Juli: "07",
            Agustus: "08",
            September: "09",
            Oktober: "10",
            November: "11",
            Desember: "12",
        };

        const formatDate = (dateStr: string) => {
            const [day, month, year] = dateStr.trim().split(" ");

            return `${year}-${monthMap[month]}-${day.padStart(2, "0")}`;
        };

        const [start, end] = dateRangeText.split(" - ");

        return {
            start_date: formatDate(start),
            end_date: formatDate(end),
        };
    }, [dateRangeText]);


    const queryString = useMemo(() => {
        let pages = 0
        if (debouncedSearch?.trim() != '') {
            pages = 1
            setPage(1)
        }
        const params = {
            page: pages > 0 ? pages : page,
            limit: itemsPerPage,
            search: debouncedSearch,
            start_date: parsedDate.start_date || "",
            end_date: parsedDate.end_date || "",
        };

        return (
            "?" +
            Object.entries(params)
                .map(([key, value]) => `${key}=${encodeURIComponent(value ?? "")}`)
                .join("&") + `&outlet=${selectOutlet == 'Semua' ? "" : selectOutlet}`
        );
    }, [parsedDate, page, debouncedSearch, itemsPerPage, selectOutlet]);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: datatype; meta: Meta }>(
                `/products${queryString}`
            );

            if (res?.success) {
                setProducts(res.data?.data);
                setOutlets(res.data?.outlets);
                setMeta(res.meta);
                setLoading(false)
            }
        } catch (err: any) {
            setError(err?.message)
            setLoading(false)
        }
        setLoading(false)
    }, [queryString]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, page, selectOutlet]);

    // Komponen (handleFormSubmit) (Perbaikan: Kirim formData asli)

    const handleFormSubmit = async (formData: FormData, id: number | null) => {
        setLoading(true)
        try {
            if (id) {
                const res = await Post(`/products/${id}`, formData);
                if (res) {
                    fetchProducts()
                    setDataUpdate(null)
                    setIsModalOpen(false);
                    setShowAlert({
                        type: 'success',
                        message: 'Berhasil update data',
                        isOpen: true
                    })
                    setLoading(false)
                }
            } else {
                const res = await Post('/products', formData);
                if (res) {
                    fetchProducts()
                    setIsModalOpen(false);
                    setShowAlert({
                        type: 'success',
                        message: 'Berhasil simpan data',
                        isOpen: true
                    })
                    setLoading(false)
                }
            }
        } catch (err: any) {
            setShowAlert({
                type: 'error',
                message: 'Gagal proses data ' + err.message,
                isOpen: true
            })
            setLoading(false)
            console.log(err.message || "Gagal mengambil data");
        }
    };
    const onDelete = async (id: number | null) => {
        setLoading(true)
        setIsModalOpen(false)
        setDeleteData(null)
        try {
            const res = await Delete(`/products/${id}`);
            if (res) {
                fetchProducts();
                setDeleteData(null)
                setIsModalOpen(false);
                setShowAlert({
                    type: 'success',
                    message: 'Berhasil hapus data',
                    isOpen: true
                })

                setLoading(false)
            }
        } catch (err: any) {
            setShowAlert({
                type: 'error',
                message: 'Gagal proses data ' + err.message,
                isOpen: true
            })
            setLoading(false)
            console.log(err.message || "Gagal mengambil data");
        }
    };

    const handleResetFilter = () => {
        setSearch("");
        setDateRangeText("");
    };

    const handleEdit = (row: ProductsType) => {
        setIsModalOpen(true)
        setDataUpdate(row)
    }
    const handleDelete = (row: ProductsType) => {
        setIsModalOpen(true)
        setDeleteData(row)
    }

    const columns: Column<ProductsType>[] = useMemo(
        () => [
            {
                key: "image",
                label: "Gambar",
                width: "200px",
                render: (row) =>
                    <img src={row.image} className="w-32 rounded-md" />,
            },
            {
                key: "name",
                label: "Nama Produk",
            },
            {
                key: "category",
                label: "Nama Kategori",
                render: (row) => row?.category ?? ''
            },
            {
                key: "description",
                label: "Deskripsi",
                render: (row) => {
                    // 1. Ambil string HTML dari description
                    const htmlContent = row.description || "";

                    // 2. Hilangkan semua tag HTML menggunakan Regex
                    const plainText = htmlContent.replace(/<[^>]*>/g, "");

                    // 3. Cek panjang teks yang sudah bersih
                    if (!plainText || plainText.trim() === "") return "-";

                    return plainText.length > 50
                        ? plainText.slice(0, 50) + "..."
                        : plainText;
                }
            },
            {
                key: "has_variant",
                label: "Varian :stock",
                render: (row) =>
                    row.variants?.map((v, i) => (
                        <b key={i}>
                            {v.name} : {v?.stock ?? 0}
                            {row.variants.length !== i + 1 && <br />}
                        </b>
                    )),
            },

            {
                key: "price",
                label: "Harga",
                align: "right",
                width: "200",
                render: (row) => `Rp ${row.price.toLocaleString("id-ID")}`,
            },

            {
                key: "stock",
                label: "Stok",
                render: (row) => (row.product_stock ?? 0).toLocaleString("id-ID"),
            },
            {
                key: "qrcode",
                label: "qrcode",
                width: "200",
                render: (row) => (
                    <div className="font-semibold" onClick={() => setOpenModalQRCode(row)}>
                        Lihat Qr Code Produk
                    </div>
                ),
            },
            {
                key: "is_active",
                label: "Status",
                align: "center",
                render: (row: any) => {
                    const statusColor =
                        row.is_active === 1
                            ? "bg-green-100 text-green-800"
                            : row.is_active === 2
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"

                    return (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                            {row.is_active === 1 ? "Active" : row.is_active === 2 ? "Diblokir" : "Tidak Aktif"}
                        </span>
                    )
                }
            },
            {
                key: "is_promo",
                label: "Promo",
                align: "center",
                render: (row) => (
                    <FormInput
                        type="switch"
                        label=""
                        name="is_active"
                        value={row?.discount_price}
                        onChange={() => setOpenModalConfirm(row)}
                    />
                ),
            },
            {
                key: "is_available",
                label: "Tersedia",
                align: "center",
                render: (row) => (
                    <FormInput
                        type="switch"
                        label=""
                        name="is_active"
                        value={true}
                        onChange={() => { }}
                    />
                ),
            },
            {
                key: "actions",
                label: "Aksi",
                align: "center",
                render: (row) => (
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => handleEdit(row)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <Edit size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(row)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2Icon size={18} />
                        </button>
                    </div>
                ),
            },
        ],
        [handleEdit, handleDelete]
    );

    if (stepsPromo === 2) {
        return <ConfirmPromo productInfo={openModalConfirm} onBack={() => { setStepsPromo(1), setOpenModalConfirm(null) }} fetchProducts={fetchProducts} />
    }
    return (
        <div className="space-y-4">
            <FilterComponent
                search={search}
                setSearch={setSearch}
                dateRangeText={dateRangeText}
                setDateRangeText={setDateRangeText}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setPage={setPage}
                handleReset={handleResetFilter}
                setIsModalOpenForm={setIsModalOpen}
            />
            <GlassCard className="p-4 overflow-x-auto">
                <div className="flex items-center gap-4 overflow-x-auto text-slate-800">
                    <div onClick={() => setSelectOutlet("Semua")} className={`${selectOutlet === 'Semua' ? 'font-semibold border-b-3 px-2 border-emerald-500' : ''} cursor-pointer`}>
                        Semua
                    </div>
                    {
                        outlets?.map((o, i) => (
                            <div key={i} onClick={() => setSelectOutlet(o?.name)} className={`${selectOutlet === o?.name ? 'font-semibold border-b-3 px-2 border-emerald-500' : ''} cursor-pointer`}>
                                {o?.name}
                            </div>
                        ))
                    }
                </div>
            </GlassCard>
            <div className="mt-6">
                <DataTable
                    data={products}
                    columns={columns}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    total={meta.total}
                    onPageChange={(p) => setPage(p)}
                    loading={loading}
                    error={error}
                />
            </div>
            {
                deleteData ?
                    <ModalDelete
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false)
                            setDeleteData(null)
                        }}
                        deleteData={deleteData}
                        handleDelete={onDelete} /> :
                    <ModalCrud isOpen={isModalOpen} title={(dataUpdate ? "Edit" : "Tambah") + ' Produk'} onClose={() => {
                        setIsModalOpen(false)
                        setDataUpdate(null)
                    }}>
                        <ProductFormModalContent
                            isOpen={isModalOpen}
                            onClose={() => {
                                setIsModalOpen(false)
                                setDataUpdate(null)
                            }}
                            onSubmit={handleFormSubmit}
                            dataUpdate={dataUpdate}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </ModalCrud>
            }

            {
                openModalConfirm && <ModalConfirmPromo isOpen={openModalConfirm} closeModal={() => setOpenModalConfirm(null)} confirmAction={() => setStepsPromo(2)} />
            }
            {
                loading && <Loading />
            }
            {
                showAlert?.isOpen &&
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            }
            {
                openModalQRCode && <ModalDetailQRCode onClose={() => setOpenModalQRCode(null)} product={openModalQRCode} selectOutlet={selectOutlet} outlets={outlets} />
            }
        </div>
    );
};

