import React from 'react';
import { Link } from 'react-router-dom';
import Search from "../components/Search";
import logo from './assets/icons/shop.png';
import avatar from '../components/assets/icons/avatar.png'

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
        <Link to="/">
          <div className="header__logo">
            <img className="header__icon" src={logo} alt="logo" />
            <h1 className="header__logo-name">Shop</h1>
          </div>
        </Link>
        <div className="header__nav">
          <div className="header__nav-list">
            <li>
              <Link to="/">Магазин</Link>
            </li>
            <li>
              <Link to="/favorites">Избранное</Link>
            </li>
            <li>
              <Link to="/cart">Корзина</Link>
            </li>
          </div>
        </div>
        <Search/>
        <div className="header__avatar">
          <img  src={avatar} alt="avatar" />
        </div>
      </div>
      </div>

    </div>
  );
};

export default Header;
