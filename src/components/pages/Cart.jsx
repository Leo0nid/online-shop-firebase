import React from 'react';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import {cartActions} from '../../redux/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log(cartItems);
  //удалить товар
  const cartItemDelete = (product) => {
    dispatch(cartActions.removeItemFromCart(product));
  }
  //сумма товаров в корзине
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="cart">
      <div className="container">
        <div className="cart__wrapper">
          <div className="cart__group">
          <h2 className='cart__title'>Корзина</h2>
          <h2 className='cart__title-total'>Сумма : {totalAmount} </h2>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart__item">
              <img src={item.url} alt="img" className="cart__image" />
              <div className="cart__desc">
                <h3 className="cart__name">{item.name}</h3>
                <p className="cart__price">{item.price * item.quantity} RU</p>
      
              </div>
              <div className='cart__count'>{item.quantity}шт.</div>
             
                <div className="cart__clear" onClick={() => cartItemDelete(item)}>
                <svg className="cart_clear-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
                </div>
              </div>
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
