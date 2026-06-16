import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import BusinessProfile from './Components'

type Props = {}

function page({ }: Props) {
    return (
        <MainLayout>
            <BusinessProfile />
        </MainLayout>
    )
}

export default page