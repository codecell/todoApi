const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { updateTodo, createTodo } = require('../controllers/tododController');
const { internalServerError } = require('../utils');

// intialize a new Todo constructor
const Todo = mongoose.model('Todo');

// create a new a todo
router.post('/', (req, res) => {  
  return createTodo(req, res);
});

// View all todos
router.get('/', async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json({
      status: 'Sucess',
      message: 'Showing ' + allTodos.length + ' todo items',
      data: allTodos
    })
  } catch(err) {
    internalServerError(res, err);
  }
});

// View a specific todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ status: 'Error', message: 'Oops! Todo with given ID not found' });
    }
    return res.status(200).json({
      status: 'Sucess',
      data: todo
    })
  } catch(err) {
    internalServerError(res, err);
  }
});

// Update a Todo
router.patch('/:id', (req, res) => updateTodo(req, res));

// delete a specific todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete(req.params.id, { useFindAndModify: false });
    return res.status(200).json(
      { status: 'Sucesss', message: 'Todo with ID ' + deletedTodo._id + ' successfully deleted' }
    );
  } catch(err) {
    internalServerError(res, err);
  }
});

module.exports = router;