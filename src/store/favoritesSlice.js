import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_FAVORITES, instance } from "../api/apiUrls";

export const fetchFavorites = createAsyncThunk(
    'favorites/fetch',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(URL_FAVORITES)
            if (response.status !== 200) {
                throw new Error("Error with fetching fevorites")
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

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        error: null,
        status: null,
        list: []
    },
    reducers: {

    },
    extraReducers: {
        [fetchFavorites.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchFavorites.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.list = action.payload
        },
        [fetchFavorites.rejected]: setError,
    }
})



export const { toggleFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
