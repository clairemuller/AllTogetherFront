import React from 'react';
import './ItemsList.css';
import Item from '../Item/Item';

class ItemsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.items ?
          this.props.items.map(item => {
            return (
              <Item
                key={item.id}
                description={item.description}
                note={item.note} />
            )
          })
          : null}
      </div>
    )
  }
}

export default ItemsList;
