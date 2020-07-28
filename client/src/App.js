import React, { Component } from 'react';
import AppNav from './components/Nav';
import ShoppingList from './components/ShoppingList';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    let items; // fill with fetched data
    axios
      .get('http://localhost:5000/api/items')
      .then((res) => {
        this.setState({
          items: res.data,
        });
      })
      .catch((err) => console.error(err));
  }

  axiosGet = () => {};

  addItem = (newItem) => {
    this.setState((state) => ({
      items: [...state.items, newItem],
    }));
  };

  addItemBackend = (newItem) => {
    axios
      .post('http://localhost:5000/api/items', newItem)
      .then((res) => {
        console.log(res.data);
        this.addItem(res.data);
      })
      .catch((err) => console.log('Error!', err));
  };

  deleteItem = (_id) => {
    this.setState((state) => ({
      items: state.items.filter((item) => item._id !== _id),
    }));
  };

  deleteItemBackend = (id) => {
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then((res) => console.log('Deleted'))
      .catch((err) => console.log(err));
    this.deleteItem(id);
  };

  render() {
    return (
      <div>
        <AppNav />
        <ShoppingList
          items={this.state.items}
          addItemBackend={this.addItemBackend}
          deleteItemBackend={this.deleteItemBackend}
        />
      </div>
    );
  }
}

export default App;
