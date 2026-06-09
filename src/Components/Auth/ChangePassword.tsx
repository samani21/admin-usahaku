"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, AlertTriangle } from "lucide-react"
import { Post } from "@/utils/Post"
import { useAuthStore } from "@/store/authStore"
import InvalidTokenPage from "./InvalidTokenPage"

export default function ChangePassword() {
    const { checkForgotPassword, resetPassword } = useAuthStore();
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [valid, setValid] = useState<boolean>(true);
    useEffect(() => {
        checkToken()
    }, [])
    const validatePassword = (value: string) => {
        const minLength = value.length >= 8
        const hasUpper = /[A-Z]/.test(value)
        const hasNumber = /[0-9]/.test(value)
        const hasSymbol = /[^A-Za-z0-9]/.test(value)

        return minLength && hasUpper && hasNumber && hasSymbol
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!token) {
            setError("Token tidak valid.")
            return
        }

        if (!validatePassword(password)) {
            setError("Password minimal 8 karakter, huruf besar, angka, dan simbol.")
            return
        }

        if (password !== confirmPassword) {
            setError("Konfirmasi password tidak cocok.")
            return
        }

        try {
            setLoading(true)
            setError("")
            const formData = new FormData();
            formData.append('password', confirmPassword);
            formData.append('token', token);

            const success = await resetPassword(formData)
            if (success) {
                router.push("/auth/login")
            } else {
                setError('Akun tidak ditemukan')
            }

        } catch (err: any) {
            setError('Akun tidak ditemukan')
        } finally {
            setLoading(false)
        }
    }

    const checkToken = async () => {
        try {
            const formData = new FormData();
            formData.append('token', String(token));
            const success = await checkForgotPassword(token)
            if (success) {
                setValid(true)
            } else {
                setValid(false)

            }
        } catch (e) {
            setValid(false)
        }
    }

    return (
        valid ?
            <div className="w-full min-h-screen flex items-center justify-center bg-white p-6">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Ganti Password
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                            <AlertTriangle className="w-5" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password Baru
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                                    placeholder="Masukkan password baru"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                                    placeholder="Ulangi password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl text-white font-bold bg-[var(--primary-color)] hover:bg-green-800 transition"
                        >
                            {loading ? "Memproses..." : "Simpan Password Baru"}
                        </button>
                    </form>
                </div>
            </div> :
            <InvalidTokenPage />
    )
}
