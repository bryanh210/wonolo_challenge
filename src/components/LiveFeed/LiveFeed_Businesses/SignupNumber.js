import React, { Component } from 'react';

const SignupNumber = ({nowonoloersignup}) => {
  console.log(nowonoloersignup)
    return (
      <nav className="navbar navbar-light bg-light">
        {nowonoloersignup} Wonoloers have just signed up!
      </nav>
    );

}

export default SignupNumber;
