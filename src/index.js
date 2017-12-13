import React from 'react'
import ReactDOM from 'react-dom';
import datesReducer from './reducers/reducer-dates';
import thunk from 'redux-thunk';
import App from './App';
import {
  Provider
} from 'react-redux'
import allReducers from './reducers'
import {
  createStore,
  applyMiddleware
} from 'redux';
import './index.css';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
