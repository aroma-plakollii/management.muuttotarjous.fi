export interface Coupon {
    id: number,
    company_id: string,
    code: string,
    price: number,
    available_usages: number,
    used: number,
    status: number,
    is_percentage: boolean,
    is_unlimited: boolean,
    created_at: Date,
    updated_at: Date
}