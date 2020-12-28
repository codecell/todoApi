const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  priority: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: "This field is required"
  },
  completed: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Todo', todoSchema);