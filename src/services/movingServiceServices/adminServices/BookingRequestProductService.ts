import axios from "axios";
import {API} from "../../../config";
import {HEADERS} from "../../../config";

export const deleteBookingRequestProduct = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/booking-request-products/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveBookingRequestProductDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/booking-request-products-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getBookingRequestProducts = async () => {
    try{
        const res = await axios({
            method: 'get',
            url: `${API}/booking-request-products`,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getBookingRequestProduct = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/booking-request-products/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addBookingRequestProduct = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/booking-request-products-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};