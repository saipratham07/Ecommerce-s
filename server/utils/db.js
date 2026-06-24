const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const chalk = require('chalk');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  try {
    if (!database || !database.url) {
      throw new Error('MONGO_URI connection string is undefined. Please verify your server/.env file layout.');
    }

    // Connect to MongoDB
    mongoose.set('useCreateIndex', true);
    mongoose
      .connect(database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() =>
        console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected successfully!')}`)
      )
      .catch(err => console.log(`${chalk.red('×')} MongoDB Connection Error:`, err));
  } catch (error) {
    console.log(`${chalk.red('×')} setupDB Initialization Error: ${error.message}`);
    return null;
  }
};

module.exports = setupDB;