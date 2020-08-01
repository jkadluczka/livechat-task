const getUser = require('./../services/user-service');
const removeDoubles = require('./../utils/remove-doubles-util');
const concatinateName = require('./../utils/concatinate-name-util');
const Promise = require('bluebird');

exports.groupMessages = (messageData) => {
  return messageData.reduce((acc, message) => {
    //Creating new field if it does not exist
    if (!acc[message.chat_uuid]) {
      acc[message.chat_uuid] = [];
    }

    acc[message.chat_uuid].push(message);

    return acc;
  }, {});
};

exports.getChatPromisses = async (groupedMessages) => {
  const promises = await Object.keys(groupedMessages).map(async (key) => {
    //Default starting chat object wit 0 messages.
    const chat = { chat_uuid: key, messages_count: 0, users: [] };

    //Getting array of promises using .map(). Also incrementing message count.
    const userListPromises = groupedMessages[key].map(async (message) => {
      chat.messages_count++;
      return await getUser(message.author_uuid);
    });

    //Resolving of promisses with Promise.map so user object can be transformed in the same spot.
    const userList = await Promise.map(userListPromises, (user) => {
      return concatinateName(user);
    });

    //Assigning array of unique users to chat's user list
    chat.users = removeDoubles(userList);

    return chat;
  });

  return promises;
};
