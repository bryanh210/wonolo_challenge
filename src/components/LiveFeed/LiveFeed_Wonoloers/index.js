import React, { Component } from 'react';

export const ActiveJobs = ({activejobs}) => {
    return (
      <div>
        There are <b>{activejobs}</b> active job requests!
      </div>
    );

}

export const NewJob = ({job, amount}) => {
  let prefix;
  if(job[0] === "a" || job[0] === "A" || job[0] === "e" || job[0] === "E" ){
    prefix = "an";
  }else{
    prefix = "a"
  }
    return (
      <div>
        A business has just posted {prefix} <b>{job}</b> job for $<b>{amount}</b>!
      </div>
    );

}

export default NewJob;
