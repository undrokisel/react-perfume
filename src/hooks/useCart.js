import { useSelector } from "react-redux";

export const useCart = () => {
    const { list, total } = useSelector(state => state.cart)
    const cartItems = list

    return { total, cartItems }
}