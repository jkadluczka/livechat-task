const axios = require('axios');

module.exports = (userUuid) => {
  return axios.get(`http://localhost:3000/user?user_uuid=${userUuid}`).then((response) => {
    return response.data;
  });
};
