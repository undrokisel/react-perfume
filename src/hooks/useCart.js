import { useContext } from "react";
import { Store } from "../context/Store";

export const useCart = () => {
    const {total,  cartItems, setCartItems, } = useContext(Store)
    return {total,  cartItems, setCartItems, }
}