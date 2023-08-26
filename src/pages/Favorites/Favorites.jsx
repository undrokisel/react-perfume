import { useContext } from "react";
import { Goods } from "../../components/Goods";
import { Store } from '../../context/Store';
import Info from "../../components/Info";

export function Favorites() {
    const { favorites } = useContext(Store);

    return (
        <>
            {
                favorites && (favorites.length > 0)
                    ? <Goods />
                    : <Info
                    img = {'empty-favorites.png'}
                    title = {'You have no favorites'}
                    text = {'May be you should add anything to it?'}
                    buttonLink = {'/'}
                    buttonText = {'Back to homepage'}
                    />
            }
        </>
    )
}