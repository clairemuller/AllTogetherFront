import React from 'react';
import './Item.css';

class Item extends React.Component {
  render() {
    return (
      <>
        {this.props ?

          <tr>
            <td className='item'>{this.props.description}</td>
            <td className='location'>{this.props.location.name}</td>
            <td className='room'>{this.props.location.room.name}</td>
            <td className='category'>{this.props.category}</td>
            <td className='note'>{this.props.note}</td>
          </tr>

          : null}
      </>
    )
  }
}

export default Item;
