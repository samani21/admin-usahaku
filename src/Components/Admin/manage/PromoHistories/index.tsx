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
import { Edit, Trash2Icon } from 'lucide-react'
import { AlertType } from '@/types/Alert'
import { ProductPromoHistoryType } from '@/types/Admin/ProductPromoHistoriesType'
import Loading from '@/Components/Component/Loading'

type Props = {}

const PromoHistoriesComponent = (props: Props) => {
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

    const [deleteData, setDeleteData] = useState<ProductPromoHistoryType | null>(null)
    const [categorie, setProductStock] = useState<ProductPromoHistoryType[]>([]);

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
            const res = await Get<{ success: boolean; data: ProductPromoHistoryType[]; meta: Meta }>(
                `/product-promo-history${queryString}`
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

    const onDelete = async (id: number | null) => {
        setLoading(true)
        setIsModalOpen(false)
        setDeleteData(null)
        try {
            const res = await Delete(`/product-promo-history/${id}`);
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
    const handleDelete = (row: ProductPromoHistoryType) => {
        setIsModalOpen(true)
        setDeleteData(row)
    }

    const columns: Column<ProductPromoHistoryType>[] = useMemo(
        () => [

            {
                key: "name_promo",
                label: "Nama Promo",
            },
            {
                key: "name_product",
                label: "Nama Produk",
            },
            {
                key: "percentage",
                label: "Persen",
                render: (row) => {
                    const variants = row?.variants ?? [];

                    // ✅ Jika TIDAK ADA VARIANT
                    if (variants.length === 0) {
                        if (row?.type === "percentage") {
                            return row?.percent ? `${row.percent}%` : "-";
                        }

                        return row?.price
                            ? `Rp ${row.price.toLocaleString("id-ID")}`
                            : "-";
                    }

                    // ✅ Jika ADA VARIANT → ambil hanya yang valid
                    const values = variants
                        .map((v) => {
                            if (row?.type === "percentage") {
                                return v?.pivot?.percent;
                            }
                            return v?.pivot?.price;
                        })
                        .filter((v) => v !== null && v !== undefined);

                    // kalau kosong semua
                    if (values.length === 0) return "-";

                    const min = Math.min(...values);
                    const max = Math.max(...values);

                    // ✅ Percent
                    if (row?.type === "percentage") {
                        if (min === max) return `${min}%`;
                        return `${min}% - ${max}%`;
                    }

                }
            },
            {
                key: "price",
                label: "Potongan",
                render: (row) => {
                    const variants = row?.variants ?? [];

                    // ✅ Jika TIDAK ADA VARIANT
                    if (variants.length === 0) {
                        if (row?.type === "percentage") {
                            const pricePercent = (row?.price_product) * (row?.percent / 100);
                            return `Rp ${(pricePercent ?? 0).toLocaleString("id-ID")}`;
                        }

                        return `Rp ${(row?.price ?? 0).toLocaleString("id-ID")}`;
                    }

                    // ✅ Jika ADA VARIANT
                    if (row?.type === "percentage") {
                        // hitung hasil rupiah dari masing-masing variant
                        const values = variants
                            .map((v) => {
                                const percent = v?.pivot?.percent;
                                const basePrice = v?.price ?? 0;

                                if (percent == null) return null;

                                return basePrice * (percent / 100);
                            })
                            .filter((v) => v != null);

                        if (values.length === 0) return "-";

                        const min = Math.min(...values);
                        const max = Math.max(...values);

                        if (min === max) {
                            return `Rp ${min.toLocaleString("id-ID")}`;
                        }

                        return `Rp ${min.toLocaleString("id-ID")} - Rp ${max.toLocaleString("id-ID")}`;
                    }

                    // ✅ Nominal (tetap)
                    const values = variants
                        .map((v) => v?.pivot?.price)
                        .filter((v) => v != null);

                    if (values.length === 0) return "-";

                    const min = Math.min(...values);
                    const max = Math.max(...values);

                    if (min === max) {
                        return `Rp ${min.toLocaleString("id-ID")}`;
                    }

                    return `Rp ${min.toLocaleString("id-ID")} - Rp ${max.toLocaleString("id-ID")}`;
                }
            },
            {
                key: "price_product",
                label: "Harga Sebelum Promo",
                render: (row) => (
                    <div>
                        <table className='hidden sm:flex'>
                            <tbody>
                                {(row?.variants?.length ?? 0) > 0 ? row?.variants?.map((v) => {
                                    const finalPrice = v?.price;
                                    return (
                                        <tr key={v?.id}>
                                            <th>{v?.name}  </th>
                                            <td>
                                                : {`Rp ${(finalPrice ?? 0).toLocaleString("id-ID")}`}
                                            </td>
                                        </tr>
                                    )
                                }) : <tr >
                                    <td>
                                        {`Rp ${(row?.price_product ?? 0).toLocaleString("id-ID")}`}
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                        <div className='sm:hidden'>
                            {(row?.variants?.length ?? 0) > 0 ? row?.variants?.map((v) => {
                                const finalPrice = v?.price;
                                return (
                                    <div key={v?.id}>
                                        <b>{v?.name}  </b>
                                        <p>
                                            {`Rp ${(finalPrice ?? 0).toLocaleString("id-ID")}`}
                                        </p>
                                    </div>
                                )
                            }) : <div >
                                <p>
                                    {`Rp ${(row?.price_product ?? 0).toLocaleString("id-ID")}`}
                                </p>
                            </div>}
                        </div>
                    </div>
                ),
            },
            {
                key: "price_promo",
                label: "Harga Setelah Promo",
                render: (row) => {
                    const percent = row?.price_product * (row?.percent / 100);
                    const finalPrice = row?.price_product - (percent > 0 ? percent : row?.price)
                    return <div>
                        <table>
                            <tbody className='hidden sm:block'>
                                {(row?.variants?.length ?? 0) > 0 ? row?.variants?.map((v) => {
                                    const percent = v?.price * ((v?.pivot?.percent ?? 0) / 100);
                                    const price = v?.pivot?.price;
                                    const finalPrice = v?.price - (percent > 0 ? percent : price ?? 0);
                                    return (
                                        <tr key={v?.id}>
                                            <th>{v?.name} </th>
                                            <td>
                                                : {`Rp ${(finalPrice ?? 0).toLocaleString("id-ID")}`}
                                            </td>
                                        </tr>
                                    )
                                }) :
                                    <tr >
                                        <td>

                                            {
                                                `Rp ${finalPrice.toLocaleString("id-ID")}`
                                            }
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                        <div className='sm:hidden'>
                            {(row?.variants?.length ?? 0) > 0 ? row?.variants?.map((v) => {
                                const percent = v?.price * ((v?.pivot?.percent ?? 0) / 100);
                                const price = v?.pivot?.price;
                                const finalPrice = v?.price - (percent > 0 ? percent : price ?? 0);
                                return (
                                    <div key={v?.id}>
                                        <b>{v?.name} </b>
                                        <p>
                                            {`Rp ${(finalPrice ?? 0).toLocaleString("id-ID")}`}
                                        </p>
                                    </div>
                                )
                            }) :
                                <div >
                                    <p>
                                        {
                                            `Rp ${finalPrice.toLocaleString("id-ID")}`
                                        }
                                    </p>
                                </div>}
                        </div>
                    </div>
                }
            },
            {
                key: "actions",
                label: "Aksi",
                align: "center",
                render: (row) => (
                    <div className="flex justify-center gap-2">
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
        [handleDelete]
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
                hiddenAdd={true}
            />

            <div className="mt-6">
                <DataTable<ProductPromoHistoryType>
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
                    ""
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

export default PromoHistoriesComponent