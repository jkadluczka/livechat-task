const request = require('supertest');
const app = require('./../../../server');
let server;

beforeAll(async (done) => {
  server = app.listen(4000, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterEach(async () => {
  await server.close();
});

describe('/chats route test', () => {
  it('Should execute /chats route properly', async () => {
    const response = await global.agent.get('/chats');

    expect(response.statusCode).toEqual(200);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('chat_uuid');
    expect(response.body[0]).toHaveProperty('messages_count');
    expect(response.body[0]).toHaveProperty('users');

    expect(response.body[0].users.length).toBeGreaterThan(0);
    expect(typeof response.body[0].users[0]).toEqual('string');
  });
});
