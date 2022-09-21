import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pizza, PizzaSliceState} from "./types";
import {LoadingStatus} from "../../../assets/scripts/enums";
import {fetchAllPizzas} from "./asyncActions";

const initialState: PizzaSliceState = {
    items: [],
    status: LoadingStatus.loading
}


export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPizzas.pending, (state, action) => {
            state.status = LoadingStatus.loading;
            state.items = [];
        });

        builder.addCase(fetchAllPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = LoadingStatus.success;
        });

        builder.addCase(fetchAllPizzas.rejected, (state, action) => {
            state.status = LoadingStatus.error;
            state.items = [];
        });
    },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
