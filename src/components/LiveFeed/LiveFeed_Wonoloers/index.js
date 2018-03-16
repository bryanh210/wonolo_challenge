import React, { Component } from 'react';

export const ActiveJobs = ({activejobs}) => {
    return (
      <div>
        There are {activejobs} active job requests!
      </div>
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
      <div>
        A business has just posted {prefix} {job} job for ${amount}!
      </div>
    );

}

export default NewJob;
