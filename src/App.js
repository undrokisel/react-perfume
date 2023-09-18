import { Home } from '../src/pages/Home/Home.jsx';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Favorites } from './pages/Favorites/Favorites.jsx';
import { ThemeContext } from './context/ThemeContext.js';
import { Store } from './context/Store.js'
import { NotFound } from './pages/ErrorPages/NotFound.jsx';
import { debounce } from 'lodash';
import { Orders } from './pages/Orders';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/productsSlice.js';
import { fetchFavorites } from './store/favoritesSlice.js';
import { fetchOrders } from './store/ordersSlice.js';
import { fetchCart } from './store/cartsSlice.js';

function App() {

  const [theme, setTheme] = useState("light")
  const [isCartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  const dispatch = useDispatch();

  const { darkTheme, lightTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    let themeStyle = theme === 'light' ? 'dark' : 'light'
    setTheme(themeStyle)
  }

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFavorites());
    dispatch(fetchOrders());
    dispatch(fetchCart());
  }, [])

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
        searchValue,
        theme,
        isCartOpened,
        toggleTheme,
        toggleOpenCart,
        handleSearchChange,
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
