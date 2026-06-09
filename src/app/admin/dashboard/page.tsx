import DashboardPage from '@/Components/Admin/Dashboard'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <MainLayout>
            <DashboardPage />
        </MainLayout>
    )
}