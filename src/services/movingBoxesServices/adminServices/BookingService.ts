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

export const getBookingsByMonth = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-bookings-month`,
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
            url: `${API}/mb-bookings-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};