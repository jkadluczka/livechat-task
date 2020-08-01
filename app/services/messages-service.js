const axios = require('axios');

module.exports = async () => {
  let response;
  let errorResponse;
  //Getting all messages from /messages
  try {
    response = await axios.get('http://localhost:3000/messages');
  } catch (error) {
    errorResponse = {
      error: true,
      message:
        "Can't access '/messages'. Check if your json-server is running properly.",
    };
  }

  if (errorResponse) {
    console.error(errorResponse.message);
    return [];
  }

  return response ? response.data : [];
};
