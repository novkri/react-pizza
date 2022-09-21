import {calcTotalPrice} from "./calcTotalPrice";
import CartItem from "../../interfaces/ICartItem";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) as CartItem[] : []
    const totalPrice = calcTotalPrice(items)

    return {
        items,
        totalPrice
    }
}
