import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_CART, instance } from "../api/apiUrls";

export const fetchCart = createAsyncThunk(
    'cart/fetch',
    async (_, { rejectWithValue, dispatch }) => {
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

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
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
    redusers: {

    },
    extraReducers: {
        [fetchCart.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchCart.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.list = action.payload.list
            state.total = action.payload.total
        },
        [fetchCart.rejected]: setError
    }
})

export const { } = cartsSlice.actions
export default cartsSlice.reducer;