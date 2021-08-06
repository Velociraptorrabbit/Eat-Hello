const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.uri;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'eat-hello',
})
  .then(() => {
    console.log('Connected to Mongo DB.');
  })
  .catch((err) => {
    console.log(err);
  });


// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

// create User Schema for the database
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  location: String,
  preferCuisine: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  history: [String],
});


// this is to hash the password before saving into data
userSchema.pre('save', function(next){
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

module.exports = mongoose.model('User', userSchema);
