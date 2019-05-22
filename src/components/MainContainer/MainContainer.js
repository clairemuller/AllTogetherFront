import React from 'react';
import './MainContainer.css';
import SearchBar from '../SearchBar/SearchBar';
import ItemsList from '../ItemsList/ItemsList';
import NavBar from '../NavBar/NavBar';

class MainContainer extends React.Component {
  render() {
    const { username, userId, items, rooms, categories } = this.props;

    return (
      <div id='mainContainer'>
        <NavBar
          logoutHandler={this.props.logoutHandler}
          name={username}
        />
        {// <SearchBar />
        }
        <ItemsList
          items={items}
          rooms={rooms}
          categories={categories}
          userId={userId}
        />
      </div>
    )
  }
}

export default MainContainer
