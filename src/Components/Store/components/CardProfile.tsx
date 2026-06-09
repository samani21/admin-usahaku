import { Calendar, Edit3, ShieldCheck } from 'lucide-react'
import React from 'react'

type Props = {
    dataCustomer: any
    handleOpenEditModal: () => void;
}

const CardProfile = ({ dataCustomer, handleOpenEditModal }: Props) => {
    return (
        <section className="relative group">
            <div className="relative rounded-[2rem] bg-emerald-950 text-white overflow-hidden shadow-2xl shadow-emerald-900/20 p-8 sm:p-10 transition-transform duration-500 hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950"></div>
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 rounded-2xl p-[3px] bg-gradient-to-br from-emerald-300 via-emerald-500 to-teal-700 shadow-xl shadow-emerald-500/20">
                                <img
                                    src={dataCustomer?.avatar ?? "/avatar.jpeg"}
                                    alt="Avatar"
                                    className="w-full h-full rounded-[14px] object-cover border-2 border-slate-900"
                                />
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-slate-900 text-emerald-400 p-1.5 rounded-xl border border-emerald-500/30 shadow-lg flex items-center justify-center">
                                <ShieldCheck size={18} className="fill-emerald-400/20" />
                            </div>
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{dataCustomer?.name}</h2>
                            </div>
                            <p className="text-sm text-emerald-100/80 font-medium tracking-wide">
                                {dataCustomer?.bio}
                            </p>
                            <div className="flex items-center gap-4 text-xs font-semibold text-emerald-200/60 pt-1">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-emerald-400/80" />
                                    Member sejak {new Date(dataCustomer?.created_at).toLocaleDateString("id-ID", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleOpenEditModal}
                        className="group/btn relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/10 hover:border-white/20 font-bold text-sm transition-all duration-300 overflow-hidden"
                    >
                        <Edit3 size={16} className="text-slate-400 group-hover/btn:text-white transition-colors" />
                        <span className="tracking-wide">Kelola Profil</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CardProfile