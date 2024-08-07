const { faker } = require('@faker-js/faker');
const request = require('supertest');
const app = require('../../src/app');

const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Shared YouTube video', () => {
  let apiKey;

  beforeAll(async () => {
    const prepareUser = {
      email: faker.internet.email().toLowerCase(),
      password: 'Password1$',
    };

    const response = await request(app).post('/api/user/signup').send(prepareUser);

    if (response.status !== 200 || response.body.hasError) {
      throw new Error('User signup failed');
    }

    const loginResponse = await request(app).post('/api/user/login').send(prepareUser);
    apiKey = loginResponse.body.data.apiToken;

    if (!apiKey) {
      throw new Error('API key not defined');
    }
  });

  it('should throw error when send wrong link', async () => {
    const response = await request(app)
      .post('/api/share-video')
      .send({
        link: 'Test-link',
      })
      .set('Authorization', `Bearer ${apiKey}`);

    expect(response.status).toBe(200);
    expect(response.body.hasError).toEqual(true);
    expect(response.body.message).toEqual('The URL must be a valid YouTube link');
  });

  it('should succeed to share a video', async () => {
    const response = await request(app)
      .post('/api/share-video')
      .send({
        link: 'https://www.youtube.com/watch?v=lwBnRXBMOpE',
      })
      .set('Authorization', `Bearer ${apiKey}`);

    expect(response.status).toBe(200);
    expect(response.body.hasError).toEqual(false);
  });

  it('should respond with the error code for duplicate link', async () => {
    const response = await request(app)
      .post('/api/share-video')
      .send({
        link: 'https://www.youtube.com/watch?v=lwBnRXBMOpE',
      })
      .set('Authorization', `Bearer ${apiKey}`);

    expect(response.status).toBe(200);
    expect(response.body.hasError).toEqual(true);
    expect(response.body.message).toEqual('The video has been shared.');
  });

  it('should get a list of shared videos', async () => {
    const response = await request(app)
      .get('/api/share-video')
      .set('Authorization', `Bearer ${apiKey}`)
      .query({ limit: 10, page: 1 });

    expect(response.status).toBe(200);
    expect(response.body.hasError).toEqual(false);
    expect(response.body.data.totalShared).toBeGreaterThan(0);
    expect(response.body.data.videos.length).toBeGreaterThan(0);
  });
});
