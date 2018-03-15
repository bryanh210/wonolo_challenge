import React, { Component } from 'react';

const NewJob = ({business}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        {business} has just posted a job!
      </nav>
    );

}

export default NewJob;
