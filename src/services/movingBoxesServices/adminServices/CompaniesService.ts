import axios from "axios";
import {API, HEADERS} from "../../../config";
export const deleteCompany = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/mb-company/${id}`,
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
            url: `${API}/mb-company/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getCompanies = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-companies`,
        headers: HEADERS
    });

    return res.data;
};

export const getCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-companies/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getCompanyByUser = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-companies-by-user/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addCompany = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/mb-company-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};