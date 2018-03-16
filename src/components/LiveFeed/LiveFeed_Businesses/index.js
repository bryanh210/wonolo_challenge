import React from 'react';

export const WonoloerSignUp = ({jobscompleted}) => {
    return (
      <div>
        <b>{jobscompleted}</b> jobs have been completed!
      </div>
    );

}


export const SignupNumber = ({signups}) => {
    return (
      <div>
        <b>{signups}</b> Wonoloers have signed up!
      </div>
    );

}
