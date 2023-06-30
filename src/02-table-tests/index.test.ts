// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 6, action: Action.Subtract, expected: 4 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 2, b: 2, action: 'InvalidAction', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('%o', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
