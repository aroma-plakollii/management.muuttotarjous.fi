import axios from "axios";
import {API} from "../../../config";
import {HEADERS} from "../../../config";

export const deleteProductType = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-product-types/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const updateProductType = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-product-types-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getProductTypes = async () => {
    try{
        const res = await axios({
            method: 'get',
            url: `${API}/ms-product-types`,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getProductType = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-product-types/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addProductType = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-product-types-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};