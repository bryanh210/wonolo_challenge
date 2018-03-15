import axios from 'axios';
import querystring from 'querystring';

//wonolo api
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
.then(function (response) {
    // console.log(response.data);
    let token = response.data.token;
    // if (!token || token === 'undefined') token = 'xHtzzW5UT9CbYQf7HNhS';
    localStorage.setItem('Token', token);
  })
  .catch(function (error) {
    console.log(error.response);
  });

// Google map api

export const googleAPIkey = 'AIzaSyBazeQ2f_Ao-xQAI7IDyQxzKCyyzzkckFY';



// axios.post(url, querystring.stringify({
//   api_key: api_key,
//   secret_key: secret_key
// }),{
//   headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
// })
