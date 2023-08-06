import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import {cartActions} from '../../redux/slices/cartSlice.js'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductsFromFirestore = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        const arrayData = snapshot.docs.map((doc) => doc.data());
        
        setProducts(arrayData);
        console.log(arrayData);
      } catch (error) {
        console.error(error);
      }
    };

    getProductsFromFirestore();
  }, []);
  //добавить в корзину
  const addToCartButton = (product) => {
    dispatch(cartActions.addItemToCart(product));
    console.log(product);
  };
  return (
    <div className="shop">
      <div className="container">
        <div className="shop__wrapper">
          {products.map((product) => (
            <div key={product.id} className="shop__cart">
              <div className="shop__image">
                <img src={product.url} alt="" />
              </div>
              <div className="shop__desc">
                <p className="shop__text">{product.name}</p>
                <p className="shop__text">{product.price} RU</p>
                <p className="shop__text">Артикул {product.article} </p>
              </div>
              <button onClick={() =>addToCartButton(product) } className="shop__button"> В корзину </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
