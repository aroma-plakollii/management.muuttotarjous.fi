import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteProduct = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-products/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-products-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getProducts = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-products`,
        headers: HEADERS
    });

    return res.data;
};

export const getProduct = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-products/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addProduct = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-products-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};