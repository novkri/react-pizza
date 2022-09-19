import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // getTotalPrice: (state) => {},

        addItem: (state, action) => {
            const findItem = state.items.find(i => i.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },

        decreaseItem: (state, action) => {
            const findItem = state.items.find(i => i.id === action.payload.id)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload)

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
    }
})

export const { addItem, removeItem, clearItems, decreaseItem } = cartSlice.actions

export default cartSlice.reducer
