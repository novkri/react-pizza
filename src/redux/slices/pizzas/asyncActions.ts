import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, SearchPizzaParams} from "./types";
import axios from "axios";
import pickBy from 'lodash/pickBy';

export const fetchAllPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {
        sortBy,
        order,
        category,
        search,
        currentPage
    } = params

    const { data } = await axios.get<Pizza[]>(`https://62b57a56da3017eabb1b8e17.mockapi.io/Items`, {
        params:  pickBy({
            page: currentPage,
            limit: 4,
            category,
            sortBy,
            order,
            search
        })
    })
    return data
})
