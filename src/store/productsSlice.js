import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_GET_PRODUCTS, instance } from "../api/apiUrls";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await instance.get(URL_GET_PRODUCTS);
            if (response.status !== 200) {
                throw new Error("Error with fetching products")
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.error = action.payload
    state.status = 'rejected'
}

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        error: null,
        list: [],
        status: null
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.list = action.payload
        },
        [fetchProducts.rejected]: () => setError,
    }
})

export const { addToFavorites } = productsSlice.actions
export default productsSlice.reducer