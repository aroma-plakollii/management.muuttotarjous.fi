import axios from "axios";
import {API, HEADERS} from "../../../config";

export const getBookingRequestsByMonth = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/booking-request-month`,
            data: data,
            headers: HEADERS
        });
        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const createBookingRequestPrice = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/booking-request-price-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;

    }
    catch (e) {
        return e;
    }
};

export const getBookingRequestPriceByCompany = async (data: any) => {
    const res = await axios({
        method: 'post',
        url: `${API}/booking-request-price-by-company`,
        data: data,
        headers: HEADERS
    });
    return res.data;
};

export const getBookingRequestDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/booking-requests/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const saveBookingRequestDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/booking-requests-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};