import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_ORDER, instance } from '../api/apiUrls'

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
const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        status: null,
        error: null,
        list: []
    },
    reducers: {

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
    }
})


export default ordersSlice.reducer