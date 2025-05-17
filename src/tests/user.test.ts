const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });


import request from 'supertest';
import app from '../app'
import mongoose from 'mongoose';
const User = require('../models/User')

const MONGO_TEST_URI = process.env.MONGO_TEST_URI;

if (!MONGO_TEST_URI) {
  throw new Error('MONGO_TEST_URI is not defined in the environment variables');
}

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI); // use a test DB
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('POST /users', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should not allow duplicate user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email already registered');
  });
});
