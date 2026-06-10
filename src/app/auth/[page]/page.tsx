"use client"
import { getToken } from '@/utils/loclstorange'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import AuthView from './Components'

type Props = {}

const page = (props: Props) => {
    const params = useParams();
    return (
        <div>
            <AuthView page={String(params?.page)} />
        </div>
    )
}

export default page