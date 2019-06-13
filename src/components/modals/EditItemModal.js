import React from 'react';
import ConfirmationModal from './ConfirmationModal'
import '../../css/App.scss';
const URL = 'https://all-together-app-backend.herokuapp.com/users/'

class EditItemModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      location: '',
      room: '',
      category: '',
      note: '',
      id: '',
      confirmationModalIsOpen: false
    }
  }

  componentDidMount() {
    const { description, location, room, category, note, id } = this.props.item;

    this.setState({
      description: description,
      location: location,
      room: room,
      category: category,
      note: note,
      id: id
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(URL + `${this.props.userId}/items`, {
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

  handleDelete = (event) => {
    event.preventDefault()
    fetch(URL + `${this.props.userId}/items`, {
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {
      // if user changes room, change location state
      if (name === 'room') {
        const newRoom = this.props.rooms.find(room => {
          return room.name === value
        })
        // check if room has locations
        if (newRoom.locations.length !== 0) {
          this.setState({
            location: newRoom.locations[0].name
          })
        } else {
          this.setState({
            location: null
          })
        }
      }
    })
  }

  toggleConfirmationModal = (event) => {
    event.preventDefault()
    this.setState({
      confirmationModalIsOpen: !this.state.confirmationModalIsOpen
    })
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    const { description, location, room, note, category } = this.state

    let chosenRoom = this.props.rooms.find(room => {
      return room.name === this.state.room
    })

    return (
      <>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>Edit Item</h2>

          <form onSubmit={this.handleSubmit}>

            <label>
              Description:
              <input
                name="description"
                value={description}
                onChange={this.handleChange} />
            </label>

            <label>
              Note:
              <input
                name="note"
                value={note}
                onChange={this.handleChange} />
            </label>

            <label>
              Category:
              <input
                list="category"
                name="category"
                value={category}
                onChange={this.handleChange} />
                <datalist id="category">
                  {this.props.categories.map((cc, idx) => {
                    return <option value={cc.name} key={idx} />
                  })}
                </datalist>
            </label>

            <label>
              Room:
              <select
                name="room"
                onChange={this.handleChange} >
                  <option value={room} selected>{room}</option>
                  {this.props.rooms.map((rr, idx) => {
                    return (
                      rr.name === room ? null :
                      <option value={rr.name} key={idx} >{rr.name}</option>
                    )
                  })}
              </select>
            </label>

            {this.state.room.length === 0 ? null :
              <label>
                Location in {this.state.room}:
                <select
                  name="location"
                  onChange={this.handleChange} >
                    {chosenRoom.locations.map((ll, idx) => {
                      return (
                        ll.name === location ?
                        <option value={location} key={idx} selected>{location}</option> :
                        <option value={ll.name} key={idx} >{ll.name}</option>
                      )})}
                </select>
              </label>
            }

            <input
              type="submit"
              value="Submit" />

            <button onClick={this.toggleConfirmationModal}>
              Delete Item
            </button>

          </form>
        </div>
      </div>

      {this.state.confirmationModalIsOpen ?
        <ConfirmationModal
          show={this.state.confirmationModalIsOpen}
          onYes={this.handleDelete}
          onNo={this.toggleConfirmationModal}
          />
        :
        null}
      </>
    )
  }
}

export default EditItemModal;
