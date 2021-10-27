import React from 'react';

import Card from '../../components/Card/Card';

import styles from './Cards.module.scss';

const Cards = ({
    items,
    onSearchValue,
    searchValue,
    setSearchValue,
    onCartAdd,
    onFavoriteAdd,
    isItemAdded,
    isFavoriteAdded,
}) => {
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className={styles.content}>
            <div className={styles.contentHeader}>
                <h2>{searchValue ? `Поиск по запросу: ${searchValue}` : 'All ready-to-wear'}</h2>
                <div className={styles.searchPanel}>
                    <img width={17} height={17} src="img/search.svg" alt="Search" />
                    {searchValue ? (
                        <img
                            onClick={() => setSearchValue('')}
                            className={styles.close}
                            width={10}
                            height={10}
                            src="img/close.svg"
                            alt="close"
                        />
                    ) : null}
                    <input onChange={onSearchValue} value={searchValue} placeholder="Search..." />
                </div>
            </div>
            <div className={styles.products}>
                {filteredItems.map((item) => {
                    return (
                        <Card
                            key={item.title}
                            title={item.title}
                            price={item.price}
                            imageUrlFirst={item.imageUrlFirst}
                            imageUrlSecond={item.imageUrlSecond}
                            id={item.id}
                            onCartAdd={(obj) => onCartAdd(obj)}
                            onFavoriteAdd={(obj) => onFavoriteAdd(obj)}
                            isItemAdded={(id) => isItemAdded(id)}
                            isFavoriteAdded={(id) => isFavoriteAdded(id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Cards;
