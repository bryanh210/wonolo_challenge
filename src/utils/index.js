import axios from 'axios';
import querystring from 'querystring';


//wonolo api key
const url = 'https://test.wonolo.com/api_v2/authenticate';
const api_key = 'pk_test_AfSuVyFrUnDN9Peg425y';
const secret_key = 'sk_test_myGyMwRwLCLznmJr5bGU';

export const WonoloToken = axios.post(url, querystring.stringify({
  api_key: api_key,
  secret_key: secret_key
}),{
  headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
})
.then((response) => {
    let token = response.data.token;
    localStorage.setItem('Token', token);
  })
  .catch((error) => {
    console.log(error.response);
  });

export const Token = localStorage.Token;

// Google map api key
export const googleAPIkey = 'AIzaSyBazeQ2f_Ao-xQAI7IDyQxzKCyyzzkckFY';

export const fetchLocation = (latlng, key) => {
  let city;
  console.log('here');
  let googleurl = 'https://maps.googleapis.com/maps/api/geocode/json';
  axios.get(googleurl, {
    params: {
      latlng: latlng,
      key: key
    }
  })
  .then(response =>{
        city = response.data.results[0]["address_components"][3]["long_name"];
          console.log(city)
        this.setState({
          gotlocation: true,
          city: city
        })
      })
}
