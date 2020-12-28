const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/todoDb', 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
  if (!err) {
    console.log('Successfully connected to todoDb !!!');
  } else {
    console.log('Found the following Error while connecting to the Databse: ' + err);
  }
});

require('../models/todo.model');

module.exports = mongoose;