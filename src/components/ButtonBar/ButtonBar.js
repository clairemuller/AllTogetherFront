import React from 'react';
import './ButtonBar.css';
const URL = 'http://localhost:3000/users/'

class ButtonBar extends React.Component {

  toggleAddModal = (item) => {
    if (!this.props.items.includes(item) && item.id) {
      this.props.items.push(item)
    }

    this.setState({
      addModalIsOpen: !this.state.addModalIsOpen
    })
  }

  toggleRoomModal = (room) => {
    // adds new room to room list view
    if (!this.props.rooms.includes(room) && room.id) {
      this.props.rooms.push(room)
    }
    this.setState({
      roomModalIsOpen: !this.state.roomModalIsOpen
    })
  }

  render() {
    return(
      <div>
        <button type="button" onClick={this.toggleAddModal}>Add Item</button>
        <button type="button" onClick={this.toggleRoomModal}>Add Room</button>
      </div>
    )
  }
}

export default ButtonBar;
