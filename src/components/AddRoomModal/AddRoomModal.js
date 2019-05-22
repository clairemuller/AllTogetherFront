import React from 'react';
import './AddRoomModal.css';
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
    fetch(URL + `${this.props.userId}/rooms`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.props.onClose(data)
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
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>Add Room</h2>
          <ul>
            {this.props.rooms.map(ll => {
              return <li>{ll.name}</li>
            })}
          </ul>

          <form onSubmit={this.handleSubmit}>

            <label>
              Room Name:
              <input name="room"
                onChange={this.handleChange} />
            </label>

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