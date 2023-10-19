import favoritesReducer, {
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavoritesThunk,
} from "../favoritesSlice"

const initialState = {
    error: null,
    status: null,
    list: [{ id: 1 }, { id: 2 }]
}

// кейс, что возвращает дефолтный стейт с пустым экшеном
describe('Favorite Slice', () => {
    it('should return default state with empty action', () => {
        const state = favoritesReducer(initialState, {})
        expect(state).toEqual(initialState)
    })

    it('should add new Favorites with addToFavorites', () => {
        const action = { type: addToFavorites.type, payload: { id: 'test' } }
        const state = favoritesReducer(initialState, action)
        expect(state.list).toEqual([{ id: 1 }, { id: 2 }, { id: 'test' }])
    })

    it('should remove favorites with removeFromFavorites', () => {
        const action = { type: removeFromFavorites.type, payload: 1 }
        const state = favoritesReducer(initialState, action)
        expect(state.list).toEqual([{ id: 2 }])
    })

})

describe('favoritesSlice', () => {
    it('should change fetchFavorites status with fetchFavorites.pending action', () => {
        const state = favoritesReducer(initialState, { type: fetchFavorites.pending.type })
        expect(state).toEqual({ error: null, status: 'loading', list: [{ id: 1 }, { id: 2 }] })
    })
    it('should change fetchFavorites status with fetchFavorites.fulfilled action', () => {
        const action = { type: fetchFavorites.fulfilled.type, payload: [{ id: 'test' }] }
        const state = favoritesReducer(initialState, action)
        expect(state).toEqual({
            error: null,
            status: 'resolved',
            list: [{ id: 'test' }]
        })
    })
    it('should change fetchFavorites status with fetchFavorites.rejected action', () => {
        const action = { type: fetchFavorites.rejected.type, payload: 'fetchFavorites error' }
        const state = favoritesReducer(initialState, action)
        expect(state).toEqual({
            error: 'fetchFavorites error',
            status: 'rejected',
            list: [{ id: 1 }, { id: 2 }]
        })
    })

    it('should toggleFavoritesThunk change status with toggleFavoritesThunk.rejected action', () => {
        const action = { type: toggleFavoritesThunk.rejected.type, payload: "toggleFavoritesThunk error" }
        const state = favoritesReducer(initialState, action)
        expect(state).toEqual({ error: "toggleFavoritesThunk error", status: 'rejected', list: [{ id: 1 }, { id: 2 }] })
    })

})    
