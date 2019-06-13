import React from 'react';
import ConfirmationModal from './ConfirmationModal'
import AddRoomModal from './AddRoomModal'
import '../../css/App.scss';
const URL = 'https://all-together-app-backend.herokuapp.com/users/'

class RoomsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roomId: 0,
      name: '',
      locations: '',
      editName: '',
      addLocations: '',
      roomConfirmationModalIsOpen: false,
      locationConfirmationModalIsOpen: false,
      addRoomModalIsOpen: false,
      locationIdToDelete: 0
    }
  }

  toggleRoomConfirmationModal = () => {
    this.setState({
      roomConfirmationModalIsOpen: !this.state.roomConfirmationModalIsOpen
    })
  }

  toggleLocationConfirmationModal = (id) => {
    this.setState({
      locationConfirmationModalIsOpen: !this.state.locationConfirmationModalIsOpen,
      locationIdToDelete: id
    })
  }

  toggleAddRoomModal = (room) => {
    // if new room was created, update state in parent
    if (room.id) {
      this.props.onStateUpdate()
    }
    this.setState({
      addRoomModalIsOpen: !this.state.addRoomModalIsOpen
    })
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

  handleLocationDelete = (locationId) => {
    // event.preventDefault();
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

    if (name === 'name') {
      // update room name
      this.setState({ editName: value })
    } else if (name === 'newLocations') {
      this.setState({ addLocations: value })
    } else {
      // update location name
      let locIndex = this.state.locations.findIndex(ll => {
        return ll.id === parseInt(name)
      })

      let locationsCopy = this.state.locations
      locationsCopy[locIndex].name = value

      this.setState({
        locations: locationsCopy
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
      <>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>Current Rooms</h2>

          <button type="button"
            onClick={this.toggleAddRoomModal}>
            Add Room
          </button>


          <div className='current-rooms-container'>
            {this.props.rooms.map((room, idx) => {
              return (
                <div
                  key={idx}
                  className='current-room'
                  onClick={this.handleClick} >
                  {room.name}
                </div>
              )
            })}
          </div>

          {this.state.name.length === 0 ? null :
            <div>
            <hr/>
              <h2>Edit {this.state.name}:</h2>
              <form onSubmit={this.handleSubmit}>

                <label>
                  room name:
                  <div>
                    <input name="name"
                      onChange={this.handleChange}
                      value={this.state.editName} />
                    <span
                      className='delete'
                      onClick={this.toggleRoomConfirmationModal}>
                      &times;
                    </span>
                  </div>
                </label>

                {this.state.locations.length !== 0 ?
                  <label>
                    room locations:
                    {this.state.locations.map((ll, idx) => {
                      return (
                        <div key={idx}>
                          <input
                            value={ll.name}
                            name={ll.id}
                            onChange={this.handleChange} />
                          <span
                            className='delete'
                            onClick={() => this.toggleLocationConfirmationModal(ll.id)}>
                            &times;
                          </span>
                        </div>
                      )})}
                  </label>
                : null
                }
                <label>
                add locations:
                <input name="newLocations"
                onChange={this.handleChange} />
                </label>

                <input
                  type="submit"
                  value="Submit" />
              </form>
            </div>
          }

        </div>
      </div>

      {this.state.roomConfirmationModalIsOpen ?
        <ConfirmationModal
          show={this.state.roomConfirmationModalIsOpen}
          onYes={this.handleRoomDelete}
          onNo={this.toggleRoomConfirmationModal}
          />
        :
        null}

      {this.state.locationConfirmationModalIsOpen ?
        <ConfirmationModal
          show={this.state.locationConfirmationModalIsOpen}
          onYes={this.handleLocationDelete}
          onNo={this.toggleLocationConfirmationModal}
          locationId={this.state.locationIdToDelete}
          />
        :
        null}

        {this.state.addRoomModalIsOpen ?
          <AddRoomModal
            show={this.state.addRoomModalIsOpen}
            onClose={this.toggleAddRoomModal}
            userId={this.props.userId}
            />
          :
          null}

      </>
    )
  }
}

export default RoomsModal;

// <span
//   className='delete'
//   onClick={(event) => this.handleLocationDelete(ll.id, event)}>
//   &times;
// </span>
