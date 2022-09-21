import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLS} from "../../../assets/scripts/getCartFromLS";
import {calcTotalPrice} from "../../../assets/scripts/calcTotalPrice";
import { CartSliceState} from "./types";
import ICartItem from "../../../interfaces/ICartItem";

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice,
    items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const findItem = state.items.find(i => i.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice = calcTotalPrice(state.items)
        },

        decreaseItem: (state, action) => {
            const findItem = state.items.find(i => i.id === action.payload)
            if (findItem) {
                findItem.count--
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload)

            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
    }
})


export const { addItem, removeItem, clearItems, decreaseItem } = cartSlice.actions

export default cartSlice.reducer
