const axios = require('axios');
const anonymousUser = require('../constants/anonymous-user-constants');
const {
  MULTIPLE_USERS,
  NO_ACCESS_USERS,
} = require('../constants/error-messages');

module.exports = async (userUuid) => {
  let response;
  let errorResponse;

  //Getting user data from /user?user_uuid=${userUuid}
  try {
    response = await axios.get(
      `http://localhost:3000/user?user_uuid=${userUuid}`
    );
  } catch (error) {
    errorResponse = {
      error: true,
      status: error.response.status,
      message: NO_ACCESS_USERS,
    };
  }

  if (errorResponse) {
    console.error('ERROR', errorResponse.message);
    return errorResponse.status === 404 && anonymousUser;
  }

  //Handling multiple users with same uuid
  if (response.data && response.data.length > 1) console.error(MULTIPLE_USERS);

  //handling empty array response and 404
  if (response.data && response.data.length === 0) return anonymousUser;

  //Returning user data
  return response.data[0];
};
