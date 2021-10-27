import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = ({ onCartOpen, cartItems }) => {
    const [classActive, setClassActive] = React.useState('0');

    const addActive = (event) => setClassActive(event.target.id);

    return (
        <header>
            <div className={styles.headerLeft}>
                <div>
                    <Link to='/'>
                        <h1>GKara store</h1>
                    </Link>
                    <p>DISCOVER THIS YEAR'S PIECES FROM OUR LATEST COLLECTION</p>
                </div>
            </div>
            <ul className={styles.headerRight}>
                <Link to='/'>
                    <li
                        id={0}
                        onClick={addActive}
                        className={classActive === '0' ? `${styles.active}` : ''}>
                        Home
                    </li>
                </Link>
                <Link to='/favorites'>
                    <li
                        id={1}
                        onClick={addActive}
                        className={classActive === '1' ? `${styles.active}` : ''}>
                        Favorites
                    </li>
                </Link>
                <li onClick={onCartOpen}>
                    <span className={styles.cart}>Bag</span>
                    <span className={styles.cartCount}>({`${cartItems.length}`})</span>
                </li>
            </ul>
        </header>
    );
};

export default Header;
