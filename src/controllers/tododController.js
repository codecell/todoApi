const { internalServerError, Todo } = require('../utils');


// New todo creator
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

// Update todo controller
const updateTodo = async (req, res) => {
  try { 
      const { priority, description, completed } = req.body;

      const updateValues = { priority, description, completed };
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id, updateValues, { new: true, useFindAndModify: false }
      );

    if(!updatedTodo) return res.status(404).send('Todo with given id not found');

      return res.status(200).json({ status: 'success', message: 'Todo successfully updated', updatedTodo });
  } catch(err) {
    internalServerError(res, err);
  }
}

module.exports = {
  updateTodo, createTodo
}
