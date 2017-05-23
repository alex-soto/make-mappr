import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
// import {  selectTileType } from './actions';
import mapprApp, { initialState } from './reducers';
// import App from './App';
import Mappr from './components/containers/Mappr';
import './index.css';

let store = createStore(mapprApp, initialState);
/*
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
  });
store.dispatch(selectTileType('square'));
unsubscribe();
*/
ReactDOM.render(
  <Provider store={store}>
    <Mappr />
  </Provider>,
  document.getElementById('root')
);
