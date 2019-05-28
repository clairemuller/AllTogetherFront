import React from 'react';
import './EditRoomsModal.css';
const URL = 'http://localhost:3000/users/'

class EditRoomsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roomId: 0,
      name: '',
      locations: '',
      editName: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log();
    fetch(URL + `${this.props.userId}/rooms`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.props.onClose(true)
    })
  }

  handleRoomDelete = (event) => {
    event.preventDefault();
    fetch(URL + `${this.props.userId}/rooms`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      this.props.onClose(true)
    })
  }

  handleLocationDelete = (locationId, event) => {
    event.preventDefault();
    fetch(URL + `${this.props.userId}/locations`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ locationId })
    })
    .then(res => res.json())
    .then(data => {
      this.props.onClose(true)
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name !== 'name') {
      // update location name
      let locIndex = this.state.locations.findIndex(ll => {
        return ll.id === parseInt(name)
      })

      let locationsCopy = this.state.locations
      locationsCopy[locIndex].name = value

      this.setState({
        locations: locationsCopy
      })
    } else {
      // update room name
      this.setState({
        editName: value
      })
    }
  }

  handleClick = (event) => {
    let roomName = event.target.innerText;

    let roomObj = this.props.rooms.find(rr => {
      return rr.name === roomName
    })

    this.setState({
      roomId: roomObj.id,
      name: roomObj.name,
      locations: roomObj.locations,
      editName: roomObj.name
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

          <h2>Current Rooms</h2>

          {this.props.rooms.map((room, idx) => {
            return (
              <div
                key={idx}
                id='room'
                onClick={this.handleClick} >
                {room.name}
              </div>
            )
          })}

          {this.state.name.length === 0 ? null :
            <div>
            <hr/>
              <h2>Edit {this.state.name}:</h2>
              <form onSubmit={this.handleSubmit}>

                <label>
                  room name:
                  <div>
                    <button onClick={this.handleRoomDelete}>
                    X
                    </button>
                    <input name="name"
                      onChange={this.handleChange}
                      value={this.state.editName} />
                  </div>
                </label>

                <label>
                  room locations:
                  {this.state.locations.map((ll, idx) => {
                    return (
                      <div key={idx}>
                      <button onClick={(event) => this.handleLocationDelete(ll.id, event)}>
                      X
                      </button>
                        <input
                          value={ll.name}
                          name={ll.id}
                          onChange={this.handleChange} />
                      </div>
                    )})}
                </label>

                <input
                  type="submit"
                  value="Submit" />
              </form>
            </div>
          }

        </div>
      </div>
    )
  }
}

export default EditRoomsModal;
