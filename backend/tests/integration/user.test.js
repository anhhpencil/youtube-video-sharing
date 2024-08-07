// const mongoose = require('mongoose');

const { faker } = require('@faker-js/faker');

const request = require('supertest');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

const prepareUser = {
  email: faker.internet.email().toLowerCase(),
  password: 'Password1$',
};

setupTestDB();

describe('User APIs', () => {
  describe('POST /api/user/signup', () => {
    it('should respond with the error code', async () => {
      const body = {
        email: prepareUser.email,
        password: 'Password1',
      };
      const response = await request(app).post('/api/user/signup').send(body);
      expect(response.status).toBe(200);
      expect(response.body.hasError).toEqual(true);
      expect(response.body.message).toEqual('Password must include at least one special character');
    });

    it('should respond with the success code', async () => {
      const body = {
        email: prepareUser.email,
        password: prepareUser.password,
      };
      const response = await request(app).post('/api/user/signup').send(body);
      expect(response.status).toBe(200);
      expect(response.body.hasError).toEqual(false);
    });

    it('should respond with the error code for duplicate signup', async () => {
      const body = {
        email: prepareUser.email,
        password: prepareUser.password,
      };
      const response = await request(app).post('/api/user/signup').send(body);
      expect(response.status).toBe(200);
      expect(response.body.hasError).toEqual(true);
    });
  });

  describe('POST /api/user/login', () => {
    it('should respond with the user login response data', async () => {
      const body = {
        email: prepareUser.email,
        password: prepareUser.password,
      };
      const response = await request(app).post('/api/user/login').send(body);
      expect(response.status).toBe(200);
      expect(response.body.hasError).toEqual(false);
      expect(response.body.data.email).toEqual(prepareUser.email);
      expect(response.body.data.apiToken).not.toBeNull();
    });

    it('should respond with the wrong credential message', async () => {
      const body = {
        email: prepareUser.email,
        password: 'Test11234',
      };
      const response = await request(app).post('/api/user/login').send(body);
      expect(response.status).toBe(200);
      expect(response.body.hasError).toEqual(true);
      expect(response.body.message).toEqual('Wrong credential.');
    });

    it('should respond with the registration required message', async () => {
      const body = {
        email: faker.internet.email().toLowerCase(),
        password: prepareUser.password,
      };
      const response = await request(app).post('/api/user/login').send(body);
      expect(response.status).toBe(200);
      expect(response.body.hasError).toEqual(true);
      expect(response.body.message).toEqual('Please register an account.');
    });
  });
});
