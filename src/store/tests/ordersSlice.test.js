import ordersReducer, {
    createOrder,
    createOrderThunk,
    fetchOrders,
} from '../ordersSlice'

const initialState = {
    status: null,
    error: null,
    list: [],
    isOrderSubmit: false
}

describe('ordersReducer', () => {
    it('should return initail state with empty action', () => {
        const state = ordersReducer(initialState, {})
        expect(state).toEqual(initialState)
    })
    it('should create an order with createOrder action', () => {
        const action = { type: createOrder.type, payload: { order: [1, 2] } }
        const state = ordersReducer(initialState, action)
        expect(state).toEqual({ status: null, error: null, list: [1, 2], isOrderSubmit: false })
    })
})

describe('ordersReducer extra ducers', () => {
    it('should change status with fetchOrders.pending', () => {
        const action = { type: fetchOrders.pending.type }
        const state = ordersReducer(initialState, action)
        expect(state).toEqual(
            { status: 'loading', error: null, list: [], isOrderSubmit: false })
    })
    it('should change status with fetchOrders.fulfilled', () => {
        const action = { type: fetchOrders.fulfilled.type, payload: [1, 2, 3] }
        const state = ordersReducer(initialState, action)
        expect(state).toEqual(
            { status: 'resolved', error: null, list: [1, 2, 3], isOrderSubmit: false })
    })
    it('should change status with fetchOrders.rejected', () => {
        const action = { type: fetchOrders.rejected.type, payload: 'fetchOrders error' }
        const state = ordersReducer(initialState, action)
        expect(state).toEqual(
            {
                status: 'rejected', error: 'fetchOrders error',
                list: [], isOrderSubmit: false
            })
    })
    it('should change status with createOrderThunk.rejected', () => {
        const action = { type: createOrderThunk.rejected.type, 
            payload: 'createOrderThunk error' }
        const state = ordersReducer(initialState, action)
        expect(state).toEqual(
            {
                status: 'rejected', error: 'createOrderThunk error',
                list: [], isOrderSubmit: false
            })
    })
    it('should change status with createOrderThunk.fulfilled', () => {
        const state = ordersReducer(initialState, createOrderThunk.fulfilled())
        expect(state).toEqual(
            { status: 'resolved', error: null, list: [], isOrderSubmit: true })
    })
})


