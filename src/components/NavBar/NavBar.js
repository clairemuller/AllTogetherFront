import React from 'react';
import { GoogleLogout } from 'react-google-login';
import '../../css/App.scss';

class NavBar extends React.Component {

  render() {
    return (
      <div id='navBar'>
        <div id='navbar-left'>
          <h1>AllTogether</h1>
        </div>
        <div id='navbar-right'>
          <h1>{this.props.name}</h1>
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.props.logoutHandler}
            render={renderProps => (
              <button
                className='google-button'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
              Logout
              </button>
            )}
          />
        </div>
      </div>
    )
  }
}

export default NavBar;
