import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import OutletsComponent from './Components'

type Props = {}

function OutletsPage({ }: Props) {
    return (
        <MainLayout page='Kelola Outlet'>
            <OutletsComponent />
        </MainLayout>
    )
}

export default OutletsPage