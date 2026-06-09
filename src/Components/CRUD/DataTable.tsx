import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Align = "left" | "center" | "right";

interface Column<T> {
    key: keyof T | string;
    label: string;
    width?: string;
    align?: Align;
    render?: (row: T, index: number) => React.ReactNode;
}


interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    page?: number;
    itemsPerPage?: number;
    total?: number;
    onPageChange?: (page: number) => void;
    loading?: boolean;
    error?: string;
    rowKey?: (row: T, index: number) => React.Key;
    emptyMessage?: string;
}

const alignClass: Record<Align, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

const SkeletonCell = () => (
    <div className="h-4 bg-gray-200 rounded animate-pulse" />
);

export default function DataTable<T>({
    data,
    columns,
    page = 1,
    itemsPerPage = 10,
    total,
    onPageChange,
    loading = false,
    error,
    rowKey,
    emptyMessage = "Tidak ada data",
}: DataTableProps<T>) {
    const isPaginated = total !== undefined && onPageChange;
    const totalPages = isPaginated
        ? Math.ceil((total ?? 0) / itemsPerPage)
        : 1;

    const from = (page - 1) * itemsPerPage + 1;
    const to = isPaginated
        ? Math.min(page * itemsPerPage, total!)
        : data.length;

    return (
        // <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        //     <div className="overflow-x-auto">
        //         <table className="w-full text-left border-collapse">
        //             {/* HEADER */}
        //             <thead className="bg-gray-50">
        //                 <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider select-none">
        //                     {columns.map((col) => (
        //                         <th
        //                             key={String(col.key)}
        //                             className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${alignClass[col.align || "left"]
        //                                 }`}
        //                             style={{ width: col.width }}
        //                         >
        //                             {col.label}
        //                         </th>
        //                     ))}
        //                 </tr>
        //             </thead>

        //             {/* BODY */}
        //             <tbody className="divide-y divide-gray-200 bg-white">
        //                 {error ? (
        //                     <tr>
        //                         <td
        //                             colSpan={columns.length}
        //                             className="text-center p-6 text-red-500 font-medium"
        //                         >
        //                             {error}
        //                         </td>
        //                     </tr>
        //                 ) : loading ? (
        //                     [...Array(itemsPerPage)].map((_, i) => (
        //                         <tr key={i}>
        //                             {columns.map((_, j) => (
        //                                 <td key={j} className="px-6 py-4">
        //                                     <SkeletonCell />
        //                                 </td>
        //                             ))}
        //                         </tr>
        //                     ))
        //                 ) : data.length === 0 ? (
        //                     <tr>
        //                         <td
        //                             colSpan={columns.length}
        //                             className="text-center p-6 text-gray-500"
        //                         >
        //                             {emptyMessage}
        //                         </td>
        //                     </tr>
        //                 ) : (
        //                     data.map((row, index) => (
        //                         <tr
        //                             key={rowKey ? rowKey(row, index) : index}
        //                             className="hover:bg-gray-50 transition"
        //                         >
        //                             {columns.map((col) => (
        //                                 <td
        //                                     key={String(col.key)}
        //                                     className={`px-6 py-4 text-sm text-gray-700 ${alignClass[col.align || "left"]
        //                                         }`}
        //                                     style={{ width: col.width }}
        //                                 >
        //                                     {col.render
        //                                         ? col.render(row, index)
        //                                         : (row as any)[col.key]}
        //                                 </td>
        //                             ))}
        //                         </tr>
        //                     ))
        //                 )}
        //             </tbody>
        //         </table>
        //     </div>

        //     {/* PAGINATION */}
        //     {isPaginated && (
        //         <div className="flex justify-between items-center p-4 border-t border-gray-300 text-sm text-gray-600">
        //             <div>
        //                 Menampilkan {from} - {to} dari {total}
        //             </div>

        //             <div className="flex items-center space-x-2">
        //                 <button
        //                     onClick={() => onPageChange?.(Math.max(1, page - 1))}
        //                     disabled={page === 1}
        //                     className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
        //                 >
        //                     <ChevronLeft className="w-4 h-4" />
        //                 </button>

        //                 <span>
        //                     {page} / {totalPages}
        //                 </span>

        //                 <button
        //                     onClick={() =>
        //                         onPageChange?.(Math.min(totalPages, page + 1))
        //                     }
        //                     disabled={page === totalPages}
        //                     className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
        //                 >
        //                     <ChevronRight className="w-4 h-4" />
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-emerald-50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider select-none">
                            {columns.map((col) => (
                                <th key={String(col.key)} className="px-6 py-4 cursor-pointer hover:text-slate-800 transition-colors">
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                    </div>
                                </th>

                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {error ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-slate-400 font-medium"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : loading ? (
                            [...Array(itemsPerPage)].map((_, i) => (
                                <tr key={i}>
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <SkeletonCell />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns?.length}
                                    className="px-6 py-12 text-center text-slate-400 font-medium"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr
                                    key={rowKey ? rowKey(row, index) : index}
                                    className="hover:bg-gray-50 transition"
                                >
                                    {columns.map((col, id) => (
                                        <td key={id} className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-slate-800 hover:text-emerald-600 cursor-pointer">
                                                    {col.render
                                                        ? col.render(row, index)
                                                        : (row as any)[col.key]}
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Total Indicator */}
                <span className="text-xs text-slate-500">
                    Showing <span className="font-semibold text-slate-700">{from}</span> to{' '}
                    <span className="font-semibold text-slate-700">
                        {to}
                    </span>{' '}
                    of <span className="font-semibold text-slate-700">{total}</span> entries
                </span>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1">
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange?.(Math.max(1, page - 1))}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:hover:bg-white transition"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                onPageChange?.(Math.min(totalPages, i + 1))
                            }
                            className={`w-7.5 h-7.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${page === i + 1
                                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/10'
                                : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages || totalPages === 0}
                        onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
                        className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:hover:bg-white transition"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>

    );
}
