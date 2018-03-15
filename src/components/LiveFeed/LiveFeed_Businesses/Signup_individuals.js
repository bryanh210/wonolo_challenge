import React from 'react';

export const WonoloerSignUp = ({wonoloer,amount,job}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        {wonoloer} just made ${amount} from {job}!
      </nav>
    );

}
