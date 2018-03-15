import React, { Component } from 'react';

export const ActiveJobs = ({activejob}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        There are {activejob} active job requests!
      </nav>
    );

}

export const NewJob = ({job, amount}) => {
  job = job.toLowerCase();
  let prefix;

  if(job[0] === "a" || job[0] === "A"){
    prefix = "an";
  }else{
    prefix = "a"
  }
    return (
      <nav className="navbar navbar-light bg-light">
        A business has just posted {prefix} {job} job for ${amount}!
      </nav>
    );

}

export default NewJob;
