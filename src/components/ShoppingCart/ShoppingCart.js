import React from 'react';
import axios from 'axios';

import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ onCartClose, cartItems = [], onRemoveCart, setCartItems, opened }) => {
    const [buyClick, setBuyClick] = React.useState(false);

    const onOrderAdd = async () => {
        try {
            await axios.post('https://616fe04e23781c0017289697.mockapi.io/orders', {
                items: cartItems,
            });
            setBuyClick(true);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://616fe04e23781c0017289697.mockapi.io/cart/${item.id}`);
                setCartItems([]);
            }
        } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
        }
    };

    const closeCart = () => {
        onCartClose();
        setTimeout(() => {
            setBuyClick(false);
        }, 500);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.cart}>
                <h2>
                    Shopping Bag
                    <img
                        onClick={closeCart}
                        className={styles.cartRemove}
                        width={15}
                        height={15}
                        src="img/close.svg"
                        alt="close"
                    />
                </h2>
                {buyClick ? (
                    <div>
                        <h3 className={styles.cartEmptyInfo}>
                            Your order has been successfully created
                        </h3>
                        <button onClick={closeCart} className={styles.cartBackBtn}>
                            Back to the shop
                        </button>
                    </div>
                ) : (
                    <div className={styles.cartContent}>
                        {cartItems.length > 0 ? (
                            <div className={styles.cartItems}>
                                <div className={styles.items}>
                                    {cartItems.map((item) => {
                                        return (
                                            <div key={item.itemId} className={styles.cartItem}>
                                                <img
                                                    className={styles.cartImg}
                                                    width={140}
                                                    src={item.imageUrlFirst}
                                                    alt="product"
                                                />
                                                <div className={styles.cartDescription}>
                                                    <div className={styles.cartInfo}>
                                                        <p>{item.title}</p>
                                                        <b>{item.price} USD</b>
                                                    </div>
                                                    <div className={styles.cartRemove}>
                                                        <button
                                                            className={styles.cartRemoveBtn}
                                                            onClick={() => onRemoveCart(item.id)}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.cartTotal}>
                                    <ul>
                                        <li>
                                            <span>Total:</span>
                                            <div></div>
                                            <b>
                                                {cartItems.reduce(
                                                    (sum, obj) => Number(obj.price) + sum,
                                                    0,
                                                )}{' '}
                                                USD
                                            </b>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() => onOrderAdd()}
                                        className={styles.totalButton}>
                                        Place an order
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className={styles.cartEmptyInfo}>Your bag is empty</h3>
                                <button onClick={onCartClose} className={styles.cartBackBtn}>
                                    Back to the shop
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
