export interface Unit {
    id: number,
    company_id: number,
    price: number,
    persons: number,
    capacity: number,
    availability: number,
    max_shift: number,
    start_time: string,
    end_time: string
}