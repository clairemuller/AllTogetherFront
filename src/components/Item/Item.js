import React from 'react';
import ItemModal from './ItemModal';
import './Item.css';

class Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

  toggleModal = (item) => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  render() {
    const item = this.props.item;
    const { description, location, category, note } = item;

    return (
      <>
        <tr onClick={this.toggleModal}>
          <td className='item'>{description}</td>
          <td className='location'>{location.name}</td>
          <td className='room'>{location.room.name}</td>
          <td className='category'>{category.name}</td>
          <td className='note'>{note}</td>
        </tr>
        <ItemModal
          show={this.state.modalIsOpen}
          onClose={this.toggleModal}
          item={item}
          userId={this.props.userId}
          locations={this.props.locations}
          rooms={this.props.rooms}
          categories={this.props.categories} />
      </>
    )
  }
}

export default Item;
