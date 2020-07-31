const messageService = require('./../services/messages-service');
const userService = require('./../services/user-service');

module.exports = function (app) {
  app.get('/chats', async (req, res) => {
    res.send('hello');
    const messageData = await messageService();
    console.log(messageData);

    const userData = await userService('ba405586-3a7f-484b-b5c0-5d1cf5cd9c0e');
    console.log(userData);
  });
};
