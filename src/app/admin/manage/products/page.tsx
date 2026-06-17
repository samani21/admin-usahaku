import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import ListProductPage from './Components'

type Props = {}

function ProductsPage({ }: Props) {
    return (
        <MainLayout>
            <ListProductPage />
        </MainLayout>
    )
}

export default ProductsPage