import { useContext } from "react"
import ss from "./Drawer.module.scss"
import { Store } from "../../context/Store";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartThunk } from "../../store/cartsSlice";
import { createOrderThunk } from "../../store/ordersSlice";


export function Drawer() {

    const {
        theme,
        toggleOpenCart,
        isCartOpened,
    } = useContext(Store)

    const { total, cartItems } = useCart();
    const dispatch = useDispatch()
    const isOrderSubmit = useSelector(state => state.orders.isOrderSubmit)

    return (
        <div className={`${ss.overlay} ${theme} ${isCartOpened ? ss.overlayVisible : ''}`}
            onClick={(e) => {
                return e.target === document.getElementsByClassName('overlay')[0]
                    ? toggleOpenCart() : null
            }
            }
        >
            <div className={`${ss.drawer} ${theme} ${isCartOpened ? ss.drawerVisible : ''}`}>
                <div className={ss.drawer__top}>
                    <div><h2 className={ss.drawer__title}>Cart</h2></div>
                    <button className={ss.drawer__remove} type=""
                        onClick={toggleOpenCart}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </button>
                </div>


                {
                    cartItems && (cartItems.length < 1)
                        ?
                        <div className={ss.drawer__info}>
                            <Info
                                refDrawer
                                img={isOrderSubmit
                                    ? 'order.png'
                                    : 'empty-cart.png'}
                                title={isOrderSubmit
                                    ? 'Order is accepted'
                                    : 'Cart is empty'}
                                text={isOrderSubmit
                                    ? 'manager will contact you shortly'
                                    : 'May be you should add something in it?'}
                            />
                        </div>
                        : <div className={`${ss.drawer__items} ${ss.cart__items}`}>
                            {
                                cartItems && cartItems.map(({
                                    name,
                                    id,
                                    img,
                                    price,
                                },
                                    index) => {
                                    return (
                                        <div key={index}
                                            className={`${ss.cart__item} ${ss.itemCart}`}>
                                            <div className={ss.itemCart__img}>
                                                <img
                                                    width={70}
                                                    height={70}
                                                    src={"./img/goods/" + img} alt="item" />
                                            </div>
                                            <div className={ss.itemCart__body}>
                                                <p className={ss.itemCart__model}>{name}</p>
                                                <div className={ss.itemCart__bottom}>
                                                    <div className={ss.itemCart__price}>
                                                        <span >Price</span>
                                                        <p>{price}$</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeFromCartThunk(id))}
                                                className={ss.itemCart__remove} type="">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }


                {
                    cartItems && (cartItems.length > 0) ?

                        <div className={`${ss.drawer__footer} ${ss.total}`}>
                            <ul className={ss.total__list}>
                                <li
                                    className={`${ss.total__item} ${ss.total__item_amount}`}>
                                    <span>Total:</span>
                                    <div className={ss.dash}></div>
                                    <b>{total}$</b>
                                </li>
                                <li
                                    className={`${ss.total__item} ${ss.total__item_tax}`}>
                                    <span>Tax 5%:</span>
                                    <div className={ss.dash}></div>
                                    <b>{(total / 20).toFixed(2)}$</b>
                                </li>
                            </ul>
                            <button
                                onClick={() => dispatch(createOrderThunk())}
                                className={`btn ${ss.total__btn}`} type="submit">
                                <span>make an order</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                            </button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}