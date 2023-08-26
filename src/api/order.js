import { URL_ORDER, instance } from "./apiUrls";

export const apiOrderCreate = async () => {
    try {
        const res = await instance.post(URL_ORDER);
        return res.data
    } catch (error) {
        throw new Error(error.message);
    }
}

export const apiGetOrder = async () => {
    try {
        const response = await instance.get(URL_ORDER);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}