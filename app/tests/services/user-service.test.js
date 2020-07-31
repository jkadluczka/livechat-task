const userService = require('./../../services/user-service');

describe('messageService test', () => {
  it('Should return Promise object', () => {
    const testCase = userService('test_id');
    const examplePromise = new Promise(() => {});

    expect(typeof testCase).toEqual('object');
    expect(testCase).toMatchObject(examplePromise);
  });

  it('Should resolve to real user object', async () => {
    const testCase = await userService('ce0d0300-716b-4ba8-8f2f-d01d1c2576a4');

    expect(typeof testCase).toEqual('object');
    expect(testCase).toHaveProperty('first_name');
    expect(testCase).toHaveProperty('last_name');
    expect(testCase).toHaveProperty('user_uuid');
  });

  it('Should resolve to anonymous user object (non existent uuid)', async () => {
    const testCase = await userService('non_existent_id');

    expect(typeof testCase).toEqual('object');

    expect(testCase).toHaveProperty('first_name');
    expect(testCase).toHaveProperty('last_name');

    expect(testCase.first_name).toEqual('Anonymous');
    expect(testCase.last_name).toEqual('');
  });
});
