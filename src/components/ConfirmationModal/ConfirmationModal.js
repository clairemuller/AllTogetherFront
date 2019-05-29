import React from 'react';
import '../App.css';

class ConfirmationModal extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div id="myModal" className="modal">
        <div className="confirm-modal-content">

          <h2>Are you sure?</h2>

          {this.props.locationId ?
            <div className='confirm' onClick={() => this.props.onYes(this.props.locationId)}>
            YES
            </div>
            :
            <div className='confirm' onClick={this.props.onYes}>
            YES
            </div>
          }
          <div className='confirm' onClick={this.props.onNo}>
          NO
          </div>

        </div>
      </div>
    )
  }
}

export default ConfirmationModal;
