import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import PaymentComponent from './Components'

type Props = {}

function PaymentsPage({ }: Props) {
    return (
        <MainLayout>
            <PaymentComponent />
        </MainLayout>
    )
}

export default PaymentsPage