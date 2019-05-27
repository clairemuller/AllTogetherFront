import React from 'react';
import './EditRoomsModal.css';
const URL = 'http://localhost:3000/users/'

class EditRoomsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      locations: '',
      name: ''
    }
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   fetch(URL + `${this.props.userId}/items`, {
  //     method: 'PATCH',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //   .then(res => res.json())
  //   .then(editItemData => {
  //     this.props.onClose(editItemData, 'edit')
  //   })
  // }

  handleRoomDelete = (event) => {
    event.preventDefault()
    fetch(URL + `${this.props.userId}/rooms`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(this.props.onClose(true))
  }

  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //
  //   if (name !== 'name') {
      // if changing location name, name param will be location id
      // let loc = this.state.locations.find(ll => {
      //   return ll.id === parseInt(name)
      // })
      // let i = this.state.locations.indexOf(loc)
      // loc.name = value
      // let newLocationsState = {...this.state.locations}

      // this.state.locations.map(ll => {
      //   if (ll.id === parseInt(name)) {
      //     let i = this.state.locations.indexOf(ll)
      //     let newLocation = {...this.state.locations[i]}
      //     newLocation.name = value
      //     debugger
      //     this.setState({
      //       locations: {...this.state.locations, ...this.state.locations[i]}
      //     })
      //   }
      // })
      // newLocationsState[i].name = value
      // debugger
      // this.setState({
      //   locations: newLocationsState
      // })
  //   } else {
  //     // otherwise, changing room name, name param will be 'name'
  //     this.setState({
  //       name: value
  //     })
  //   }
  // }

  handleClick = (event) => {
    let roomName = event.target.innerText;

    let roomObj = this.props.rooms.find(rr => {
      return rr.name === roomName
    })

    this.setState({
      id: roomObj.id,
      locations: roomObj.locations,
      name: roomObj.name
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
                      value={this.state.name} />
                  </div>
                </label>

                <label>
                  room locations:
                  {this.state.locations.map((ll, idx) => {
                    return (
                      <div key={idx}>
                        <button onClick={this.handleDelete}>
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
