import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteCompany = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-companies/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveCompanyDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-companies-update/${id}`,
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
        url: `${API}/ms-companies`,
        headers: HEADERS
    });

    return res.data;
};

export const getCompanyDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-companies/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addCompany = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-companies-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getCompanyByUser = async (id: any) => {
    // const token = window.sessionStorage.getItem('token');
    const token = window.localStorage.getItem('token');
    const headers = { ...HEADERS, Authorization: `Bearer ${token}` };
    const res = await axios({
        method: 'get',
        url: `${API}/ms-companies-by-user/${id}`,
        headers: headers
    });

    return res.data;
};
