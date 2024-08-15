import axios from "axios";
import {API, HEADERS} from "../../../config";

export const deleteUnitAvailability = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/ms-units-availability/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const saveUnitAvailabilityDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/ms-units-availability-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getUnitsAvailability = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units-availability`,
        headers: HEADERS
    });

    return res.data;
};

export const getUnitAvailabilityDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units-availability/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const getUnitAvailabilityByCompany = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-units-availability-by-company/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const addUnitAvailability = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/ms-units-availability-create`,
            data: data,
            headers: HEADERS
        });

        return res.data;
        
    }
    catch (e) {
        return e;
    }
};

export const getUnitsAvailable = async (companyId: string, start_date: string) => {
    try {
        const response = await axios.post(`${API}/ms-units/available-times`, {
            company_id: companyId,
            start_date: start_date
        });

        return response.data;
    } catch (e) {
        return [];
    }
};