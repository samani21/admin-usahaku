import PromoHistoriesComponent from '@/Components/Admin/manage/PromoHistories'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function PromoHistoryPage({ }: Props) {
    return (
        <MainLayout>
            <PromoHistoriesComponent />
        </MainLayout>
    )
}

export default PromoHistoryPage