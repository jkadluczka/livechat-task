const messageService = require('./../services/messages-service');
const getUser = require('./../services/user-service');
const Promise = require('bluebird');
const removeDoubles = require('./../utils/remove-doubles-util');

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

    const response = await Object.keys(groupedMessages).map(async (key) => {
      const chat = { chat_uuid: key, message_cound: 0, users: [] };
      console.log('1');

      const promises = groupedMessages[key].map(async (message) => {
        chat.message_cound++;
        return await getUser(message.author_uuid);
      });

      const userList = await Promise.map(promises, (user) => {
        return user.last_name
          ? `${user.first_name} ${user.last_name}`
          : user.first_name;
      });

      chat.users = removeDoubles(userList);
      return chat;
    });

    const responseWait = await Promise.all(response);

    res.send(responseWait);
  });
};
