const { faker } = require('@faker-js/faker');

const request = require('supertest');
const app = require('../../src/app');

describe('Shared youtube video', () => {
    let apiKey;

    beforeAll(async () => {
        const prepareUser = {
            email: faker.internet.email().toLowerCase(),
            password: 'Password1$'
        };

        const response = await request(app).post('/api/user/signup').send(prepareUser);
       
        expect(response.status).toBe(200);
        expect(response.body.hasError).toEqual(false);


        const loginResponse = await request(app)
            .post('/login')
            .send({
                username: 'your-username',
                password: 'your-password'
            });

        apiKey = loginResponse.body.data.apiKey;
        expect(apiKey).toBeDefined();
    });


    it('should throw error when send wrong link', async () => {
        const response = await request(app)
            .post('/api/share-video').send({
                link: 'Test-link'
            })
            .set('Authorization', `Bearer ${apiKey}`);

        expect(response.status).toBe(200);
        expect(response.body.hasError).toEqual(true);
        expect(response.body.message).toEqual('The URL must be a valid YouTube link')
    });

    it('should success to share a video', async () => {
        const response = await request(app)
            .post('/api/share-video').send({
                link: 'https://www.youtube.com/watch?v=s_LfT7JBaq0'
            })
            .set('Authorization', `Bearer ${apiKey}`);

        expect(response.status).toBe(200);
        expect(response.body.hasError).toEqual(false);
    });

    it('should respond with the error code for duplicate link', async () => {
        const response = await request(app)
            .post('/api/share-video').send({
                link: 'https://www.youtube.com/watch?v=s_LfT7JBaq0'
            })
            .set('Authorization', `Bearer ${apiKey}`);

        expect(response.status).toBe(200);
        expect(response.body.hasError).toEqual(true);
        expect(response.body.message).toEqual('The video has been shared.')
    });

    it('should get a list shared video', async () => {
        const response = await request(app)
            .get('/api/share-video').send({
               limit: 10,
               page: 1
            })
            .set('Authorization', `Bearer ${apiKey}`);

        expect(response.status).toBe(200);
        expect(response.body.hasError).toEqual(false);
        expect(response.body.data.totalShared).toEqual(1);
        expect(response.body.data.videos).toHaveLength(1);
    });
});