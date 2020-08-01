const messageService = require('./../services/messages-service');
const chatController = require('./../controllers/chat_controller');

module.exports = function (app) {
  app.get('/chats', async (req, res) => {
    //Getting all messages from '/messages'
    const messageData = await messageService();

    //Grouping messages. Format changed to Object for easier handling.
    const groupedMessages = chatController.groupMessages(messageData);

    //Constructing responce with mapping of keys of object.
    const chatsPromises = await chatController.getChatPromisses(
      groupedMessages
    );

    //Resolving chats promisses with Promise.all (no need for mapping)
    const chats = await Promise.all(chatsPromises);

    //Sending ready response
    res.send(chats);
  });
};
