import React from 'react';
import './App.css';
import MainContainer from './MainContainer/MainContainer'
import LoginPage from './LoginPage'

const URL = 'http://localhost:3000/';

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
      // locations: [],
      rooms: [],
      categories: []
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
        userId: userData.id
      }, () => {
        this.getItems()
      })
    })
  }

  getItems() {
    fetch(URL + `users/${this.state.userId}/items`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        items: data
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
        rooms: everything.rooms,
        categories: everything.categories
      })
    })
  }

  handleStateUpdate = (object, partOfState, method) => {
    if (method === 'add') {
      this.getItems()
      // if (partOfState === 'items') {
      //   // if user added new item, have to update everything
      //   let newItems = [...this.state.items, object]
      //   this.setState({
      //     items: newItems
      //   }, () => this.getEverything())
      // } else if (partOfState === 'rooms') {
      //   this.getEverything()
      // }
    } else if (method === 'delete') {
      console.log('inside state delete');
    }

  }

  render() {
    const { username, userId, items, rooms, categories } = this.state;
    return (
      <div>
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
      </div>
    )
  }
}

export default App;
