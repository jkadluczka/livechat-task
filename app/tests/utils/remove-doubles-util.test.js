const removeDoubles = require('./../../utils/remove-doubles-util');
const { REMOVE_DOUBLES } = require('./../../constants/test-constants');

describe('removeDoubles util test', () => {
  it('Should return unique array', () => {
    const testCase = removeDoubles(REMOVE_DOUBLES.ARRAY_DOUBLES);
    expect(testCase).toEqual(REMOVE_DOUBLES.ARRAY_NO_DOUBLES);
  });
});
