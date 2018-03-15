import React, { Component } from 'react';

const WonoloerSignUp = ({wonoloer,amount,job}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        {wonoloer} just made ${amount} from {job}!
      </nav>
    );

}

export default WonoloerSignUp;
