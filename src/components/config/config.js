import axios from 'axios';
import querystring from 'querystring';

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
}).then(function (response) {
    const responseValues = Object.values(response);
    const token = responseValues[0];
  })
  .catch(function (error) {
    console.log(error);
  });
