import PaymentComponent from '@/Components/Admin/Transaction/Payments'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function PaymentsPage({ }: Props) {
    return (
        <MainLayout>
            <PaymentComponent />
        </MainLayout>
    )
}

export default PaymentsPage