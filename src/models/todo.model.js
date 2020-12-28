const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  priority: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
  }
});

mongoose.model('Todo', todoSchema);