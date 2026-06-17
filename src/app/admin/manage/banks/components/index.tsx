"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Meta } from '@/types/Public'
import { Get } from '@/utils/Get'
import { Post } from '@/utils/Post'
import { Delete } from '@/utils/Delete'
import { Column } from '@/types/Admin/CRUD'
import { Icon } from '@iconify/react'
import { Edit, Edit2, Trash2Icon } from 'lucide-react'
import { AlertType } from '@/types/Alert'
import CreateOrUpdateBanks from './CreateOrUpdateBanks'
import { BanksType } from '@/types/Admin/Banks'
import FilterComponent from '@/Components/CRUD/FilterComponent'
import DataTable from '@/Components/CRUD/DataTable'
import ModalDelete from '@/Components/CRUD/ModalDelete'
import ModalCrud from '@/Components/CRUD/ModalCrud'
import Alert from '@/Components/Alert'

type Props = {}

const BanksComponent = (props: Props) => {
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

    const [dataUpdate, setDataUpdate] = useState<BanksType | null>(null)
    const [deleteData, setDeleteData] = useState<BanksType | null>(null)
    const [categorie, setCategorie] = useState<BanksType[]>([]);
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

    const fetchBanks = useCallback(async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: BanksType[]; meta: Meta }>(
                `/banks${queryString}`
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
        fetchBanks();
    }, [fetchBanks, page]);

    // Komponen (handleFormSubmit) (Perbaikan: Kirim formData asli)

    const handleFormSubmit = async (formData: FormData, id: number | null) => {
        try {
            if (id) {
                const res = await Post(`/banks/${id}`, formData);
                if (res) {
                    fetchBanks()
                    setDataUpdate(null)
                    setIsModalOpen(false);
                    setShowAlert({
                        type: 'success',
                        message: 'Berhasil update data',
                        isOpen: true
                    })
                }
            } else {
                const res = await Post('/banks', formData);
                if (res) {
                    fetchBanks()
                    setIsModalOpen(false);
                    setShowAlert({
                        type: 'success',
                        message: 'Berhasil simpan data',
                        isOpen: true
                    })
                }
            }
        } catch (err: any) {
            setShowAlert({
                type: 'error',
                message: 'Gagal proses data ' + err.message,
                isOpen: true
            })
        }
    };
    const onDelete = async (id: number | null) => {
        try {

            const res = await Delete(`/banks/${id}`);
            if (res) {
                fetchBanks();
                setDeleteData(null)
                setIsModalOpen(false);
                setShowAlert({
                    type: 'success',
                    message: 'Berhasil hapus data',
                    isOpen: true
                })
            }
        } catch (err: any) {
            setShowAlert({
                type: 'error',
                message: 'Gagal proses data ' + err.message,
                isOpen: true
            })
        }
    };

    const handleResetFilter = () => {
        setSearch("");
        setDateRangeText("");
    };

    const handleEdit = (row: BanksType) => {
        setIsModalOpen(true)
        setDataUpdate(row)
    }
    const handleDelete = (row: BanksType) => {
        setIsModalOpen(true)
        setDeleteData(row)
    }

    const columns: Column<BanksType>[] = useMemo(
        () => [
            {
                key: "icon",
                label: "Icon",
                width: "200px",
                render: (row) =>
                (
                    <img
                        src={row.master_bank?.logo}
                        alt={row.master_bank?.name}
                        className="w-24 h-12  rounded-md"
                    />
                )

            },
            {
                key: "account_name",
                label: "Nama Akun",
            },
            {
                key: "account_number",
                label: "Nomor Akun",
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
                <DataTable<BanksType>
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
                    <ModalCrud isOpen={isModalOpen} title={dataUpdate ? "Edit" : "Tambah" + ' Bank'} onClose={() => {
                        setIsModalOpen(false)
                        setDataUpdate(null)
                    }}>
                        <CreateOrUpdateBanks handleFormSubmit={handleFormSubmit} data={dataUpdate} onCancel={() => setIsModalOpen(false)} />
                    </ModalCrud>
            }

            {
                showAlert?.isOpen &&
                <Alert type={showAlert?.type} message={showAlert?.message} onClose={() => setShowAlert(null)} />
            }
        </div>
    )
}

export default BanksComponent