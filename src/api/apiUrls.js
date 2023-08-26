import axios from 'axios';
import {API_DOMAIN} from '../config.js'


export const URL_GET_PRODUCTS = `/products`;
export const URL_CART = `/cart`;
export const URL_ORDER = `/order`;
export const URL_FAVORITES = `/favorites`;

export const instance = axios.create({
    withCredentials: true,
    baseURL: API_DOMAIN,
})