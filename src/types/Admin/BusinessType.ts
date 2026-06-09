import { OutletsType } from "./OutletType"

export interface BusinessType {
    banner_url: string,
    category: string,
    description: string,
    end_time: string,
    logo_url: string,
    name: string,
    plan: string,
    slug: string,
    id?: number,
    start_time: string,
    verified_status: number,
    outlet: OutletsType[]
}
