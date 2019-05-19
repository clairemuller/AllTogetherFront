import React from 'react';
import { GoogleLogout } from 'react-google-login';
import './NavBar.css';

class NavBar extends React.Component {

  render() {
    return (
      <div>
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={this.props.logoutHandler}
          />
      </div>
    )
  }
}

export default NavBar;
