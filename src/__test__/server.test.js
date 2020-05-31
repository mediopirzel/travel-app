const request = require('supertest');
const app = require('../server/index');


describe('Testing server', () => {
    test('Get response', (done) => {
        request(app).get('/test').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});