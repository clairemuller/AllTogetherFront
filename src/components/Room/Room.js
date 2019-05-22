import React from 'react';
import './Room.css';

class Room extends React.Component {
  render() {
    return (
      <div>
        {this.props.room.name}
      </div>
    )
  }
}

export default Room;
