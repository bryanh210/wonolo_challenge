import React, { Component } from 'react';
import './LiveFeed.css';
import axios from 'axios';
import {Token, googleAPIkey} from '../../../utils';
import {WonoloerSignUp,SignupNumber} from '../LiveFeed_Businesses';
import {ActiveJobs, NewJob} from '../LiveFeed_Wonoloers';

class LiveFeed extends Component  {
      state = {
        geocoder: true,
        city: 'updating...',
        signups: '',
        jobscompleted: '',
        payamount: '',
        job: '',
        activejobs: ''
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

      const activejobs = filteredJobs.length;
      const payamount = filteredJobs[0].wage;
      const job = filteredJobs[0].category;

      this.setState({
        payamount: payamount,
        activejobs: activejobs,
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

      const signups = filteredUsers.length;

      this.setState({
        signups: signups
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
// create counter that increases wonoloer by the second

  // this.setState({
  //   nowonoloersignup: newState.nowonoloersignup++,
  //   wonoloer: newState.wonoloer++,
  //   jobscompleted: newState.jobscompleted++,
  //   //payamount
  //   amount: newState.wonoloer++,
  //   job: '',
  //   activejob: newState.wonoloer++
  // })
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
      this.setState({
        geocoder: false,
        city: 'unable to fetch geocoder'
      })
    }
  }


    render() {
      const {
        geocoder,
        city,
        signups,
        jobscompleted,
        payamount,
        job,
        activejobs
      } = this.state;

      if(geocoder === false){
        return(
          <div>
            <h2 className="title">
            <div>
            Your browser doesn't support Geocoding. Please use Google Chrome to see live feed.
            </div>
            </h2>
          </div>
        )
      }

      return (
      <div className="livefeed">
        <h2 className="title">
          In your area: {city}
        </h2>
          <div className="modal-body row">
              <div className="col-md-6">
          <SignupNumber signups={signups} />
          <WonoloerSignUp jobscompleted={jobscompleted}  />
              </div>
              <div className="col-md-6">
          <ActiveJobs activejobs={activejobs}/>
        <NewJob job={job} amount={payamount}/>
              </div>
        </div>
      </div>
    );

  }
}
export default LiveFeed;
