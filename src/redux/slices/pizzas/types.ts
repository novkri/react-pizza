import {LoadingStatus} from "../../../assets/scripts/enums";

export type Pizza = {
    id: string
    count: number
    imageUrl: string
    name: string
    price: number
    types: string[]
    sizes: number[]
    rating: number
}

export interface PizzaSliceState {
    items: Pizza[]
    status: LoadingStatus
}

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: number;
};
