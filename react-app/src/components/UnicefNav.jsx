import {
  Component
} from 'react';
import {
  Navbar
} from 'react-bootstrap';
import './css/UnicefNav.css';
import unicef from '../data/unicef.png'

/**
 * Unicef Navbar component
 */
class UnicefNav extends Component {
  /**
   * Render Unicef navbar
   *
   * @return {component}
   */
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="unicef.org"><img src={unicef} height="180%" alt=""/></a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default UnicefNav;
