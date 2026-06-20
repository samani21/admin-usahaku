import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import OrdersComponent from './Components'

type Props = {}

function page({ }: Props) {
    return (
        <MainLayout>
            <OrdersComponent />
        </MainLayout>
    )
}

export default page