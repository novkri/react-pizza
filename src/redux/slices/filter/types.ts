import ISort from "../../../interfaces/ISort";

export enum SortPropertyEnum  {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'name',
    TITLE_ASC = '-name',
    PRICE_DESC = 'price',
    PRICE_ASK = '-price',
}



export interface FilterSliceState {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: ISort
}
