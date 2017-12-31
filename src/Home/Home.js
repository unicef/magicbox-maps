// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import App from '../App';
/**
 * App
 * @return {Component}
 */
class Home extends Component {
  /**
   * Login
   */
  login() {
    this.props.auth.login();
  }
  /**
   * Render
   * @return {Component} component
   */
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() && (
            <App />
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{cursor: 'pointer'}}
                onClick={this.login.bind(this)}
              >
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    );
  }
}

export default Home;
