import axios from "axios";
import {API, HEADERS} from "../../../config";

export const getBookingsByDate = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-bookings-day`,
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
        method: 'post',
        url: `${API}/mb-bookings-update-status`,
        data: data,
        headers: HEADERS
    });

    return res.data;
};

export const getBookingDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-bookings/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addBooking = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-bookings-create-without-email`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveBookingDetails = async (id: any, data: any) => {
    try {
        const res = await axios({
            method: 'put',
            url: `${API}/mb-bookings-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getAdditionalDays =async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-additional-days-by-booking-id/${id}`,
        headers: HEADERS
    });

    return res.data;
}

export const deleteAdditionalDays = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/mb-additional-days/${id}`,
            data: id,
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
            url: `${API}/mb-bookings-month`,
            data: data,
            headers: HEADERS
        });

        console.log(res.data)
        return res.data;
    }
    catch (e) {
        return e;
    }
};
