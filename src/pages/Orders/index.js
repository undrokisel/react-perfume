import React, { useContext, useEffect } from 'react'
import ss from './Orders.module.scss'
import { Store } from '../../context/Store';
import Info from '../../components/Info';
import { apiGetOrder } from '../../api/order';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/ordersSlice';

export const Orders = () => {
    // const { orderProducts, setOrderProducts } = useContext(Store);

    const dispatch = useDispatch()
    const { list, status, error } = useSelector(state => state.orders)
    const orderProducts = list

    useEffect(() => {
        dispatch(fetchOrders)
    }, [dispatch])

    return (
        <div>
            {status === 'loading' && <div style={{ textAlign: "center" }}>Loading. Please, wait</div>}
            {status === 'rejected' && error &&
                <div style={{ textAlign: "center" }}>Error: {error}</div>}
            {orderProducts.length < 1 && status === 'resolved'
                ?
                <Info
                    img={'404.png'}
                    title={'You have no orders'}
                    buttonText={'Back home'}
                    buttonLink={'/'}
                />
                :
                <>
                    <div className={ss.order__title}>Your order</div>
                    <div className={`${ss.cart__items}`}>

                        {
                            orderProducts && orderProducts.map(({
                                name,
                                brand,
                                category,
                                description,
                                id,
                                volume,
                                concentration,
                                country,
                                ingredients,
                                reviews,
                                rating,
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
                                        {/* <button
                                    onClick={() => handleDeleteItemFromCart(id)}
                                    className={ss.itemCart__remove} type="">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                                </button> */}
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </div>

    )
}
