import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { setSearchValue, clearSearchValue } from '../../src/redux/slices/searchSlice';

const Search = () => {
  const searchValue = useSelector((state) => state.search.searchValue);
  const dispatch = useDispatch();
  return (
    <>
      <div className="search">
      <svg className='search__icon' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/></g></svg>

        <input className="search__input" placeholder="Поиск.." 
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
        value={searchValue}
        />
         {searchValue && (
        <svg
          className='search__clear-icon'
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => dispatch(clearSearchValue())}
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
      )}
      </div>
    </>
  );
};

export default Search;

