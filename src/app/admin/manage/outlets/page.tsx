import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import OutletsComponent from './Components'

type Props = {}

function OutletsPage({ }: Props) {
    return (
        <MainLayout>
            <OutletsComponent />
        </MainLayout>
    )
}

export default OutletsPage