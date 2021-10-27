import React from 'react';

import styles from './Card.module.scss';

const Card = ({
    title,
    price,
    imageUrlFirst,
    imageUrlSecond,
    id,
    onCartAdd,
    onFavoriteAdd,
    isItemAdded,
    isFavoriteAdded,
}) => {
    const [changeImage, setChangeImage] = React.useState(false);

    const obj = { title, price, imageUrlFirst, id, itemId: id };

    const onBuyClick = () => onCartAdd(obj);

    const onFavoriteClick = () => onFavoriteAdd(obj);

    return (
        <div
            onMouseEnter={() => setChangeImage(true)}
            onMouseLeave={() => setChangeImage(false)}
            className={styles.card}>
            <div onClick={onFavoriteClick} className={styles.favorite}>
                <img
                    width={25}
                    height={25}
                    src={isFavoriteAdded(id) ? 'img/heart-liked.svg' : 'img/heart-unliked.svg'}
                    alt="favorite"
                />
            </div>
            <img
                width={270}
                src={changeImage ? imageUrlSecond : imageUrlFirst}
                className={styles.productImg}
                alt="product"
            />

            <h5>{title}</h5>
            <div className={styles.cardInfo}>
                <div className={styles.cardPrice}>
                    <p>{price} USD</p>
                </div>
                <div onClick={onBuyClick} className={styles.buyBtn}>
                    <h5>{isItemAdded(id) ? 'SUCCESSFULLY ADDED' : '+ADD TO SHOPPING BAG'}</h5>
                </div>
            </div>
        </div>
    );
};

export default Card;
