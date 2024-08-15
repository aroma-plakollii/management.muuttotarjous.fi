import axios from "axios";
import {API} from "../config";
import {HEADERS} from "../config";

export const generateResetToken = async (email: string) => {
    try {
        const token = await axios({
            method: 'post',
            url: `${API}/generate-reset-token`,
            data: {
                email: email,
            },
            headers: HEADERS
        });

        return token.data;
    } catch (e) {
        return e;
    }
};
export const sendPasswordResetEmail = async (email: string, token: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${API}/forgot-password/${token}`,
            data: {
                email: email,
                token: token
            },
            headers: HEADERS
        });

        return res.data;
    } catch (e) {
        return e;
    }
};