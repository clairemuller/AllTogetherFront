import React from 'react';
import '../../css/Modal.css';
const URL = 'https://all-together-app-backend.herokuapp.com/users/'

class AddRoomModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      room: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

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

          <h2>Add Room</h2>

          <form onSubmit={this.handleSubmit}>

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
                onChange={this.handleChange}
                required />
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
