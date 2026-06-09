import React from 'react'

type Props = {
    label: string;
    value: string;
}


function InfoRow({ label, value }: Props) {
    return (
        <div className="flex justify-between border-b border-gray-200 pb-1">
            <span className="text-gray-600 text-sm">{label}</span>
            <span className="text-gray-800 font-medium text-sm">{value}</span>
        </div>
    )
}
export default InfoRow