import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/AppNavbar';
import ItemModal from '../src/components/ItemModal';
import ShoppingList from '../src/components/ShoppingList';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <AppNavbar />
        <ShoppingList />
        <ItemModal />
      </div>
    </Provider>
  );
}

export default App;
