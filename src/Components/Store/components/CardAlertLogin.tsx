import { ChevronRight, Lock } from 'lucide-react'
import React from 'react'

const CardAlertLogin = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased selection:bg-emerald-200">
            <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 text-center animate-[slideUp_0.4s_ease-out]">

                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100 relative">
                    <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping opacity-50"></div>
                    <Lock size={32} className="text-slate-400" />
                </div>

                <h2 className="text-xl font-black text-slate-900 mb-2">Akses Dibatasi</h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">
                    Anda belum masuk ke dalam sistem. Silakan login terlebih dahulu untuk mengakses Dashboard VIP Premium UsahaKu.
                </p>

                <button
                    onClick={() => window.location.href = '/store/auth/login'} // Note: Di mode produksi, ganti dengan routing ke halaman login, misal: navigate('/login')
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                    Menuju Halaman Login <ChevronRight size={16} />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
        </div>
    )
}

export default CardAlertLogin