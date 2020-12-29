const { connect } = require('./db');
const express = require('express');
const todosRoutes = require('./routes/todos');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000

// connect to DB and Listen for API calls
connect()
  .then(() => {
    // console.log(process.env.NODE_ENV, '<<<<,,>>>>>>>>')
    const message = process.env.NODE_ENV === 'test' ? 'Successfully connected to TEST DB' : 'Successfully connected to todoDb !!!';
    console.log(message);
  
    app.listen(3000, () => {
      console.log('Listenning on port' + PORT);
    });
  });

app.get('/', (req, res) => {
  res.send('Welcome to the Todo Homepage!!!');
});
app.use('/todos', todosRoutes);

// 404 route
app.get('*', (req, res) => {
  res.send('Oops not found !!!!');
});

module.exports = app;