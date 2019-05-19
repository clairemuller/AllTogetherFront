import React from 'react';
import './App.css';
import MainContainer from './MainContainer/MainContainer'
import LoginPage from './LoginPage'
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const localhostURL = 'http://localhost:3000/';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loggedIn: false,
      properties: null,
      rooms: null,
      locations: null,
      items: null,
      categories: null
    }
  }

  loginHandler = (googleUser) => {
    const user = googleUser.getBasicProfile().getName()
    const loggedIn = googleUser.isSignedIn()
    this.setState({ user, loggedIn }, () => {
      this.findOrCreateUser(user);
    });
  }

  logoutHandler = () => {
    this.setState({
      user: null,
      loggedIn: false,
      items: null
    })
  }

  findOrCreateUser(user) {
    fetch(localhostURL + 'users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(userData => {
      this.setItems(userData)
    })
  }

  setItems(userData) {
    this.setState({
      properties: userData.properties,
      rooms: userData.rooms,
      locations: userData.locations,
      items: userData.items,
      categories: userData.categories
    })
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ?
          <MainContainer
            items={this.state.items}
            logoutHandler={this.logoutHandler} />
          :
          <LoginPage loginHandler={this.loginHandler} />}
      </div>
    )
  }
}

export default App;
