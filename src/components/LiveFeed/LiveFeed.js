import React, { Component } from 'react';
import './LiveFeed.css';
import LiveFeedHeader from './LiveFeed_Header';
import {WonoloToken, googleAPIkey} from '../config';
import axios from 'axios';
import querystring from 'querystring';

// import NewJob from './LiveFeed_Businesses/LiveFeed_Wonoloers';
// import ActiveJobs from './LiveFeed_Wonoloers/Activejobs';
// import NewJob from './LiveFeed_Wonoloers/newjobs';
// // import SignupNumber from './LiveFeed_Businesses/LiveFeed_Businesses';
// import SignUpIndividuals from './LiveFeedBusiness/Signup_individuals';
// import SignupNumber from './LiveFeedBusiness/SignupNumber.js';


class LiveFeed extends Component {

    state = {
      city: '',
      nowonoloersignup: 0,
      wonoloer: 'Bryan',
      amount: 0,
      job: 'event planning',
      activejob: 0,
      business: 'Target',
      businesspay: 0
    }


  componentWillMount() {
    let token = localStorage.getItem('Token');
    console.log(token)
  }

componentDidMount(){
  // get geoLocation
  if(navigator.geolocation){
    var getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
}


getPosition().
  then((position) =>{
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    // get the city name from long and lat
    console.log(googleAPIkey);
    const latlng = `${lat},${lng}`;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json';
        console.log(latlng)
    let city;

    axios.get(url, {
      params: {
        latlng: latlng,
        key: googleAPIkey
      }
    }).then((response) =>{
        city = response.data.results[0]["address_components"][3]["long_name"];
          console.log(city)
        this.setState({
          gotlocation: true,
          city: city
        })
      })
      .catch(function (error) {
        console.log(`error is + ${error.response}`);
      });
  })

}


  render() {
    const {
      city,
      nowonoloersignup,
      wonoloer,
      amount,
      job,
      activejob,
      business,
      businesspay
    } = this.state;



    return (
      <nav className="navbar navbar-light bg-light">
        <LiveFeedHeader city={city}
          nowonoloersignup={nowonoloersignup}
          wonoloer={wonoloer}
          amount={amount}
          job={job}
          activejob={activejob}
          business={business}
          businesspay={businesspay}
      />

      </nav>
    );
  }
}

export default LiveFeed;
