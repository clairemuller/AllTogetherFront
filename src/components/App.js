import React from 'react';
import './App.css';
import NavBar from './NavBar/NavBar'
import MainContainer from './MainContainer/MainContainer'


class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => console.log(data))
  }

  render() {
    return (
      <div>
      <NavBar />
      <MainContainer />
      </div>
    )
  }
}

export default App;
