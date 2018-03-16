import {Token, googleAPIkey} from '../../../utils';
import axios from 'axios';

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
      break;

    case 'userRequest':
        url = 'https://test.wonolo.com/api_v2/users';
        const userCity = this.state.city.slice();
        const userCityLowerCase = userCity.toLowerCase();

        axios.get(url, {
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
            })


            const jobscompleted = filteredFinishedJobs.length;

            this.setState({
              jobscompleted: jobscompleted
            })
          })
        break;
    default:
      throw new Error("No url available")
  }
}

// JobRequested = (case) =>{
//
//   const jobRequestUrl = 'https://test.wonolo.com/api_v2/job_requests';
//   axios.get(jobRequestUrl, {
//     params: {
//       token: localStorage.Token
//     }
//   }).then(response =>{
//       const data = response.data["job_requests"];
//
//       //filter jobs based on location
//       const filteredJobs = data.filter(item =>{
//         return item.city === this.state.city;
//       })
//
//       const activejobs = filteredJobs.length;
//       const payamount = filteredJobs[0].wage;
//       const job = filteredJobs[0].category;
//
//       this.setState({
//         payamount: payamount,
//         activejobs: activejobs,
//         job: job
//       })
//     })
// }

// find wonoloers
// wonoloUserRequest = () =>{
//   const userCity = this.state.city.slice();
//   const userCityLowerCase = userCity.toLowerCase();
//   const userRequestUrl = 'https://test.wonolo.com/api_v2/users';
//   axios.get(userRequestUrl, {
//     params: {
//       token: localStorage.Token
//     }
//   }).then(response =>{
//       const data = response.data["users"];
//
//       //filter jobs based on location
//       const filteredUsers = data.filter(item =>{
//         return (item.city === userCity ||item.city === userCityLowerCase && item.type === "Worker");
//       })
//
//       const signups = filteredUsers.length;
//
//       this.setState({
//         signups: signups
//       })
//     })
// }

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
