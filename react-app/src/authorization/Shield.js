// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import {Navbar, Button} from 'react-bootstrap';
import '../App.css';

/**
 * App
 * @return {Component}
 */
class App extends Component {
  /**
   * Route
   * @param  {Object} route
   */
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  /**
   * Login
   */
  login() {
    this.props.auth.login();
  }

  /**
   * Logout
   */
  logout() {
    this.props.auth.logout();
  }

  /**
   * Render
   * @return {Component} component
   */
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                <Button
                  id="qsLoginBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
