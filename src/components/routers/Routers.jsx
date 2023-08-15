import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Shop from '../pages/Shop';
import Favorites from '../pages/Favorites'
import Cart from '../pages/Cart';
import Login from '../pages/Login'
import SignUp from '../pages/SignUp';
import PageTransition from '../PageTransition';



const Routers = () => {
  return (
    <>
      <Header />
      <Routes>
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
      <Route path="/" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition> < Favorites /> </PageTransition>} />
        <Route path="/cart" element={<PageTransition>< Cart /></PageTransition>} />
        
      </Routes>
    </>
  );
};

export default Routers;
