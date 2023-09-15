import { Home } from '../src/pages/Home/Home.jsx';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Favorites } from './pages/Favorites/Favorites.jsx';
import { ThemeContext } from './context/ThemeContext.js';
import { Store } from './context/Store.js'
import { NotFound } from './pages/ErrorPages/NotFound.jsx';
// import { apiGetProducts } from './api/products.js';
import { apiAddToCart, apiGetCart, deleteFromCart } from './api/cart.js';
import { apiGetOrder, apiOrderCreate } from './api/order.js';
import { debounce } from 'lodash';
import { Orders } from './pages/Orders';
import { apiGetFavorites, apiToggleFavorites } from './api/favorites.js';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/productsSlice.js';
import { fetchFavorites } from './store/favoritesSlice.js';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light")
  const [isCartOpened, setCartOpened] = useState(false);

  const [searchValue, setSearchValue] = useState('')
  // const [filteredGoods, setFilteredGoods] = useState([])

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState('0')

  // const [favorites, setFavorites] = useState([]);

  const [orderProducts, setOrderProducts] = useState([])
  const [isOrderSubmit, setIsOrderSubmit] = useState(false);


  const dispatch = useDispatch();


  const { darkTheme, lightTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    theme === 'light'
      ? setTheme('dark')
      : setTheme('light')
  }

  useEffect(() => {

    dispatch(fetchProducts());
    console.log('fetchProducts');
    dispatch(fetchFavorites());
    console.log('fetchFavorites');

    setIsLoading(true)
    const fetchData = async () => {
      try {
        const [
          // updatedProducts,
          updatedCart,
          updatedOrders,
          // updatedFavorites
        ] = await Promise.all([
          // apiGetProducts(),
          apiGetCart(),
          apiGetOrder(),
          // apiGetFavorites(),
        ])

        // setFilteredGoods(updatedProducts);
        setCartItems(updatedCart);
        setOrderProducts(updatedOrders);
        // setFavorites(updatedFavorites);
      } catch (error) {
        throw new Error(error.message)
      }
    }
    fetchData();
    setIsLoading(false);
  }, [])

  const handleAddToCart = async (productId, quantity) => {
    const isItemInCart = cartItems.some(obj => +obj.id === +productId)
    if (isItemInCart) {
      alert(`item was added before`)
      return
    } try {
      await apiAddToCart(productId, quantity);
      const updatedCart = await apiGetCart();
      setCartItems(updatedCart)
    } catch (er) {
      alert(er.message)
    }
  }


  const handleDeleteItemFromCart = async (id) => {
    if (cartItems.length === 1) {
      setTotal(0);
    }

    const isItemInCart = cartItems.some(obj => +obj.id === +id);
    if (!isItemInCart) {
      alert(`Item with ${id} is not found in the cart`)
      return
    } try {
      const resData = await deleteFromCart(id);
      if (resData) {
        const updatedCartItems = cartItems.filter(obj => obj.id !== id)
        setCartItems(updatedCartItems)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((accum, item) => {
        return accum += +item.price
      }, 0)
      setTotal(sum)
    }
  }, [cartItems])



  const handleIsOrderSubmit = async () => {
    setIsOrderSubmit(true);
    setOrderProducts(prev => [...orderProducts, cartItems]);
    await apiOrderCreate();
    setCartItems([]);
    setTotal('0')
  }

  // const toggleFavorites = async (id) => {
  //   await apiToggleFavorites(id);
  //   const updatedFavorites = await apiGetFavorites();
  //   setFavorites(updatedFavorites);
  // }

  const toggleOpenCart = () => {
    setCartOpened(!isCartOpened)
  }

  const handleSearchChange = useCallback((event) => {
    searchDebounced.current(event.target.value);
  }, []);
  const searchDebounced = useRef(debounce((event) => {
    setSearchValue(event);
  }, 100))

  return (

    <Store.Provider
      value={{
        // filteredGoods,
        cartItems,
        // favorites,
        searchValue,
        theme,
        isLoading,
        isCartOpened,
        total,
        orderProducts,
        setOrderProducts,
        setCartItems,
        toggleTheme,
        handleDeleteItemFromCart,
        toggleOpenCart,
        // toggleFavorites,
        handleAddToCart,
        handleSearchChange,
        handleIsOrderSubmit,
        isOrderSubmit,
        setIsOrderSubmit,
        apiAddToCart,
        apiGetCart,
        deleteFromCart,
      }}>
      <div className={theme === "light"
        ? "wrapper " + lightTheme
        : "wrapper " + darkTheme
      }>
        <Drawer />
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </Store.Provider>
  );
}

export default App;
