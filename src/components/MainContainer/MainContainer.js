import React from 'react';
import './MainContainer.css';
import SearchBar from '../SearchBar/SearchBar';
import ItemsList from '../ItemsList/ItemsList';
import NavBar from '../NavBar/NavBar';

class MainContainer extends React.Component {

  render() {
    return (
      <div>
        main container
        <NavBar
          logoutHandler={this.props.logoutHandler} />
        <SearchBar />
        <ItemsList
          items={this.props.items}/>
      </div>
    )
  }
}

export default MainContainer
