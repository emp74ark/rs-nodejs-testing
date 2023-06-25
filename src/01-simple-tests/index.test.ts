// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Add,
      }),
    ).toBe(5);
  });

  test('should substract two numbers', () => {
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: Action.Substract,
      }),
    ).toBe(4);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 5,
        b: 2,
        action: Action.Multiply,
      }),
    ).toBe(10);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: Action.Divide,
      }),
    ).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toBe(36);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: 'InvalidAction',
      }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '3',
        b: 2,
        action: Action.Add,
      }),
    ).toBeNull();
  });
});
