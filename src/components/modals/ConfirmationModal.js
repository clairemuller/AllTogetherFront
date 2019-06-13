import React from 'react';
import '../../css/Modal.css';

class ConfirmationModal extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="confirm-modal-content">

          <h2>Are you sure?</h2>

          {this.props.locationId ?
            <button className='confirm' onClick={() => this.props.onYes(this.props.locationId)}>
            YES
            </button>
            :
            <button className='confirm' onClick={this.props.onYes}>
            YES
            </button>
          }
          <button className='confirm' onClick={this.props.onNo}>
          NO
          </button>

        </div>
      </div>
    )
  }
}

export default ConfirmationModal;
