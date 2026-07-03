import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import BanksComponent from './components'

type Props = {}

const page = (props: Props) => {
    return (
        <MainLayout page='Kelola Akun Bank'>
            <BanksComponent />
        </MainLayout>
    )
}

export default page