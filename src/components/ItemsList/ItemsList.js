import React from 'react';
import './ItemsList.css';
import Item from '../Item/Item';

class ItemsList extends React.Component {

  sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("itemsListTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
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
    return (
      <div id='itemsListContainer'>
        {this.props.items ?

          <table id='itemsListTable'>
            <tbody>
              <tr id='tableHeader'>
                <th onClick={() => this.sortTable(0)}>Item</th>
                <th onClick={() => this.sortTable(1)}>Location</th>
                <th onClick={() => this.sortTable(2)}>Room</th>
                <th onClick={() => this.sortTable(3)}>Category</th>
                <th onClick={() => this.sortTable(4)}>Note</th>
              </tr>
              {this.props.items.map(item => {
                return (
                  <Item
                    key={item.id}
                    description={item.description}
                    note={item.note}
                    location={item.location}
                    category={item.category.name} />
                )})}
            </tbody>
          </table>

          : null}
      </div>
    )
  }
}

export default ItemsList;
