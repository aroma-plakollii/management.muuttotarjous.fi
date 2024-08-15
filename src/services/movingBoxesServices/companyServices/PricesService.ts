import axios from "axios";
import {API} from "../../../config";
import {HEADERS} from "../../../config";

export const getPrices = async (id: number) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-prices-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getPriceDetails = async (type: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-prices/${type}`,
        headers: HEADERS
    });

    return res.data;
};

export const addPrice = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-prices-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const savePriceDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/mb-prices/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const deletePrice = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/mb-prices/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};


