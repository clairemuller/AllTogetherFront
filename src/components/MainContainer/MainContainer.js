import React from 'react';
import './MainContainer.css';
import SearchBar from '../SearchBar/SearchBar';
import ItemsList from '../ItemsList/ItemsList';

function MainContainer() {
  return (
    <div>
      main container
      <SearchBar />
      <ItemsList />
    </div>
  );
}

export default MainContainer;
