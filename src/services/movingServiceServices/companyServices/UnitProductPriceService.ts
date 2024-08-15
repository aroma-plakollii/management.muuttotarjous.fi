import axios from "axios";
import {API, HEADERS} from "../../../config";

export const addUnitProductPrice = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-units-product-prices-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
        
    }
    catch (e) {
        return e;
    }
};

export const getUnitProductPrices = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units-product-prices`,
        headers: HEADERS
    });

    return res.data;
};

export const getUnitProductPriceDetails = async (data: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units-product-prices-by-unit`,
        params: {
            product_id: data.product_id,
            unit_id: data.unit_id
        },
        headers: HEADERS
    });

    return res.data;
};

export const saveUnitProductPricesDetails = async ( data: any, id: number,) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-units-product-prices-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};