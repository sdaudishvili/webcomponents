import axios from 'axios';

const axiosMock = axios.create({
  withCredentials: true
});

export default axiosMock;
