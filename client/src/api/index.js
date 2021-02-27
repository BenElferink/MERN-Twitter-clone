import axios from 'axios';

// export const url = 'http://localhost:8080';
export const url = 'https://twitter-clone-serve.herokuapp.com';

export default axios.create({
  baseURL: `${url}/api/v1`,
  // withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: 'Bearer ' + localStorage.getItem('token'),
  // },
});
