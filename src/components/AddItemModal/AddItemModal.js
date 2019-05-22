import React from 'react';
import './AddItemModal.css';
const URL = 'http://localhost:3000/users/'

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

          <h2>Add Item</h2>

          <form onSubmit={this.handleSubmit}>

            <label>
              Description:
              <input
                name="description"
                onChange={this.handleChange} />
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
                  {this.props.rooms.map((rr, idx) => {
                    return (
                      <option value={rr.name} key={idx} >{rr.name}</option>
                    )
                  })}
              </select>
            </label>

            <label>
              Location:
              <input name="location"
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

export default AddItemModal;
