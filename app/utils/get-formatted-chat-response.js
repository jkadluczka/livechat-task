const getUser = require('./../services/user-service');

const getFormattedChatResponse = async (groupedMessages) => {
  const response = await Object.keys(groupedMessages).map(async (key) => {
    const chat = { chat_uuid: key, message_cound: 0, users: [] };
    console.log('1');

    const promises = groupedMessages[key].map(async (message) => {
      chat.message_cound++;
      return await getUser(message.author_uuid);
    });

    const userList = await Promise.all(promises);

    chat.users = userList.map((user) => {
      return user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.first_name;
    });
    return chat;
  });

  return response;
};

module.exports = getFormattedChatResponse;
