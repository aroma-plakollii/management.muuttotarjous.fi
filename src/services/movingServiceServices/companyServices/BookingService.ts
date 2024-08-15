import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteBooking = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-bookings/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveBookingDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-bookings-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getBookings = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-bookings`,
        headers: HEADERS
    });

    return res.data;
};

export const getBookingDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-bookings/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getBookingByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-bookings-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addBooking = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-bookings-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    
    }
    catch (e) {
        return e;        
    }
};

export const getBookingsByMonth = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-bookings-month`,
            data: data,
            headers: HEADERS
        });
        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getBookingsByDate = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-bookings-day`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const changeStatus = async (data: any) => {
    const res = await axios({
        method: 'put',
        url: `${API}/ms-bookings-update-status`,
        data: data,
        headers: HEADERS
    });
    return res.data;
};

export const sendPaymentEmail = async (id: number) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-bookings-send-payment-email/${id}`,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const extraService = async (data: any, id: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-bookings/extra-service/${id}`,
            data: data,
            headers: HEADERS
        });
        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getExtraServices =async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-extra-service-by-booking-id/${id}`,
        headers: HEADERS
    });

    return res.data;
}

export const createBooking = async (data: any) => {

    try {
        const response = await axios.post(`${API}/ms-bookings/create`, data);

        return response.data;
    }
    catch (e) {
        return [];
    }
}

export const createBookingSendPaymentLink = async (data: any) => {

    try {
        const response = await axios.post(`${API}/ms-bookings/create/send-payment-link`, data);

        return response.data;
    }
    catch (e) {
        return [];
    }
}

export const addABlockOnBooking = async (data: any) => {

    try {
        const response = await axios.post(`${API}/ms-bookings/add-a-block`, data);

        return response.data;
    }
    catch (e) {
        return [];
    }
}