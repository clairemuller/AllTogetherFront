import React from 'react';
import './MainContainer.css';
import SearchBar from '../SearchBar/SearchBar';
import ItemsList from '../ItemsList/ItemsList';
import NavBar from '../NavBar/NavBar';

class MainContainer extends React.Component {
  render() {
    return (
      <div id='mainContainer'>
        <NavBar
          logoutHandler={this.props.logoutHandler}
          name={this.props.state.user} />
        <SearchBar />
        <ItemsList
          items={this.props.state.items} />
      </div>
    )
  }
}

export default MainContainer
