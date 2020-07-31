const messagesService = require('./../../services/messages-service');

describe('messageService test', () => {
  it('Should return Promise object', () => {
    const testCase = messagesService();
    const examplePromise = new Promise(() => {});

    expect(typeof testCase).toEqual('object');
    expect(testCase).toMatchObject(examplePromise);
  });

  it('Should resolve to messages array', async () => {
    const testCase = await messagesService();

    expect(testCase.length).toBeGreaterThan(0);
    expect(testCase[0]).toHaveProperty('message_uuid');
    expect(testCase[0]).toHaveProperty('chat_uuid');
    expect(testCase[0]).toHaveProperty('author_uuid');
    expect(testCase[0]).toHaveProperty('text');
  });
});
