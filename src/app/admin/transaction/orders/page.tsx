import OrdersComponent from '@/Components/Admin/Transaction/Orders'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <MainLayout>
            <OrdersComponent />
        </MainLayout>
    )
}

export default page