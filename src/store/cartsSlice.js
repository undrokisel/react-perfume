import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_CART, instance } from "../api/apiUrls";

export const fetchCart = createAsyncThunk(
    'cart/fetch',
    async (_, { rejectWithValue, dispatch, }) => {
        try {
            const response = await instance.get(URL_CART)
            if (response.status !== 200) {
                throw new Error("Error with fetching cart")
            }
            const items = response.data
            return {
                list: items,
                total: calcTotal(items)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addToCartThunk = createAsyncThunk(
    'cart/add',
    async ({ productId, quantity }, { dispatch, rejectWithValue, getState }) => {
        try {
            const item = {
                product_id: productId,
                quantity: quantity
            }
            const response = await instance.post(URL_CART, item)
            if (response.status !== 200) {
                throw new Error("Error with adding new item to cart")
            }
            let product = getState().products.list.find(item => item.id === productId)
            const total = +getState().cart.total + +product.price 
            dispatch(addToCart({ product, total }));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}
const setLoading = (state) => {
    state.status = 'loading'
    state.error = null
}

const calcTotal = (items) => {
    return items.reduce((total, item) => total += +item.price, 0)
}

const cartsSlice = createSlice({
    name: 'cart',
    initialState: {
        list: [],
        error: null,
        status: null,
        total: 0
    }, 
    reducers: {
        addToCart(state, action) {
            state.list.push(action.payload.product)
            state.total = action.payload.total
        }
    },
    extraReducers: {
        [fetchCart.pending]: setLoading,
        [fetchCart.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.list = action.payload.list
            state.total = action.payload.total
        },
        [fetchCart.rejected]: setError,
        [addToCartThunk.rejected]: setError,
    }
})

export const { addToCart } = cartsSlice.actions
export default cartsSlice.reducer;