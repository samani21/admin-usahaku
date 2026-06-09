import OutletsComponent from '@/Components/Admin/manage/Outlets'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function OutletsPage({ }: Props) {
    return (
        <MainLayout>
            <OutletsComponent />
        </MainLayout>
    )
}

export default OutletsPage