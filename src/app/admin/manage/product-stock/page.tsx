import ProductStockComponent from '@/Components/Admin/manage/ProductStock'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function ProductStockPage({ }: Props) {
    return (
        <MainLayout>
            <ProductStockComponent />
        </MainLayout>
    )
}

export default ProductStockPage