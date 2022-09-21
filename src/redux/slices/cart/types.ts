import ICartItem from "../../../interfaces/ICartItem";

export interface CartSliceState {
    totalPrice: number
    items: ICartItem[]
}
