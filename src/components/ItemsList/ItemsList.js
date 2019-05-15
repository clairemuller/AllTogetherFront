import React from 'react';
import './ItemsList.css';
import Item from '../Item/Item';

function ItemsList() {
  return (
    <div>
      items list:
      <Item />
      <Item />
      <Item />
    </div>
  );
}

export default ItemsList;
