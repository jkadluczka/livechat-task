const messagesService = require('./../../services/messages-service');
const axios = require('axios');
const {
  MESSAGE_SERVICE,
  REJECT_BODY,
} = require('../../constants/test-constants');

jest.mock('axios');

describe('messageService test', () => {
  it('Should return Promise object', () => {
    const testCase = messagesService();
    const examplePromise = new Promise(() => {});

    expect(typeof testCase).toEqual('object');
    expect(testCase).toMatchObject(examplePromise);
  });

  it('Should resolve to proper messages array', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({ data: MESSAGE_SERVICE.REAL_MESSAGES });
    });

    const testCase = await messagesService();

    expect(testCase.length).toBeGreaterThan(0);
    expect(testCase[0]).toHaveProperty('message_uuid');
    expect(testCase[0]).toHaveProperty('chat_uuid');
    expect(testCase[0]).toHaveProperty('author_uuid');
    expect(testCase[0]).toHaveProperty('text');
  });

  it('Should resolve to empty array', async () => {
    axios.get.mockImplementation(() => {
      return Promise.reject(REJECT_BODY);
    });

    const testCase = await messagesService();

    expect(testCase.length).toEqual(0);
  });
});
