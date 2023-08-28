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
  const [showDetails, setShowDetails] = useState(false);
  const searchValue = useSelector((state) => state.search.searchValue);
  const [oneProduct, setOneProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeHearts, setActiveHearts] = useState({});
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
  //поиск
  useEffect(() => {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchValue));
    setFilteredProducts(filtered);
  }, [searchValue, products]);

  //добавить в корзину
  const addToCartButton = (product) => {
    dispatch(cartActions.addItemToCart(product));
    let arr = JSON.parse(localStorage.getItem('products')) || [];
    const existingItem = arr.find((item) => item.id === product.id);
    if (!existingItem) {
      arr.push({ ...product, quantity: 1 });
    } else {
      existingItem.quantity++;
    }
    localStorage.setItem('products', JSON.stringify(arr));
    toast.success('Добавлено в корзину!');
  };

  //добавить в избранное
  const toggleFavorite = (product) => {
    setActiveHearts((prevActiveHearts) => ({
      ...prevActiveHearts,
      [product.id]: !prevActiveHearts[product.id],
    }));
    dispatch(favoritesActions.addItemToFavorites(product));
    let arr = JSON.parse(localStorage.getItem('favoritesProducts')) || [];
    const existingItem = arr.find((item) => item.id === product.id);
    if (!existingItem) {
      arr.push({ ...product, quantity: 1 });
    } else {
      existingItem.quantity++;
    }
    localStorage.setItem('favoritesProducts', JSON.stringify(arr));

    toast.success('Добавлено в избранное!');
  };

  const openDetails = (id) => {
    setShowDetails(true);
    products.map((item) => {
      if (item.id == id) {
        setOneProduct(item);
      }
    });

    window.scrollTo(1, 0);
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="shop__wrapper">
          {(searchValue ? filteredProducts : products).map((product) => (
            <div key={product.id} className="shop__cart">
              <motion.button className="shop__image" whileHover={{ scale: 1.1 }}>
                <img src={product.url} alt={product.name} onClick={() => openDetails(product.id)} />
              </motion.button>
              <div className="shop__desc">
                <p className="shop__text">{product.name}</p>
                <p className="shop__text">{product.price} RU</p>
              </div>
              <div className="shop__button">
                <>
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
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    {/* модальное */}
      {showDetails && (
        <div className="blackdrop" onClick={() => setShowDetails(false)}>
          <div className="modal">
            <div className="modal-block">
              <img src={oneProduct.url} alt="" />
              <div className="modal__descr-block">
                <h3>{oneProduct.name}</h3>
                <div className="modal__price">Цена: {oneProduct.price} сом</div>
                <div className="modal__descr">
                  <div className="modal__descr-title">Описание: </div>
                  {oneProduct.desc}
                </div>
                <div className='modal__buttons'>
                <motion.button
                    onClick={() => addToCartButton(oneProduct)}
                    className="shop__button-cart"
                    whileHover={{ scale: 1.1 }}>
                    В корзину
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }}>
                    <svg
                      onClick={() => toggleFavorite(oneProduct)}
                      className={`shop__heart ${activeHearts[oneProduct.id] ? 'active' : ''}`}
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
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowDetails(false)}>
                <svg
                  className="modal__icon"
                  style={{ enableBackground: 'new 0 0 24 24' }}
                  version="1.1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="info" />
                  <g id="icons">
                    <path
                      d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
                      id="exit"
                    />
                  </g>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      )}
   
    </div>
  );
};

export default Shop;
