const axios = require('axios');
const anonymousUser = require('../constants/anonymous-user-constants');

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
      message:
        "Can't access '/users'. Check if your json-server is running properly.",
    };
  }

  if (errorResponse) {
    console.error('ERROR', errorResponse.message);
    return errorResponse.status === 404 ? anonymousUser : {};
  }

  //Handling multiple users with same uuid
  if (response.data && response.data.length > 1)
    console.log('Multiple users with the same uuid. Check the database!');

  //handling empty array response and 404
  if (response.data && response.data.length === 0) return anonymousUser;

  //Returning user data
  return response.data ? response.data[0] : {};
};
