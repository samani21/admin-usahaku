import BanksComponent from '@/Components/Admin/manage/Banks'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <MainLayout>
            <BanksComponent />
        </MainLayout>
    )
}

export default page