const axios = require('axios');

module.exports = () => {
  return axios.get('http://localhost:3000/messages').then((response) => {
    return response.data;
  });
};
