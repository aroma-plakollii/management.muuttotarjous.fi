import axios from "axios";
import {API} from "../config";
import {HEADERS} from "../config";

// export const isAuthenticated = () => sessionStorage.getItem('token');
export const isAuthenticated = () => localStorage.getItem('token');
export const role = localStorage.getItem('role');
export const service = localStorage.getItem('service');
export const login = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/login`,
            data: data,
            headers: HEADERS
        });

       return res.data;
    }
    catch (e) {
        return e;
    }
}

export const logout = async () => {
    const res = await axios({
        method: 'post',
        url: `${API}/logout`,
        data: {},
        headers: HEADERS
    });

    return res.data;
};


export const resetPassword = async (data: any, token: any) => {
    try{
        const res = await axios({
            method: 'post',
            url: `${API}/reset-password/${token}`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {

        return e;
    }   
};

export const getUsersByService = async (data: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/users-by-service`,
            data: data,
            headers: HEADERS
        });

        return res.data;
    }
    catch (e) {
        return e;
    }
}
