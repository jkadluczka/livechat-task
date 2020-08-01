const axios = require('axios');
const anonymousUser = require('../constants/anonymous-user-constants');

module.exports = async (userUuid) => {
  //Getting user data from /user?user_uuid=${userUuid}
  const response = await axios
    .get(`http://localhost:3000/user?user_uuid=${userUuid}`)
    .catch((error) => {
      throw error;
    });

  //Handling multiple users with same uuid
  if (response.data.length > 1) {
    throw 'Multiple users with the same uuid. Check the database!';
  }

  //handling empty array response and 404
  if (response.data.length === 0 || response.status === 404) {
    return anonymousUser;
  }

  //Returning user data
  return response.data[0];
};
