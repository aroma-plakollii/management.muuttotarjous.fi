import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteUnit = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-units/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveUnitDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-units-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getUnits = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units`,
        headers: HEADERS
    });

    return res.data;
};

export const getUnitDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getUnitsByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addUnit = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-units-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
        
    }
    catch (e) {
        return e;
    }
};