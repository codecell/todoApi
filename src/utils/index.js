const mongoose = require('mongoose');
// intialize a new Todo constructor
const Todo = mongoose.model('Todo');

// internal server errors
const internalServerError = (res, err) => {
  return res.status(500).json({
    status: 'Error',
    error: err.message
  })
}

module.exports = {
  internalServerError, Todo
}