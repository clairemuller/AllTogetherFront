import React from 'react';
import '../../css/App.scss';

class SearchBar extends React.Component {
  myFunction() {
    console.log('searching...');
  }

  render() {
    return (
      <div id='searchBarContainer'>
      <input type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search..." />
      </div>
    )
  }
}

export default SearchBar;
