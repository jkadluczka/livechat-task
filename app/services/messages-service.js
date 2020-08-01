const axios = require('axios');

module.exports = async () => {
  //Getting all messages from /messages
  const response = await axios
    .get('http://localhost:3000/messages')
    .catch((error) => {
      console.log('ERROR:', error);
    });

  return response && response.data;
};
