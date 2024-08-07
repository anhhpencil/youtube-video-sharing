const cryptoJS = require('crypto-js');
const { encrypt, decrypt } = require('../../../src/utils/crypto');

describe('Encryption and Decryption', () => {
  const secret = 'testSecret';
  const plaintext = 'Hello, world!';
  let encryptedText;

  beforeAll(() => {
    // Optionally set up environment or initial state
  });

  beforeEach(() => {
    // Encrypt the plaintext before each test
    encryptedText = encrypt(plaintext, secret);
  });

  test('should encrypt plaintext correctly', () => {
    expect(encryptedText).not.toBe(plaintext);
    expect(encryptedText).toBeTruthy();
  });

  test('should decrypt ciphertext correctly', () => {
    const decryptedText = decrypt(encryptedText, secret);
    expect(decryptedText).toBe(plaintext);
  });

  test('should handle decryption with incorrect credentials', () => {
    const decryptedText = decrypt(encryptedText, 'wrongSecret');
    expect(decryptedText).toBe('');
  });

  test('should return empty string on encryption error', () => {
    jest.spyOn(cryptoJS.AES, 'encrypt').mockImplementation(() => {
      throw new Error('Encryption error');
    });
    const encrypted = encrypt(plaintext, secret);
    expect(encrypted).toBe('');
  });

  test('should return empty string on decryption error', () => {
    jest.spyOn(cryptoJS.AES, 'decrypt').mockImplementation(() => {
      throw new Error('Decryption error');
    });
    const decrypted = decrypt(encryptedText, secret);
    expect(decrypted).toBe('');
  });
});
