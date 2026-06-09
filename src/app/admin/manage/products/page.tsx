import ProductsComponent from '@/Components/Admin/manage/Products'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function ProductsPage({ }: Props) {
    return (
        <MainLayout>
            <ProductsComponent />
        </MainLayout>
    )
}

export default ProductsPage