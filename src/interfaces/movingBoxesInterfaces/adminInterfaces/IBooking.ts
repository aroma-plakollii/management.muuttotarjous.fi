export interface Booking {
    id: number;
    booking_number: string;
    company_id: number | any;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | number;
    start_address: string;
    end_address: string;
    start_date: Date;
    end_date: Date;
    start_door_number: string | number;
    end_door_number: string | number;
    start_door_code: string | number;
    end_door_code: string | number;
    quantity: number;
    price: number;
    rent_price: number
    start_price: number;
    end_price: number;
    progress_status: string;
    start_comment: string;
    end_comment: string;
    payment_status: string;
    type: string;
    // additional_days: AdditionalDays[];
    created_at: Date;
    updated_at: Date;
}