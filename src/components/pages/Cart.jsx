import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import plus from '../assets/icons/plus.svg';
import minus from '../assets/icons/minus-circle-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const localStorageItems = JSON.parse(localStorage.getItem('products'));
  const [localData, setLocalData] = useState(null);

  console.log(cartItems);
  //удалить товар
  const cartItemDelete = (product) => {
    dispatch(cartActions.removeItemFromCart(product));
    const localStorageCart = JSON.parse(localStorage.getItem('products')) || [];
    const updateLocalStorageCart = localStorageCart.filter((item) => item.id !== product.id);
    localStorage.setItem('products', JSON.stringify(updateLocalStorageCart));
    setLocalData(JSON.parse(localStorage.getItem('products')));
  };
  //сумма товаров в корзине
  const totalAmount = localStorageItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  //поменять количество
  const changeQuantity = (item, newQuantity) => {
    if (newQuantity >= 0) {
      dispatch(cartActions.changeItemQuantity({ id: item.id, quantity: newQuantity }));

      const updatedLocalStorageItems = localStorageItems.map((localStorageItem) =>
        localStorageItem.id === item.id
          ? { ...localStorageItem, quantity: newQuantity }
          : localStorageItem,
      );

      localStorage.setItem('products', JSON.stringify(updatedLocalStorageItems));
      setLocalData(JSON.parse(localStorage.getItem('products')));
    }
  };
  return (
    <div className="cart">
      <div className="container">
        <div className="cart__wrapper">
          {localStorageItems.length ? (
            <div>
              <div className="cart__group">
                <h2 className="cart__title">Корзина</h2>
                <h2 className="cart__title-total">Сумма : {totalAmount} </h2>
                <motion.button
                        whileHover={{ scale: 1.1 }} className="cart__title-buy">К оплате</motion.button>
              </div>
              {localStorageItems.map((item) => {
                return (
                  <div key={item.id} className="cart__item">
                    <img src={item.url} alt="img" className="cart__image" />
                    <div className="cart__desc">
                      <h3 className="cart__name">{item.name}</h3>
                      <p className="cart__price">{item.price * item.quantity} Сом</p>
                    </div>
                    <div className="quantity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        disabled={item.quantity <= 1}
                        className="cart_quantity"
                        onClick={() => changeQuantity(item, (item.quantity = item.quantity - 1))}>
                        <img src={minus} alt="minus icon" />
                      </motion.button>
                      <h3 className="cart__count">{item.quantity}шт.</h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}>
                      <img
                        className="cart_quantity"
                        onClick={() => changeQuantity(item, (item.quantity = item.quantity + 1))}
                        src={plus}
                        alt="plus icon"
                      />
                      </motion.button>
                    </div>
                    <div className="cart__clear">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => cartItemDelete(item)}>
                        <svg
                       className="cart_clear-icon"
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
                );
              })}
            </div>
          ) : (
            <div className="cart__basket">
              <div className="cart__background">
              <h3>Ваша корзина пуста :(</h3>
              <motion.button whileHover={{ scale: 1.1 }}>
              <Link to={'/'}>Перейти к покупкам</Link>
              </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
