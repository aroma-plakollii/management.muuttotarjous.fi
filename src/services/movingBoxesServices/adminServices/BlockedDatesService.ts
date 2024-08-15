import axios from "axios";
import {API, HEADERS} from "../../../config";

export const getBlockedDates = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-blocked-dates`,
        headers: HEADERS
    });

    return res.data;
};
export const getBlockedDatesByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-blocked-dates-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getBlockedDatesDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-blocked-dates/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addBlockedDates = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-blocked-dates-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveBlockedDatesDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/mb-blocked-dates/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const deleteBlockedDates = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/mb-blocked-dates/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};


