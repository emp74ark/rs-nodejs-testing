// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue(2);
    expect(value).toBe(2);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError()).toThrow();
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError('testMessage')).toThrow('testMessage');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow();
  });
});
