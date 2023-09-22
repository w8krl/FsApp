const request = require('supertest');
const app = require('../app');  // Make sure you export your app from index.js

// Modules
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

describe('Login', () => {
    beforeAll(async () => {
        await User.create({
            username: 'test_username',
            password: 'test_password'
        });
    });

    afterAll(async () => {
        // Delete after tests
        await User.findOneAndDelete({ username: 'test_username' });
    });

    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'test_username',
                password: 'test_password'
            });
        
        expect(res.statusCode).toEqual(200);

        // Check that a token is returned
        expect(res.body.token).toBeDefined();

        // Decode the token
        const decodedToken = jwt.verify(res.body.token, process.env.JWT_SECRET);


        // Check that the decoded token has the expected user ID (or any other claims you add to your JWT)
        expect(decodedToken.id).toEqual(res.body.user.id);
        console.log(res.body)
    });

    it('should fail to login with incorrect credentials', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'test_username',
                password: 'wrong_password'
            });

        expect(res.statusCode).toEqual(401);  // Assuming you send a 401 for unauthorized.
    });
});

