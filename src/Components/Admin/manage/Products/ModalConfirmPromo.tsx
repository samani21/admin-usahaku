import { ProductsType } from '@/types/Admin/ProductsType';
import { Info, X } from 'lucide-react'
import React from 'react'

type Props = {
    isOpen: ProductsType
    confirmAction: () => void;
    closeModal: () => void;
}

function ModalConfirmPromo({ isOpen, confirmAction, closeModal }: Props) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
                <div className="p-8">
                    <div className="flex items-center justify-center w-14 h-14 mx-auto bg-blue-50 rounded-2xl mb-6 rotate-3">
                        <Info className="w-7 h-7 text-blue-500 -rotate-3" />
                    </div>

                    <h3 className="text-2xl font-black text-center text-slate-800 mb-3 tracking-tight">
                        Aktifkan Promo?
                    </h3>

                    <p className="text-[15px] text-center text-slate-500 mb-8 leading-relaxed font-medium px-2">
                        Anda akan diarahkan ke <span className="text-slate-800 font-bold text-semibold">Halaman Pengaturan</span> untuk mengonfigurasi detail promo item ini.
                    </p>

                    <div className="flex flex-col space-y-3">
                        <button
                            onClick={confirmAction}
                            className="w-full py-4 px-4 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-lg shadow-slate-200"
                        >
                            Ya, Atur Sekarang
                        </button>
                        <button
                            onClick={closeModal}
                            className="w-full py-4 px-4 bg-transparent text-slate-400 text-sm font-bold rounded-2xl hover:text-slate-600 active:scale-95 transition-all duration-200"
                        >
                            Mungkin Nanti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmPromo