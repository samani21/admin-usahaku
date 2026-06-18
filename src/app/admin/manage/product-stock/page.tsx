import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import ProductStockComponent from './Components'

type Props = {}

function ProductStockPage({ }: Props) {
    return (
        <MainLayout>
            <ProductStockComponent />
        </MainLayout>
    )
}

export default ProductStockPage