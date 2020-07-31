const axios = require('axios');
const anonymousUser = require('../constants/anonymous-user-constants');

module.exports = (userUuid) => {
  return axios
    .get(`http://localhost:3000/user?user_uuid=${userUuid}`)
    .then((response) => {
      return response.data.length || response.status === 404
        ? response.data
        : anonymousUser;
    });
};
