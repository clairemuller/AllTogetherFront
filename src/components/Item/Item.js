import React from 'react';
import '../App.css';

class Item extends React.Component {
  render() {
    const { description, location, room, category, note, id } = this.props;
    const item = { description, location, room, category, note, id }

    return (
      <>
        <tr onClick={() => this.props.onClick(item)}>
          <td className='item'>{description}</td>
          <td className='location'>{location}</td>
          <td className='room'>{room}</td>
          <td className='category'>{category}</td>
          <td className='note'>{note}</td>
        </tr>
      </>
    )
  }
}

export default Item;
