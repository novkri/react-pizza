import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {LoadingStatus} from "../../assets/enums";

const initialState = {
    items: [],
    status: LoadingStatus.loading // loading | success | error
}

export const fetchAllPizzas = createAsyncThunk('pizza/fetchPizzas',
    async (params, thunkAPI) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage
        } = params
        const { data } = await axios.get(`https://62b57a56da3017eabb1b8e17.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchAllPizzas.pending]: (state) => {
            state.status = LoadingStatus.loading
            state.items = []
        },
        [fetchAllPizzas.rejected]: (state) => {
            state.status = LoadingStatus.error
            state.items = []
        },
        [fetchAllPizzas.fulfilled]: (state, action) => {
            state.status = LoadingStatus.success
            state.items = action.payload
        }
    }
})

export const selectPizzas = state => state.pizza
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
