// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

jest.mock('fs');
jest.mock('path');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 1000);
    expect(setTimeout).toHaveBeenCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 1000);
    expect(setInterval).toHaveBeenCalledWith(cb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const intervals = [1, 2, 3];
    intervals.forEach((i) => {
      doStuffByInterval(cb, i);
    });
    expect(cb).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalled();
    expect(cb.mock.calls.length).toBeGreaterThan(1);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'file';
  beforeEach(() => {
    (join as jest.Mock).mockReturnValue(pathToFile);
    (readFile as jest.Mock).mockReturnValue('test');
  });
  test('should call join with pathToFile', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('test');
  });
});
