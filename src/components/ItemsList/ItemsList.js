import React from 'react';
import '../../css/ItemsList.css';
import Item from '../Item/Item';
import AddItemModal from '../AddItemModal/AddItemModal';
import EditItemModal from '../EditItemModal/EditItemModal';
import RoomsModal from '../RoomsModal/RoomsModal';

class ItemsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editItemModalIsOpen: false,
      addItemModalIsOpen: false,
      roomsModalIsOpen: false,
      clickedItem: ''
    }
  }

  openEditItemModal = (item) => {
    this.setState({
      editItemModalIsOpen: !this.state.editItemModalIsOpen,
      clickedItem: item
    })
  }

  closeEditItemModal = (needToUpdate) => {
    if (needToUpdate === true) {
      this.props.onStateUpdate()
    }
    this.setState({
      editItemModalIsOpen: !this.state.editItemModalIsOpen,
      clickedItem: ''
    })
  }

  toggleAddItemModal = (item) => {
    // if new item was created, update state in parent
    if (item.id) {
      this.props.onStateUpdate()
    }
    this.setState({
      addItemModalIsOpen: !this.state.addItemModalIsOpen
    })
  }

  openRoomsModal = () => {
    this.setState({
      roomsModalIsOpen: !this.state.roomsModalIsOpen
    })
  }

  closeRoomsModal = (needToUpdate) => {
    if (needToUpdate === true) {
      this.props.onStateUpdate()
    }
    this.setState({
      roomsModalIsOpen: !this.state.roomsModalIsOpen
    })
  }

  handleStateUpdate = () => {
    this.props.onStateUpdate()
  }

  sortTable(n) {
    // https://www.w3schools.com/howto/howto_js_sort_table.asp
    let switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    let table = document.getElementById("itemsListTable");
    let rows = table.rows;
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;

      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  render() {
    const { items, rooms, categories, userId } = this.props;

    return (
      <>
        <div id='itemsListContainer'>

          <div id='button-bar'>
            {this.props.rooms.length === 0 ?
                <button className='button-bar-button' type="button"
                  onClick={this.openRoomsModal}>
                  Add Room
                </button>
              :
              <>
                <button className='button-bar-button' type="button"
                  onClick={this.toggleAddItemModal}>
                  Add Item
                </button>
                <button className='button-bar-button' type="button"
                  onClick={this.openRoomsModal}>
                  Add/Edit Rooms
                </button>
              </>
            }
          </div>

          <table id='itemsListTable'>
            <tbody>
              <tr id='tableHeader'>
                <th onClick={() => this.sortTable(0)}>ITEM</th>
                <th onClick={() => this.sortTable(1)}>LOCATION</th>
                <th onClick={() => this.sortTable(2)}>ROOM</th>
                <th onClick={() => this.sortTable(3)}>CATEGORY</th>
                <th onClick={() => this.sortTable(4)}>NOTE</th>
              </tr>
              {items.map(item => {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    description={item.description}
                    category={item.category.name}
                    note={item.note}
                    room={item.location.room.name}
                    location={item.location.name}
                    userId={userId}
                    onClick={this.openEditItemModal}
                  />
                )})}
            </tbody>
          </table>

        </div>

        {this.state.addItemModalIsOpen ?
          <AddItemModal
            show={this.state.addItemModalIsOpen}
            onClose={this.toggleAddItemModal}
            userId={userId}
            rooms={rooms}
            categories={categories}
            />
          :
          null}

        {this.state.editItemModalIsOpen ?
          <EditItemModal
            show={this.state.editItemModalIsOpen}
            onClose={this.closeEditItemModal}
            item={this.state.clickedItem}
            userId={userId}
            rooms={rooms}
            categories={categories}
            items={items}
            />
          :
          null}

        {this.state.roomsModalIsOpen ?
          <RoomsModal
            show={this.state.roomsModalIsOpen}
            onClose={this.closeRoomsModal}
            userId={userId}
            rooms={rooms}
            onStateUpdate={this.handleStateUpdate}
            />
          :
          null}
      </>
    )
  }
}

export default ItemsList;
