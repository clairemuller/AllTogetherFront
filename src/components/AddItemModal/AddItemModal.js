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
              <input name="description"
                onChange={this.handleChange} />
            </label>

            <label>
              Note:
              <input name="note"
                onChange={this.handleChange} />
            </label>

            <label>
              Category:
              <input name="category"
                onChange={this.handleChange} />
            </label>

            <label>
              Room:
              <input name="room"
                onChange={this.handleChange} />
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
