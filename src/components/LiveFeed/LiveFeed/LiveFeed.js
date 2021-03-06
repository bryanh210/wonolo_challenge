import React, { Component } from 'react';
import './LiveFeed.css';
import axios from 'axios';
import {Token, googleAPIkey} from '../../../utils';
import {WonoloerSignUp,SignupNumber} from '../LiveFeed_Businesses';
import {ActiveJobs, NewJob} from '../LiveFeed_Wonoloers';

class LiveFeed extends Component  {
      state = {
        geocoder: true,
        city: '',
        signups: 0,
        jobscompleted: 0,
        payamount: '',
        job: 0,
        activejobs: 0
      }

//get current location
fetchLocation = (latlng, key) => {
  let city;
  let googleurl = 'https://maps.googleapis.com/maps/api/geocode/json';
  axios.get(googleurl, {
    params: {
      latlng: latlng,
      key: key
    }
  })
  .then(response =>{
    city = response.data.results[0]["address_components"][3]["long_name"];
    this.setState({
      geocoder: true,
      city: city
    })
  })
}

//based on string, app will fetch the correct url from Wonolo's API
fetchRequest = (string) =>{
  let url;
    switch(string){
    case 'jobRequested':
      url = 'https://test.wonolo.com/api_v2/job_requests';
      axios.get(url, {
      params: {
       token: localStorage.Token
        }
      }).then(response =>{
        const data = response.data["job_requests"];
        //filter jobs based on location
        const filteredJobs = data.filter(item =>{
          return item.city === this.state.city;
        });
        const activejobs = filteredJobs.length;
        const payamount = filteredJobs[0].wage;
        const job = filteredJobs[0].category;
        this.setState({
          payamount: payamount,
          activejobs: activejobs,
          job: job
        });
      });
    break;

    case 'userRequest':
        url = 'https://test.wonolo.com/api_v2/users';
        const userCity = this.state.city.slice();
        const userCityLowerCase = userCity.toLowerCase();
        axios.get(url, {
          params: {
            token: Token
          }
        }).then(response =>{
            const data = response.data["users"];
            //filter users based on type & city
            const filteredUsers = data.filter(item =>{
              return (item.type === "Worker");
            }).filter(item =>{
                return (item.city === userCity ||item.city === userCityLowerCase);
            })
            const signups = filteredUsers.length;
            this.setState({
              signups: signups
            });
          });
        break;

    case 'jobsPerformed':
        url = 'https://test.wonolo.com/api_v2/jobs';
        const workerCity = this.state.city.slice();
        const workerCityLowerCase = workerCity.toLowerCase();
        axios.get(url, {
          params: {
            token: localStorage.Token
          }
        }).then(response =>{
            const data = response.data["jobs"];
            //filter jobs based on location
            const filteredFinishedJobs = data.filter(item =>{
              return (item.worker.city === workerCity ||item.worker.city === workerCityLowerCase);
            });
            const jobscompleted = filteredFinishedJobs.length;
            this.setState({
              jobscompleted: jobscompleted
            });
          });
        break;

    default:
      throw new Error("No url available");
  };
};

generatePayAmount = () =>{
  const num = Math.floor(Math.random() * 250);
  return num < 100? 100 : num
};

updateStatistics = () =>{
  const jobBank = ["warehouse", "delivery", "general labor", "administrative", "event staff", "merchandising"];
  const randomIndex = Math.floor(Math.random() * jobBank.length);
  const payamount = this.generatePayAmount();
  this.setState({
    signups: this.state.signups +1,
    jobscompleted: this.state.jobscompleted +1,
    payamount: payamount,
    job: jobBank[randomIndex],
    activejobs: this.state.activejobs +1,
  })
};

componentDidMount(){
    let getPosition;
    if(navigator.geolocation){
      getPosition = options => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };
    getPosition()
    .then((position) =>{
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const latlng = `${lat},${lng}`;
      this.fetchLocation(latlng, googleAPIkey)
      })
    .then(()=>{
      setTimeout(() =>{
        this.fetchRequest('userRequest');
        this.fetchRequest('jobsPerformed');
        this.fetchRequest('jobRequested');
      },400);
      setInterval(() =>{
        this.updateStatistics();
      }, 3500);
    })
  }else{
    this.setState({
      geocoder: false
    })
  }
};

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
          <div className="livefeed">
            <h2>
            Your browser doesn't allow geocoding. Please use Chrome instead.
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
                <WonoloerSignUp jobscompleted={jobscompleted}/>
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
