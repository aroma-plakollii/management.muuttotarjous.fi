import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteFreeCity = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-free-cities/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveFreeCityDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-free-cities-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getFreeCities = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-free-cities`,
        headers: HEADERS
    });

    return res.data;
};

export const getFreeCityDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-free-cities/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getFreeCityByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-free-cities-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addFreeCity = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-free-cities-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
        
    }
    catch (e) {
        return e;
    }
};