import React from 'react';
import { GoogleLogout } from 'react-google-login';
import './NavBar.css';

class NavBar extends React.Component {

  render() {
    return (
      <div id='navBar'>
        {this.props.name}
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={this.props.logoutHandler}
          />
      </div>
    )
  }
}

export default NavBar;
