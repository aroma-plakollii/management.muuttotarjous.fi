import axios from "axios";
import {API} from "../../../config";
import {HEADERS} from "../../../config";

export const deleteCoupon = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/coupons/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getCoupons = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/coupons`,
        headers: HEADERS
    });

    return res.data;
};

export const addCoupon = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/coupons-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;

    }
    catch (e) {
        return e;
    }
};

export const saveCouponDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/coupons-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getCouponDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/coupons/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getCouponsByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/coupons-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};