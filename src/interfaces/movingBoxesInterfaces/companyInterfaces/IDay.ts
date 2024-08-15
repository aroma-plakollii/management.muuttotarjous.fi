export interface IDay {
    id: number;
    booking_id: number;
    booking_number: string;
    date: Date;
    price: number;
    quantity: number;
    payment_status: string;
    created_at: Date;
    updated_at: Date;
}