import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Shop from '../pages/Shop';
import Favorites from '../pages/Favorites'
import Cart from '../pages/Cart';

const Routers = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={< Shop />} />
        <Route path="/favorites" element={< Favorites />} />
        <Route path="/cart" element={< Cart />} />
      </Routes>
    </>
  );
};

export default Routers;
