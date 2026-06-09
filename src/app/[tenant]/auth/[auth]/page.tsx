import AuthComponent from "@/Components/Tenant/Auth"

type Props = {
    params: Promise<{ tenant: string }>
}

export default async function Page({ params }: Props) {

    const { tenant } = await params

    return (
        <AuthComponent tenant={tenant} />
    )
}