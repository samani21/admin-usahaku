"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import DetailCheckoutComponent from '@/Components/Tenant/DetailCheckoutComponent';
type Props = {}

const page = (props: Props) => {
    // const { token } = useParams();
    // return (
    //     <div>
    //         <h3>QR Code</h3>
    //         <QRCodeCanvas value={`http://toko-sepatu.localhost:3000/detail/${token}`} size={200} />
    //     </div>

    // )
    return (
        <DetailCheckoutComponent />
    )
}

export default page