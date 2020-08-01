const axios = require('axios');

module.exports = async () => {
  let errorResponse;
  //Getting all messages from /messages
  const response = await axios
    .get('http://localhost:3000/messages')
    .catch(() => {
      errorResponse = {
        error: true,
        message:
          "Can't access '/messages'. Check if your json-server is running properly.",
      };
    });

    if(errorResponse){
      console.error(errorResponse.message);
      return [];
    }

  return response.data;
};
