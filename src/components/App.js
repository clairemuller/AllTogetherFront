import React from 'react';
import './App.css';
import MainContainer from './MainContainer/MainContainer'
import LoginPage from './LoginPage'
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const fetchURL = 'http://localhost:3000/';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loggedIn: false,
      items: []
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
    fetch(fetchURL + 'users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(userData => {
      this.setState({ items: userData.items })
    })
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ?
          <MainContainer
            state={this.state}
            logoutHandler={this.logoutHandler} />
          :
          <LoginPage loginHandler={this.loginHandler} />}
      </div>
    )
  }
}

export default App;
