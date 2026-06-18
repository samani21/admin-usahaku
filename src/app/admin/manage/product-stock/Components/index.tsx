"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Meta } from '@/types/Public'
import { Get } from '@/utils/Get'
import { Post } from '@/utils/Post'
import { Delete } from '@/utils/Delete'
import { Column } from '@/types/Admin/CRUD'
import { AlertType } from '@/types/Alert'
import { ProductStockType } from '@/types/Admin/ProductStockType'
import CreateOrUpdateProductStock from './CreateOrUpdateProductStock'
import FilterComponent from '@/Components/CRUD/FilterComponent'
import DataTable from '@/Components/CRUD/DataTable'
import ModalDelete from '@/Components/CRUD/ModalDelete'
import ModalCrud from '@/Components/CRUD/ModalCrud'
import Loading from '@/Components/Loading'
import Alert from '@/Components/Alert'

type Props = {}

const ProductStockComponent = (props: Props) => {
    const [search, setSearch] = useState("");
    const [dateRangeText, setDateRangeText] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('');
    const [meta, setMeta] = useState<Meta>({
        last_page: 1,
        limit: 10,
        page: 1,
        total: 0,
    });
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showAlert, setShowAlert] = useState<AlertType | null>(null)

    const [dataUpdate, setDataUpdate] = useState<ProductStockType | null>(null)
    const [deleteData, setDeleteData] = useState<ProductStockType | null>(null)
    const [categorie, setProductStock] = useState<ProductStockType[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setShowAlert({
                isOpen: false,
                message: '',
                type: 'success'
            });
        }, 3000)
    }, [showAlert])
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
                .join("&")
        );
    }, [parsedDate, page, debouncedSearch, itemsPerPage]);

    const fetchProductStock = useCallback(async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: ProductStockType[]; meta: Meta }>(
                `/product-stock${queryString}`
            );

            if (res?.success) {
                setProductStock(res.data);
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
        fetchProductStock();
    }, [fetchProductStock, page]);

    // Komponen (handleFormSubmit) (Perbaikan: Kirim formData asli)

    const handleFormSubmit = async (formData: FormData, id: number | null) => {
        setLoading(true)
        try {
            if (id) {
                const res = await Post(`/product-stock/${id}`, formData);
                if (res) {
                    fetchProductStock()
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
                const res = await Post('/product-stock', formData);
                if (res) {
                    fetchProductStock()
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
        }
    };
    const onDelete = async (id: number | null) => {
        setLoading(true)
        setIsModalOpen(false)
        setDeleteData(null)
        try {
            const res = await Delete(`/product-stock/${id}`);
            if (res) {
                fetchProductStock();
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
        }
    };

    const handleResetFilter = () => {
        setSearch("");
        setDateRangeText("");
    };

    const handleEdit = (row: ProductStockType) => {
        setIsModalOpen(true)
        setDataUpdate(row)
    }
    const handleDelete = (row: ProductStockType) => {
        setIsModalOpen(true)
        setDeleteData(row)
    }

    const columns: Column<ProductStockType>[] = useMemo(
        () => [

            {
                key: "name_outlet",
                label: "Nama Outlet",
            },
            {
                key: "name_product",
                label: "Nama Produk",
            },
            {
                key: "name_variant",
                label: "Nama Variant",
                render: (row) => row?.name_variant ?? ''
            },
            {
                key: "stock",
                label: "stock",
                render: (row) => row?.stock ?? ''
            },
            {
                key: "date",
                label: "Tanggal",
                render: (row) => row?.date ?? ''
            },
            {
                key: "reference_type",
                label: "Reference",
                render: (row) => row?.reference_type ?? ''
            },
            {
                key: "note",
                label: "Catatan",
                render: (row) => row?.note ?? ''
            },

        ],
        [handleEdit, handleDelete]
    );


    return (
        <div className='relative'>
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

            <div className="mt-6">
                <DataTable<ProductStockType>
                    data={categorie}
                    columns={columns}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    total={meta?.total}
                    onPageChange={setPage}
                    loading={loading}
                    error={error}
                    rowKey={(row) => row.id}
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
                    <ModalCrud isOpen={isModalOpen} title={dataUpdate ? "Edit" : "Tambah" + ' Stok Produk'} onClose={() => {
                        setIsModalOpen(false)
                        setDataUpdate(null)
                    }}>
                        <CreateOrUpdateProductStock handleFormSubmit={handleFormSubmit} data={dataUpdate} loading={loading} setLoading={setLoading} onCancel={() => setIsModalOpen(false)} />
                    </ModalCrud>
            }
            {
                loading && <Loading />
            }
            {
                showAlert?.isOpen &&
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            }
        </div>
    )
}

export default ProductStockComponent