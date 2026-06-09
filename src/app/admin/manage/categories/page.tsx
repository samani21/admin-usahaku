import CategoriesComponent from '@/Components/Admin/manage/Categories'
import MainLayout from '@/Components/Layout/MainLayout'
import React from 'react'

type Props = {}

function CategoriesPage({ }: Props) {
    return (
        <MainLayout>
            <CategoriesComponent />
        </MainLayout>
    )
}

export default CategoriesPage