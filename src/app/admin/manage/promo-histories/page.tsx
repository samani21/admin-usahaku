import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import PromoHistoriesComponent from './Components'

type Props = {}

function PromoHistoryPage({ }: Props) {
    return (
        <MainLayout>
            <PromoHistoriesComponent />
        </MainLayout>
    )
}

export default PromoHistoryPage