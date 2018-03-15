import React, { Component } from 'react';
import WonoloerSignUp from '../LiveFeed_Businesses/Signup_individuals';
import SignupNumber from '../LiveFeed_Businesses/SignupNumber';
import ActiveJobs from '../LiveFeed_Wonoloers/Activejobs';
import NewJob from '../LiveFeed_Wonoloers/newjob';


const LFHeader = ({city, nowonoloersignup, wonoloer, amount, job, activejob, business, businesspay}) => {

console.log(nowonoloersignup, activejob, business, businesspay)

    // if(!city){
    //   return(
    //     <div>
    //       Please wait a moment...
    //     </div>
    //   )
    // }

    return (
      <div>
      <nav className="navbar navbar-light bg-light">
        In your area: {city}
      </nav>
      <SignupNumber nowonoloersignup={nowonoloersignup} />
      <WonoloerSignUp wonoloer={wonoloer} job={job} amount={amount}/>
      <ActiveJobs activejob={activejob}/>
      <NewJob business={business} businesspay1={businesspay}/>
    </div>
    );

}

export default LFHeader;
