import axios from "axios";
import {API, HEADERS} from "../../../config";

export const getCities = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-cities`,
        headers: HEADERS
    });

    return res.data;
};
export const getCitiesByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-cities-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getCityDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-cities/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addCity = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-cities-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveCityDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/mb-cities/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const deleteCity = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/mb-cities/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};


