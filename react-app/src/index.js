// eslint-disable-next-line no-unused-vars
import React from 'react'
import config from './config'
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Route, Router} from 'react-router-dom';
import Home from './authorization/Home/Home';
import Callback from './authorization/Callback/Callback';
import Auth from './authorization/Auth/Auth';
import history from './authorization/history';
import App from './App';
import Shield from './authorization/Shield';
import {
  Provider
} from 'react-redux'
import allReducers from './reducers'
import {
  createStore,
  applyMiddleware
} from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
// import {makeMainRoutes} from './routes';

import './index.css';
const auth = new Auth();

/**
 * Returns score between 0 and 1
 * @param  {Object} location
 */
const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}
const store = createStore(allReducers, applyMiddleware(thunk));

if (config.login_required) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route path='/' render={(props) =>
            <Shield auth={auth} {...props} />} />
          <Route path='/home' render={(props) =>
            <Home auth={auth} {...props} />} />
          <Route path='/authorization/callback' render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
    </Provider>,
    document.getElementById('root'));
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'));
}
