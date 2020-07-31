const messageService = require('./../services/messages-service');
const userService = require('./../services/user-service');

module.exports = function (app) {
  app.get('/chats', async (req, res) => {
    const messageData = await messageService();
    const groupedMessages = messageData.reduce((acc, message) => {
      if (!acc[message.chat_uuid]) {
        acc[message.chat_uuid] = [];
      }
      acc[message.chat_uuid].push(message);

      return acc;
    }, {});

    res.send(groupedMessages);
  });
};
