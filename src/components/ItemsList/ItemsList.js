import React from 'react';
import './ItemsList.css';
import Item from '../Item/Item';
import EditItemModal from '../EditItemModal/EditItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import AddRoomModal from '../AddRoomModal/AddRoomModal';
const URL = 'http://localhost:3000/users/'

class ItemsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editModalIsOpen: false,
      addModalIsOpen: false,
      roomModalIsOpen: false,
      clickedItem: ''
    }
  }

  toggleEditModal = (item) => {
    this.setState({
      editModalIsOpen: !this.state.editModalIsOpen,
      clickedItem: item
    })
  }

  toggleCloseEditModal = (editedItem, method) => {
    if (method === 'delete') {
      console.log('deleting item...');
      this.props.items.map(item => {
        if (item.id === editedItem.id) {
          let i = this.props.items.indexOf(item)
          this.props.items.splice(i, 1)
        }
        return ''
      })
    } else {
      console.log('editing item...');
      this.props.items.map(item => {
        if (item.id === editedItem.id) {
          let i = this.props.items.indexOf(item)
          this.props.items[i] = editedItem
        }
        return item
      })
    }



    this.setState({
      editModalIsOpen: !this.state.editModalIsOpen,
      clickedItem: ''
    })
  }

  toggleAddModal = (item) => {
    if (!this.props.items.includes(item) && item.id) {
      this.props.items.push(item)
    }

    this.setState({
      addModalIsOpen: !this.state.addModalIsOpen
    })
  }

  toggleRoomModal = (room) => {
    // adds new room to room list view
    if (!this.props.rooms.includes(room) && room.id) {
      fetch(URL + `${this.props.userId}/rooms`)
      .then(res => res.json())
      .then(rooms => {
        this.props.rooms.push(rooms[rooms.length-1])
      })
    }
    this.setState({
      roomModalIsOpen: !this.state.roomModalIsOpen
    })
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

          <button type="button" onClick={this.toggleAddModal}>Add Item</button>
          <button type="button" onClick={this.toggleRoomModal}>Add Room</button>

          <table id='itemsListTable'>
            <tbody>
              <tr id='tableHeader'>
                <th onClick={() => this.sortTable(0)}>Item</th>
                <th onClick={() => this.sortTable(1)}>Location</th>
                <th onClick={() => this.sortTable(2)}>Room</th>
                <th onClick={() => this.sortTable(3)}>Category</th>
                <th onClick={() => this.sortTable(4)}>Note</th>
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
                    onClick={this.toggleEditModal}
                  />
                )})}
            </tbody>
          </table>
        </div>

        {this.state.editModalIsOpen ?
          <EditItemModal
            show={this.state.editModalIsOpen}
            onClose={this.toggleCloseEditModal}
            item={this.state.clickedItem}
            userId={userId}
            rooms={rooms}
            categories={categories}
            items={items}
            />
          :
          null}

          {this.state.addModalIsOpen ?
            <AddItemModal
              show={this.state.addModalIsOpen}
              onClose={this.toggleAddModal}
              userId={userId}
              rooms={rooms}
              categories={categories}
              />
            :
            null}

          {this.state.roomModalIsOpen ?
            <AddRoomModal
              show={this.state.roomModalIsOpen}
              onClose={this.toggleRoomModal}
              userId={userId}
              rooms={rooms}
              />
            :
            null}
      </>
    )
  }
}

export default ItemsList;
