import React from 'react';
import './App.css';
import MainContainer from './MainContainer/MainContainer'
import LoginPage from './LoginPage'
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const URL = 'http://localhost:3000/';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      userId: 0,
      loggedIn: false,
      items: [],
      locations: [],
      rooms: [],
      categories: []
    }
  }

  loginHandler = (googleUser) => {
    const username = googleUser.getBasicProfile().getName()
    const loggedIn = googleUser.isSignedIn()
    this.setState({ username, loggedIn }, () => {
      this.findOrCreateUser(username);
    });
  }

  logoutHandler = () => {
    this.setState({
      username: null,
      loggedIn: false,
      items: []
    })
  }

  findOrCreateUser(username) {
    fetch(URL + 'users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ username })
    })
    .then(res => res.json())
    .then(userData => {
      this.setState({
        userId: userData.id,
        items: userData.items
      }, () => {
        this.getEverything()
      })
    })
  }

  getEverything() {
    fetch(URL + `users/${this.state.userId}/everything`)
    .then(res => res.json())
    .then(everything => {
      this.setState({
        locations: everything.locations,
        rooms: everything.rooms,
        categories: everything.categories
      })
    })
  }

  render() {
    const { username, userId, items, locations, rooms, categories } = this.state;
    return (
      <div>
        {this.state.loggedIn ?
          <MainContainer
            username={username}
            userId={userId}
            items={items}
            locations={locations}
            rooms={rooms}
            categories={categories}
            logoutHandler={this.logoutHandler} />
          :
          <LoginPage loginHandler={this.loginHandler} />}
      </div>
    )
  }
}

export default App;
