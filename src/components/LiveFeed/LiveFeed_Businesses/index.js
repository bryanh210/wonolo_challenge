import React from 'react';

export const WonoloerSignUp = ({jobscompleted}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        {jobscompleted} jobs have been completed!
      </nav>
    );

}


export const SignupNumber = ({nowonoloersignup}) => {
  console.log(nowonoloersignup)
    return (
      <nav className="navbar navbar-light bg-light">
        {nowonoloersignup} Wonoloers have signed up!
      </nav>
    );

}
