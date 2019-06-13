import React from 'react';
import './App.css';
import MainContainer from './MainContainer/MainContainer'
import LoginPage from './LoginPage'
const URL = 'https://all-together-app-backend.herokuapp.com/users'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      userId: 0,
      loggedIn: false,
      items: [],
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
      userId: 0,
      loggedIn: false,
      items: [],
      rooms: [],
      categories: []
    })
  }

  findOrCreateUser(username) {
    fetch(URL, {
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
        userId: userData.id
      }, () => {
        this.getItems()
      })
    })
  }

  getItems() {
    fetch(URL + `/${this.state.userId}/items`)
    .then(res => res.json())
    .then(items => this.getEverything(items))
  }

  getEverything(items) {
    fetch(URL + `/${this.state.userId}/everything`)
    .then(res => res.json())
    .then(everything => {
      this.setState({
        items: items,
        rooms: everything.rooms,
        categories: everything.categories
      })
    })
  }

  handleStateUpdate = () => {
    this.getItems()
  }

  render() {
    const { username, userId, items, rooms, categories } = this.state;
    return (
      <>
        {this.state.loggedIn ?
          <MainContainer
            username={username}
            userId={userId}
            items={items}
            rooms={rooms}
            categories={categories}
            logoutHandler={this.logoutHandler}
            onStateUpdate={this.handleStateUpdate}
          />
          :
          <LoginPage loginHandler={this.loginHandler} />
        }
      </>
    )
  }
}

export default App;
