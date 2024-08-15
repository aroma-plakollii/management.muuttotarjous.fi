import axios from "axios";
import {API, HEADERS} from "../../../config";

export const getUsers = async () => {
    try{
        const res = await axios({
            method: 'get',
            url: `${API}/users`,
            headers: HEADERS
        });
    
        return res.data;
    }
    catch (e) {
        return e;
    }
    
};

export const createUser = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/register`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getUserDetails = async (id: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/mb-users-by-id/${id}`,
        headers: HEADERS
    });

    return res.data;
};

export const saveUserDetails = async (id: number, data: any) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${API}/mb-users-update/${id}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const deleteUser = async (id: any) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API}/mb-users/${id}`,
            data: id,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
};

export const getRoles = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `${API}/role`,
            headers: HEADERS
        });

        return res.data;
    }catch (e){
        return e;
    }
}