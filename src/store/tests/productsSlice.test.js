import productsReducer, {
    fetchProducts
} from '../productsSlice'
const initialState = {
    error: null,
    list: [],
    status: null
}

describe('productsReducer', () => {
    it('should return initial state with empty action', () => {
        expect(productsReducer(initialState, {})).toEqual({ error: null, list: [], status: null })
    })
})
describe('productsReducer with extra deducers', () => {
    it('should change status with fetchProducts.pending', () => {
        const state = productsReducer(initialState, fetchProducts.pending())
        expect(state).toEqual({ error: null, list: [], status: 'loading' })
    })
    it('should change status with fetchProducts.rejected', () => {
        const action = { type: fetchProducts.rejected.type, payload: "fetchProducts error" }
        const state = productsReducer(initialState, action)
        expect(state).toEqual({
            error: "fetchProducts error",
            list: [], status: 'rejected'
        })
    })
    it('should change status with fetchProducts.fulfilled', () => {
        const action = { type: fetchProducts.fulfilled.type, payload: [1, 3, 5] }
        const state = productsReducer(initialState, action)
        expect(state).toEqual({ error: null, list: [1, 3, 5], status: 'resolved' })
    })
})