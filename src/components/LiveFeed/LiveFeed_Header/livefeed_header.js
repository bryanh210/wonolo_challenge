import React, { Component } from 'react';
import '../LiveFeed.css';
import {Token, googleAPIkey} from '../../config';
import axios from 'axios';
import {WonoloerSignUp,SignupNumber} from '../LiveFeed_Businesses';
import {ActiveJobs, NewJob} from '../LiveFeed_Wonoloers';
import _ from 'lodash';


class LiveFeedHeader extends Component  {

      state = {
        city: 'updating...',
        nowonoloersignup: '',
        wonoloer: '',
        jobscompleted: '',
        //payamount
        amount: '',
        job: '',
        activejob: '' ,
        business: '',
      }
// simplify wonoloJobrequest (switch each case for each function?)
//put all of these to utils
JobRequested = () =>{
  const jobRequestUrl = 'https://test.wonolo.com/api_v2/job_requests';
  axios.get(jobRequestUrl, {
    params: {
      token: localStorage.Token
    }
  }).then(response =>{
      const data = response.data["job_requests"];

      //filter jobs based on location
      const filteredJobs = data.filter(item =>{
        return item.city === this.state.city;
      })

      const activejob = filteredJobs.length;
      const amount = filteredJobs[0].wage;
      const job = filteredJobs[0].category;

      this.setState({
        amount: amount,
        activejob: activejob,
        job: job
      })
    })
}

// find wonoloers
wonoloUserRequest = () =>{
  const userCity = this.state.city.slice();
  const userCityLowerCase = userCity.toLowerCase();
  const userRequestUrl = 'https://test.wonolo.com/api_v2/users';
  axios.get(userRequestUrl, {
    params: {
      token: localStorage.Token
    }
  }).then(response =>{
      const data = response.data["users"];

      //filter jobs based on location
      const filteredUsers = data.filter(item =>{
        return (item.city === userCity ||item.city === userCityLowerCase && item.type === "Worker");
      })

      const nowonoloersignup = filteredUsers.length;

      this.setState({
        nowonoloersignup: nowonoloersignup
      })
    })
}

jobsPerformed = () =>{
  const workerCity = this.state.city.slice();
  const workerCityLowerCase = workerCity.toLowerCase();
  const jobsPerformedUrl = 'https://test.wonolo.com/api_v2/jobs';
  axios.get(jobsPerformedUrl, {
    params: {
      token: localStorage.Token
    }
  }).then(response =>{
      const data = response.data["jobs"];

      //filter jobs based on location
      const filteredFinishedJobs = data.filter(item =>{
        return (item.worker.city === workerCity ||item.worker.city === workerCityLowerCase);
      })


      const jobscompleted = filteredFinishedJobs.length;

      this.setState({
        jobscompleted: jobscompleted
      })
    })
}

setZero = () =>{
  this.setState({
    nowonoloersignup: '',
    wonoloer: '',
    jobscompleted: '',
    //payamount
    amount: '',
    job: '',
    activejob: '' ,
    business: '',
  })
}

  componentDidMount(){
    let getPosition;
    if(navigator.geolocation){
      getPosition = options => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
    getPosition()
      .then((position) =>{
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        // get the city name from long and lat
        console.log(googleAPIkey);
        const latlng = `${lat},${lng}`;
        let googleurl = 'https://maps.googleapis.com/maps/api/geocode/json';
        let city;

        axios.get(googleurl, {
          params: {
            latlng: latlng,
            key: googleAPIkey
          }
        }).then(response =>{
            city = response.data.results[0]["address_components"][3]["long_name"];
              console.log(city)
            this.setState({
              gotlocation: true,
              city: city
            })
          })

          //fetch up the job post request
          .then(() =>{
            // setInterval(function(){ alert("Hello"); }, 3000);
            setInterval(() =>{
              this.wonoloUserRequest();
              this.jobsPerformed();
              this.JobRequested();
              this.setZero();
            }
            , 5000);

          })

          .catch((error) => {
            console.log(`error is + ${error.response}`);
          });
      })
  }
    else{
      console.log('Error: Browser does not support geolocation')
    }
  }


    render() {
      const {
        city,
        //rename
        nowonoloersignup,
        wonoloer,
        jobscompleted,
        amount,
        job,
        activejob,
        business,
        businesspay
      } = this.state;

      // const refresh = _.debounce(() => {this.setZero()}, 300)

      return (
      <div>
      <h2 className="title">
      <nav className="navbar navbar-light bg-light title">
        In your area: {city}
      </nav>
      </h2>

      <div className="front-page-display" >
      {/* {nowonoloersignup} have signed up!
      <br/>
      {jobscompleted} jobs have been completed!
      <br/>
      A business has just posted a {job} job for ${amount}!
      <br/>
      There are {activejob} active job requests! */}

      <SignupNumber nowonoloersignup={nowonoloersignup} />

      <WonoloerSignUp jobscompleted={jobscompleted}  />

      <ActiveJobs activejob={activejob}/>

      <NewJob business={business} job={job} amount={amount}/>
      </div>

    </div>
    );

  }
}
export default LiveFeedHeader;
