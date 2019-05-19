import React from 'react';
import './App.css';
import MainContainer from './MainContainer/MainContainer'
import LoginPage from './LoginPage'
// import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loggedIn: false,
      items: null
    }

  }

  loginHandler = (googleUser) => {
    const user = googleUser.getBasicProfile().getName()
    const loggedIn = googleUser.isSignedIn()
    this.setState({ user, loggedIn }, () => {
      this.findOrCreateUser(user);
    });
  }

  findOrCreateUser(user) {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user })
    })
  }

  getItems() {

  }

  render() {
    return (
      <div>
        {this.state.loggedIn ?
          <MainContainer items={this.state.items} />
          :
          <LoginPage loginHandler={this.loginHandler} />}
      </div>
    )
  }
}

export default App;
