import axios from 'axios';

export const API_KEY = 'MY_API_KEY';

export default axios.create({
  baseURL: 'http://www.omdbapi.com',
});
