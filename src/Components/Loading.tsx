import React from 'react'

type Props = {
    title?: string
}

const Loading = ({ title }: Props) => {
    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] z-60 flex flex-col items-center justify-center rounded-xl">
            <div className="p-4 bg-white shadow-xl rounded-2xl border border-gray-100 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold text-gray-700">{title ? title : "Memuat Halaman"}</p>
            </div>
        </div>
    )
}

export default Loading