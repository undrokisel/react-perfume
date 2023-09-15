import { useContext } from "react";
import { Store } from "../context/Store";
import { useSelector } from "react-redux";

export const useCart = () => {
    const {
        // total,
        // cartItems,
        // setCartItems,
    } = useContext(Store)

    const { list, total } = useSelector(state => state.cart)
    const cartItems = list

    return { total, cartItems, 
        // setCartItems,
     }
}