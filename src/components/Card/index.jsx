import { useContext, useState } from "react";
import ss from "./Card.module.scss"
import { Store } from "../../context/Store"
import ReactStars from "react-rating-stars-component";
import { addToCartThunk } from "../../store/cartsSlice";
import { useDispatch, useSelector } from "react-redux";

export function Card({
    isFavorite,
    item: {
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
        price
    },

}) {

    //todo  
    const productId = id;
    const quantity = 1;
    const { theme, toggleFavorites } = useContext(Store);

    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.list)

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)
            }, delay);
        }
    }
    const handleAddToCart = async (productId, quantity) => {
        const isItemInCart = cartItems.some(obj => +obj.id === +productId)
        if (isItemInCart) {
            return alert(`item was added before`)
        }
        dispatch(addToCartThunk({ productId, quantity }))
    }
    const debouncedHandleButtonClick = debounce(handleAddToCart, 300)

    return (
        <div className={`${ss.goods__card} ${ss.card} ${ss[theme]}`}>
            <div
                className={isFavorite
                    ? `${ss.favorite} ${ss.favorite_checked}`
                    : `${ss.favorite} ${ss.favorite_unchecked}`}

                onClick={() => toggleFavorites(productId)}
            >
            </div>
            <div className={ss.card__img}>
                <img
                    width={133}
                    height={112}
                    src={"./img/goods/" + img} alt="item" />
            </div>
            <div className={ss.card__body}>

                <div className={ss.card__tag_block}>
                    <div className={ss.tag_block_firstRow}>
                        <div className={ss.card__country}>{country}</div>
                        <div className={`${ss.card__tag} ${ss.card__brand}`}>{brand}</div>
                        <div className={`${ss.card__tag} ${ss.card__category}`} >{category}</div>
                    </div>

                </div>
                <div className={ss.card__row}>

                    <ReactStars
                        count={5}
                        value={rating}
                        size={18}
                        activeColor="#ffd700"
                        isHalf={true}
                        edit={false}
                    />
                    <div className={ss.card__reviews}>
                        {reviews}
                        <img height={20} src={"img/icons/review.png"} alt="reviews" />
                    </div>
                </div>
                <div className={ss.card__row}>
                    <p className={ss.card__volume}><b></b>{`${volume} ml`}</p>
                    <p className={ss.card__concentration}>{concentration}</p>
                </div>
                <p className={ss.card__name}>{name}</p>
                <p className={ss.card__description}>{`${description.slice(0, 50)} ...`}</p>
                <p className={ss.card__ingredients}><b>ingredients:</b>
                    {
                        `${ingredients.slice(0, 30)}...`
                    }
                </p>



            </div>
            <div className={ss.card__bottom}>
                <div className={ss.card__price}>
                    <span >Price</span>
                    <p>{price}$</p>
                </div>
                <button className={`${ss.card__add} ${ss[theme]}`} type=""
                    onClick={() => debouncedHandleButtonClick(productId, quantity)}
                >
                    <svg
                        fill={theme === "dark" ? "#fff" : "#000"}
                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                </button>
            </div>
        </div>
    )
}