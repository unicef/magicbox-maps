// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import {Provider} from 'react-redux'
// import {createStore} from 'redux';
// import allReducers from './reducers'
// import './index.css';
//
// const store = createStore(allReducers);
//
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

import React from 'react'
import ReactDOM from 'react-dom';
import datesReducer from './reducers/reducer-dates';
import thunk from 'redux-thunk';
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  dates: datesReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
