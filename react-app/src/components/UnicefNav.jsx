import React, {
  Component
} from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import './css/UnicefNav.css';
import unicef from '../data/unicef.png'

class UnicefNav extends Component {

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