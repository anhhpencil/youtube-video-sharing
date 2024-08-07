const { userValidation, youtubeVideoValidation } = require('../../../src/validations'); // Adjust the path accordingly

describe('Validation', () => {
  describe('User Validation', () => {
    test('should validate a correct input', () => {
      const validInput = {
        email: 'test@example.com',
        password: 'Password1$',
      };

      const { error } = userValidation.signup.body.validate(validInput);

      expect(error).toBeUndefined();
    });

    test('should invalidate a missing email', () => {
      const invalidInput = {
        password: 'Password1$',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"email" is required');
    });

    test('should invalidate an invalid email format', () => {
      const invalidInput = {
        email: 'invalid-email',
        password: 'Password1$',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"email" must be a valid email');
    });

    test('should invalidate a password that is too short', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'Short1$',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('Password must be at least 8 characters long');
    });

    test('should invalidate a password missing lowercase letter', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'PASSWORD1$',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('Password must include at least one lowercase letter');
    });

    test('should invalidate a password missing uppercase letter', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'password1$',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('Password must include at least one uppercase letter');
    });

    test('should invalidate a password missing number', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'Password$',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('Password must include at least one number');
    });

    test('should invalidate a password missing special character', () => {
      const invalidInput = {
        email: 'test@example.com',
        password: 'Password1',
      };

      const { error } = userValidation.signup.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('Password must include at least one special character');
    });
  });

  describe('YouTube Validation', () => {
    test('should validate a correct YouTube URL', () => {
      const validInput = {
        link: 'https://www.youtube.com/watch?v=s_LfT7JBaq0',
      };

      const { error } = youtubeVideoValidation.shareVideo.body.validate(validInput);

      expect(error).toBeUndefined();
    });

    test('should invalidate a URL with an incorrect hostname', () => {
      const invalidInput = {
        link: 'https://www.example.com/watch?v=s_LfT7JBaq0',
      };

      const { error } = youtubeVideoValidation.shareVideo.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('The URL must be a valid YouTube link');
    });

    test('should invalidate a malformed URL', () => {
      const invalidInput = {
        link: 'not-a-url',
      };

      const { error } = youtubeVideoValidation.shareVideo.body.validate(invalidInput);

      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('The URL must be a valid YouTube link');
    });
  });
});
