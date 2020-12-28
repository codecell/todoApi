const validateTodo = (err, body) => {
  for (field in err.errors) {
    switch (err.erros[field].path) {
      case 'priority':
        body['priorityError'] = err.errors[field].message;
        break;
      case 'description':
        body['descriptionError'] = err.errors[field].message;
        break; 
      default:
        break;
    }
  }
}

module.exports = validateTodo;