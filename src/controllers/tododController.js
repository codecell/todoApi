const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// internal server errors
const internalServerError = (res, err) => {
  return res.status(500).json({
    status: 'Error',
    error: err.message
  })
}

const Todo = mongoose.model('Todo');

router.get('/', (req, res) => {
  res.json('som yaay!!!')
})

router.post('/', (req, res) => {
  createTodo(req, res);
});

const createTodo = async (req, res) => {
  const { priority, description, completed } = req.body;
  const newTodoDetails = { priority, description, completed };

  try {
    const newTodo = new Todo(newTodoDetails);
    await newTodo.save();
    return res.status(201).json({ 
      status: 'Success', 
      message: 'New Todo item successfully Added',
      data: {
        priority: newTodo.priority,
        description: newTodo.description,
        completed: newTodo.completed
      }
    });
  } catch (err) {
    internalServerError(res, err);
  }
}

router.get('/all', async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json({
      status: 'Sucess',
      data: allTodos
    })
  } catch(err) {
    internalServerError(res, err);
  }
});

module.exports = router;