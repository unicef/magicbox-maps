import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import allReducers from './reducers'
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import './index.css';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
