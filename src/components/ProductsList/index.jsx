import { useContext } from "react";
import { Store } from "../../context/Store";
import { Card } from "../Card"
import ContentLoader from "react-content-loader"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProductsList() {

    const {
        // filteredGoods,
        isLoading,
        // favorites,
        searchValue
    } = useContext(Store);

    const products  = useSelector((state) => state.products.list)
    const favorites  = useSelector((state) => state.favorites.list)

    // const arr = useLocation().pathname === '/favorites' ? favorites : filteredGoods;
    const arr = useLocation().pathname === '/favorites' ? favorites : products;
    
    const goods = arr && Array.isArray(arr)
        ? arr.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        : [];
    return (
        <>
            {
                isLoading ?
                    [...Array(10)].map((el, index) => {
                        return (
                            <ContentLoader
                                speed={2}
                                width={170}
                                height={200}
                                viewBox="0 0 170 200"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                                key={index}
                            >
                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                                <circle cx="20" cy="20" r="20" />
                            </ContentLoader>
                        )
                    })
                    :
                    goods.map((item, index) => {
                        return (<Card
                            item = {item}
                            isFavorite={favorites.some(obj => obj.id === item.id) ?? false}
                            key={index}
                        />)
                    }
                    )
            }
        </>
    )
}