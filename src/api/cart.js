import { URL_CART, instance } from "./apiUrls";

// export const apiGetCart = async () => {
//     try {
//         const response = await instance.get(URL_CART);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export const apiAddToCart = async (productId, quantity) => {
//     try {
//         const response = await instance.post(URL_CART, {
//             product_id: productId,
//             quantity: quantity
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }


export const deleteFromCart = async (id) => {
    try {
        const response = await instance.delete(`${URL_CART}/${id}`)
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
} 