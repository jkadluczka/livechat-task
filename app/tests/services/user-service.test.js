const userService = require('./../../services/user-service');
const anonymousUser = require('../../constants/anonymous-user-constants');
const axios = require('axios');
const { USER_SERVICE } = require('../../constants/test-constants');

jest.mock('axios');

describe('messageService test', () => {
  it('Should return Promise object', () => {
    const testCase = userService('test_id');
    const examplePromise = new Promise(() => {});

    expect(typeof testCase).toEqual('object');
    expect(testCase).toMatchObject(examplePromise);
  });

  it('Should resolve to real user object', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({ data: [USER_SERVICE.REAL_USER] });
    });

    const testCase = await userService('ce0d0300-716b-4ba8-8f2f-d01d1c2576a4');

    expect(typeof testCase).toEqual('object');
    expect(testCase).toHaveProperty('first_name');
    expect(testCase).toHaveProperty('last_name');
    expect(testCase).toHaveProperty('user_uuid');
  });

  it('Should resolve to anonymous user object (non existent uuid)', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({ data: [anonymousUser] });
    });
    const testCase = await userService('non_existent_id');

    expect(typeof testCase).toEqual('object');

    expect(testCase).toHaveProperty('first_name');
    expect(testCase).toHaveProperty('last_name');

    expect(testCase.first_name).toEqual('Anonymous');
    expect(testCase.last_name).toEqual('');
  });

  it('Should resolve to anonymous user object (404 status)', async () => {
    axios.get.mockImplementation(() => {
      return Promise.reject({ response: { status: 404 } });
    });

    const testCase = await userService('asdasdasd');

    expect(testCase).toEqual(anonymousUser);
  });

  it('Should handle multiple results', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: [USER_SERVICE.REAL_USER, USER_SERVICE.REAL_USER],
      });
    });

    const testCase = await userService('ce0d0300-716b-4ba8-8f2f-d01d1c2576a4');

    expect(typeof testCase).toEqual('object');
    expect(testCase).toHaveProperty('first_name');
    expect(testCase).toHaveProperty('last_name');
    expect(testCase).toHaveProperty('user_uuid');
  });
});
