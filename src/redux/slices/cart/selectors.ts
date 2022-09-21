import {RootState} from "../../store";
import ICartItem from "../../../interfaces/ICartItem";

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state:  RootState) => state.cart.items.find((i: ICartItem) => i.id === id)
