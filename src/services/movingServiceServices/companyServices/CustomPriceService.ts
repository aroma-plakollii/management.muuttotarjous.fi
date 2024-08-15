import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteCustomPrice = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-custom-prices/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveCustomPriceDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-custom-prices-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getCustomPrices = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-custom-prices`,
        headers: HEADERS
    });

    return res.data;
};

export const getCustomPriceDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-custom-prices/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getCustomPricesByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-custom-prices-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addCustomPrice = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-custom-prices-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
        
    }
    catch (e) {
        return e;
    }
};