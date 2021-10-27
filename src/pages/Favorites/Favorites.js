import React from 'react';

import styles from './Favorites.module.scss';

const Favorites = ({ favoriteItems, onRemoveFavorite }) => {
    return (
        <div className={styles.content}>
            {favoriteItems.length ? (
                <div>
                    <div className={styles.contentHeader}>
                        <h2>Favorites</h2>
                    </div>
                    <div className={styles.products}>
                        {favoriteItems.map((item) => {
                            return (
                                <div key={item.id} className={styles.card}>
                                    <img
                                        width={270}
                                        src={item.imageUrlFirst}
                                        className={styles.productImg}
                                        alt="product"
                                    />
                                    <h5>{item.title}</h5>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardPrice}>
                                            <p>{item.price} USD</p>
                                        </div>
                                        <div className={styles.favoriteRemove}>
                                            <button
                                                className={styles.favoriteRemoveBtn}
                                                onClick={() => onRemoveFavorite(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <h2>Favorites are empty</h2>
            )}
        </div>
    );
};

export default Favorites;
