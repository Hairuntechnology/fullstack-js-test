import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <p>Test Nirilanto</p>
        <Nav>
          <NavItem>
            <NavLink href="#/emp">Employer</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/exp">Experience</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
