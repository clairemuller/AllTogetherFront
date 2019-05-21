import React from 'react';
import './ItemModal.css';
const URL = 'http://localhost:3000/users/'

class ItemModal extends React.Component {
  constructor(props) {
    super(props)

    const { id, description, location, category, note } = this.props.item

    this.state = {
      id: id,
      description: description,
      location: location.name,
      room: location.room.name,
      category: category.name,
      note: note
    }
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
    this.setState({
      [event.target.name]: event.target.value
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

          <h2>Edit Item</h2>

          <form onSubmit={this.handleSubmit}>

            <label>
              Description:
              <input name="description"
                value={this.state.description}
                onChange={this.handleChange} />
            </label>

            <label>
              Location:
              <input
                list="location"
                name="location"
                value={this.state.location}
                onChange={this.handleChange} />
                <datalist id="location">
                  {this.props.locations.map(location => {
                    return <option value={location.name} />
                  })}
                </datalist>
            </label>

            <label>
              Room:
              <input
                list="room"
                name="room"
                value={this.state.room}
                onChange={this.handleChange} />
                <datalist id="room">
                  {this.props.rooms.map(room => {
                    return <option value={room.name} />
                  })}
                </datalist>
            </label>

            <label>
              Category:
              <input
                list="category"
                name="category"
                value={this.state.category}
                onChange={this.handleChange} />
                <datalist id="category">
                  {this.props.categories.map(category => {
                    return <option value={category.name} />
                  })}
                </datalist>
            </label>

            <label>
              Note:
              <input name="note"
                value={this.state.note}
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

export default ItemModal;
