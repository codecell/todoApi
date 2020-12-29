const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/todoDb';
const TEST_DB_URI = 'mongodb://localhost:27017/todoTests';

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      
      return mongoose.connect(
        TEST_DB_URI, 
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res, err) => {
          if (err) return reject(err);
  
          resolve();
        });          
    }

    return mongoose.connect(
      DB_URI, 
      { useNewUrlParser: true, useUnifiedTopology: true })
      .then((res, err) => {
        if (err) return reject(err);

        resolve();
      }); 
  }); 
}


const close = () => mongoose.disconnect();

require('../models/todo.model');

module.exports = { connect, close };