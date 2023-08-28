import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { favoritesActions } from '../../redux/slices/favoritesSlice';
import { motion } from 'framer-motion';

const Favorites = () => {
  const dispatch = useDispatch();
  const favoritesItems = useSelector((state) => state.favorites.favoritesItems);

  //удалить товар
  const removeItemFromFavorites = (product) => {
    dispatch(favoritesActions.removeItemFromFavorites(product));

    const localStorageFavorites = JSON.parse(localStorage.getItem('favoritesProducts')) || [];
    const updateLocalStorageFavorites = localStorageFavorites.filter(
      (item) => item.id !== product.id,
    );
    localStorage.setItem('favoritesProducts', JSON.stringify(updateLocalStorageFavorites));
  };
  const localStorageFavorites = JSON.parse(localStorage.getItem('favoritesProducts'));
  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites__wrapper">
          <h2 className="favorites__title">Избранное</h2>
          {favoritesItems &&
            localStorageFavorites &&
            localStorageFavorites.map((item) => (
              <div key={item.id} className="favorites__item">
                <img src={item.url} alt="img" className="favorites__image" />
                <div className="favorites__description">
                  <h3 className="favorites__name">{item.name}</h3>
                  <p className="favorites__desc">{item.desc} RU</p>
                  <p className="favorites__price">{item.price} RU</p>
                </div>

                <div className="favorites__clear" onClick={() => removeItemFromFavorites(item)}>
                <motion.button
                        whileHover={{ scale: 1.1 }}>
                  <svg
                    className="favorites_clear-icon"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <style>
                        {`.cls-1 { fill: none; stroke: #000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px; }`}
                      </style>
                    </defs>
                    <title />
                    <g id="trash">
                      <rect className="cls-1" height="22" width="18" x="7" y="7" />
                      <line className="cls-1" x1="3" x2="29" y1="7" y2="7" />
                      <line className="cls-1" x1="13" x2="19" y1="3" y2="3" />
                      <line className="cls-1" x1="13" x2="13" y1="12" y2="22" />
                      <line className="cls-1" x1="19" x2="19" y1="12" y2="22" />
                    </g>
                  </svg>

                  <p>Очистить</p>
                  </motion.button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
