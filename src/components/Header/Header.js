import React, { Component } from 'react';


class Header extends Component {
  peacock = () => (
    <div width="100" height="100" >
    </div>
  );

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <div className="d-inline-block align-middle mr-2">{
            this.peacock()
          }</div> Wonolo Header
        </div>
      </nav>
    );
  }
}

export default Header;
