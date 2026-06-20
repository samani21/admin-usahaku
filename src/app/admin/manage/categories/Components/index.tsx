"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CategoriesType } from '@/types/Admin/CategoriesType'
import { Meta } from '@/types/Public'
import { Get } from '@/utils/Get'
import { Post } from '@/utils/Post'
import { Delete } from '@/utils/Delete'
import { Column } from '@/types/Admin/CRUD'
import { Icon } from '@iconify/react'
import { Edit, Edit2, Trash2Icon } from 'lucide-react'
import { AlertType } from '@/types/Alert'
import FilterComponent from '@/Components/CRUD/FilterComponent'
import DataTable from '@/Components/CRUD/DataTable'
import ModalDelete from '@/Components/CRUD/ModalDelete'
import ModalCrud from '@/Components/CRUD/ModalCrud'
import CreateOrUpdateCategorie from './CreateOrUpdateCategorie'
import Loading from '@/Components/Loading'
import Alert from '@/Components/Alert'

type Props = {}

const CategoriesComponent = (props: Props) => {
    const [search, setSearch] = useState("");
    const [dateRangeText, setDateRangeText] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('');
    const [meta, setMeta] = useState<Meta>({
        last_page: 1,
        limit: 10,
        page: 1,
        total: 0,
    });
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showAlert, setShowAlert] = useState<AlertType | null>(null)

    const [dataUpdate, setDataUpdate] = useState<CategoriesType | null>(null)
    const [deleteData, setDeleteData] = useState<CategoriesType | null>(null)
    const [categorie, setCategorie] = useState<CategoriesType[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setShowAlert({
                isOpen: false,
                message: '',
                type: 'success'
            });
        }, 5000)
    }, [showAlert])
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(handler);

    }, [search]);

    const parsedDate = useMemo(() => {
        if (!dateRangeText.includes(" - ")) return { start_date: "", end_date: "" };

        const [start, end] = dateRangeText.split(" - ");

        return {
            start_date: new Date(start).toISOString().slice(0, 10),
            end_date: new Date(end).toISOString().slice(0, 10),
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

    const fetchCategorie = useCallback(async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: CategoriesType[]; meta: Meta }>(
                `/categorie${queryString}`
            );

            if (res?.success) {
                setCategorie(res.data);
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
        fetchCategorie();
    }, [fetchCategorie, page]);

    // Komponen (handleFormSubmit) (Perbaikan: Kirim formData asli)

    const handleFormSubmit = async (formData: FormData, id: number | null) => {
        setLoading(true);
        try {
            if (id) {
                const res = await Post(`/categorie/${id}`, formData);
                if (res) {
                    fetchCategorie()
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
                const res = await Post('/categorie', formData);
                if (res) {
                    fetchCategorie()
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
        setLoading(true);
        setIsModalOpen(false)
        setDeleteData(null)
        try {
            const res = await Delete(`/categorie/${id}`);
            if (res) {
                fetchCategorie();
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

    const handleEdit = (row: CategoriesType) => {
        setIsModalOpen(true)
        setDataUpdate(row)
    }
    const handleDelete = (row: CategoriesType) => {
        setIsModalOpen(true)
        setDeleteData(row)
    }
    const columns: Column<CategoriesType>[] = useMemo(
        () => [
            {
                key: "icon",
                label: "Icon",
                width: "200px",
                render: (row) =>
                    row?.icon ? (
                        row.icon.startsWith("http") ? (
                            <img
                                src={row.icon}
                                alt={row.name}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        ) : (
                            <Icon icon={row?.icon} color={row?.color} className={`mr-2  w-24 h-24`} />
                        )
                    ) : (
                        "-"
                    )

            },
            {
                key: "name",
                label: "Nama Kategori",
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
                <DataTable<CategoriesType>
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
                    <ModalCrud isOpen={isModalOpen} title={(dataUpdate ? "Edit" : "Tambah") + ' Kategori'} onClose={() => {
                        setIsModalOpen(false)
                        setDataUpdate(null)
                    }}>
                        <CreateOrUpdateCategorie handleFormSubmit={handleFormSubmit} data={dataUpdate} loading={loading} setLoading={setLoading} onCancel={() => setIsModalOpen(false)} />
                    </ModalCrud>
            }

            {loading && <Loading />}
            {
                showAlert?.isOpen &&
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            }
        </div>
    )
}

export default CategoriesComponent