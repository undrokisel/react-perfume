import { Goods } from "../../components/Goods";
import Info from "../../components/Info";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

export function Favorites() {
    const { list, status, error } = useSelector(state => state.favorites)
    const favorites = list
    return (
        <>
            {status === 'loading' && <Loader />}
            {error && <div>Error: {error}</div>}
            {!error && status === 'resolved' && favorites && (favorites.length < 1)
                && <Info
                    img={'empty-favorites.png'}
                    title={'You have no favorites'}
                    text={'May be you should add anything to it?'}
                    buttonLink={'/'}
                    buttonText={'Back to homepage'}
                />
            }
            {!error && status === 'resolved' && favorites && (favorites.length > 0) &&
                <Goods />
            }
        </>
    )
}