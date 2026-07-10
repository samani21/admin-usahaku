import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import ListServicePage from './Components'

type Props = {}

function ProductsPage({ }: Props) {
    return (
        <MainLayout page='Kelola Service'>
            <ListServicePage />
        </MainLayout>
    )
}

export default ProductsPage