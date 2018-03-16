import React from 'react';

export const WonoloerSignUp = ({jobscompleted}) => {
    return (
      <div>
        {jobscompleted} jobs have been completed!
      </div>
    );

}


export const SignupNumber = ({signups}) => {
    return (
      <div>
        {signups} Wonoloers have signed up!
      </div>
    );

}
