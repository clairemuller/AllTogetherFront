import React from 'react';
import '../../css/Modal.css';
const URL = 'http://localhost:3000/users/'

class AddRoomModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      room: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // prevents submitting blank room
    if (this.state.room.length !== 0) {
      fetch(URL + `${this.props.userId}/rooms`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(newRoomData => {
        this.props.onClose(newRoomData)
      })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>Current Rooms</h2>

            {this.props.rooms.length !== 0 ?
              <div className='current-rooms-container'>
                {this.props.rooms.map((room, idx) => {
                  return (
                    <div
                      key={idx}
                      className='current-room' >
                      {room.name}
                    </div>
                  )
                })}
              </div>
            : null
            }

          <form onSubmit={this.handleSubmit}>
          <hr/>

            <label>
              New Room Name:
              <input name="room"
                onChange={this.handleChange}
                required />
            </label>

            {this.state.room.length === 0 ? null :

            <label>
              Add locations:
              <input name="locations"
                onChange={this.handleChange} />
            </label>
            }

            <input
              type="submit"
              value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default AddRoomModal;
