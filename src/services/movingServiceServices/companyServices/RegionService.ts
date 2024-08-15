import axios from "axios";
import {API,HEADERS} from "../../../config";

export const deleteRegion = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/regions/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveRegionDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/regions-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getRegions = async () => {
    try{
        const res = await axios({
            method: 'get',
            url: `${API}/regions`,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getRegion = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/regions/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addRegion = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/regions-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};