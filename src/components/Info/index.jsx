import React, { useContext } from 'react';
import ss from './Info.module.scss';
import { Link } from 'react-router-dom';
import { Store } from '../../context/Store';

export default function Info({ refDrawer = false, title, text, img, buttonText, buttonLink }) {
    const { theme, isCartOpened } = useContext(Store);
    let themeStyle = theme;
    if ((isCartOpened) && refDrawer) {
        themeStyle = 'light';
    }

    return (
        <div className={`${ss.info} ${themeStyle}-theme_color`}>

            {
                img
                    ? <div className={ss.info__img}>
                        <img src={`/img/info/${img}`} alt="cart" />
                    </div>
                    : null
            }
            {
                title
                    ? <div className={`${ss.info__title} `}>{title}</div>
                    : null
            }
            {
                text
                    ? <div className={`${ss.info__text} `}>{text}</div>
                    : null
            }
            {
                buttonText && buttonLink
                    ? <Link to={buttonLink}>
                        <button className={`${ss.info__btn} btn`}>
                            {buttonText}
                        </button>
                    </Link>
                    : null
            }
        </div>
    )
}
