import React from 'react';
import './Item.css';

class Item extends React.Component {
  render() {
    return (
      <div>
        {this.props ?
          this.props.description
          : null}
      </div>
    )
  }
}

export default Item;
