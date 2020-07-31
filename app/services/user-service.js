const axios = require('axios');
const anonymousUser = require('../constants/anonymous-user-constants');

module.exports = async (userUuid) => {
  const response = await axios.get(
    `http://localhost:3000/user?user_uuid=${userUuid}`
  );

  return response.data.length || response.status === 404
    ? response.data[0]
    : anonymousUser;
};
