const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.post('/webhook', (req, res) => {
  const data = req.body;
  if (Array.isArray(data)) {
    tasks = data;
  } else if (data && data.task) {
    const idx = tasks.findIndex(t => t.task === data.task && t.board === data.board);
    if (idx >= 0) tasks[idx] = data;
    else tasks.push(data);
  }
  res.json({ ok: true, total: tasks.length });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/', (req, res) => {
  res.json({ status: 'online', total: tasks.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
