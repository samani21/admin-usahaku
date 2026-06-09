import { Calendar, Plus, Search, Undo2 } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'
import DateRangeModal from './DateRangeModal';

type Props = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    dateRangeText: string;
    itemsPerPage: number;
    setItemsPerPage: Dispatch<SetStateAction<number>>;
    setPage: Dispatch<SetStateAction<number>>;
    handleReset: () => void;
    setDateRangeText: Dispatch<SetStateAction<string>>;
    setIsModalOpenForm: (value: boolean) => void;
    hiddenAdd?: boolean
}

const FilterComponent = ({ search, setSearch, dateRangeText, itemsPerPage, setItemsPerPage, setPage, handleReset, setDateRangeText, setIsModalOpenForm, hiddenAdd }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-emerald-50 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-slate-100 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-150"
                        />
                    </div>
                    <div className="col-span-1">
                        <div className="relative">
                            <input readOnly onClick={() => setIsModalOpen(true)} value={dateRangeText} placeholder="Pilih rentang tanggal" className="w-full bg-slate-100 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-150" />
                            <button onClick={() => setIsModalOpen(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600" type="button">
                                <Calendar className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1) }} className="w-full bg-slate-100 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-150">
                            {[10, 25, 50, 100].map((num) => (
                                <option key={num} value={num}>{num} Data</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button onClick={handleReset} className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition shadow-sm flex items-center justify-center h-[40px] cursor-pointer">
                            <Undo2 className="w-5 h-5 mr-1" /> Reset Filter
                        </button>
                    </div>
                    <div className="flex items-end">
                        {
                            !hiddenAdd &&
                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] h-[40px] cursor-pointer" onClick={() => setIsModalOpenForm(true)}>
                                <Plus className='w-5 h-5 mr-2' />
                                Tambah
                            </button>
                        }
                    </div>
                </div>
            </div>
            {/* Modal Rentang Tanggal */}
            <DateRangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onApply={(dates) => {
                if (dates.length === 2) {
                    const start = dates[0].toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                    const end = dates[1].toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                    setDateRangeText(`${start} - ${end}`)
                } else if (dates.length === 1) {
                    const single = dates[0].toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                    setDateRangeText(single)
                } else {
                    setDateRangeText('')
                }
            }} />
        </>
    )
}

export default FilterComponent