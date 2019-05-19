import React from 'react';
import './ItemsList.css';
import Item from '../Item/Item';

class ItemsList extends React.Component {

  render() {
    console.log('itemsList props: ', this.props);
    return (
      <div>
        {this.props.items ?
          this.props.items.map(item => {
            return <Item key={item.id} />
          })
          : null}
      </div>
    )
  }
}

export default ItemsList;
