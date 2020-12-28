require('./db');
const express = require('express');
const app = express();

app.use(express.json());

const todosController = require('./controllers/tododController')


const PORT = process.env.PORT || 3000
app.listen(3000, () => {
  console.log('Listenning on port' + PORT);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Todo Homepage!!!');
})
app.use('/todos', todosController);