"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react"

export default function InvalidTokenPage() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white p-6">
            <div className="w-full max-w-md text-center">

                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="text-red-600 w-8 h-8" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-3">
                    Token Tidak Valid
                </h1>

                <p className="text-gray-600 mb-6">
                    Link reset password tidak valid, sudah digunakan,
                    atau telah kadaluarsa.
                </p>

                <div className="space-y-3">

                    {/* Minta Reset Ulang */}
                    <Link
                        href="/auth/forgot-password"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold bg-[var(--primary-color)] hover:bg-green-800 transition"
                    >
                        <RefreshCcw size={18} />
                        Minta Link Reset Baru
                    </Link>

                    {/* Kembali ke Login */}
                    <Link
                        href="/auth/login"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={18} />
                        Kembali ke Login
                    </Link>

                </div>
            </div>
        </div>
    )
}
