import axios from 'axios';

export const url = 'https://twitter-clone-serve.herokuapp.com';

export default axios.create({
  baseURL: `${url}/api/v1`,
  withCredentials: true,
});
