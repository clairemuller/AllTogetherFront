import React from 'react';
import '../../css/App.scss';
const URL = 'https://all-together-app-backend.herokuapp.com/users/'

class AddItemModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      location: '',
      room: '',
      category: '',
      note: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch(URL + `${this.props.userId}/items`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(newItemData => {
      this.props.onClose(newItemData)
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

    // allows conditional render of locations in room
    let chosenRoom = this.props.rooms.find(room => {
      return room.name === this.state.room
    })

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>Add Item</h2>

          <form onSubmit={this.handleSubmit}>

            <label>
              Description:
              <input
                name="description"
                onChange={this.handleChange}
                required />
            </label>

            <label>
              Note:
              <input
                name="note"
                onChange={this.handleChange} />
            </label>

            <label>
              Category:
              <input
                list="category"
                name="category"
                onChange={this.handleChange}
                required />
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
                onChange={this.handleChange}
                required >
                  <option value="" selected disabled hidden>Choose a room</option>
                  {this.props.rooms.map((rr, idx) => {
                    return (
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
                  onChange={this.handleChange}
                  required >
                    <option value="" selected disabled hidden>Choose a location</option>
                    {chosenRoom.locations.map((ll, idx) => {
                      return (
                        <option value={ll.name} key={idx} >{ll.name}</option>
                      )
                    })}
                </select>
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

export default AddItemModal;
