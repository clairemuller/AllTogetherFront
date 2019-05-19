import React from 'react';
import './MainContainer.css';
import SearchBar from '../SearchBar/SearchBar';
import ItemsList from '../ItemsList/ItemsList';
import NavBar from '../NavBar/NavBar';

class MainContainer extends React.Component {

  // componentDidMount() {
  //   fetch('http://localhost:3000/items')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // }

  render() {
    return (
      <div>
        main container
        <NavBar />
        <SearchBar />
        <ItemsList />
      </div>
    )
  }
}

export default MainContainer
