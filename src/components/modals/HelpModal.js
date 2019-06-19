import React from 'react';
import '../../css/App.scss';

class ConfirmationModal extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.onClose}>&times;</span>

          <h2>How does this work?</h2>
          <p>
            AllTogether is built on the idea that every item in your home has a place.
          </p>
          <p>
            Every item belongs to a location, and every location belongs to a room.
            So to get started, add some rooms and locations inside each room. Here are some examples:
          </p>
          <hr/>
          <p>
            Room: living room<br/>
            Locations: bookshelf, tv stand, coffee table
          </p>
          <hr/>
          <p>
            Once you have some rooms and locations added, you can start adding your items!
            Each item must have a description, category, and location. You can optionally add a note
            to keep track of any additional information about an item, such as the purchase price
            or date.
          </p>
          <p>
            Heads up! Deleting a room will delete all locations and items in that room.
          </p>
        </div>
      </div>
    )
  }
}

export default ConfirmationModal;
