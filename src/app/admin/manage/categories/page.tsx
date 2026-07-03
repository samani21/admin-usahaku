import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'
import CategoriesComponent from './Components'

type Props = {}

function CategoriesPage({ }: Props) {
    return (
        <MainLayout page='Kelola Kategori'>
            <CategoriesComponent />
        </MainLayout>
    )
}

export default CategoriesPage