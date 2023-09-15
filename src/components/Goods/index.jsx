import { SearchBar } from "../SearchBar";
import { ProductsList } from "../ProductsList";
import ss from "../../components/Goods/Goods.module.scss";
import { useLocation } from "react-router-dom";

export function Goods() {
    const url = useLocation().pathname;
    return (
        <section className={ss.goods}>
            <div className={ss.goods__top}>
                <h3 className={ss.goods__title}>{
                    url === '/' ? "All goods" : "Favorites"
                }</h3>
                <SearchBar />
            </div>
            <div className={ss.goods__cards}>
                <ProductsList />
            </div>
        </section>
    )
}