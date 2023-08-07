import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Shop from '../pages/Shop';
import Favorites from '../pages/Favorites'
import Cart from '../pages/Cart';
import PageTransition from '../PageTransition';

const Routers = () => {
  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition>< Favorites /> </PageTransition>} />
        <Route path="/cart" element={<PageTransition>< Cart /></PageTransition>} />
        
      </Routes>
    </>
  );
};

export default Routers;
