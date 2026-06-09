"use client"
import AuthComponent from '@/Components/Auth/AuthComponent'
import { getToken, getUserInfo } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function AuthPage() {
    const token = getToken();
    const user = getUserInfo();
    const router = useRouter();
    useEffect(() => {
        if (token && user) {
            router?.push('/admin/dashboard')
        }
    })
    return (
        <AuthComponent />
    )
}