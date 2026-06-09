import { Card, CardContent } from '@/Components/ui/card'
import React from 'react'

function StatCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode
    title: string
    value: string | number
}) {
    return (
        <Card className="shadow-sm border border-gray-200">
            <CardContent className="flex items-center p-6">
                <div className="p-3 bg-gray-100 rounded-full mr-4">{icon}</div>
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard