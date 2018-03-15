import React, { Component } from 'react';

const ActiveJobs = ({activejob}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        There are {activejob} active jobs!
      </nav>
    );

}

export default ActiveJobs;
