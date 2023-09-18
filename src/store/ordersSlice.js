import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_ORDER, instance } from '../api/apiUrls'
import { clearCart } from "./cartsSlice";

export const fetchOrders = createAsyncThunk(
    'orders/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await instance.get(URL_ORDER);
            if (response.status !== 200) {
                throw new Error('Error with fetching orders')
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createOrderThunk = createAsyncThunk(
    'order/create',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const response = await instance.post(URL_ORDER)
            if (response.status !== 200) {
                throw new Error("error with create an order")
            }
            const cart = getState().cart.list
            const order = getState().orders.list.concat(cart)
            dispatch(createOrder({ order }))
            dispatch(clearCart())
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        status: null,
        error: null,
        list: [],
        isOrderSubmit: false
    },
    reducers: {
        createOrder: (state, action) => {
            state.list = action.payload.order
        }
    },
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.list = action.payload
        },
        [fetchOrders.rejected]: setError,
        [createOrderThunk.rejected]: setError,
        [createOrderThunk.fulfilled]: (state, action) => {
            state.status = 'resolved'   
            state.isOrderSubmit = true 
        },

    }
})

export const { createOrder } = ordersSlice.actions
export default ordersSlice.reducer