import { screen } from '@testing-library/react'
import axios from 'axios'
import { instance } from "../../api/apiUrls";

// импортируем редусер и все экшены, которые есть
import cartReducer, {
    addToCart,
    addToCartThunk,
    clearCart,
    fetchCart,
    removeFromCart,
    removeFromCartThunk,

} from '../cartsSlice';
import cartsSlice from '../cartsSlice';

//сразу мокаем аксиос
// jest.mock('axios')

const initState = {
    list: [1, 2],
    error: null,
    status: null,
    total: 100
}

describe('cart slice', () => {
    // test initial state with first render

    it('should return default state when passed an empty action', () => {
        //    имитируем вызов редусерса, передаем инишиал стейт и пустой экнш.
        // ожидать будем такой же инишиал стейт 
        const result = cartReducer(initState, { type: '' });
        expect(result).toEqual(initState);
    })

    // test work of reducers
    it('should add new cart item with "addToCart" action', () => {
        // in action we expect product & total
        // ! type: addToCart.type
        const action1 = { type: addToCart.type, payload: { product: 100, total: 500 } }
        const result1 = cartReducer(initState, action1)
        expect(result1).toEqual({ list: [1, 2, 100], error: null, status: null, total: 500 })

        const action2 = { type: addToCart.type, payload: { product: 4, total: 700 } }
        const result2 = cartReducer(result1, action2)
        expect(result2).toEqual({ list: [1, 2, 100, 4], error: null, status: null, total: 700 })
    })

    //test remove from cart action 
    it('should remove from cart item with "removeFromCart" action', () => {
        const initState = {
            list: [{ id: 10, price: 45 }, 2], error: null, status: null, total: 100
        }
        // in payload we expect to get id only
        const action = { type: removeFromCart.type, payload: 10 }
        const result = cartReducer(initState, action)
        expect(result).toEqual({ list: [2], error: null, status: null, total: 55 })
    })

    // test clear cart reducer
    it('should clear cart and total in cart with clearCart action', () => {
        const result = cartReducer(initState, { type: clearCart.type })
        expect(result).toEqual({ list: [], error: null, status: null, total: 0 })
    })
})

//fetchCart reducer
describe('cartSlice', () => {
    it('should change fetchCart status with "fetchCart.pending" action', () => {
        const state = cartReducer(initState, fetchCart.pending())
        expect(state.status).toBe('loading')
        expect(state.error).toBeNull()
    })
    it('should fetch Cart  with "fetchCart.fulfilled" action', () => {
        const cart = { list: [1, 2, 3], total: 500 }
        const state = cartReducer(initState, fetchCart.fulfilled(cart))
        expect(state.status).toEqual('resolved')
        expect(state).toEqual({ list: [1, 2, 3], error: null, status: 'resolved', total: 500 })
    })
    it('should change  status and error with "fetchCart.rejected" action', () => {
        const action = { type: fetchCart.rejected.type, payload: "Error with fetching cart" }
        const state = cartReducer(initState, action)
        expect(state).toEqual({
            list: [1, 2],
            error: "Error with fetching cart",
            status: 'rejected',
            total: 100
        })
    })
})
//addToCart reducer
it('should change status and error with "addToCartCartThunk.rejected" action', () => {
    const action = { type: addToCartThunk.rejected.type, payload: 'addToCartThunk error' }
    const state = cartReducer(initState, action)
    expect(state).toEqual({
        list: [1, 2],
        error: "addToCartThunk error",
        status: 'rejected',
        total: 100
    })
})

// removeFromCart reducer
it('should change status and error with removeFromCartThunk rejected', () => {
    const action = { type: removeFromCartThunk.rejected.type, payload: 'removeFromCartThunk error' }
    const state = cartReducer(initState, action)
    expect(state).toEqual({
        list: [1, 2],
        status: 'rejected',
        error: 'removeFromCartThunk error',
        total: 100
    })
})


//fetchCart thunk

// if we use fetch instead of axios
//we need to mock fetch (from node.js global (like window))
//  global.fetch = jest.fn()

