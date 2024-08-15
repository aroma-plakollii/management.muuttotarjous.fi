import axios from "axios";
import {API} from "../../../config";
import {HEADERS} from "../../../config";

export const addCompanyProductPrice = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-companies-product-prices-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
        
    }
    catch (e) {
        return e;
    }
};

export const getCompanyProductPrices = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-companies-product-prices`,
        headers: HEADERS
    });

    return res.data;
};

export const getCompanyProductPriceDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-companies-product-prices/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const saveCompanyProductPricesDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-companies-product-prices-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};