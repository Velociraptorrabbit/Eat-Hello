//const User = require('../server/models/userModel');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');

const MONGO_URI = process.env.uri;

describe('insert', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
      });
      db = await connection.db('eat-hello');
    });
  
    afterAll(async () => {
      await connection.close();
      await db.close();
    });
  
    it('should insert a doc into collection', async () => {
      const users = db.collection('users');
  
      const mockUser = {username: 'some-user', password: "some-user-password"};
      await users.insertOne(mockUser);
  
      const insertedUser = await users.findOne({username: 'some-user'});
      expect(insertedUser).toEqual(mockUser);
    });
  });