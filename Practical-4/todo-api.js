const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const todos = [];

app.use(bodyParser.json());
app.get('/favicon.ico', (_req, res) => res.status(204).end());

app.get('/todos', (_req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = { id: todos.length + 1, title };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'To-Do not found' });
  }
  todos.splice(index, 1);
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`To-Do API running on port ${PORT}`);
});