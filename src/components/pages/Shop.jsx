import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice.js';
import { favoritesActions } from '../../redux/slices/favoritesSlice.js';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const searchValue = useSelector((state) => state.search.searchValue);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
  useEffect(() => {
    //поисковик
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchValue));
    setFilteredProducts(filtered);
    console.log(filtered);
  }, [searchValue, products]);

  //добавить товар
  const addToCartButton = (product) => {
    dispatch(cartActions.addItemToCart(product));
    console.log(product);
    toast.success('Добавлено в корзину!');
  };

  const [activeHearts, setActiveHearts] = useState({});

  const toggleFavorite = (product) => {
    setActiveHearts((prevActiveHearts) => ({
      ...prevActiveHearts,
      [product.id]: !prevActiveHearts[product.id],
    }));

    dispatch(favoritesActions.addItemToFavorites(product));
    console.log(product);
    toast.success('Добавлено в избранное!');
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="shop__wrapper">
          {(searchValue ? filteredProducts : products).map((product) => (
            <div key={product.id} className="shop__cart">
              <motion.button className="shop__image" whileHover={{ scale: 1.1 }}>
                <img src={product.url} alt="" />
              </motion.button>
              <div className="shop__desc">
                <p className="shop__text">{product.name}</p>
                <p className="shop__text">{product.price} RU</p>
                <p className="shop__text">Артикул {product.article} </p>
              </div>

              <div className="shop__button">
                <motion.button
                  onClick={() => addToCartButton(product)}
                  className="shop__button-cart"
                  whileHover={{ scale: 1.1 }}>
                  В корзину
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }}> 
                  <svg
                    onClick={() => toggleFavorite(product)}
                    className={`shop__heart ${activeHearts[product.id] ? 'active' : ''}`}
                    height="512px"
                    id="Layer_1"
                    style={{ enableBackground: 'new 0 0 512 512' }}
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="512px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <path
                      d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
                      fill="#000000"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
