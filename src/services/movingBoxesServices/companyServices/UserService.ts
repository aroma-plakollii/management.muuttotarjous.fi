import axios from "axios";
import {API, HEADERS} from "../../../config";

export const getUsers = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/users`,
        headers: HEADERS
    });

    return res.data;
};