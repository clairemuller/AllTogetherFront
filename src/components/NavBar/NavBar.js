import React from 'react';
import { GoogleLogout } from 'react-google-login';
import '../../css/App.scss';

class NavBar extends React.Component {

  render() {
    return (
      <div id='navBar'>
        <div id='navbar-left'>
          <div id='site-name'>AllTogether</div>
        </div>
        <div id='navbar-right'>
          <div id='username'>{this.props.name}</div>
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
