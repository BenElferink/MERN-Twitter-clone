import axios from 'axios';

export const url = 'http://localhost:8080';

export default axios.create({
  baseURL: `${url}/api/v1`,
  withCredentials: true,
});
