import { URL_FAVORITES, instance } from "./apiUrls";


export const apiGetFavorites = async () => {
    try {
        const response = await instance.get(URL_FAVORITES);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const apiToggleFavorites = async (id) => {
    try { 
        const response = await instance.post(URL_FAVORITES, {
            "product_id": id
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}