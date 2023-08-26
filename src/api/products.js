import { URL_GET_PRODUCTS, instance } from './apiUrls';



export const apiGetProducts = async () => {
    try {
        const response = await instance.get(URL_GET_PRODUCTS);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
} 