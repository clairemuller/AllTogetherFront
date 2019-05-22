import React from 'react';
import './EditItemModal.css';
const URL = 'http://localhost:3000/users/'

class EditItemModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      location: '',
      room: '',
      category: '',
      note: '',
      id: 0
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
    fetch(URL + this.props.userId, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  render() {
    const { description, location, room, note, category } = this.state

    if(!this.props.show) {
      return null;
    }

    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>Edit Item</h2>

          <form onSubmit={this.handleSubmit}>

            <label>
              Description:
              <input name="description"
                value={description}
                onChange={this.handleChange} />
            </label>

            <label>
              Locations in {room}:
              <select
                name="location"
                onChange={this.handleChange} >
                  {this.props.locations.map((loc, idx) => {
                    return (
                      loc.name === location ?
                      <option value={location} key={idx} selected>{location}</option> :
                      <option value={loc.name} key={idx} >{loc.name}</option>
                    )
                  })}
              </select>
            </label>

            <label>
              Room:
              <select
                name="room"
                onChange={this.handleChange} >
                  {this.props.rooms.map((rr, idx) => {
                    return (
                      rr.name === room ?
                      <option value={room} key={idx} selected>{room}</option> :
                      <option value={rr.name} key={idx} >{rr.name}</option>
                    )
                  })}
              </select>
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
              Note:
              <input name="note"
                value={note}
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

export default EditItemModal;
