"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ModalCrud from '@/Components/Component/CRUD/ModalCrud'
import { Meta } from '@/types/Public'
import { Get } from '@/utils/Get'
import { Post } from '@/utils/Post'
import { Delete } from '@/utils/Delete'
import { Column } from '@/types/Admin/CRUD'
import FilterComponent from '@/Components/Component/CRUD/FilterComponent'
import DataTable from '@/Components/Component/CRUD/DataTable'
import { Icon } from '@iconify/react'
import ModalDelete from '@/Components/Component/CRUD/ModalDelete'
import Alert from '@/Components/Component/Alert'
import { Edit, Edit2, Trash2Icon } from 'lucide-react'
import { AlertType } from '@/types/Alert'
import { BanksType } from '@/types/Admin/Banks'
import { OrderType } from '@/types/Admin/Catalog/Order'

type Props = {}

interface dataType {
    summary: {
        count: number;
        pending: number;
        processing: number;
        completed: number;
        paid: number;
        unpaid: number;
        expired: number;
        cancelled: number;
    }
    data: OrderType[];
    meta: Meta;
}

const PaymentComponent = (props: Props) => {
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
    const [payemnts, setPayments] = useState<OrderType[]>([]);
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
                .join("&") + "&payment_status=paid"
        );
    }, [parsedDate, page, debouncedSearch, itemsPerPage]);

    const fetchBanks = useCallback(async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: Boolean, data: dataType }>(`orders${queryString}`);

            if (res?.success) {
                setPayments(res.data?.data);
                setMeta(res.data?.meta);
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

    const columns: Column<OrderType>[] = useMemo(
        () => [
            {
                key: "customer_name",
                label: "Nama Pelanggan",
            },
            {
                key: "phone_number",
                label: "Nomor Handphone",
            },
            {
                key: "payment_method",
                label: "Jenis Pembayaran",
            },
            {
                key: "grand_total",
                label: "Total Pembayaran",
                render: (row) => `Rp ${Number(row.grand_total).toLocaleString("id-ID")}`,
            },
            {
                key: "payment_status",
                label: "Status Pembayaran",
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
                <DataTable<OrderType>
                    data={payemnts}
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

        </div>
    )
}

export default PaymentComponent