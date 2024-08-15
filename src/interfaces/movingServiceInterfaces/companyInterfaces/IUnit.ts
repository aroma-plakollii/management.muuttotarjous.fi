export interface Unit {
    id: number,
    company_id: number,
    region_id: number,
    name: string,
    address: string,
    price: number,
    persons: number,
    capacity: number,
    availability: number,
    image: string,
    max_shift: number,
    start_time: string,
    end_time: string
}