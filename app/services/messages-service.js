const axios = require('axios');
const { NO_ACCESS_MESSAGES } = require('../constants/error-messages');

module.exports = async () => {
  let response;
  let errorResponse;
  //Getting all messages from /messages
  try {
    response = await axios.get('http://localhost:3000/messages');
  } catch (error) {
    errorResponse = {
      error: true,
      message: NO_ACCESS_MESSAGES,
    };
  }

  if (errorResponse) {
    console.error(errorResponse.message);
    return [];
  }

  return response ? response.data : [];
};
