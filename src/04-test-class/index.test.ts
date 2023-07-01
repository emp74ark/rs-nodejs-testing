// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import { random } from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(10);
    expect(acc.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(10);
    expect(() => acc.withdraw(15)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accFrom = getBankAccount(10);
    const accTo = getBankAccount(0);
    expect(() => accFrom.transfer(15, accTo)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const accFrom = getBankAccount(10);
    const accTo = accFrom;
    expect(() => accFrom.transfer(5, accTo)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(10);
    acc.deposit(5);
    expect(acc.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(10);
    acc.withdraw(5);
    expect(acc.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const accFrom = getBankAccount(10);
    const accTo = getBankAccount(0);
    accFrom.transfer(3, accTo);
    expect(accFrom.getBalance()).toBe(7);
    expect(accTo.getBalance()).toBe(3);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(0);
    (random as jest.Mock).mockResolvedValue(10);
    const result = await acc.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(0);
    (random as jest.Mock).mockResolvedValue(10);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(0);
    (random as jest.Mock).mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
