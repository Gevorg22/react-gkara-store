import React from 'react';
import axios from 'axios';
import { Route } from 'react-router';

import Header from '../Header/Header';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Cards from '../../pages/Cards/Cards';
import Favorites from '../../pages/Favorites/Favorites';

import styles from './App.module.scss';

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        async function getResults() {
            try {
                const cartItems = await axios.get(
                    'https://616fe04e23781c0017289697.mockapi.io/cart',
                );
                const favorites = await axios.get(
                    'https://616fe04e23781c0017289697.mockapi.io/favorites',
                );
                const items = await axios.get('https://616fe04e23781c0017289697.mockapi.io/items');

                setCartItems(cartItems.data);
                setFavoriteItems(favorites.data);
                setItems(items.data);
            } catch (error) {
                alert('Ошибка при запросе данных');
                console.error(error);
            }
        }
        getResults();
    }, []);

    const onCartAdd = async (obj) => {
        try {
            const findItem = cartItems.find((cart) => Number(cart.itemId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) =>
                    prev.filter((cart) => Number(cart.itemId) !== Number(obj.id)),
                );
                await axios.delete(
                    `https://616fe04e23781c0017289697.mockapi.io/cart/${findItem.id}`,
                );
            } else {
                const { data } = await axios.post(
                    'https://616fe04e23781c0017289697.mockapi.io/cart',
                    obj,
                );
                setCartItems((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
    };

    const onFavoriteAdd = async (obj) => {
        try {
            const findItem = favoriteItems.find(
                (favorite) => Number(favorite.itemId) === Number(obj.id),
            );
            if (findItem) {
                setFavoriteItems((prev) =>
                    prev.filter((favorite) => Number(favorite.itemId) !== Number(obj.id)),
                );
                axios.delete(
                    `https://616fe04e23781c0017289697.mockapi.io/favorites/${findItem.id}`,
                );
            }
            const { data } = await axios.post(
                'https://616fe04e23781c0017289697.mockapi.io/favorites',
                obj,
            );
            setFavoriteItems((prev) => [...prev, data]);
        } catch (error) {
            alert('Ошибка при добавлении в избранное');
            console.error(error);
        }
    };

    const onRemoveCart = (id) => {
        try {
            setCartItems((prev) => prev.filter((cart) => Number(cart.id) !== Number(id)));
            axios.delete(`https://616fe04e23781c0017289697.mockapi.io/cart/${id}`);
        } catch (error) {
            alert('Ошибка при удалении из корзины');
            console.error(error);
        }
    };

    const onRemoveFavorite = (id) => {
        try {
            setFavoriteItems((prev) =>
                prev.filter((favorite) => Number(favorite.id) !== Number(id)),
            );
            axios.delete(`https://616fe04e23781c0017289697.mockapi.io/favorites/${id}`);
        } catch (error) {
            alert('Ошибка при удалении из избранного');
            console.error(error);
        }
    };

    const onCartOpen = () => setCartOpened(true);

    const onSearchValue = (event) => setSearchValue(event.target.value);

    const isItemAdded = (id) => cartItems.some((obj) => Number(obj.itemId) === Number(id));

    const isFavoriteAdded = (id) =>
        favoriteItems.some((favorite) => Number(favorite.itemId) === Number(id));

    return (
        <div className={styles.wrapper}>
            <Header onCartOpen={onCartOpen} cartItems={cartItems} />
            <ShoppingCart
                onCartClose={() => setCartOpened(false)}
                cartItems={cartItems}
                onRemoveCart={onRemoveCart}
                setCartItems={setCartItems}
                opened={cartOpened}
            />
            <Route exact path="/">
                <Cards
                    items={items}
                    onSearchValue={onSearchValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onCartAdd={onCartAdd}
                    onFavoriteAdd={onFavoriteAdd}
                    isItemAdded={isItemAdded}
                    isFavoriteAdded={isFavoriteAdded}
                />
            </Route>
            <Route path="/favorites">
                <Favorites favoriteItems={favoriteItems} onRemoveFavorite={onRemoveFavorite} />
            </Route>
        </div>
    );
}

export default App;
