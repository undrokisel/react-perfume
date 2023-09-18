import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_FAVORITES, instance } from "../api/apiUrls";

export const fetchFavorites = createAsyncThunk(
    'favorites/fetch',
    async (_, { rejectWithValue }) => {
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

export const toggleFavoritesThunk = createAsyncThunk(
    'favorites/toggle',
    async (itemId, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await instance.post(URL_FAVORITES, {
                "product_id": itemId
            })

            if (![200, 201].includes(response.status)) {
                throw new Error("Error with toggling favorite item")
            }
            const favoritedProduct = getState().favorites.list.find(item => item.id === itemId)

            favoritedProduct
                ? dispatch(removeFromFavorites(itemId))
                : dispatch(addToFavorites(
                    getState().products.list.find(item => item.id === itemId))
                )

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
        addToFavorites: (state, action) => {
            state.list.push(action.payload)
        },
        removeFromFavorites: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload)
        }
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
        [toggleFavoritesThunk.rejected]: setError,
    }
})



export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
